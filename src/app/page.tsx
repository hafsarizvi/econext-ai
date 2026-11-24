
import Link from "next/link";

const resources = [
  {
    number: "01",
    title: "Coconut husks",
    description:
      "Explore potential pathways for creating value from coconut husks, including coir-related products and other applications.",
    examples: "Coir fibre · Coco peat · Husk chips",
    icon: "🌴",
  },
  {
    number: "02",
    title: "Rice husks",
    description:
      "Investigate ways to make productive use of rice husks through resource recovery and potential material applications.",
    examples: "Biomass fuel · Biochar · Rice husk ash",
    icon: "🌾",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us what you have",
    description:
      "Select your resource and share your location, available quantity, budget and experience.",
  },
  {
    number: "02",
    title: "Explore possible opportunities",
    description:
      "EcoNext uses AI and resource-specific knowledge to identify and compare potential pathways.",
  },
  {
    number: "03",
    title: "Understand what comes next",
    description:
      "Review requirements, challenges, first steps and questions to investigate before proceeding.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9F4] text-[#183D2B]">
      {/* Navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#183D2B] text-xl font-bold text-white">
            E
          </div>
          <span className="text-xl font-bold tracking-tight">
            EcoNext<span className="text-[#79A85B]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#53685A] md:flex">
          <a href="#about" className="transition hover:text-[#183D2B]">
            About
          </a>
          <a href="#resources" className="transition hover:text-[#183D2B]">
            Resources
          </a>
          <a href="#how-it-works" className="transition hover:text-[#183D2B]">
            How it works
          </a>
        </nav>

        <Link
          href="/analyze"
          className="rounded-full bg-[#183D2B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28583D]"
        >
          Get started
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-2 lg:px-10 lg:pb-32 lg:pt-20">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D9E5D4] bg-white px-4 py-2 text-xs font-semibold text-[#47764C]">
            <span className="h-2 w-2 rounded-full bg-[#79A85B]" />
            AI-powered resource intelligence
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
            Discover what your resources
            <span className="text-[#79A85B]"> could become.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#637367]">
            Agricultural by-products often have more potential than we realise.
            EcoNext helps you explore practical opportunities, understand what
            they require and identify the next steps towards creating value.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/analyze"
              className="rounded-full bg-[#183D2B] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#28583D]"
            >
              Explore your resources ↗
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#D6DFD3] bg-white px-7 py-4 text-sm font-semibold text-[#183D2B] transition hover:bg-[#F0F3EB]"
            >
              How it works
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#829087]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#79A85B]" />
              Sri Lankan resource focus
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#79A85B]" />
              Practical decision support
            </span>
          </div>
        </div>

        {/* Resource spotlight */}
        <div className="relative">
          <div className="rounded-4xl bg-[#E6EDDF] p-5 sm:p-8">
            <div className="rounded-2xl bg-[#183D2B] p-7 text-white sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8D1A8]">
                  Resource spotlight
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  Sri Lanka
                </span>
              </div>

              <div className="my-12">
                <div className="text-6xl">🌴</div>
                <h2 className="mt-5 text-3xl font-semibold">
                  Coconut husks
                </h2>
                <p className="mt-3 max-w-sm leading-7 text-[#D1DFD0]">
                  An agricultural by-product that can be explored for
                  different value-creation pathways.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-[#C1D3C1]">Potential pathway</p>
                  <p className="mt-1 font-semibold">Coir fibre</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-[#C1D3C1]">Potential pathway</p>
                  <p className="mt-1 font-semibold">Coco peat</p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#C1D3C1]">
                These are illustrative possibilities, not guaranteed business
                outcomes. Feasibility needs further validation.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-xl border border-[#E3E9DD] bg-white px-5 py-4 shadow-sm sm:-left-8">
            <p className="text-xs text-[#829087]">The EcoNext approach</p>
            <p className="mt-1 font-semibold">
              Resource <span className="text-[#79A85B]">→</span> Opportunity
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-10 border-y border-[#E8EDE4] bg-white px-6 py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 lg:px-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#79A85B]">
              The challenge
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              What if underused resources could create new possibilities?
            </h2>
          </div>

          <p className="leading-8 text-[#637367]">
            Agricultural by-products can remain underused when resource owners
            lack access to information about their possible applications,
            processing requirements and practical uses.
          </p>

          <p className="leading-8 text-[#637367]">
            EcoNext aims to make this information more accessible by combining
            AI-assisted analysis with resource-specific knowledge and
            practical decision support.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section
        id="resources"
        className="scroll-mt-10 mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#79A85B]">
              Explore possibilities
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Start with what you have.
            </h2>

            <p className="mt-4 leading-7 text-[#637367]">
              Select a supported resource to explore possible applications,
              practical requirements and potential next steps.
            </p>
          </div>

          <span className="w-fit rounded-full border border-[#D9E5D4] bg-white px-4 py-2 text-xs font-semibold text-[#47764C]">
            Currently supported resources
          </span>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <article
              key={resource.number}
              className="rounded-2xl border border-[#E4EADF] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-[#79A85B]">
                  {resource.number}
                </p>
                <span className="text-3xl">{resource.icon}</span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold">
                {resource.title}
              </h3>

              <p className="mt-4 min-h-20 leading-7 text-[#637367]">
                {resource.description}
              </p>

              <p className="mt-5 border-t border-[#E8EDE4] pt-5 text-sm text-[#829087]">
                {resource.examples}
              </p>

              <Link
                href="/analyze"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#47764C] transition hover:text-[#183D2B]"
              >
                Explore this resource <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-10 bg-[#183D2B] px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#B8D1A8]">
            How EcoNext works
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
            From a resource to a more informed next step.
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#D1DFD0]">
            A guided process that helps you understand possibilities before
            deciding what to pursue.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-white/20 pt-6">
                <p className="text-sm font-semibold text-[#B8D1A8]">
                  {step.number}
                </p>

                <h3 className="mt-5 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[#D1DFD0]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-white/10 p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-2xl font-semibold">
                  Have an underused resource?
                </p>
                <p className="mt-2 leading-7 text-[#D1DFD0]">
                  Start exploring what it could become with EcoNext.
                </p>
              </div>

              <Link
                href="/analyze"
                className="w-fit rounded-full bg-[#B8D1A8] px-7 py-4 text-sm font-semibold text-[#183D2B] transition hover:bg-white"
              >
                Start exploring ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-sm text-[#829087] sm:flex-row lg:px-10">
        <div>
          <p className="font-semibold text-[#183D2B]">
            EcoNext<span className="text-[#79A85B]">.</span>
          </p>
          <p className="mt-1">
            © 2026 EcoNext AI. Building a more resource-conscious future.
          </p>
        </div>

        <p>Designed for local possibilities.</p>
      </footer>
    </main>
  );
}
