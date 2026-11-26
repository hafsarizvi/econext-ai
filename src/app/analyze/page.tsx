
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  SAMPLE_ANALYSIS,
  SAMPLE_PROFILE,
  SAMPLE_SOURCES,
  RICE_SAMPLE_ANALYSIS,
  RICE_SAMPLE_PROFILE,
  RICE_SAMPLE_SOURCES,
  type Analysis,
  type Source,
} from "@/data/sampleAnalysis";

type SubmittedDetails = {
  resource: string;
  district: string;
  quantity: string;
  budget: string;
  experience: string;
};

type SampleProfile = {
  resource: string;
  district: string;
  quantity: string;
  budget: string;
  experience: string;
};

type ApiResponse = {
  analysis?: Analysis;
  sources?: Source[];
  sampleProfile?: SampleProfile;
  submittedDetails?: SubmittedDetails;
  isSample?: boolean;
  error?: string;
  message?: string;
  webSources?: unknown[];
  webSearchQueries?: string[];
  searchEntryPoint?: string | null;
  searchGrounded?: boolean;
};

type Opportunity = Analysis["opportunities"][number];

const DISTRICTS = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const RESOURCES = [
  "Coconut husks",
  "Rice husks",
  "Coconut shells",
  "Paddy straw",
  "Fruit and vegetable waste",
  "Tea waste",
  "Other agricultural resource",
];

const BUDGETS = [
  "Below LKR 25,000",
  "LKR 25,000–100,000",
  "LKR 100,000–500,000",
  "Above LKR 500,000",
  "Not decided yet",
];

const EXPERIENCE_LEVELS = [
  "Beginner",
  "Some business experience",
  "Experienced entrepreneur",
  "Existing business owner",
];

function formatKg(value: number): string {
  return `${new Intl.NumberFormat("en-LK", {
    maximumFractionDigits: 1,
  }).format(value)} kg`;
}

function getMonthlyQuantity(value: string): number | null {
  const match = value
    .trim()
    .match(
      /^([\d,.]+)\s*(kg|kilograms?|g|grams?|tonnes?|tons?)?\s*(per\s*)?(day|daily|week|weekly|month|monthly|year|yearly)?$/i,
    );

  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const unit = (match[2] || "kg").toLowerCase();
  const period = (match[4] || "month").toLowerCase();

  let kilograms = amount;

  if (unit === "g" || unit.startsWith("gram")) {
    kilograms = amount / 1000;
  }

  if (unit.startsWith("ton")) {
    kilograms = amount * 1000;
  }

  if (period === "day" || period === "daily") {
    return kilograms * 30;
  }

  if (period === "week" || period === "weekly") {
    return kilograms * 4.33;
  }

  if (period === "year" || period === "yearly") {
    return kilograms / 12;
  }

  return kilograms;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 ${className}`}
    >
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>

      {children}

      {hint && (
        <span className="mt-1.5 block text-xs text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-slate-900">{title}</h4>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex gap-2 text-sm leading-6 text-slate-600"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpportunityCard({
  opportunity,
  index,
}: {
  opportunity: Opportunity;
  index: number;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">
          {index + 1}
        </span>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {opportunity.name}
          </h3>

          {opportunity.suitability && (
            <p className="mt-1 text-sm font-medium text-emerald-700">
              {opportunity.suitability}
            </p>
          )}
        </div>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-600">
        {opportunity.description}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <DetailList title="Requirements" items={opportunity.requirements} />
        <DetailList
          title="Potential challenges"
          items={opportunity.challenges}
        />
        <DetailList
          title="Suggested first steps"
          items={opportunity.firstSteps}
        />
        <DetailList
          title="Questions to verify locally"
          items={opportunity.verificationQuestions}
        />
      </div>

      {(opportunity.startupComplexity ||
        opportunity.resourceFit ||
        opportunity.budgetConsiderations ||
        opportunity.comparisonReason) && (
        <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
          {opportunity.startupComplexity && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Startup complexity
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {opportunity.startupComplexity}
              </p>
            </div>
          )}

          {opportunity.resourceFit && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Resource fit
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {opportunity.resourceFit}
              </p>
            </div>
          )}

          {opportunity.budgetConsiderations && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Budget considerations
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {opportunity.budgetConsiderations}
              </p>
            </div>
          )}

          {opportunity.comparisonReason && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Comparison
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {opportunity.comparisonReason}
              </p>
            </div>
          )}
        </div>
      )}

      {opportunity.evidenceStatus && (
        <div className="mt-5 rounded-xl bg-amber-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
            Evidence status
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-900">
            {opportunity.evidenceStatus}
          </p>
        </div>
      )}
    </article>
  );
}

function getSourceValue(source: Source, keys: string[]): string {
  const record = source as unknown as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return "";
}

export default function AnalyzePage() {
  const [resource, setResource] = useState("Coconut husks");
  const [customResource, setCustomResource] = useState("");
  const [district, setDistrict] = useState("Gampaha");
  const [quantity, setQuantity] = useState("500 kg per month");
  const [budget, setBudget] = useState("LKR 25,000–100,000");
  const [experience, setExperience] = useState("Beginner");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [sources, setSources] = useState<Source[]>([]);

  const [submittedDetails, setSubmittedDetails] =
    useState<SubmittedDetails | null>(null);

  const [sampleProfile, setSampleProfile] =
    useState<SampleProfile | null>(null);

  const [isSampleAnalysis, setIsSampleAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [recoveryRate, setRecoveryRate] = useState(50);

  const selectedResource =
    resource === "Other agricultural resource"
      ? customResource.trim()
      : resource;

  const currentDetails: SubmittedDetails = {
    resource: selectedResource,
    district,
    quantity,
    budget,
    experience,
  };

  const displayedDetails = isSampleAnalysis
    ? sampleProfile
    : submittedDetails;

  const quantityInKg = isSampleAnalysis
    ? getMonthlyQuantity(
        String(sampleProfile?.quantity ?? SAMPLE_PROFILE.quantity),
      )
    : submittedDetails
      ? getMonthlyQuantity(submittedDetails.quantity)
      : null;

  const recoveredKg =
    quantityInKg === null
      ? null
      : (quantityInKg * recoveryRate) / 100;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selectedResource) {
      setError("Please enter the agricultural resource you want to explore.");
      return;
    }

    if (!quantity.trim()) {
      setError("Please enter an estimated quantity.");
      return;
    }

    // Rice husks use the prepared demonstration instead of Gemini.
    if (selectedResource === "Rice husks") {
      loadRiceSampleAnalysis();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentDetails,
          mode: "ai",
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "The analysis could not be completed.",
        );
      }

      if (
        !data.analysis ||
        !Array.isArray(data.analysis.opportunities)
      ) {
        throw new Error("The response did not contain a valid analysis.");
      }

      setAnalysis(data.analysis);
      setSources(data.sources || []);
      setSubmittedDetails(data.submittedDetails || currentDetails);
      setSampleProfile(null);
      setIsSampleAnalysis(false);
      setCompletedTasks([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function loadSampleAnalysis() {
    setAnalysis(SAMPLE_ANALYSIS);
    setSources(SAMPLE_SOURCES);
    setSubmittedDetails(null);
    setSampleProfile(SAMPLE_PROFILE);
    setIsSampleAnalysis(true);
    setCompletedTasks([]);
    setError("");
  }

  function loadRiceSampleAnalysis() {
    setAnalysis(RICE_SAMPLE_ANALYSIS);
    setSources(RICE_SAMPLE_SOURCES);
    setSubmittedDetails(null);
    setSampleProfile(RICE_SAMPLE_PROFILE);
    setIsSampleAnalysis(true);
    setCompletedTasks([]);
    setError("");
  }

  function startNewAssessment() {
    setAnalysis(null);
    setSources([]);
    setSubmittedDetails(null);
    setSampleProfile(null);
    setIsSampleAnalysis(false);
    setCompletedTasks([]);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTask(task: string) {
    setCompletedTasks((previous) =>
      previous.includes(task)
        ? previous.filter((item) => item !== task)
        : [...previous, task],
    );
  }

  const actionTasks = [
    "Speak with at least three potential resource suppliers.",
    "Check the quality and consistency of the available raw material.",
    "Identify possible local buyers and interview them.",
    "Request equipment and processing cost estimates.",
    "Check relevant permits, standards and safety requirements.",
    "Run a small practical trial before investing.",
  ];

  return (
    <main className="min-h-screen bg-[#f6f8f5] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              EcoNext
            </span>

            <span className="text-xs text-slate-500">
              Sri Lankan resource exploration
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Turn underused resources into new possibilities.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Explore potential uses for agricultural resources, understand what
            needs to be verified, and identify practical next steps before
            making an investment.
          </p>
        </header>

        {!analysis && (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <Panel>
              <SectionHeading
                eyebrow="Resource assessment"
                title="Tell us about your resource"
                description="Enter the details below to receive an exploratory assessment. Coconut husks use the Gemini AI integration. Rice husks currently use a prepared research-informed demonstration."
              />

              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="What resource do you have?">
                  <select
                    value={resource}
                    onChange={(event) => setResource(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    {RESOURCES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                {resource === "Other agricultural resource" && (
                  <Field label="Describe your resource">
                    <input
                      value={customResource}
                      onChange={(event) =>
                        setCustomResource(event.target.value)
                      }
                      placeholder="Enter the resource name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </Field>
                )}

                <Field label="District">
                  <select
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    {DISTRICTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="How much resource is available?"
                  hint="Examples: 500 kg per month, 20 kg per day, or 2 tonnes per week."
                >
                  <input
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    placeholder="e.g. 500 kg per month"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>

                <Field label="What is your approximate starting budget?">
                  <select
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    {BUDGETS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="What is your business experience?">
                  <select
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  >
                    {EXPERIENCE_LEVELS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-800 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Preparing your AI assessment..."
                    : resource === "Rice husks"
                      ? "View prepared Rice husks assessment"
                      : "Explore with AI"}
                </button>

                {resource === "Rice husks" && (
                  <p className="text-xs leading-5 text-slate-500">
                    Rice husks currently open a prepared demonstration based
                    on stored research references. The details entered above
                    do not personalise this sample.
                  </p>
                )}
              </form>
            </Panel>

            <div className="space-y-6">
              <div className="rounded-2xl bg-[#183d2b] p-6 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                  How EcoNext works
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Explore before you invest.
                </h2>

                <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                  EcoNext helps you investigate possible resource uses,
                  practical requirements, challenges and questions to take to
                  local experts.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    ["01", "Describe your resource"],
                    ["02", "Explore potential opportunities"],
                    ["03", "Verify local conditions"],
                    ["04", "Plan a small first step"],
                  ].map(([number, label]) => (
                    <div key={number} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-emerald-200">
                        {number}
                      </span>

                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Panel>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Prefer to explore a demonstration?
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Try a prepared sample
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore the prepared Coconut husks and Rice husks
                  demonstrations. These examples do not use the details in
                  the form.
                </p>

                <button
                  type="button"
                  onClick={loadSampleAnalysis}
                  className="mt-5 w-full rounded-xl border border-emerald-700 px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Explore Coconut husks sample
                </button>

                <button
                  type="button"
                  onClick={loadRiceSampleAnalysis}
                  className="mt-3 w-full rounded-xl border border-emerald-700 px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Explore Rice husks sample
                </button>
              </Panel>

              <p className="px-1 text-xs leading-5 text-slate-500">
                AI assessments and prepared demonstrations are exploratory,
                not verified feasibility studies. Confirm costs, buyers,
                regulations, technical requirements and environmental
                outcomes independently.
              </p>
            </div>
          </div>
        )}

        {analysis && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                  {isSampleAnalysis
                    ? "Demonstration mode"
                    : "AI-assisted assessment"}
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  {isSampleAnalysis
                    ? `${sampleProfile?.resource ?? "Resource"} sample exploration`
                    : "Your resource exploration"}
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                  {isSampleAnalysis
                    ? `A prepared ${sampleProfile?.resource ?? "resource"} example to demonstrate how EcoNext presents an assessment.`
                    : "An exploratory assessment based on the details you submitted."}
                </p>
              </div>

              <button
                type="button"
                onClick={startNewAssessment}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Start a new assessment
              </button>
            </div>

            <div
              className={`rounded-2xl border p-5 sm:p-6 ${
                isSampleAnalysis
                  ? "border-amber-200 bg-amber-50"
                  : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-wider ${
                  isSampleAnalysis
                    ? "text-amber-800"
                    : "text-emerald-800"
                }`}
              >
                {isSampleAnalysis
                  ? "Prepared demonstration assessment"
                  : "AI-assisted exploratory assessment"}
              </p>

              <p
                className={`mt-2 text-sm leading-7 ${
                  isSampleAnalysis
                    ? "text-amber-950"
                    : "text-emerald-950"
                }`}
              >
                {isSampleAnalysis
                  ? `This is a pre-prepared ${sampleProfile?.resource ?? "resource"} example. The form details are not used to personalise these results. The figures are illustrative and should not be treated as verified market, financial or environmental outcomes.`
                  : "This assessment was generated using the details you submitted and EcoNext's stored resource information. It is exploratory, not a verified feasibility study. No live web search was performed, and local costs, buyers, demand, regulations and environmental outcomes must be independently checked."}
              </p>
            </div>

            {displayedDetails && (
              <Panel>
                <SectionHeading
                  eyebrow={
                    isSampleAnalysis ? "Example profile" : "Your submission"
                  }
                  title="Assessment details"
                  description={
                    isSampleAnalysis
                      ? "These are the fixed details used in the sample demonstration."
                      : "These are the details submitted for this AI assessment."
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    ["Resource", displayedDetails.resource],
                    ["District", displayedDetails.district],
                    ["Available quantity", displayedDetails.quantity],
                    ["Starting budget", displayedDetails.budget],
                    ["Experience", displayedDetails.experience],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-500">
                        {label}
                      </p>

                      <p className="mt-2 text-sm font-bold leading-6 text-slate-900">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            <Panel>
              <SectionHeading
                eyebrow="Overall assessment"
                title="What this exploration suggests"
              />

              <p className="text-sm leading-7 text-slate-700">
                {analysis.overallAssessment}
              </p>
            </Panel>

            <div>
              <SectionHeading
                eyebrow="Opportunity exploration"
                title="Potential uses to investigate"
                description="These are possibilities for further investigation, not confirmed business opportunities or guaranteed sources of income."
              />

              <div className="space-y-5">
                {analysis.opportunities.map((opportunity, index) => (
                  <OpportunityCard
                    key={`${opportunity.name}-${index}`}
                    opportunity={opportunity}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <Panel>
              <SectionHeading
                eyebrow="Scenario estimator"
                title="Explore a hypothetical material recovery scenario"
                description="Adjust the assumed recovery rate to see how much material might be recovered. This is a scenario calculation, not a measured recovery result."
              />

              {quantityInKg === null ? (
                <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  A monthly quantity could not be calculated from the
                  submitted quantity. Use a format such as 500 kg per month
                  or 20 kg per day to view this estimate.
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-500">
                        Estimated monthly input
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {formatKg(quantityInKg)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-500">
                        Assumed recovery rate
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {recoveryRate}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs font-semibold text-emerald-800">
                        Hypothetical recovered material
                      </p>

                      <p className="mt-2 text-2xl font-bold text-emerald-900">
                        {recoveredKg === null
                          ? "Not available"
                          : formatKg(recoveredKg)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor="recovery-rate"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Assumed recovery rate
                      </label>

                      <span className="text-sm font-bold tabular-nums text-emerald-800">
                        {recoveryRate}%
                      </span>
                    </div>

                    <input
                      id="recovery-rate"
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={recoveryRate}
                      onChange={(event) =>
                        setRecoveryRate(Number(event.target.value))
                      }
                      className="mt-4 w-full accent-emerald-700"
                    />

                    <div className="mt-1 flex justify-between text-xs text-slate-500">
                      <span>10%</span>
                      <span>90%</span>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-5 text-slate-500">
                    The recovery rate is an assumption for demonstration.
                    Actual output depends on material quality, processing
                    methods, moisture, contamination and rejects. This
                    estimate does not establish emissions reductions,
                    landfill diversion, water savings or energy savings.
                  </p>
                </>
              )}
            </Panel>

            <Panel>
              <SectionHeading
                eyebrow="Practical decision-making"
                title="Local verification checklist"
                description="Before spending money, validate the assumptions behind any opportunity."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Confirm the actual quantity available each month.",
                  "Check whether the resource is seasonal.",
                  "Inspect quality, moisture and contamination.",
                  "Speak with potential buyers and record their requirements.",
                  "Obtain equipment, transport and operating cost estimates.",
                  "Check local regulations and required approvals.",
                  "Test a small batch and measure actual output.",
                  "Compare the trial results with the original assumptions.",
                ].map((task) => (
                  <label
                    key={task}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(task)}
                      onChange={() => toggleTask(task)}
                      className="mt-1 h-4 w-4 accent-emerald-700"
                    />

                    <span
                      className={`text-sm leading-6 ${
                        completedTasks.includes(task)
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {task}
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {completedTasks.length} of 8 verification tasks completed.
              </p>
            </Panel>

            <Panel>
              <SectionHeading
                eyebrow="Action planner"
                title="Suggested next steps"
                description="Use this checklist to organise your early research. It does not replace technical or financial advice."
              />

              <div className="space-y-3">
                {actionTasks.map((task, index) => (
                  <label
                    key={task}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100"
                  >
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(task)}
                      onChange={() => toggleTask(task)}
                      className="mt-1 h-4 w-4 accent-emerald-700"
                    />

                    <span className="flex-1 text-sm leading-6 text-slate-700">
                      <span className="mr-2 font-bold text-emerald-800">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {task}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-[#183d2b] p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Recommended first step
                </p>

                <p className="mt-2 text-sm leading-7">
                  {analysis.recommendedFirstStep}
                </p>
              </div>
            </Panel>

            <Panel>
              <SectionHeading
                eyebrow="Research knowledge base"
                title="Information references"
                description={
                  isSampleAnalysis
                    ? `References included with the prepared ${sampleProfile?.resource ?? "resource"} demonstration.`
                    : "Stored resource references used by the assessment. These are not live web search results."
                }
              />

              {sources.length === 0 ? (
                <p className="text-sm leading-6 text-slate-600">
                  No stored references were returned for this assessment.
                  Further local research is required.
                </p>
              ) : (
                <div className="space-y-3">
                  {sources.map((source, index) => {
                    const title =
                      getSourceValue(source, ["title", "name", "source"]) ||
                      `Reference ${index + 1}`;

                    const description = getSourceValue(source, [
                      "description",
                      "summary",
                      "details",
                    ]);

                    const url = getSourceValue(source, [
                      "url",
                      "link",
                      "sourceUrl",
                    ]);

                    return (
                      <div
                        key={`${title}-${index}`}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <h3 className="text-sm font-bold text-slate-900">
                          {title}
                        </h3>

                        {description && (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                          </p>
                        )}

                        {url.startsWith("http") && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4"
                          >
                            View reference
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-amber-950">
                Important note before making an investment
              </h2>

              <p className="mt-2 text-sm leading-7 text-amber-900">
                EcoNext provides an initial exploration tool. It does not
                certify product quality, commercial viability, buyer demand,
                profitability or environmental impact. Obtain local
                quotations, speak with relevant authorities and potential
                buyers, and conduct a practical trial before making
                investment decisions.
              </p>
            </div>

            <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={startNewAssessment}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Start a new assessment
              </button>

              {!isSampleAnalysis && (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={loadSampleAnalysis}
                    className="rounded-xl border border-emerald-700 px-5 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    View Coconut husks sample
                  </button>

                  <button
                    type="button"
                    onClick={loadRiceSampleAnalysis}
                    className="rounded-xl border border-emerald-700 px-5 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    View Rice husks sample
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="mt-14 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-500">
          <p>
            EcoNext is an exploratory resource assessment prototype. Always
            verify technical, financial, regulatory and environmental
            information independently.
          </p>
        </footer>
      </div>
    </main>
  );
}
