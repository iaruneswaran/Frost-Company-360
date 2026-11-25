import sys

with open(r'c:\Users\ARUN ESWARAN\Downloads\Frost Company 360\src\App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update navSections
old_nav_start = "  // Navigation sections list with nested subsections for dropdown accordion\n  const navSections = ["
old_nav_end = "  // Scroll spy to highlight active section & manage sticky freeze"

new_nav = '''  // Navigation sections list with nested subsections for dropdown accordion
  const navSections = [
    {
      id: 'scores-overview',
      label: 'Evaluation Scores',
    },
    {
      id: 'company-snapshot',
      label: 'Company Snapshot',
      subsections: [
        { id: 'snapshot-table', label: 'Company Snapshot' },
        { id: 'about-company', label: 'About the Company' },
      ]
    },
    {
      id: 'technology',
      label: 'Technology Platform',
      subsections: [
        { id: 'tech-problem', label: 'Problem Solved' },
        { id: 'tech-snapshot', label: 'Technology Snapshot' },
        { id: 'tech-attributes', label: 'Technology Attributes' },
      ]
    },
    {
      id: 'commercialization',
      label: 'Commercialization & Risks',
      subsections: [
        { id: 'comm-readiness', label: 'Readiness Level' },
        { id: 'comm-risks', label: 'Risks' },
        { id: 'comm-impact', label: 'Regional Impact' },
        { id: 'comm-applications', label: 'Application Potential' },
      ]
    },
    {
      id: 'market-intel',
      label: 'Market Intelligence',
      subsections: [
        { id: 'intel-buzz', label: 'Buzzworthiness' },
        { id: 'intel-competition', label: 'Technology Competition' },
        { id: 'intel-revenue', label: 'Revenue Magnitude' },
        { id: 'intel-investor', label: 'Investor Lens' },
        { id: 'intel-analyst', label: "Analyst's Insights" },
      ]
    },
    {
      id: 'strategic-analysis',
      label: 'DayOne Data Centers',
      subsections: [
        { id: 'strat-value', label: 'Value Proposition' },
        { id: 'strat-competitors', label: 'Key Competitors' },
        { id: 'strat-swot', label: 'Strategic Analysis (SWOT)' },
        { id: 'strat-ip', label: 'IP / Patent Activity' },
        { id: 'strat-future', label: 'Future Focus Areas' },
      ]
    },
  ];

  '''

p1 = code.find(old_nav_start)
p2 = code.find(old_nav_end)

if p1 == -1 or p2 == -1:
    print(f"Error finding nav markers! p1={p1}, p2={p2}")
    sys.exit(1)

code = code[:p1] + new_nav + code[p2:]

# 2. Replace entire <main>...</main> content
main_open_marker = '<main className="w-full lg:w-[1000px] max-w-[1000px] flex-shrink-0 space-y-16 lg:space-y-20">'
main_close_marker = '</main>'

m1 = code.find(main_open_marker)
m2 = code.find(main_close_marker, m1)

if m1 == -1 or m2 == -1:
    print(f"Error finding main markers! m1={m1}, m2={m2}")
    sys.exit(1)

new_main_content = '''<main className="w-full lg:w-[1000px] max-w-[1000px] flex-shrink-0 space-y-14 lg:space-y-16">
          {/* Mobile Header Card (Visible only on screens below lg) */}
          <div className="lg:hidden bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#111827] text-white flex items-center justify-center font-bold text-[18px] flex-shrink-0 select-none">
                <span className="text-[#38bdf8] mr-0.5">2</span>S
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h1 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight truncate leading-tight">
                      TwoStep Therapeutics
                    </h1>
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#0071e3] fill-[#0071e3] text-white flex-shrink-0" />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyShare}
                    title="Share profile"
                    className="p-1.5 rounded-full hover:bg-black/[0.05] text-[#1d1d1f] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Share2 className="w-4 h-4 text-[#1d1d1f]" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[13px] text-[#86868b] mt-0.5">
                  <span>Stage:</span>
                  <span className="font-medium text-[#1d1d1f]">Series A ($71.2M)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-black/[0.06]">
              <div className="flex items-center justify-between sm:justify-start sm:gap-2 bg-white px-3 py-1.5 rounded-[10px] border border-black/[0.05] text-[12.5px]">
                <span className="text-[#86868b] font-medium">Total Funding</span>
                <span className="font-medium text-[#1d1d1f]">$71.2M</span>
                <span className="text-[#16a34a] font-medium text-[12px] bg-[#16a34a]/[0.08] px-1.5 py-0.5 rounded">
                  Series A
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-start sm:gap-2 bg-white px-3 py-1.5 rounded-[10px] border border-black/[0.05] text-[12.5px]">
                <span className="text-[#86868b] font-medium">Targeting</span>
                <span className="font-medium text-[#0071e3]">#1 Knottin PIP</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start sm:gap-2 bg-white px-3 py-1.5 rounded-[10px] border border-black/[0.05] text-[12.5px]">
                <div className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span className="text-[#86868b] font-medium">Readiness</span>
                </div>
                <span className="font-medium text-[#1d1d1f]">Phase 3 (2028)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[12.5px] text-[#6e6e73] pt-2 border-t border-black/[0.06]">
              <div>Founded <span className="font-medium text-[#1d1d1f]">2024</span></div>
              <span>•</span>
              <div><span className="font-medium text-[#1d1d1f]">Private</span> (Series A)</div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#86868b]" />
                <span>San Carlos, CA</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#86868b]" />
                <span>2-10 Employees</span>
              </div>
              <span>•</span>
              <a href="https://www.twosteptx.com" target="_blank" rel="noreferrer" className="text-[#0071e3] hover:underline font-medium">
                www.twosteptx.com
              </a>
            </div>
          </div>

          {/* TOP SCORE OVERVIEW STRIP — Placed at starting, right above Company Snapshot */}
          <section id="scores-overview" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <h2 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Evaluation Scores
              </h2>
              <span className="text-[12.5px] font-medium text-[#86868b]">
                Key Metrics Summary
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Commercialization Readiness</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">3</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#0071e3] truncate">Readout in 2028</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Risks</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">3</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#f59e0b] truncate">Medium</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Regional Impact</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">4</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#10b981] truncate">High (NA & Europe)</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Application Potential</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">3</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#0071e3] truncate">Medium</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Buzzworthiness</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">5</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#7c3aed] truncate">High</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Technology Competition</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">5</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#0071e3] truncate">High</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Revenue Magnitude Potential</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">5</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#10b981] truncate">$ 281.7 M (High)</div>
              </div>

              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[16px] p-4 space-y-1 hover:border-black/[0.15] transition-all">
                <div className="text-[11.5px] font-medium text-[#86868b] truncate">Investor Lens</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-[#1d1d1f]">5</span>
                  <span className="text-[12.5px] text-[#86868b]">/ 5</span>
                </div>
                <div className="text-[11.5px] font-medium text-[#0071e3] truncate">High</div>
              </div>
            </div>
          </section>

          {/* SECTION 1: COMPANY SNAPSHOT & ABOUT THE COMPANY */}
          <section id="company-snapshot" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-10">
            {/* Company Snapshot */}
            <div id="snapshot-table" className="scroll-mt-24 space-y-4">
              <h2 className="text-[26px] sm:text-[30px] font-medium text-[#1d1d1f] tracking-tight">
                Company Snapshot
              </h2>
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] divide-y divide-black/[0.06] overflow-hidden text-[14.5px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Technology</div>
                  <div className="text-[#1d1d1f] font-medium">Peptide-conjugate therapeutics</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Type of Ownership</div>
                  <div className="text-[#1d1d1f] font-medium">Private</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Year Founded</div>
                  <div className="text-[#1d1d1f] font-medium">2024</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Headquarters</div>
                  <div className="text-[#1d1d1f] font-medium">San Carlos, California</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Key Markets</div>
                  <div className="text-[#1d1d1f] font-medium">United States</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Investment Stage</div>
                  <div className="text-[#1d1d1f] font-medium">Series A</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Total Funding</div>
                  <div className="text-[#1d1d1f] font-medium">$71.2 M</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">Annual Revenue</div>
                  <div className="text-[#1d1d1f] font-medium">NA</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                  <div className="text-[#86868b] font-medium">No. of. Employees</div>
                  <div className="text-[#1d1d1f] font-medium">2-10</div>
                </div>
              </div>
            </div>

            {/* About the Company */}
            <div id="about-company" className="scroll-mt-24 space-y-3">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                About the Company
              </h3>
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 lg:p-7">
                <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                  TwoSteps Therapeutics is a clinical-stage biotechnology company developing a pipeline of versatile targeting peptides that selectively bind to multiple tumor-associated integrins, a unique feature that enables it to deliver various payloads to virtually any solid tumor. The company's foundational technology is based on research at Stanford University in the labs of researchers Jennifer Cochran, Ron Levy, and Nobel Laureate Carolyn Bertozzi.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: TECHNOLOGY PLATFORM */}
          <section id="technology" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-10">
            {/* What Problem Does the Technology Solve? */}
            <div id="tech-problem" className="scroll-mt-24 space-y-3">
              <h2 className="text-[24px] sm:text-[28px] font-medium text-[#1d1d1f] tracking-tight">
                What Problem Does the Technology Solve?
              </h2>
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 lg:p-7">
                <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                  Most tumor-targeted therapies rely on a single cell-surface target, but solid tumors exhibit significant variability in target expression across tumor types, patients, and even within individual tumors. This heterogeneity limits patient selection and may allow certain tumor cells to evade treatment. In contrast, TwoStep employs a polyspecific integrin-binding peptide (PIP) as a more versatile targeting component in its therapies, enabling broader tumor coverage, improved targeting precision, and the potential to deliver therapeutic payloads across a wide range of solid tumors.
                </p>
              </div>
            </div>

            {/* Technology Snapshot */}
            <div id="tech-snapshot" className="scroll-mt-24 space-y-3">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Technology Snapshot
              </h3>
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 lg:p-7">
                <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                  TwoStep Therapeutics has developed an engineered ultra-stable knottin polyspecific integrin-binding peptide (PIP) to be used as targeting component it its therapies. PIP is a small, synthetic peptide that targets five tumor-associated integrins expressed across a broad range of solid tumors.
                </p>
              </div>
            </div>

            {/* Technology Attributes */}
            <div id="tech-attributes" className="scroll-mt-24 space-y-4">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Technology Attributes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-2">
                  <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                    Multi-specific Integrin Targeting
                  </h4>
                  <p className="text-[#515154] text-[14.5px] leading-[1.75]">
                    PIP can target multiple antigens rather than depending on single antigen expression. This increases tumour recognition and improves consistency in identifying heterogeneous tumors.
                  </p>
                </div>

                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-2">
                  <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                    Targeted drug delivery
                  </h4>
                  <p className="text-[#515154] text-[14.5px] leading-[1.75]">
                    PIP's small size, rapid internalization, and flexible conjugation chemistry make them suitable for targeted drug delivery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: COMMERCIALIZATION READINESS & RISKS */}
          <section id="commercialization" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-10">
            {/* Commercialization Readiness Level — STYLE 1: Connected Node Stepper */}
            <div id="comm-readiness" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                  Commercialization Readiness Level
                </h3>
                <span className="text-[13px] font-medium px-3 py-1 bg-[#0071e3]/[0.08] text-[#0071e3] rounded-full">
                  Level 3 of 5
                </span>
              </div>

              {/* Horizontal Stepper */}
              <div className="py-2">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-black/[0.08] -z-0" />
                  
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isPassed = step < 3;
                    const isCurrent = step === 3;
                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium transition-all ${
                            isCurrent
                              ? 'bg-[#0071e3] text-white ring-4 ring-[#0071e3]/20'
                              : isPassed
                              ? 'bg-[#0071e3] text-white'
                              : 'bg-white border border-black/[0.15] text-[#86868b]'
                          }`}
                        >
                          {step}
                        </div>
                        <span className={`text-[11px] mt-1.5 font-medium ${isCurrent ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                          {isCurrent ? 'Current (3)' : `Stage ${step}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-black/[0.06] text-[#515154] text-[15px] leading-[1.75]">
                <p>• Basilea expects phase 3 data readout and regulatory submission in 2028.</p>
                <p>• Hence, the product at an advanced clinical-stage, pre-approval readiness level.</p>
              </div>
            </div>

            {/* Risks — STYLE 2: Tri-Zone Continuous Spectrum with Marker */}
            <div id="comm-risks" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                  Risks
                </h3>
                <span className="text-[13px] font-medium px-3 py-1 bg-[#f59e0b]/[0.1] text-[#d97706] rounded-full">
                  Medium (Score: 3 / 5)
                </span>
              </div>

              {/* Spectrum bar */}
              <div className="space-y-2 py-1">
                <div className="relative">
                  <div className="grid grid-cols-3 h-2.5 rounded-full overflow-hidden gap-1">
                    <div className="bg-[#10b981]/30 rounded-l-full" />
                    <div className="bg-[#f59e0b] relative">
                      <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3.5 h-3.5 bg-[#d97706] rounded-full ring-2 ring-white" />
                    </div>
                    <div className="bg-[#ef4444]/30 rounded-r-full" />
                  </div>
                </div>
                <div className="flex justify-between text-[11.5px] font-medium text-[#86868b] pt-1">
                  <span>Low (1 - 2)</span>
                  <span className="text-[#d97706] font-semibold">Medium (3) • Active</span>
                  <span>High (4 - 5)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06]">
                <p className="text-[#515154] text-[15px] leading-[1.75]">
                  The novel Gwt1-inhibition mechanism may not deliver sufficient clinical benefit or an acceptable safety profile in the ongoing phase 3 studies of invasive candidiasis and invasive mould infections, particularly given the heterogeneity of rare mould infections and salvage-treatment populations.
                </p>
              </div>
            </div>

            {/* Regional Impact & Application Potential Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Regional Impact — STYLE 3: Regional Table with Indicator Pips */}
              <div id="comm-impact" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Regional Impact
                  </h3>
                  <span className="text-[13px] font-medium px-3 py-1 bg-[#10b981]/[0.08] text-[#10b981] rounded-full">
                    Score: 4 / 5 (High)
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 flex items-center justify-between gap-4">
                    <div className="font-medium text-[#1d1d1f] text-[15px]">North America</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.08]" />
                      </div>
                      <span className="text-[12px] font-medium text-[#10b981] bg-[#10b981]/[0.08] px-2.5 py-0.5 rounded-md">
                        High
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 flex items-center justify-between gap-4">
                    <div className="font-medium text-[#1d1d1f] text-[15px]">Europe</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.08]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.08]" />
                      </div>
                      <span className="text-[12px] font-medium text-[#0071e3] bg-[#0071e3]/[0.08] px-2.5 py-0.5 rounded-md">
                        Medium
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-1 pt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              {/* Application Potential — STYLE 4: Badges + Deal Box */}
              <div id="comm-applications" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Application Potential
                  </h3>
                  <span className="text-[13px] font-medium px-3 py-1 bg-[#0071e3]/[0.08] text-[#0071e3] rounded-full">
                    Score: 3 / 5 (Medium)
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-[12px] font-medium text-[#86868b] uppercase tracking-wider">Target Infections:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13.5px] font-medium text-[#1d1d1f]">
                      Candida auris infections
                    </span>
                    <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13.5px] font-medium text-[#1d1d1f]">
                      Lomentosporiosis
                    </span>
                    <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13.5px] font-medium text-[#1d1d1f]">
                      Mucormycosis
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 text-[13.5px] text-[#515154] leading-relaxed">
                  Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $ 37 million upfront with up to $110 million in potential commercial sales milestones.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: MARKET INTELLIGENCE */}
          <section id="market-intel" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-10">
            <h2 className="text-[24px] sm:text-[28px] font-medium text-[#1d1d1f] tracking-tight">
              Market Intelligence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buzzworthiness — STYLE 5: Circular Radial Dial */}
              <div id="intel-buzz" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                      Buzzworthiness
                    </h3>
                    <div className="text-[12.5px] font-medium text-[#7c3aed] mt-0.5">
                      Rating: High
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#8b5cf6] flex items-center justify-center font-medium text-[15px] text-[#7c3aed] bg-[#8b5cf6]/[0.06] flex-shrink-0">
                    5/5
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-1 border-t border-b border-black/[0.05] py-1.5">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#7c3aed] font-semibold">High • Active</span>
                </div>

                <p className="text-[#515154] text-[14.5px] leading-relaxed">
                  Fosmanogepix is gaining attention as a first-in-class antifungal targeting multidrug-resistant Candida auris and rare molds, supported by two Phase 3 trials and BARDA funding.
                </p>
              </div>

              {/* Technology Competition Level — STYLE 6: 5-Step Ruler Scale */}
              <div id="intel-competition" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Technology Competition Level
                  </h3>
                  <span className="text-[13px] font-medium px-3 py-1 bg-[#0071e3]/[0.08] text-[#0071e3] rounded-full">
                    Score: 5 / 5 (High)
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="grid grid-cols-5 gap-1.5">
                    <div className="h-8 bg-black/[0.04] rounded-md flex items-center justify-center text-[12px] font-medium text-[#86868b]">1</div>
                    <div className="h-8 bg-black/[0.04] rounded-md flex items-center justify-center text-[12px] font-medium text-[#86868b]">2</div>
                    <div className="h-8 bg-black/[0.04] rounded-md flex items-center justify-center text-[12px] font-medium text-[#86868b]">3</div>
                    <div className="h-8 bg-black/[0.04] rounded-md flex items-center justify-center text-[12px] font-medium text-[#86868b]">4</div>
                    <div className="h-8 bg-[#1d1d1f] text-white rounded-md flex items-center justify-center text-[12px] font-medium">5 High</div>
                  </div>
                  <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <p className="text-[#515154] text-[14.5px] leading-relaxed pt-1">
                  Fosmanogepix is competing against established antifungal therapies from major pharmaceutical companies. However, the mechanism and broad spectrum activity offer differentiation, particularly for difficult-to-treat infections.
                </p>
              </div>

              {/* Revenue Magnitude Potential — STYLE 7: Big Stat Financial Card */}
              <div id="intel-revenue" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Revenue Magnitude Potential
                  </h3>
                  <span className="text-[13px] font-medium px-3 py-1 bg-[#10b981]/[0.08] text-[#10b981] rounded-full">
                    Score: 5 / 5 (High)
                  </span>
                </div>

                <div className="bg-white border border-black/[0.06] rounded-[16px] p-4 flex items-baseline justify-between">
                  <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight">$ 281.7 M</span>
                  <span className="text-[12px] font-medium text-[#10b981] bg-[#10b981]/[0.08] px-2.5 py-1 rounded-md">Level 5</span>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#10b981] font-semibold">High • Level 5</span>
                </div>

                <p className="text-[#515154] text-[14.5px] leading-relaxed">
                  Basilea Pharmaceutica's revenue is $ 281.7 M.
                </p>
              </div>

              {/* Investor Lens — STYLE 8: Deal Structure Box */}
              <div id="intel-investor" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Investor Lens
                  </h3>
                  <span className="text-[13px] font-medium px-3 py-1 bg-[#0071e3]/[0.08] text-[#0071e3] rounded-full">
                    Score: 5 / 5 (High)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center">
                    <div className="text-[11px] font-medium text-[#86868b]">Upfront</div>
                    <div className="text-[16px] font-medium text-[#1d1d1f] mt-0.5">$ 37 M</div>
                  </div>
                  <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center">
                    <div className="text-[11px] font-medium text-[#86868b]">Milestones</div>
                    <div className="text-[16px] font-medium text-[#1d1d1f] mt-0.5">Up to $110 M</div>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#0071e3] font-semibold">High • Level 5</span>
                </div>

                <p className="text-[#515154] text-[14.5px] leading-relaxed">
                  Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $ 37 million upfront with up to $110 million in potential commercial sales milestones.
                </p>
              </div>
            </div>

            {/* Analyst's Insights — STYLE 9: Executive Editorial Box */}
            <div id="intel-analyst" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] border-l-4 border-l-[#0071e3] rounded-[18px] p-6 lg:p-7 space-y-3">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Analyst's Insights
              </h3>
              <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                Fosmanogepix is Basilea's most advanced clinical-stage antifungal, expanding its portfolio beyond Cresemba through a novel mechanism and broad yeast and mold activity. Its potential against resistant Candida auris, Candida glabrata and rare molds could address unmet needs in difficult-to-treat infections. Oral and intravenous formulations offer flexibility in treatment. Its clinical potential will depend on demonstrating efficacy and safety in the ongoing Phase 3 trials, FAST-IC and FORWARD-IM.
              </p>
            </div>
          </section>

          {/* SECTION 5: DAYONE DATA CENTERS & STRATEGIC ANALYSIS */}
          <section id="strategic-analysis" className="scroll-mt-24 pt-2 pb-20 space-y-10">
            {/* Value Proposition of DayOne Data Centers */}
            <div id="strat-value" className="scroll-mt-24 space-y-3">
              <h2 className="text-[24px] sm:text-[28px] font-medium text-[#1d1d1f] tracking-tight">
                Value Proposition of DayOne Data Centers
              </h2>
              <div className="text-[14px] font-medium text-[#86868b]">Technology Assessment</div>
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 lg:p-7">
                <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                  DayOne's competitive advantage stems from its ONEShell, ONEPod and ONEFactory engineering architectures, built to standardize data center delivery across markets. Its model combines early site and power access, anchor customer commitments, modular construction and long-term service contracts. But the company concedes some newer engineering designs have not yet been put into production with customers, while fast-changing AI hardware, rack density and cooling can lead to costly redesigns.
                </p>
              </div>
            </div>

            {/* Key Competitors */}
            <div id="strat-competitors" className="scroll-mt-24 space-y-3">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Key Competitors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-[#fbfbfd] border border-black/[0.06] rounded-[14px] p-4 space-y-1">
                  <div className="text-[15.5px] font-medium text-[#1d1d1f]">Digital Realty</div>
                  <div className="text-[13px] text-[#86868b]">United States</div>
                </div>
                <div className="bg-[#fbfbfd] border border-black/[0.06] rounded-[14px] p-4 space-y-1">
                  <div className="text-[15.5px] font-medium text-[#1d1d1f]">AirTrunk</div>
                  <div className="text-[13px] text-[#86868b]">Australia</div>
                </div>
                <div className="bg-[#fbfbfd] border border-black/[0.06] rounded-[14px] p-4 space-y-1">
                  <div className="text-[15.5px] font-medium text-[#1d1d1f]">NTT Global Data Centers</div>
                  <div className="text-[13px] text-[#86868b]">Japan</div>
                </div>
                <div className="bg-[#fbfbfd] border border-black/[0.06] rounded-[14px] p-4 space-y-1">
                  <div className="text-[15.5px] font-medium text-[#1d1d1f]">QTS Realty Trust</div>
                  <div className="text-[13px] text-[#86868b]">United States</div>
                </div>
                <div className="bg-[#fbfbfd] border border-black/[0.06] rounded-[14px] p-4 space-y-1">
                  <div className="text-[15.5px] font-medium text-[#1d1d1f]">Equinix, Inc.</div>
                  <div className="text-[13px] text-[#86868b]">United States</div>
                </div>
              </div>
            </div>

            {/* Strategic Analysis (SWOT) */}
            <div id="strat-swot" className="scroll-mt-24 space-y-4">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Strategic Analysis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Strengths */}
                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#16a34a]/[0.1] text-[#16a34a] font-bold text-[13px] flex items-center justify-center">
                      S
                    </span>
                    <h4 className="text-[17px] font-medium text-[#1d1d1f]">STRENGTHS</h4>
                  </div>
                  <ul className="space-y-2 text-[14px] text-[#515154] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Engineering architectures such as ONEShell, ONEPod and ONEFactory standardize delivery.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Long-term contracts provide revenue visibility.</span>
                    </li>
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#f97316]/[0.1] text-[#ea580c] font-bold text-[13px] flex items-center justify-center">
                      W
                    </span>
                    <h4 className="text-[17px] font-medium text-[#1d1d1f]">WEAKNESSES</h4>
                  </div>
                  <ul className="space-y-2 text-[14px] text-[#515154] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Power-intensive expansion increases infrastructure cost exposure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Large CAPEX constrain expansion flexibility.</span>
                    </li>
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0071e3]/[0.1] text-[#0071e3] font-bold text-[13px] flex items-center justify-center">
                      O
                    </span>
                    <h4 className="text-[17px] font-medium text-[#1d1d1f]">OPPORTUNITIES</h4>
                  </div>
                  <p className="text-[14px] text-[#515154] leading-relaxed">
                    DayOne aims to enhance its development pipeline while addressing long-term lease obligations. The cancellation of one lease has reduced future payments from $894.1M to $429.1M, with another data center anticipated to be operational by 2028. This scenario underscores the need for the company to synchronize lease commitments with construction timelines and customer demand as it scales.
                  </p>
                </div>

                {/* Threats */}
                <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-red-500/[0.1] text-red-600 font-bold text-[13px] flex items-center justify-center">
                      T
                    </span>
                    <h4 className="text-[17px] font-medium text-[#1d1d1f]">THREATS</h4>
                  </div>
                  <ul className="space-y-2 text-[14px] text-[#515154] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Power shortages can delay planned capacity expansion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Data-center regulations can restrict market expansion.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* IP / Patent Activity & Future Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="strat-ip" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-2.5">
                <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                  IP/Patent Activity
                </h4>
                <p className="text-[14.5px] text-[#515154] leading-relaxed">
                  There are no active trademarks or patents registered in its name.
                </p>
              </div>

              <div id="strat-future" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[18px] p-6 space-y-2.5">
                <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                  Future Focus Areas
                </h4>
                <ul className="space-y-2 text-[14px] text-[#515154]">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Rising AI demand expands hyperscale capacity requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Data sovereignty drives localised connectivity requirements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        '''

full_new_code = code[:m1] + new_main_content + code[m2:]

with open(r'c:\Users\ARUN ESWARAN\Downloads\Frost Company 360\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(full_new_code)

print("Applied pure neat design to App.jsx successfully!")
