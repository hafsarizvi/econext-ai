
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { resourceKnowledgeBase } from "@/data/resources";

export const runtime = "nodejs";
export const maxDuration = 60;

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

type WebSource = {
  title: string;
  url: string;
  domain: string;
};

type GroundingWebSource = {
  title?: string;
  uri?: string;
  domain?: string;
};

type GroundingChunk = {
  web?: GroundingWebSource;
};

type GroundingMetadata = {
  groundingChunks?: GroundingChunk[];
  webSearchQueries?: string[];
  searchEntryPoint?: {
    renderedContent?: string;
  };
  groundingSupports?: unknown[];
};

type CandidateWithGrounding = {
  groundingMetadata?: GroundingMetadata;
};

function isQuotaError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : String(error);

  return (
    message.includes("429") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.toLowerCase().includes("quota exceeded") ||
    message.toLowerCase().includes("rate limit") ||
    message.toLowerCase().includes("too many requests")
  );
}

function isRetryableError(error: unknown): boolean {
  if (isQuotaError(error)) {
    return false;
  }

  const message =
    error instanceof Error ? error.message : String(error);

  return (
    message.includes("500") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("504") ||
    message.toLowerCase().includes("overloaded") ||
    message.toLowerCase().includes("unavailable") ||
    message.toLowerCase().includes("deadline")
  );
}

async function generateWithRetry(
  ai: GoogleGenAI,
  prompt: string
) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.3,
          responseMimeType: "application/json",
          maxOutputTokens: 7000,
          tools: [{ googleSearch: {} }],
        },
      });

      return response;
    } catch (error) {
      if (isQuotaError(error)) {
        throw error;
      }

      if (
        !isRetryableError(error) ||
        attempt === maxAttempts
      ) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 3000)
      );
    }
  }

  throw new Error("Unable to generate an analysis.");
}

function isValidAnalysis(data: unknown): data is Analysis {
  if (!data || typeof data !== "object") {
    return false;
  }

  const result = data as Record<string, unknown>;

  if (
    typeof result.overallAssessment !== "string" ||
    typeof result.recommendedFirstStep !== "string" ||
    !Array.isArray(result.opportunities) ||
    result.opportunities.length !== 3
  ) {
    return false;
  }

  return result.opportunities.every((item: unknown) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const opportunity = item as Record<string, unknown>;

    return (
      typeof opportunity.name === "string" &&
      typeof opportunity.description === "string" &&
      typeof opportunity.suitability === "string" &&
      Array.isArray(opportunity.requirements) &&
      Array.isArray(opportunity.challenges) &&
      Array.isArray(opportunity.firstSteps) &&
      Array.isArray(opportunity.verificationQuestions) &&
      typeof opportunity.evidenceStatus === "string"
    );
  });
}

function parseJsonResponse(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "The AI service is not configured. Please check the server environment.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      resource,
      district,
      quantity,
      budget,
      experience,
    } = body;

    if (
      !resource ||
      !district ||
      !quantity ||
      !budget ||
      !experience
    ) {
      return NextResponse.json(
        {
          error: "Please complete all resource details.",
        },
        { status: 400 }
      );
    }

    const resourceData =
      resourceKnowledgeBase[
        resource as keyof typeof resourceKnowledgeBase
      ];

    if (!resourceData) {
      return NextResponse.json(
        {
          error:
            "This resource is not currently supported by EcoNext.",
        },
        { status: 400 }
      );
    }

    const verifiedFacts = resourceData.verifiedFacts || [];

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are EcoNext, a resource-to-venture intelligence assistant
focused on underutilised agricultural by-products in Sri Lanka.

Explore realistic business and value-creation pathways using
the user's resource details, the supplied research knowledge
base, and relevant information retrieved through Google Search.

USER INFORMATION

Resource: ${resource}
District: ${district}, Sri Lanka
Available quantity: ${quantity}
Starting budget: ${budget}
Business experience: ${experience}

RESEARCH KNOWLEDGE BASE

${JSON.stringify(verifiedFacts, null, 2)}

RESEARCH INSTRUCTIONS

1. Use the supplied knowledge base as the starting research foundation.

2. Use Google Search to investigate relevant, current information
where useful. Prioritise credible sources such as:
- Sri Lankan government departments and ministries
- Sri Lankan universities and research institutions
- Recognised industry organisations
- International development organisations
- Peer-reviewed research and established technical publications

3. Look for information relevant to the selected agricultural
by-product, its possible applications, processing requirements,
technical considerations and the Sri Lankan context.

4. Do not invent local buyers, supplier contacts, market prices,
demand figures, investment costs, profit estimates or business
success rates.

5. Do not claim that a business opportunity is commercially viable
just because the underlying material has an established use.

6. Distinguish established research findings from possible
applications and information that still requires local verification.

7. If reliable local information is unavailable, state that
clearly. Do not present international findings as proof of
Sri Lankan market demand.

OPPORTUNITY REQUIREMENTS

Generate exactly THREE distinct and relevant opportunities.

Consider different levels of processing and investment where
appropriate. Do not generate three nearly identical suggestions.

For each opportunity, include:

- name
- description
- suitability
- requirements: an array of practical requirements
- challenges: an array of realistic challenges
- firstSteps: an array of actionable steps
- verificationQuestions: an array of questions the user should
  investigate locally
- evidenceStatus: explain what is supported by research and
  what remains unverified
- startupComplexity: Low, Medium or High
- resourceFit: Strong, Moderate or Limited
- budgetConsiderations: discuss the user's selected budget
  without inventing exact costs
- comparisonReason: explain why this pathway differs from
  the other suggestions

ASSESSMENT REQUIREMENTS

Consider the user's available quantity, district, budget and
business experience.

Do not assume that the user owns machinery, land, transport,
processing facilities or existing buyer relationships.

Do not recommend expensive machinery as the first step to a
beginner without explaining the practical barriers.

Where possible, recommend small-scale investigation, existing
processors, shared facilities, potential partnerships or trials
before major investment.

Do not provide unsafe processing instructions. Flag the need
for qualified technical advice and relevant approvals where
necessary.

OUTPUT REQUIREMENTS

Return valid JSON only.

Do not include Markdown fences, introductions or text outside
the JSON object.

Use exactly this structure:

{
  "overallAssessment": "A practical assessment of the user's starting position.",
  "opportunities": [
    {
      "name": "Opportunity name",
      "description": "Description",
      "suitability": "Suitability for the user's situation",
      "requirements": ["Requirement 1", "Requirement 2"],
      "challenges": ["Challenge 1", "Challenge 2"],
      "firstSteps": ["Step 1", "Step 2"],
      "verificationQuestions": ["Question 1", "Question 2"],
      "evidenceStatus": "Evidence and remaining uncertainties",
      "startupComplexity": "Low",
      "resourceFit": "Strong",
      "budgetConsiderations": "Budget considerations",
      "comparisonReason": "Reason for considering this pathway"
    }
  ],
  "recommendedFirstStep": "One clear, practical next action."
}

Remember:
- Return exactly three opportunities.
- Keep the advice specific to the supplied resource.
- Do not fabricate evidence or financial figures.
- Use clear, simple English.
- Make recommendations exploratory, not guarantees.
`;

    const response = await generateWithRetry(ai, prompt);

    const responseText = response.text;

    if (!responseText) {
      throw new Error("The AI returned an empty response.");
    }

    const parsedResponse = parseJsonResponse(responseText);

    if (!isValidAnalysis(parsedResponse)) {
      throw new Error(
        "The AI response did not contain the required assessment structure."
      );
    }

    // Extract Google Search grounding information.
    const candidate = response.candidates?.[0] as
      | CandidateWithGrounding
      | undefined;

    const groundingMetadata =
      candidate?.groundingMetadata ?? {};

    const groundingChunks =
      groundingMetadata.groundingChunks ?? [];

    const webSources: WebSource[] = groundingChunks
      .filter(
        (chunk): chunk is GroundingChunk & {
          web: GroundingWebSource & { uri: string };
        } => Boolean(chunk.web?.uri)
      )
      .map((chunk) => ({
        title:
          chunk.web.title ||
          chunk.web.domain ||
          "Web research source",
        url: chunk.web.uri,
        domain: chunk.web.domain || "",
      }))
      .filter(
        (source, index, array) =>
          array.findIndex(
            (item) => item.url === source.url
          ) === index
      );

    const webSearchQueries =
      groundingMetadata.webSearchQueries ?? [];

    const searchEntryPoint =
      groundingMetadata.searchEntryPoint?.renderedContent ?? null;

    const groundingSupports =
      groundingMetadata.groundingSupports ?? [];

    return NextResponse.json({
      analysis: parsedResponse,
      sources: verifiedFacts,
      webSources,
      webSearchQueries,
      searchEntryPoint,
      groundingSupports,
      searchGrounded: webSources.length > 0,
    });
  } catch (error) {
    console.error("EcoNext analysis error:", error);

    if (isQuotaError(error)) {
      return NextResponse.json(
        {
          error:
            "EcoNext has reached its Gemini API usage limit. Please wait until your quota resets before trying again.",
        },
        { status: 429 }
      );
    }

    if (isRetryableError(error)) {
      return NextResponse.json(
        {
          error:
            "The AI service is temporarily busy. Please try again in a few minutes.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while analysing your resource.",
      },
      { status: 500 }
    );
  }
}
