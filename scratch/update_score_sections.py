import re

with open(r'c:\Users\ARUN ESWARAN\Downloads\Frost Company 360\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replacement block for SECTION 3 and SECTION 4
new_sections = '''          {/* SECTION 3: COMMERCIALIZATION READINESS & RISKS */}
          <section id="commercialization" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-12">
            <div className="space-y-2">
              <span className="text-[12px] font-medium uppercase tracking-wider text-[#0071e3] bg-[#0071e3]/[0.08] px-2.5 py-0.5 rounded-full">
                Clinical Horizon & Milestones
              </span>
              <h2 className="text-[28px] sm:text-[32px] font-medium text-[#1d1d1f] tracking-tight">
                Commercialization Readiness & Risks
              </h2>
              <p className="text-[15.5px] text-[#515154] leading-relaxed max-w-2xl">
                Readiness milestones, indication pathways, transaction valuations, and mechanistic risk factors.
              </p>
            </div>

            {/* Commercialization Readiness Level */}
            <div id="comm-readiness" className="scroll-mt-24 space-y-4 pt-2">
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Readiness Score
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          3
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#0071e3]/[0.08] text-[#0071e3]">
                        Stage 3 • Phase 3 (Active Readout 2028)
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3] ring-2 ring-offset-1 ring-[#0071e3]/30" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Discovery</span>
                      <span>3 Phase 3 (Current)</span>
                      <span>5 Commercial</span>
                    </div>
                  </div>
                </div>

                {/* Evidence & Content */}
                <div className="space-y-4">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Commercialization Readiness Level
                  </h3>
                  <p className="text-[#515154] text-[15px] leading-[1.75]">
                    Basilea expects phase 3 data readout and regulatory submission in 2028. Hence, the product is at an advanced clinical-stage, pre-approval readiness level.
                  </p>

                  {/* Milestone Pipeline Stepper */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                    <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#16a34a]">Stage 1</div>
                      <div className="text-[13px] font-medium text-[#1d1d1f]">Discovery</div>
                      <div className="text-[11px] text-[#86868b]">Completed</div>
                    </div>
                    <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#16a34a]">Stage 2</div>
                      <div className="text-[13px] font-medium text-[#1d1d1f]">Phase 1/2</div>
                      <div className="text-[11px] text-[#86868b]">Completed</div>
                    </div>
                    <div className="bg-[#0071e3]/[0.04] border border-[#0071e3]/30 rounded-[12px] p-3 text-center space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0071e3]">Stage 3</div>
                      <div className="text-[13px] font-medium text-[#0071e3]">Phase 3</div>
                      <div className="text-[11px] text-[#0071e3] font-medium">Active (FAST/FORWARD)</div>
                    </div>
                    <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Stage 4</div>
                      <div className="text-[13px] font-medium text-[#1d1d1f]">Regulatory</div>
                      <div className="text-[11px] text-[#86868b]">Target: 2028</div>
                    </div>
                    <div className="bg-white border border-black/[0.06] rounded-[12px] p-3 text-center space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">Stage 5</div>
                      <div className="text-[13px] font-medium text-[#1d1d1f]">Commercial</div>
                      <div className="text-[11px] text-[#86868b]">Global Launch</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div id="comm-risks" className="scroll-mt-24 space-y-4 pt-2">
              <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Risk Probability Assessment
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          3
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#f59e0b]/[0.1] text-[#d97706]">
                        Level 3 • Medium / High Exposure
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#f59e0b]" />
                      <div className="h-2 rounded-full bg-[#f59e0b]" />
                      <div className="h-2 rounded-full bg-[#f59e0b] ring-2 ring-offset-1 ring-[#f59e0b]/30" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Low</span>
                      <span>3 Medium / High</span>
                      <span>5 Critical</span>
                    </div>
                  </div>
                </div>

                {/* Evidence & Findings */}
                <div className="space-y-4">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Risks & Mechanism Uncertainty
                  </h3>
                  <p className="text-[#515154] text-[15px] leading-[1.75]">
                    The novel Gwt1-inhibition mechanism may not deliver sufficient clinical benefit or an acceptable safety profile in the ongoing phase 3 studies of invasive candidiasis and invasive mould infections, particularly given the heterogeneity of rare mould infections and salvage-treatment populations.
                  </p>

                  {/* 3 Risk Vectors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                    <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-1.5">
                      <div className="text-[12px] font-medium text-[#d97706] uppercase tracking-wider">Vector 01</div>
                      <div className="text-[14px] font-medium text-[#1d1d1f]">Novel Gwt1 Inhibition</div>
                      <div className="text-[12.5px] text-[#515154] leading-relaxed">
                        Unvalidated long-term clinical safety & efficacy endpoints for first-in-class biochemical target.
                      </div>
                    </div>
                    <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-1.5">
                      <div className="text-[12px] font-medium text-[#d97706] uppercase tracking-wider">Vector 02</div>
                      <div className="text-[14px] font-medium text-[#1d1d1f]">Pathogen Heterogeneity</div>
                      <div className="text-[12.5px] text-[#515154] leading-relaxed">
                        Biological variability across refractory rare mould strains and invasive yeast isolates.
                      </div>
                    </div>
                    <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-1.5">
                      <div className="text-[12px] font-medium text-[#d97706] uppercase tracking-wider">Vector 03</div>
                      <div className="text-[14px] font-medium text-[#1d1d1f]">Salvage Population</div>
                      <div className="text-[12.5px] text-[#515154] leading-relaxed">
                        Patient cohorts exhibit high baseline comorbidities and previous treatment failures.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Impact & Application Potential Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Regional Impact */}
              <div id="comm-impact" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Geographic Footprint
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          4
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#10b981]/[0.08] text-[#10b981]">
                        Level 4 • High Priority
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981] ring-2 ring-offset-1 ring-[#10b981]/30" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Regional</span>
                      <span>3 Multi-Market</span>
                      <span>5 Global Hubs</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Regional Impact
                  </h3>
                  
                  {/* Visual Regional Distribution Bars */}
                  <div className="space-y-3 pt-1">
                    <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-2">
                      <div className="flex items-center justify-between text-[14px]">
                        <span className="font-medium text-[#1d1d1f]">North America</span>
                        <span className="text-[12px] font-medium text-[#10b981] bg-[#10b981]/[0.08] px-2.5 py-0.5 rounded-full">
                          High Impact
                        </span>
                      </div>
                      <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#10b981] h-full rounded-full w-[85%]" />
                      </div>
                      <p className="text-[12.5px] text-[#515154] leading-relaxed pt-0.5">
                        Primary target commercial territory, supported by BARDA non-dilutive co-funding and high clinical trial density.
                      </p>
                    </div>

                    <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-2">
                      <div className="flex items-center justify-between text-[14px]">
                        <span className="font-medium text-[#1d1d1f]">Europe</span>
                        <span className="text-[12px] font-medium text-[#0071e3] bg-[#0071e3]/[0.08] px-2.5 py-0.5 rounded-full">
                          Medium Impact
                        </span>
                      </div>
                      <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0071e3] h-full rounded-full w-[60%]" />
                      </div>
                      <p className="text-[12.5px] text-[#515154] leading-relaxed pt-0.5">
                        Basilea's domestic Swiss operational infrastructure and European multi-site clinical investigator network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Potential & Acquisition Deal */}
              <div id="comm-applications" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-6 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Application Potential
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          3
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#0071e3]/[0.08] text-[#0071e3]">
                        Level 3 • High-Value Specialization
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3] ring-2 ring-offset-1 ring-[#0071e3]/30" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                      <div className="h-2 rounded-full bg-black/[0.06]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Single Niche</span>
                      <span>3 Multi-Indication</span>
                      <span>5 Pan-Antifungal</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Application Potential & Deal Terms
                  </h3>

                  {/* Indication Chips */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-medium text-[#86868b] uppercase tracking-wider">Target Indications</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13px] font-medium text-[#1d1d1f]">
                        Candida auris infections
                      </span>
                      <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13px] font-medium text-[#1d1d1f]">
                        Lomentosporiosis
                      </span>
                      <span className="px-3 py-1.5 bg-white border border-black/[0.08] rounded-[10px] text-[13px] font-medium text-[#1d1d1f]">
                        Mucormycosis
                      </span>
                    </div>
                  </div>

                  {/* Transaction Context Card */}
                  <div className="bg-white border border-black/[0.06] rounded-[14px] p-4 space-y-2">
                    <div className="text-[12px] font-medium text-[#0071e3] uppercase tracking-wider">
                      Acquisition Transaction (Nov 2023)
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-[20px] font-medium text-[#1d1d1f]">$37M Upfront</span>
                      <span className="text-[13px] text-[#86868b]">+ up to $110M Milestones</span>
                    </div>
                    <p className="text-[12.5px] text-[#515154] leading-relaxed pt-1 border-t border-black/[0.05]">
                      Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $37 million upfront with up to $110 million in potential commercial sales milestones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: MARKET INTELLIGENCE */}
          <section id="market-intel" className="scroll-mt-24 pt-2 pb-16 border-b border-black/[0.08] space-y-12">
            <div className="space-y-2">
              <span className="text-[12px] font-medium uppercase tracking-wider text-[#0071e3] bg-[#0071e3]/[0.08] px-2.5 py-0.5 rounded-full">
                Market Dynamics & Sentiment
              </span>
              <h2 className="text-[28px] sm:text-[32px] font-medium text-[#1d1d1f] tracking-tight">
                Market Intelligence
              </h2>
              <p className="text-[15.5px] text-[#515154] leading-relaxed max-w-2xl">
                Ecosystem momentum, competitive tiering, financial scale, and institutional analyst sentiment.
              </p>
            </div>

            {/* 4 Executive Intelligence Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buzzworthiness */}
              <div id="intel-buzz" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Industry Buzz
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#8b5cf6]/[0.08] text-[#7c3aed]">
                        Level 5 • High Buzz
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#8b5cf6]" />
                      <div className="h-2 rounded-full bg-[#8b5cf6]" />
                      <div className="h-2 rounded-full bg-[#8b5cf6]" />
                      <div className="h-2 rounded-full bg-[#8b5cf6]" />
                      <div className="h-2 rounded-full bg-[#8b5cf6] ring-2 ring-offset-1 ring-[#8b5cf6]/30" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Low</span>
                      <span>3 Medium</span>
                      <span>5 High (Peak)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Buzzworthiness
                  </h3>
                  <p className="text-[#515154] text-[14.5px] leading-relaxed">
                    Fosmanogepix is gaining attention as a first-in-class antifungal targeting multidrug-resistant Candida auris and rare molds, supported by two Phase 3 trials and BARDA funding.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      BARDA Federal Grant
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      2 Phase 3 Trials
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      First-in-Class
                    </span>
                  </div>
                </div>
              </div>

              {/* Technology Competition Level */}
              <div id="intel-competition" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Competitive Intensity
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#0071e3]/[0.08] text-[#0071e3]">
                        Level 5 • High Competition
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3] ring-2 ring-offset-1 ring-[#0071e3]/30" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Low</span>
                      <span>3 Medium</span>
                      <span>5 High (Intense)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Technology Competition Level
                  </h3>
                  <p className="text-[#515154] text-[14.5px] leading-relaxed">
                    Fosmanogepix is competing against established antifungal therapies from major pharmaceutical companies. However, the mechanism and broad spectrum activity offer differentiation, particularly for difficult-to-treat infections.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      Broad Spectrum Differentiation
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      Pharma Peer Pressure
                    </span>
                  </div>
                </div>
              </div>

              {/* Revenue Magnitude Potential */}
              <div id="intel-revenue" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Revenue Scale
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#10b981]/[0.08] text-[#10b981]">
                        Level 5 • High Commercial Base
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981]" />
                      <div className="h-2 rounded-full bg-[#10b981] ring-2 ring-offset-1 ring-[#10b981]/30" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Low</span>
                      <span>3 Medium</span>
                      <span>5 High (Established)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Revenue Magnitude Potential
                  </h3>
                  <div className="text-[26px] font-medium text-[#1d1d1f] tracking-tight">$281.7 M</div>
                  <p className="text-[#515154] text-[14.5px] leading-relaxed">
                    Basilea Pharmaceutica's revenue is $281.7 M, establishing a robust commercial footprint and mature distribution capabilities for fosmanogepix upon approval.
                  </p>
                </div>
              </div>

              {/* Investor Lens */}
              <div id="intel-investor" className="scroll-mt-24 bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-7 space-y-5 hover:border-black/[0.15] transition-all">
                {/* Score Header & Gauge */}
                <div className="space-y-3 pb-5 border-b border-black/[0.06]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        Investor Lens
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-[28px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] text-[#86868b] font-normal leading-none">
                          / 5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12.5px] font-medium bg-[#0071e3]/[0.08] text-[#0071e3]">
                        Level 5 • High Institutional Conviction
                      </span>
                    </div>
                  </div>

                  {/* 5-Segment Track */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3]" />
                      <div className="h-2 rounded-full bg-[#0071e3] ring-2 ring-offset-1 ring-[#0071e3]/30" />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-[#86868b] px-0.5">
                      <span>1 Low</span>
                      <span>3 Medium</span>
                      <span>5 High (Conviction)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                    Investor Lens
                  </h3>
                  <p className="text-[#515154] text-[14.5px] leading-relaxed">
                    Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $37 million upfront with up to $110 million in potential commercial sales milestones.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      Pfizer / Amplyx Pedigree
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-black/[0.06] rounded-md text-[12px] font-medium text-[#1d1d1f]">
                      Milestone-De-Risked Structure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analyst's Insights */}
            <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-6 lg:p-8 space-y-4 hover:border-black/[0.15] transition-all">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />
                  <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                    Analyst's Insights
                  </h3>
                </div>
                <span className="text-[12px] font-medium text-[#86868b] bg-white border border-black/[0.06] px-3 py-1 rounded-full">
                  Executive Clinical Briefing
                </span>
              </div>
              <p className="text-[#515154] text-[15.5px] leading-[1.8]">
                Fosmanogepix is Basilea's most advanced clinical-stage antifungal, expanding its portfolio beyond Cresemba through a novel mechanism and broad yeast and mold activity. Its potential against resistant Candida auris, Candida glabrata and rare molds could address unmet needs in difficult-to-treat infections. Oral and intravenous formulations offer flexibility in treatment. Its clinical potential will depend on demonstrating efficacy and safety in the ongoing Phase 3 trials, FAST-IC and FORWARD-IM.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/[0.05]">
                <span className="px-3 py-1 bg-white border border-black/[0.06] rounded-full text-[12.5px] font-medium text-[#1d1d1f]">
                  FAST-IC Trial (Phase 3)
                </span>
                <span className="px-3 py-1 bg-white border border-black/[0.06] rounded-full text-[12.5px] font-medium text-[#1d1d1f]">
                  FORWARD-IM Trial (Phase 3)
                </span>
                <span className="px-3 py-1 bg-white border border-black/[0.06] rounded-full text-[12.5px] font-medium text-[#1d1d1f]">
                  Oral & Intravenous Formulations
                </span>
                <span className="px-3 py-1 bg-white border border-black/[0.06] rounded-full text-[12.5px] font-medium text-[#1d1d1f]">
                  Cresemba Portfolio Synergies
                </span>
              </div>
            </div>
          </section>
'''

start_marker = '          {/* SECTION 3: COMMERCIALIZATION READINESS & RISKS */}'
end_marker = '          {/* SECTION 5: STRATEGIC ANALYSIS & SWOT */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"Error: markers not found! start_idx={start_idx}, end_idx={end_idx}")
    exit(1)

new_content = content[:start_idx] + new_sections + '\n' + content[end_idx:]

with open(r'c:\Users\ARUN ESWARAN\Downloads\Frost Company 360\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated App.jsx successfully!")
