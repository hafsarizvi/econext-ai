
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { resourceKnowledgeBase } from "@/data/resources";
import {
  SAMPLE_ANALYSIS,
  SAMPLE_PROFILE,
  SAMPLE_SOURCES,
} from "@/data/sampleAnalysis";

export const runtime = "nodejs";

const DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa",
  "Colombo", "Galle", "Gampaha", "Hambantota",
  "Jaffna", "Kalutara", "Kandy", "Kegalle",
  "Kilinochchi", "Kurunegala", "Mannar", "Matale",
  "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura",
  "Trincomalee", "Vavuniya",
];

const BUDGETS = [
  "Below LKR 25,000",
  "LKR 25,000–100,000",
  "LKR 100,000–500,000",
  "Above LKR 500,000",
  "Not decided yet",
];

const EXPERIENCES = [
  "Beginner",
  "Some business experience",
  "Experienced entrepreneur",
  "Existing business owner",
];

type Opportunity = {
  name: string;
  description: string;
  suitability: string;
  requirements: string[];
  challenges: string[];
  firstSteps: string[];
  verificationQuestions: string[];
  evidenceStatus: string;
  startupComplexity?: string;
  resourceFit?: string;
  budgetConsiderations?: string;
  comparisonReason?: string;
};

type Analysis = {
  overallAssessment: string;
  opportunities: Opportunity[];
  recommendedFirstStep: string;
};

/**
 * Enforced JSON structure for Gemini.
 * This is the main change from the previous version.
 */
const ANALYSIS_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    overallAssessment: {
      type: "STRING",
    },
    opportunities: {
      type: "ARRAY",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          description: { type: "STRING" },
          suitability: { type: "STRING" },
          requirements: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          challenges: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          firstSteps: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          verificationQuestions: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          evidenceStatus: { type: "STRING" },
          startupComplexity: { type: "STRING" },
          resourceFit: { type: "STRING" },
          budgetConsiderations: { type: "STRING" },
          comparisonReason: { type: "STRING" },
        },
        required: [
          "name",
          "description",
          "suitability",
          "requirements",
          "challenges",
          "firstSteps",
          "verificationQuestions",
          "evidenceStatus",
          "startupComplexity",
          "resourceFit",
          "budgetConsiderations",
          "comparisonReason",
        ],
        additionalProperties: false,
      },
    },
    recommendedFirstStep: {
      type: "STRING",
    },
  },
  required: [
    "overallAssessment",
    "opportunities",
    "recommendedFirstStep",
  ],
  additionalProperties: false,
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => typeof item === "string" && item.trim().length > 0,
    )
  );
}

function isValidAnalysis(value: unknown): value is Analysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Record<string, unknown>;

  if (
    !isString(result.overallAssessment) ||
    !isString(result.recommendedFirstStep) ||
    !Array.isArray(result.opportunities) ||
    result.opportunities.length !== 3
  ) {
    return false;
  }

  return result.opportunities.every((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const opportunity = item as Record<string, unknown>;

    return (
      isString(opportunity.name) &&
      isString(opportunity.description) &&
      isString(opportunity.suitability) &&
      isStringArray(opportunity.requirements) &&
      isStringArray(opportunity.challenges) &&
      isStringArray(opportunity.firstSteps) &&
      isStringArray(opportunity.verificationQuestions) &&
      isString(opportunity.evidenceStatus) &&
      isString(opportunity.startupComplexity) &&
      isString(opportunity.resourceFit) &&
      isString(opportunity.budgetConsiderations) &&
      isString(opportunity.comparisonReason)
    );
  });
}

function parseJsonResponse(responseText: string): unknown {
  const cleaned = responseText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(cleaned);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown Gemini error";
  }
}

function getErrorStatus(error: unknown): number | null {
  if (error && typeof error === "object") {
    const item = error as {
      status?: number | string;
      statusCode?: number | string;
      code?: number | string;
    };

    const directStatus = Number(
      item.status ?? item.statusCode ?? item.code,
    );

    if (Number.isFinite(directStatus) && directStatus > 0) {
      return directStatus;
    }
  }

  const message = getErrorMessage(error);
  const match = message.match(/"code"\s*:\s*(\d{3})/);

  return match ? Number(match[1]) : null;
}

function isQuotaError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const status = getErrorStatus(error);

  return (
    status === 429 ||
    message.includes("resource_exhausted") ||
    message.includes("quota exceeded") ||
    message.includes("rate limit")
  );
}

function isTemporaryError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const status = getErrorStatus(error);

  return (
    status === 502 ||
    status === 503 ||
    status === 504 ||
    message.includes("fetch failed") ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("temporarily unavailable") ||
    message.includes("overloaded") ||
    message.includes("econnreset") ||
    message.includes("etimedout") ||
    message.includes("enotfound") ||
    message.includes("socket")
  );
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function buildPrompt(input: {
  resource: string;
  district: string;
  quantity: string;
  budget: string;
  experience: string;
  resourceData: unknown;
}): string {
  return `
You are EcoNext, a careful resource-to-venture exploration
assistant focused on agricultural by-products and circular
economy opportunities in Sri Lanka.

USER INFORMATION

Resource: ${input.resource}
District: ${input.district}, Sri Lanka
Available quantity: ${input.quantity}
Starting budget: ${input.budget}
Business experience: ${input.experience}

RESOURCE KNOWLEDGE BASE

${JSON.stringify(input.resourceData, null, 2)}

RESEARCH RULES

1. Use the supplied resource-specific knowledge as your foundation.
2. Recommend only pathways relevant to the selected resource.
3. Consider the user's quantity, budget and experience.
4. Do not assume the user owns equipment, land, transport or facilities.
5. Do not claim local buyers, processors or suppliers are verified.
6. Do not invent organisations, contacts, market prices, equipment
   prices, investment costs, revenue, profits or demand.
7. International research is not proof of Sri Lankan market demand.
8. Clearly distinguish established applications from possibilities
   that still need local investigation.
9. Do not guarantee commercial success.

SUSTAINABILITY RULES

1. Discuss circular economy benefits cautiously.
2. Do not claim reductions in carbon emissions, pollution,
   landfill, open burning, water use or energy use without evidence.
3. Consider collection, sorting, moisture, contamination,
   transport, processing losses and usable output.
4. Treat environmental benefits as potential until measured.
5. Do not assume that every conversion process is environmentally
   beneficial.

OPPORTUNITIES

Generate exactly THREE meaningfully different opportunities.

Consider collection and supply, sorting, basic preparation,
intermediate processing, finished products or community-based
models where appropriate.

For each opportunity explain:
- The possible activity.
- Its suitability for this user.
- Practical requirements.
- Realistic challenges.
- First steps.
- Questions to verify locally before investing.
- What evidence supports it and what remains unverified.
- Startup complexity: Low, Medium or High.
- Resource fit: Strong, Moderate or Limited.
- Budget considerations without inventing costs.
- How it differs from the other opportunities.

OVERALL ASSESSMENT

Reflect the submitted information and identify a sensible
starting direction. State important uncertainties.

RECOMMENDED FIRST STEP

Give one practical action to take before spending money.
Prefer local verification, measuring supply, speaking to
processors or conducting a small controlled trial.

Return the requested JSON structure only.
Do not include Markdown fences or text outside the JSON.
Follow the supplied response schema exactly.
`;
}

async function generateWithRetry(
  ai: GoogleGenAI,
  prompt: string,
): Promise<string> {
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseJsonSchema: ANALYSIS_RESPONSE_SCHEMA,
          maxOutputTokens: 5000,
        },
      });

      const responseText = response.text;

      if (!responseText || !responseText.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      return responseText;
    } catch (error) {
      lastError = error;

      if (isQuotaError(error)) {
        throw error;
      }

      if (!isTemporaryError(error) || attempt === maxAttempts) {
        throw error;
      }

      const delay = attempt * 1500;

      console.warn(
        `Gemini temporary failure. Retrying attempt ${attempt + 1} of ${maxAttempts} in ${delay}ms.`,
      );

      await wait(delay);
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const mode = body.mode === "sample" ? "sample" : "ai";

    const resource =
      typeof body.resource === "string" ? body.resource.trim() : "";
    const district =
      typeof body.district === "string" ? body.district.trim() : "";
    const quantity =
      typeof body.quantity === "string" ? body.quantity.trim() : "";
    const budget =
      typeof body.budget === "string" ? body.budget.trim() : "";
    const experience =
      typeof body.experience === "string" ? body.experience.trim() : "";

    if (!resource || !district || !quantity || !budget || !experience) {
      return NextResponse.json(
        {
          error: "Please complete all resource details before continuing.",
        },
        { status: 400 },
      );
    }

    if (quantity.length > 100) {
      return NextResponse.json(
        {
          error: "Please enter a shorter quantity description.",
        },
        { status: 400 },
      );
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        resourceKnowledgeBase,
        resource,
      )
    ) {
      return NextResponse.json(
        {
          error: "This resource is not currently supported by EcoNext.",
        },
        { status: 400 },
      );
    }

    if (!DISTRICTS.includes(district)) {
      return NextResponse.json(
        {
          error: "Please select a valid Sri Lankan district.",
        },
        { status: 400 },
      );
    }

    if (!BUDGETS.includes(budget)) {
      return NextResponse.json(
        {
          error: "Please select a valid budget range.",
        },
        { status: 400 },
      );
    }

    if (!EXPERIENCES.includes(experience)) {
      return NextResponse.json(
        {
          error: "Please select a valid experience level.",
        },
        { status: 400 },
      );
    }

    const submittedDetails = {
      resource,
      district,
      quantity,
      budget,
      experience,
    };

    // Prepared sample mode does not call Gemini.
    if (mode === "sample") {
      return NextResponse.json({
        mode: "sample",
        isSample: true,
        analysis: SAMPLE_ANALYSIS,
        sources: SAMPLE_SOURCES,
        sampleProfile: SAMPLE_PROFILE,
        submittedDetails,
        message:
          "This is a fixed demonstration example. Your submitted details do not personalise the results.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "The Gemini API key is not configured. You can still explore the offline sample assessment.",
        },
        { status: 503 },
      );
    }

    const resourceData =
      resourceKnowledgeBase[
        resource as keyof typeof resourceKnowledgeBase
      ];

    const ai = new GoogleGenAI({ apiKey });

    const prompt = buildPrompt({
      resource,
      district,
      quantity,
      budget,
      experience,
      resourceData,
    });

    let responseText: string;

    try {
      responseText = await generateWithRetry(ai, prompt);
    } catch (error) {
      if (isQuotaError(error)) {
        return NextResponse.json(
          {
            error:
              "The Gemini API usage limit has been reached. Please wait for the quota to reset, or use the offline sample assessment.",
          },
          { status: 429 },
        );
      }

      if (isTemporaryError(error)) {
        console.error(
          "Gemini remained temporarily unavailable after retries:",
          getErrorMessage(error),
        );

        return NextResponse.json(
          {
            error:
              "Gemini is temporarily busy or unreachable. Please try again later or use the offline sample assessment.",
          },
          { status: 503 },
        );
      }

      throw error;
    }

    let parsedResponse: unknown;

    try {
      parsedResponse = parseJsonResponse(responseText);
    } catch (error) {
      console.error(
        "Gemini returned invalid JSON despite structured output:",
        getErrorMessage(error),
      );

      return NextResponse.json(
        {
          error:
            "Gemini returned a response that EcoNext could not read. Please try again later or use the prepared sample.",
        },
        { status: 502 },
      );
    }

    if (!isValidAnalysis(parsedResponse)) {
      console.error(
        "Gemini response did not match the expected analysis structure.",
      );

      return NextResponse.json(
        {
          error:
            "Gemini returned an incomplete assessment. Please try again later or use the prepared sample.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      mode: "ai",
      isSample: false,
      analysis: parsedResponse,
      sources: resourceData.verifiedFacts || [],
      webSources: [],
      webSearchQueries: [],
      searchEntryPoint: null,
      searchGrounded: false,
      submittedDetails,
      message:
        "This assessment was generated by Gemini using EcoNext's stored resource knowledge base. Local commercial conditions still require independent verification.",
    });
  } catch (error) {
    console.error("EcoNext analysis error:", error);

    return NextResponse.json(
      {
        error:
          "EcoNext could not complete the AI assessment. Please check the server logs and try again later.",
      },
      { status: 500 },
    );
  }
}
