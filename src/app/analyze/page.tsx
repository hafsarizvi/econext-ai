
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

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

type Source = {
  fact: string;
  source: string;
  url: string;
};

type WebSource = {
  title: string;
  url: string;
  domain: string;
};

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale",
  "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna",
  "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
  "Batticaloa", "Ampara", "Trincomalee", "Kurunegala",
  "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const inputClass =
  "w-full rounded-xl border border-[#dce5d8] bg-white px-4 py-3 text-sm text-[#344b37] outline-none transition focus:border-[#63865b] focus:ring-2 focus:ring-[#63865b]/10";

const VALIDATION_TASKS = [
  {
    title: "Identify at least 3 potential buyers",
    description:
      "Find businesses, processors or customers who may use this material.",
  },
  {
    title: "Confirm buyer requirements",
    description:
      "Ask about quality, quantity, moisture, preparation and acceptance conditions.",
  },
  {
    title: "Verify your available supply",
    description:
      "Confirm how much material you can collect consistently and its condition.",
  },
  {
    title: "Investigate transport and storage",
    description:
      "Identify collection arrangements, storage needs and delivery costs.",
  },
  {
    title: "Obtain actual cost estimates",
    description:
      "Check equipment, labour, processing, packaging and other relevant expenses.",
  },
  {
    title: "Conduct a small feasibility trial",
    description:
      "Test the pathway on a small scale before making a major investment.",
  },
];

function AssessmentBadge({
  value,
  kind,
}: {
  value?: string;
  kind: "complexity" | "fit";
}) {
  if (!value) {
    return (
      <span className="rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
        Not assessed
      </span>
    );
  }

  const normalised = value.toLowerCase();
  let colour = "bg-gray-100 text-gray-700";

  if (kind === "complexity") {
    if (normalised.includes("low")) {
      colour = "bg-green-100 text-green-800";
    } else if (normalised.includes("medium")) {
      colour = "bg-yellow-100 text-yellow-800";
    } else if (normalised.includes("high")) {
      colour = "bg-red-100 text-red-800";
    }
  } else {
    if (normalised.includes("strong")) {
      colour = "bg-green-100 text-green-800";
    } else if (normalised.includes("moderate")) {
      colour = "bg-yellow-100 text-yellow-800";
    } else if (normalised.includes("limited")) {
      colour = "bg-red-100 text-red-800";
    }
  }

  const shortValue = value.split(/[,.]/)[0].trim();

  return (
    <span
      title={value}
      className={`inline-flex max-w-full rounded-full px-3 py-2 text-xs font-semibold ${colour}`}
    >
      {shortValue}
    </span>
  );
}

function getBudgetAlignment(
  budget: string,
  complexity?: string
): string {
  const level = (complexity || "").toLowerCase();

  if (budget === "Not decided yet") {
    return "Budget not established";
  }

  if (level.includes("low")) {
    if (budget === "Below LKR 25,000") {
      return "Explore a low-cost trial";
    }

    return "Potentially manageable";
  }

  if (level.includes("medium")) {
    if (
      budget === "Below LKR 25,000" ||
      budget === "LKR 25,000–100,000"
    ) {
      return "Cost validation needed";
    }

    return "Potentially manageable, verify costs";
  }

  if (level.includes("high")) {
    if (
      budget === "Below LKR 25,000" ||
      budget === "LKR 25,000–100,000" ||
      budget === "LKR 100,000–500,000"
    ) {
      return "May require additional capital";
    }

    return "Detailed cost assessment needed";
  }

  return "Insufficient information";
}

function DetailSection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items?: string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div className="mt-6">
      <h5 className="text-sm font-bold text-[#365b3c]">
        {title}
      </h5>

      {items && items.length > 0 ? (
        <ListTag
          className={`mt-3 space-y-2 pl-5 text-sm leading-7 text-[#68776a] ${
            ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ListTag>
      ) : (
        <p className="mt-2 text-sm text-[#8a9688]">
          No additional information provided.
        </p>
      )}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#344b37]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AnalyzePage() {
  const SAMPLE_ANALYSIS: Analysis = {
    overallAssessment:
      "This is a demonstration assessment for 500 kg of coconut husks in Gampaha with a starting budget of LKR 25,000–100,000. Rather than investing immediately in machinery, a small-scale approach focused on collection, preparation and identifying potential buyers may be a more manageable starting point. The feasibility of each pathway depends on material quality, consistent supply, transport and local demand. This demonstration is illustrative and has not been generated by Gemini.",

    opportunities: [
      {
        name: "Coconut husk collection and supply",
        description:
          "Collect, sort and supply coconut husks to existing coir processors or other potential users. This pathway explores whether value can be created through organised sourcing and supply before investing in processing equipment.",
        suitability:
          "Potentially suitable as an exploratory starting point for someone with limited capital, provided a consistent supply and interested buyers can be identified.",
        requirements: [
          "Reliable access to coconut husks",
          "A suitable collection and temporary storage area",
          "Transport or collection arrangements",
          "Potential buyer contacts",
          "Basic weighing and record-keeping",
        ],
        challenges: [
          "Transport costs may affect feasibility",
          "Storage space and moisture management",
          "Finding buyers who accept the available material",
          "Competition from existing suppliers",
        ],
        firstSteps: [
          "Identify nearby coconut processing businesses.",
          "Contact potential buyers to ask about their material requirements.",
          "Estimate the quantity of husks available each week.",
          "Calculate collection and transport costs.",
          "Conduct a small trial supply before expanding.",
        ],
        verificationQuestions: [
          "Are there coconut processors within a practical transport distance?",
          "What quantity and quality of husks do potential buyers accept?",
          "Would buyers collect the material or require delivery?",
          "What price, if any, would buyers offer?",
        ],
        evidenceStatus:
          "Coconut husks are an established raw material for coir-related processing. The commercial feasibility of collecting and supplying husks in this location remains unverified.",
        startupComplexity: "Low",
        resourceFit: "Strong",
        budgetConsiderations:
          "A small trial may avoid major machinery costs, but transport, labour, storage and handling costs must be calculated.",
        comparisonReason:
          "Explores a supply-based approach that may require less processing infrastructure than manufacturing a finished product.",
      },
      {
        name: "Coco peat production",
        description:
          "Explore processing coconut husks into coco peat, a material used in growing media and horticultural applications. Processing typically involves fibre separation and further preparation of the material.",
        suitability:
          "Potentially relevant if the resource is available consistently and the user can access suitable processing equipment, technical guidance and prospective customers.",
        requirements: [
          "Coconut husks",
          "Suitable fibre separation and processing equipment",
          "Drying and preparation facilities",
          "Quality control",
          "Packaging and storage",
        ],
        challenges: [
          "Equipment and processing costs",
          "Product consistency",
          "Drying and storage requirements",
          "Competition and buyer specifications",
        ],
        firstSteps: [
          "Visit an existing coir or coco peat producer.",
          "Learn about the processing stages and equipment required.",
          "Investigate whether equipment can be rented or processing outsourced.",
          "Request product specifications from potential buyers.",
          "Prepare a basic cost estimate for a small trial.",
        ],
        verificationQuestions: [
          "Is suitable processing equipment accessible?",
          "What quality specifications do potential buyers require?",
          "What are the costs of processing and packaging?",
          "Can the available quantity support a consistent product?",
        ],
        evidenceStatus:
          "Coconut husks are used in coir processing and coco peat production. The required processing setup and local commercial feasibility need further investigation.",
        startupComplexity: "Medium",
        resourceFit: "Strong",
        budgetConsiderations:
          "The selected budget may be insufficient for independent processing equipment. Explore shared facilities, existing processors or small-scale trials.",
        comparisonReason:
          "Offers a processed product pathway but involves more technical requirements than simply supplying raw material.",
      },
      {
        name: "Coir-based products",
        description:
          "Investigate the production of simple coir-based products using coconut fibre, such as fibre-based growing products or other suitable products selected after researching customer requirements.",
        suitability:
          "May be worth exploring for someone interested in product development, provided suitable fibre can be sourced and production methods are accessible.",
        requirements: [
          "Prepared coir fibre",
          "Appropriate tools or moulds depending on product",
          "Product design and quality testing",
          "Packaging",
          "Potential customer feedback",
        ],
        challenges: [
          "Product development and consistency",
          "Finding a product customers actually want",
          "Production time and labour",
          "Packaging and distribution",
        ],
        firstSteps: [
          "Research existing coir products.",
          "Choose one simple product to investigate.",
          "Speak with potential customers about their requirements.",
          "Create a small prototype using accessible materials.",
          "Collect feedback before producing larger quantities.",
        ],
        verificationQuestions: [
          "Which coir products have identifiable potential customers?",
          "Can the required fibre and tools be accessed locally?",
          "What would customers expect in terms of quality and price?",
          "What are the estimated production costs per item?",
        ],
        evidenceStatus:
          "Coir is used in a range of fibre-based products. Specific product demand, production costs and customer acceptance have not been verified.",
        startupComplexity: "Medium",
        resourceFit: "Moderate",
        budgetConsiderations:
          "A prototype-led approach may help limit initial spending. Actual tooling, labour and material costs must be established.",
        comparisonReason:
          "Explores the possibility of a value-added product rather than selling raw material, but requires customer and product validation.",
      },
    ],

    recommendedFirstStep:
      "Start by contacting three existing coconut processors or potential buyers in your area. Ask what type of husks they accept, their minimum quantities, their collection arrangements and whether they are willing to consider a small trial. Record their answers and compare the transport costs before committing your budget.",
  };

  const SAMPLE_SOURCES: Source[] = [];

  const [resource, setResource] = useState("Coconut husks");
  const [district, setDistrict] = useState("");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("Below LKR 25,000");
  const [experience, setExperience] = useState("Beginner");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isSampleAnalysis, setIsSampleAnalysis] = useState(false);

  const [sources, setSources] = useState<Source[]>([]);
  const [webSources, setWebSources] = useState<WebSource[]>([]);
  const [webSearchQueries, setWebSearchQueries] = useState<string[]>([]);
  const [searchEntryPoint, setSearchEntryPoint] = useState<string | null>(null);
  const [searchGrounded, setSearchGrounded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setAnalysis(null);
    setIsSampleAnalysis(false);
    setSources([]);
    setWebSources([]);
    setWebSearchQueries([]);
    setSearchEntryPoint(null);
    setSearchGrounded(false);
    setCompletedTasks([]);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resource,
          district,
          quantity,
          budget,
          experience,
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setResource("Coconut husks");
        setDistrict("Gampaha");
        setQuantity("500 kg per month");
        setBudget("LKR 25,000–100,000");
        setExperience("Beginner");

        setAnalysis(SAMPLE_ANALYSIS);
        setIsSampleAnalysis(true);

        setSources(SAMPLE_SOURCES);
        setWebSources([]);
        setWebSearchQueries([]);
        setSearchEntryPoint(null);
        setSearchGrounded(false);
        setCompletedTasks([]);

        return;
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "We could not analyse your resource. Please try again."
        );
      }

      if (
        !data.analysis ||
        !Array.isArray(data.analysis.opportunities)
      ) {
        throw new Error("The analysis response was incomplete.");
      }

      setAnalysis(data.analysis);
      setIsSampleAnalysis(false);

      setSources(Array.isArray(data.sources) ? data.sources : []);
      setWebSources(
        Array.isArray(data.webSources) ? data.webSources : []
      );
      setWebSearchQueries(
        Array.isArray(data.webSearchQueries)
          ? data.webSearchQueries
          : []
      );
      setSearchEntryPoint(
        typeof data.searchEntryPoint === "string"
          ? data.searchEntryPoint
          : null
      );
      setSearchGrounded(data.searchGrounded === true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewAssessment() {
    setAnalysis(null);
    setIsSampleAnalysis(false);
    setSources([]);
    setWebSources([]);
    setWebSearchQueries([]);
    setSearchEntryPoint(null);
    setSearchGrounded(false);
    setCompletedTasks([]);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const verificationItems = analysis
    ? Array.from(
        new Set(
          analysis.opportunities.flatMap(
            (opportunity) =>
              opportunity.verificationQuestions || []
          )
        )
      )
    : [];

  return (
    <main className="min-h-screen bg-[#f7f9f5] text-[#263b2b]">
      <nav className="sticky top-0 z-30 border-b border-[#e3e9df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#365b3c]"
          >
            EcoNext
          </Link>

          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#557052] transition hover:bg-[#f0f5ed]"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center md:px-8 md:pt-16">
        <span className="inline-flex rounded-full bg-[#e7efe3] px-4 py-2 text-xs font-semibold tracking-wider text-[#52764c]">
          RESOURCE-TO-VENTURE INTELLIGENCE
        </span>

        <h1 className="mt-7 text-4xl font-bold tracking-tight text-[#294832] md:text-5xl">
          Discover what your resources can become.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#68776a]">
          Explore practical opportunities for underutilised agricultural
          by-products. Understand possible pathways, requirements,
          challenges and the steps to take before investing.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <div className="rounded-2xl border border-[#dce8d7] bg-[#eef4ea] p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-[#31543a]">
                New to EcoNext?
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#69776a]">
                Explore an example assessment without using AI or entering
                your own information.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setResource("Coconut husks");
                setDistrict("Gampaha");
                setQuantity("500 kg per month");
                setBudget("LKR 25,000–100,000");
                setExperience("Beginner");

                setAnalysis(SAMPLE_ANALYSIS);
                setIsSampleAnalysis(true);

                setSources(SAMPLE_SOURCES);
                setWebSources([]);
                setWebSearchQueries([]);
                setSearchEntryPoint(null);
                setSearchGrounded(false);
                setCompletedTasks([]);
                setError("");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

                setTimeout(() => {
                  document
                    .getElementById("analysis-results")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }, 400);
              }}
              className="shrink-0 rounded-xl border border-[#78916f] bg-white px-5 py-3 text-sm font-semibold text-[#426b45] transition hover:bg-[#e1ebdc]"
            >
              Explore a Sample Analysis
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <div className="rounded-3xl border border-[#e4eae0] bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              RESOURCE DETAILS
            </span>

            <h2 className="mt-2 text-2xl font-bold text-[#31543a]">
              Tell us about your resource
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#788579]">
              Your answers help EcoNext explore opportunities that
              reflect your available resources and starting position.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="1. What resource do you have?">
              <select
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                className={inputClass}
                required
              >
                <option value="Coconut husks">Coconut husks</option>
                <option value="Rice husks">Rice husks</option>
              </select>

              <p className="mt-2 text-xs text-[#849084]">
                Currently supported resources with researched information.
                More resources will be added as the knowledge base expands.
              </p>
            </FormField>

            <FormField label="2. Where is your resource located?">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select your district</option>
                {DISTRICTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="3. How much resource do you have?">
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 500 coconut husks per month"
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-[#849084]">
                Include the approximate quantity and time period.
                Specify units such as kg, bags or individual items.
              </p>
            </FormField>

            <FormField label="4. What is your starting budget?">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={inputClass}
                required
              >
                <option>Below LKR 25,000</option>
                <option>LKR 25,000–100,000</option>
                <option>LKR 100,000–500,000</option>
                <option>Above LKR 500,000</option>
                <option>Not decided yet</option>
              </select>
            </FormField>

            <FormField label="5. What is your business experience?">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={inputClass}
                required
              >
                <option>Beginner</option>
                <option>Some business experience</option>
                <option>Experienced entrepreneur</option>
                <option>Existing business owner</option>
              </select>
            </FormField>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#426b45] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#315638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Analysing your resource..."
                : "Explore Opportunities"}
            </button>

            <p className="text-center text-xs leading-5 text-[#8a9688]">
              EcoNext provides exploratory recommendations. Verify
              costs, technical requirements and local market conditions
              before making an investment.
            </p>
          </form>
        </div>
      </section>

      {loading && (
        <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
          <div className="rounded-2xl border border-[#dfe9da] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#d9e5d3] border-t-[#426b45]" />

            <h3 className="font-semibold text-[#365b3c]">
              Exploring your opportunities
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#738272]">
              EcoNext is reviewing your resource information and
              identifying potential pathways.
            </p>

            <p className="mt-4 text-xs text-[#9aa397]">
              This may take a little time.
            </p>
          </div>
        </section>
      )}

      {analysis && !loading && (
        <section
          id="analysis-results"
          className="mx-auto max-w-7xl px-5 pb-20 md:px-8"
        >
          {isSampleAnalysis && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-800">
                Demonstration assessment
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-700">
                This is a preset demonstration using 500 kg of coconut
                husks in Gampaha and a budget of LKR 25,000–100,000.
                Your submitted details were not analysed by Gemini.
                This example is not a verified feasibility study.
                Research, costs, buyers and local conditions must be
                independently checked.
              </p>
            </div>
          )}

          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#78916f]">
                YOUR ECO NEXT ASSESSMENT
              </span>

              <h2 className="mt-2 text-3xl font-bold text-[#294832]">
                Your opportunities
              </h2>

              <p className="mt-2 text-sm text-[#778477]">
                {isSampleAnalysis
                  ? "A preset example to demonstrate EcoNext's results."
                  : "Potential pathways based on the information you provided."}
              </p>
            </div>

            <button
              type="button"
              onClick={startNewAssessment}
              className="w-fit rounded-xl border border-[#b9cbb4] px-5 py-3 text-sm font-semibold text-[#426b45] transition hover:bg-[#eaf1e5]"
            >
              New assessment
            </button>
          </div>

          <div className="mb-8 grid gap-3 rounded-2xl border border-[#e2e9df] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Resource", value: resource },
              { label: "District", value: district },
              { label: "Available quantity", value: quantity },
              { label: "Starting budget", value: budget },
              { label: "Experience", value: experience },
            ].map((item) => (
              <div key={item.label} className="min-w-0">
                <p className="text-xs font-medium text-[#879384]">
                  {item.label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-[#365b3c]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-10 overflow-hidden rounded-3xl border border-[#dfe9da] bg-[#eaf1e5] p-6 md:p-9">
            <span className="text-xs font-bold tracking-widest text-[#55794f]">
              OVERALL RESOURCE ASSESSMENT
            </span>

            <h3 className="mt-3 text-2xl font-bold text-[#294832]">
              Understanding your starting position
            </h3>

            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#536853] md:text-base">
              {analysis.overallAssessment}
            </p>
          </div>

          {!isSampleAnalysis && (
            <div className="mb-12 overflow-hidden rounded-2xl border border-[#dce8d7] bg-white">
              <div className="border-b border-[#e5ebe1] bg-[#f5f8f2] p-6">
                <span className="text-xs font-bold tracking-widest text-[#78916f]">
                  LIVE WEB RESEARCH
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
                  Research discovered through Google Search
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#778477]">
                  These are the web sources returned by Gemini during
                  this assessment. They are separate from the research
                  references already stored in EcoNext&apos;s knowledge base.
                </p>
              </div>

              <div className="p-6">
                {searchGrounded && webSources.length > 0 ? (
                  <>
                    <div className="mb-5 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <p className="text-sm font-semibold text-[#426b45]">
                        Google Search sources returned
                      </p>
                    </div>

                    <div className="space-y-4">
                      {webSources.map((source, index) => (
                        <article
                          key={`${source.url}-${index}`}
                          className="rounded-xl border border-[#e5ebe1] bg-[#fafbf9] p-5"
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-[#78916f]">
                            Web source {index + 1}
                          </p>

                          <h4 className="mt-2 break-words text-sm font-bold text-[#365b3c]">
                            {source.title}
                          </h4>

                          {source.domain && (
                            <p className="mt-1 text-xs text-[#879384]">
                              {source.domain}
                            </p>
                          )}

                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#527b4d] underline underline-offset-4 hover:text-[#294832]"
                          >
                            Open web source
                            <span aria-hidden="true">↗</span>
                          </a>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl bg-[#f6f8f4] p-5">
                    <p className="text-sm font-semibold text-[#536853]">
                      No Google Search sources were returned.
                    </p>

                    <p className="mt-2 text-sm leading-7 text-[#778477]">
                      This assessment may still use EcoNext&apos;s
                      existing research knowledge base. No live web
                      sources are being presented for this result.
                    </p>
                  </div>
                )}

                {webSearchQueries.length > 0 && (
                  <div className="mt-7 border-t border-[#edf0ea] pt-5">
                    <h4 className="text-sm font-bold text-[#365b3c]">
                      Search queries used
                    </h4>

                    <ul className="mt-3 space-y-2">
                      {webSearchQueries.map((query, index) => (
                        <li
                          key={index}
                          className="rounded-lg bg-[#f6f8f4] px-4 py-3 text-sm text-[#69776a]"
                        >
                          {query}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {searchEntryPoint && (
                  <div className="mt-6 border-t border-[#edf0ea] pt-5">
                    <div
                      className="text-sm text-[#69776a]"
                      dangerouslySetInnerHTML={{
                        __html: searchEntryPoint,
                      }}
                    />
                  </div>
                )}

                <p className="mt-6 border-t border-[#edf0ea] pt-5 text-xs leading-6 text-[#879184]">
                  Search results are references for further investigation.
                  Their inclusion does not mean that their claims have
                  been independently verified by EcoNext.
                </p>
              </div>
            </div>
          )}

          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-bold tracking-widest text-[#78916f]">
                HOW TO READ YOUR RESULTS
              </span>

              <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
                Three layers of information
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#778477]">
                EcoNext separates background research, potential
                opportunities and conditions that still need to be
                checked locally.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <article className="rounded-2xl border border-[#dce8d7] bg-white p-6">
                <span className="text-xs font-bold tracking-wider text-[#52764c]">
                  01 / RESEARCH
                </span>

                <h4 className="mt-3 text-lg font-bold text-[#31543a]">
                  {isSampleAnalysis
                    ? "Background information"
                    : "Research-backed information"}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#69776a]">
                  {isSampleAnalysis
                    ? "EcoNext's knowledge base is designed to provide background information about material applications. This demonstration does not include live research references or independently verified local findings."
                    : "Information drawn from the research sources in EcoNext's knowledge base. These findings support material applications, but do not prove that a business will succeed locally."}
                </p>
              </article>

              <article className="rounded-2xl border border-[#dce8d7] bg-white p-6">
                <span className="text-xs font-bold tracking-wider text-[#52764c]">
                  02 / {isSampleAnalysis ? "DEMONSTRATION" : "AI EXPLORATION"}
                </span>

                <h4 className="mt-3 text-lg font-bold text-[#31543a]">
                  {isSampleAnalysis
                    ? "Example opportunities"
                    : "AI-generated opportunities"}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#69776a]">
                  {isSampleAnalysis
                    ? "Pre-prepared example pathways that demonstrate how EcoNext can explore possible uses for an agricultural by-product. They are not generated from your submitted information."
                    : "Potential business pathways generated by Gemini using your resource details, available budget, experience and the supplied research."}
                </p>
              </article>

              <article className="rounded-2xl border border-[#dce8d7] bg-white p-6">
                <span className="text-xs font-bold tracking-wider text-[#52764c]">
                  03 / LOCAL CHECKS
                </span>

                <h4 className="mt-3 text-lg font-bold text-[#31543a]">
                  Local verification
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#69776a]">
                  Practical conditions that still need investigation,
                  such as buyers, supply, transport, equipment,
                  costs and local demand.
                </p>
              </article>
            </div>
          </div>

          {/* UPDATED DECISION MATRIX */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#dfe8da] bg-white">
            <div className="border-b border-[#e5ebe1] bg-[#f5f8f2] p-5">
              <span className="text-xs font-bold tracking-widest text-[#78916f]">
                PATHWAY COMPARISON
              </span>

              <h4 className="mt-2 text-lg font-bold text-[#31543a]">
                Decision matrix
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#778477]">
                Compare the resource fit, complexity, budget considerations
                and evidence status of each potential pathway.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              {analysis.opportunities.map((opportunity, index) => (
                <article
                  key={`matrix-${index}`}
                  className="rounded-xl border border-[#e5ebe1] bg-white p-5"
                >
                  <span className="text-xs font-bold tracking-widest text-[#78916f]">
                    PATHWAY {index + 1}
                  </span>

                  <h5 className="mt-2 break-words font-bold leading-6 text-[#31543a]">
                    {opportunity.name}
                  </h5>

                  <div className="mt-5 space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-[#879384]">
                        Resource suitability
                      </p>
                      <div className="mt-2">
                        <AssessmentBadge
                          value={opportunity.resourceFit}
                          kind="fit"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#879384]">
                        Startup complexity
                      </p>
                      <div className="mt-2">
                        <AssessmentBadge
                          value={opportunity.startupComplexity}
                          kind="complexity"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#879384]">
                        Budget alignment
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#536853]">
                        {getBudgetAlignment(
                          budget,
                          opportunity.startupComplexity
                        )}
                      </p>
                    </div>

                    <div className="border-t border-[#e8ede5] pt-4">
                      <p className="text-xs font-semibold text-[#879384]">
                        Main budget consideration
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#69776a]">
                        {opportunity.budgetConsiderations ||
                          "Further budget assessment is required."}
                      </p>
                    </div>

                    <div className="border-t border-[#e8ede5] pt-4">
                      <p className="text-xs font-semibold text-[#879384]">
                        Evidence status
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#69776a]">
                        {opportunity.evidenceStatus ||
                          "Further evidence verification is required."}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-[#e5ebe1] bg-[#fafbf9] p-4">
              <p className="text-xs leading-6 text-[#778477]">
                Budget alignment is a preliminary heuristic based on the
                selected budget range and estimated startup complexity.
                Evidence status describes the information available for
                each pathway. Neither establishes commercial feasibility,
                profitability or guaranteed market demand.
              </p>
            </div>
          </div>

          <div className="mb-14 mt-12 rounded-2xl border border-[#e2e9df] bg-white p-6 md:p-8">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              KNOWLEDGE BASE EVIDENCE
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
              What the research supports
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#778477]">
              {isSampleAnalysis
                ? "EcoNext's resource knowledge base is intended to provide background information about material applications. This pre-prepared demonstration does not include live source references or independently verified local commercial findings."
                : "These are the facts supplied to the AI from EcoNext's resource knowledge base. They provide the research foundation for exploring possible applications."}
            </p>

            {sources.length > 0 ? (
              <div className="mt-7 space-y-5">
                {sources.map((source, index) => (
                  <article
                    key={`${source.source}-${index}`}
                    className="rounded-xl bg-[#f6f8f4] p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-[#587553]">
                      Research reference {index + 1}
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#365b3c]">
                      {source.source}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-[#69776a]">
                      {source.fact}
                    </p>

                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#527b4d] underline underline-offset-4 hover:text-[#294832]"
                      >
                        View research reference
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-[#f6f8f4] p-4 text-sm text-[#8a9688]">
                {isSampleAnalysis
                  ? "No source references are included in this pre-prepared demonstration."
                  : "No source references were returned for this assessment."}
              </p>
            )}

            <p className="mt-6 border-t border-[#edf0ea] pt-5 text-xs leading-6 text-[#879184]">
              Research support applies to the material applications
              described in the sources. It does not establish local
              buyer demand, investment requirements, profitability
              or commercial feasibility.
            </p>
          </div>

          <div className="mb-7">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              {isSampleAnalysis
                ? "DEMONSTRATION EXPLORATION"
                : "AI-GENERATED EXPLORATION"}
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
              Potential opportunities
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#778477]">
              {isSampleAnalysis
                ? "These pre-prepared examples demonstrate how EcoNext presents potential business pathways. They are not generated from your submitted information."
                : "Gemini has generated these suggestions using your information and EcoNext's research knowledge base. They are ideas to investigate, not verified business opportunities or guarantees of income."}
            </p>
          </div>

          <div className="mb-14">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-[#31543a]">
                Compare the pathways
              </h4>

              <p className="mt-2 text-sm leading-6 text-[#778477]">
                Compare the practical considerations of each
                {isSampleAnalysis ? " demonstration pathway." : " suggested pathway."}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {analysis.opportunities.map((opportunity, index) => (
                <article
                  key={`${opportunity.name}-${index}`}
                  className="flex flex-col rounded-2xl border border-[#e2e9df] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-bold tracking-widest text-[#78916f]">
                    {isSampleAnalysis
                      ? `DEMONSTRATION ${index + 1}`
                      : `SUGGESTION ${index + 1}`}
                  </span>

                  <h4 className="mt-4 text-xl font-bold leading-7 text-[#31543a]">
                    {opportunity.name}
                  </h4>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#f6f8f4] p-3">
                      <p className="text-xs font-semibold text-[#71806f]">
                        Resource fit
                      </p>

                      <div className="mt-2">
                        <AssessmentBadge
                          value={opportunity.resourceFit}
                          kind="fit"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#f6f8f4] p-3">
                      <p className="text-xs font-semibold text-[#71806f]">
                        Startup complexity
                      </p>

                      <div className="mt-2">
                        <AssessmentBadge
                          value={opportunity.startupComplexity}
                          kind="complexity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#e8ede5] pt-4">
                    <h5 className="text-sm font-bold text-[#365b3c]">
                      Budget considerations
                    </h5>

                    <p className="mt-2 text-sm leading-7 text-[#69776a]">
                      {opportunity.budgetConsiderations ||
                        "Further budget assessment is required."}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#e8ede5] pt-4">
                    <h5 className="text-sm font-bold text-[#365b3c]">
                      Why consider this?
                    </h5>

                    <p className="mt-2 text-sm leading-7 text-[#69776a]">
                      {opportunity.comparisonReason ||
                        "Further comparison is required."}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-[#e5ebe1] bg-[#f1f5ee] p-4">
              <p className="text-xs leading-6 text-[#687968]">
                <strong>Understanding the indicators:</strong> Strong,
                Moderate and Limited describe resource fit. Low, Medium
                and High describe startup complexity. These are
                indicative assessments, not independently verified
                ratings.
              </p>
            </div>
          </div>

          <div className="mb-7">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              PRACTICAL EXPLORATION
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
              Explore each opportunity
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#778477]">
              Understand what each suggested pathway involves
              before deciding whether to pursue it.
            </p>
          </div>

          <div className="space-y-6">
            {analysis.opportunities.map((opportunity, index) => (
              <article
                key={`${opportunity.name}-details-${index}`}
                className="overflow-hidden rounded-2xl border border-[#e2e9df] bg-white shadow-sm"
              >
                <div className="border-b border-[#e8ede5] bg-[#f5f8f2] p-6 md:p-7">
                  <span className="text-xs font-bold tracking-widest text-[#78916f]">
                    {isSampleAnalysis
                      ? `DEMONSTRATION PATHWAY ${index + 1}`
                      : `AI SUGGESTION ${index + 1}`}
                  </span>

                  <h4 className="mt-2 text-2xl font-bold text-[#31543a]">
                    {opportunity.name}
                  </h4>

                  <p className="mt-3 max-w-4xl text-sm leading-7 text-[#69776a]">
                    {opportunity.description}
                  </p>
                </div>

                <div className="grid gap-7 p-6 md:grid-cols-2 md:p-7">
                  <div>
                    <div className="rounded-xl bg-[#eef4ea] p-5">
                      <h5 className="text-sm font-bold text-[#416443]">
                        Suitability for your situation
                      </h5>

                      <p className="mt-2 text-sm leading-7 text-[#617261]">
                        {opportunity.suitability}
                      </p>
                    </div>

                    <DetailSection
                      title="What you may need"
                      items={opportunity.requirements}
                    />

                    <DetailSection
                      title="Challenges to consider"
                      items={opportunity.challenges}
                    />
                  </div>

                  <div>
                    <DetailSection
                      title="Your practical first steps"
                      items={opportunity.firstSteps}
                      ordered
                    />

                    <DetailSection
                      title="Questions to verify before investing"
                      items={opportunity.verificationQuestions}
                    />

                    <div className="mt-7 rounded-xl border border-[#e5ebe1] bg-[#f8faf6] p-5">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#587553]">
                        Evidence status
                      </h5>

                      <p className="mt-3 text-sm leading-7 text-[#69776a]">
                        {opportunity.evidenceStatus ||
                          "The supporting evidence for this pathway requires further verification."}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-[#e2e9df] bg-white p-6 md:p-9">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              BEFORE YOU INVEST
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
              What needs local verification?
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#778477]">
              Research and AI suggestions cannot confirm the conditions
              in your area. Use these questions as a starting point
              for local investigation.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-[#f6f8f4] p-5">
                <h4 className="text-sm font-bold text-[#365b3c]">
                  {isSampleAnalysis
                    ? "Demonstration verification questions"
                    : "Questions generated for your pathways"}
                </h4>

                {verificationItems.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {verificationItems.map((question, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-7 text-[#69776a]"
                      >
                        <span className="font-bold text-[#78916f]">
                          {index + 1}.
                        </span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-[#8a9688]">
                    No additional questions were provided.
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-[#f6f8f4] p-5">
                <h4 className="text-sm font-bold text-[#365b3c]">
                  Practical checks to complete
                </h4>

                <ul className="mt-4 space-y-3 text-sm leading-7 text-[#69776a]">
                  <li>
                    <strong>Buyers:</strong> Identify potential buyers
                    and confirm whether they accept your material.
                  </li>
                  <li>
                    <strong>Supply:</strong> Check whether your resource
                    is available consistently and in usable condition.
                  </li>
                  <li>
                    <strong>Transport:</strong> Investigate collection,
                    storage and delivery arrangements.
                  </li>
                  <li>
                    <strong>Costs:</strong> Obtain actual quotations
                    for equipment, labour, packaging and transport.
                  </li>
                  <li>
                    <strong>Technical needs:</strong> Confirm processing
                    requirements with qualified practitioners.
                  </li>
                  <li>
                    <strong>Regulations:</strong> Check relevant
                    approvals and safety requirements before operating.
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 border-t border-[#edf0ea] pt-5 text-xs leading-6 text-[#879184]">
              These are investigation prompts, not findings about
              the availability of buyers, facilities or services
              in your district.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-[#dfe8da] bg-white p-6 md:p-9">
            <span className="text-xs font-bold tracking-widest text-[#78916f]">
              ACTION PLANNER
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#31543a]">
              Your local validation plan
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#778477]">
              Turn your potential opportunities into practical research.
              Complete these tasks to investigate whether an opportunity
              is viable in your area.
            </p>

            <div className="mt-7 rounded-2xl bg-[#f3f7f0] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#365b3c]">
                    Validation progress
                  </p>

                  <p className="mt-1 text-xs text-[#788579]">
                    {completedTasks.length} of {VALIDATION_TASKS.length} tasks completed
                  </p>
                </div>

                <span className="text-xl font-bold text-[#426b45]">
                  {Math.round(
                    (completedTasks.length / VALIDATION_TASKS.length) * 100
                  )}
                  %
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dfe8da]">
                <div
                  className="h-full rounded-full bg-[#63865b] transition-all duration-300"
                  style={{
                    width: `${(completedTasks.length / VALIDATION_TASKS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {VALIDATION_TASKS.map((task, index) => {
                const isCompleted = completedTasks.includes(index);

                return (
                  <label
                    key={index}
                    className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition ${
                      isCompleted
                        ? "border-[#cbdcc5] bg-[#f0f6ed]"
                        : "border-[#e5ebe1] bg-white hover:bg-[#f8faf6]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => {
                        setCompletedTasks((previous) =>
                          isCompleted
                            ? previous.filter((item) => item !== index)
                            : [...previous, index]
                        );
                      }}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#426b45]"
                    />

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isCompleted
                            ? "text-[#587553]"
                            : "text-[#365b3c]"
                        }`}
                      >
                        {task.title}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#778477]">
                        {task.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setCompletedTasks([])}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#71806f] transition hover:bg-[#f1f5ee]"
              >
                Reset checklist
              </button>
            </div>

            {completedTasks.length === VALIDATION_TASKS.length && (
              <div className="mt-5 rounded-xl border border-[#cbdcc5] bg-[#eef5ea] p-4">
                <p className="text-sm font-bold text-[#426b45]">
                  All validation tasks completed!
                </p>

                <p className="mt-1 text-sm leading-6 text-[#687968]">
                  You have completed this checklist. Review the evidence
                  you gathered before making any investment decisions.
                </p>
              </div>
            )}

            <p className="mt-5 text-xs leading-6 text-[#899487]">
              Checklist progress is temporary and will reset when the
              page is refreshed. Completing these tasks does not
              automatically confirm business feasibility.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-[#31543a] p-7 text-white md:p-9">
            <span className="text-xs font-bold tracking-widest text-[#c6d9bc]">
              YOUR NEXT MOVE
            </span>

            <h3 className="mt-3 text-2xl font-bold">
              Recommended first step
            </h3>

            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#e1ebdd] md:text-base">
              {analysis.recommendedFirstStep}
            </p>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={startNewAssessment}
              className="rounded-xl border border-[#b9cbb4] px-7 py-3 text-sm font-semibold text-[#426b45] transition hover:bg-[#eaf1e5]"
            >
              Start a new assessment
            </button>
          </div>
        </section>
      )}

      <footer className="border-t border-[#e3e9df] bg-white px-5 py-8 text-center">
        <Link
          href="/"
          className="text-lg font-bold text-[#365b3c]"
        >
          EcoNext
        </Link>

        <p className="mt-2 text-sm text-[#829080]">
          Turning underutilised resources into greener opportunities.
        </p>

        <p className="mt-3 text-xs text-[#a0a99e]">
          Research-informed exploration for resource owners and
          aspiring entrepreneurs.
        </p>
      </footer>
    </main>
  );
}
