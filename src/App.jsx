import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Share2,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Briefcase,
  TrendingUp,
  X,
  ExternalLink,
  ShieldCheck,
  Building2,
  Layers,
  Activity,
  Cpu,
  BarChart2,
  Check,
  Flame,
  DollarSign,
  Award,
  Compass,
  FileText,
  ArrowRight,
  UserCheck,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('snapshot');
  const [activeSection, setActiveSection] = useState('snapshot');
  const [activeSubSection, setActiveSubSection] = useState('snapshot-about');
  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('mega-cap');

  // Table search filter for debt & offerings
  const [fundingSearch, setFundingSearch] = useState('');
  const [selectedChartRange, setSelectedChartRange] = useState('1y');
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState({ 0: true, 1: false, 2: false, 3: false, 4: false, 5: false });
  const [isScoresExpanded, setIsScoresExpanded] = useState(false);

  // Top Companies Mega-Menu Data
  const menuCategories = [
    {
      id: 'mega-cap',
      name: 'Mega-Cap Tech',
      subsectors: ['Consumer Hardware', 'Cloud Platforms', 'Operating Systems', 'AI & Machine Learning'],
      companies: [
        { name: 'Apple Inc.', ticker: 'Nasdaq: AAPL', cap: '$3.54T', highlight: true },
        { name: 'Microsoft Corp.', ticker: 'Nasdaq: MSFT', cap: '$3.18T' },
        { name: 'Alphabet Inc.', ticker: 'Nasdaq: GOOGL', cap: '$2.15T' },
        { name: 'Amazon.com Inc.', ticker: 'Nasdaq: AMZN', cap: '$1.98T' },
        { name: 'Meta Platforms', ticker: 'Nasdaq: META', cap: '$1.42T' },
      ],
      tiers: ['Trillion-Dollar Club', 'S&P 100 Leader', 'Global Rank #1-#5', 'Institutional Core']
    },
    {
      id: 'semiconductors',
      name: 'Semiconductors & AI',
      subsectors: ['GPU Accelerators', 'Foundry & Lithography', 'Networking Silicon', 'Memory & Storage'],
      companies: [
        { name: 'NVIDIA Corp.', ticker: 'Nasdaq: NVDA', cap: '$3.22T' },
        { name: 'Taiwan Semiconductor', ticker: 'NYSE: TSM', cap: '$880B' },
        { name: 'Broadcom Inc.', ticker: 'Nasdaq: AVGO', cap: '$780B' },
        { name: 'ASML Holding', ticker: 'Nasdaq: ASML', cap: '$340B' },
        { name: 'Qualcomm Inc.', ticker: 'Nasdaq: QCOM', cap: '$185B' },
      ],
      tiers: ['AI Infrastructure', 'Critical Fab', 'High Gross Margin', 'Fabless Design']
    },
    {
      id: 'cloud',
      name: 'Enterprise Cloud & SaaS',
      subsectors: ['Database Infrastructure', 'CRM & Workflow', 'Cybersecurity', 'ERP & Analytics'],
      companies: [
        { name: 'Oracle Corp.', ticker: 'NYSE: ORCL', cap: '$460B' },
        { name: 'Salesforce Inc.', ticker: 'NYSE: CRM', cap: '$290B' },
        { name: 'SAP SE', ticker: 'NYSE: SAP', cap: '$260B' },
        { name: 'ServiceNow Inc.', ticker: 'NYSE: NOW', cap: '$180B' },
        { name: 'Palo Alto Networks', ticker: 'Nasdaq: PANW', cap: '$110B' },
      ],
      tiers: ['High Net Retention', 'B2B Enterprise', 'Recurring Revenue', 'Rule of 40']
    },
    {
      id: 'mobility',
      name: 'Electric Vehicles & Auto',
      subsectors: ['Battery Technology', 'Autonomous Driving', 'Commercial Fleet', 'OEM Manufacturing'],
      companies: [
        { name: 'Tesla Inc.', ticker: 'Nasdaq: TSLA', cap: '$720B' },
        { name: 'Toyota Motor', ticker: 'NYSE: TM', cap: '$280B' },
        { name: 'BYD Company', ticker: 'HKG: 1211', cap: '$98B' },
        { name: 'Ferrari N.V.', ticker: 'NYSE: RACE', cap: '$78B' },
        { name: 'General Motors', ticker: 'NYSE: GM', cap: '$52B' },
      ],
      tiers: ['EV Transition', 'Fleet Scale', 'Global Automotive', 'Autonomy Tier 1']
    },
    {
      id: 'financials',
      name: 'Global Financials & Banking',
      subsectors: ['Investment Banking', 'Payment Networks', 'Asset Management', 'Retail Banking'],
      companies: [
        { name: 'JPMorgan Chase', ticker: 'NYSE: JPM', cap: '$580B' },
        { name: 'Visa Inc.', ticker: 'NYSE: V', cap: '$540B' },
        { name: 'Mastercard Inc.', ticker: 'NYSE: MA', cap: '$420B' },
        { name: 'Bank of America', ticker: 'NYSE: BAC', cap: '$310B' },
        { name: 'Morgan Stanley', ticker: 'NYSE: MS', cap: '$165B' },
      ],
      tiers: ['Systemically Important', 'Global Payments', 'Tier 1 Capital', 'Top Underwriters']
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      subsectors: ['Biopharma', 'Medical Devices', 'Diagnostics', 'Health Insurance'],
      companies: [
        { name: 'Eli Lilly & Co.', ticker: 'NYSE: LLY', cap: '$780B' },
        { name: 'Novo Nordisk', ticker: 'NYSE: NVO', cap: '$510B' },
        { name: 'Johnson & Johnson', ticker: 'NYSE: JNJ', cap: '$370B' },
        { name: 'Merck & Co.', ticker: 'NYSE: MRK', cap: '$270B' },
        { name: 'AbbVie Inc.', ticker: 'NYSE: ABBV', cap: '$310B' },
      ],
      tiers: ['Clinical Pipeline', 'FDA Approvals', 'Global Pharma', 'Patent Protected']
    }
  ];

  const activeCategoryData = menuCategories.find(c => c.id === selectedCategory) || menuCategories[0];

  // Navigation sections list with nested subsections for dropdown accordion
  const navSections = [
    {
      id: 'scores-overview',
      label: 'Evaluation Scores',
    },
    {
      id: 'about-company',
      label: 'About the Company',
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
        { id: 'strat-swot', label: 'Strategic Analysis' },
        { id: 'strat-ip', label: 'IP / Patent Activity' },
        { id: 'strat-future', label: 'Future Focus Areas' },
      ]
    },
  ];

    // Scroll spy to highlight active section & manage sticky freeze
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      const targetOffset = 100;

      // Check if near bottom of document (Strategic Analysis)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('strategic-analysis');
        setActiveSubSection('strat-patents');
        return;
      }

      // Determine active section based on viewport position
      let currentSection = navSections[0].id;
      for (let i = 0; i < navSections.length; i++) {
        const sec = navSections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetOffset) {
            currentSection = sec.id;
          }
        }
      }
      setActiveSection(currentSection);

      // Determine active subsection within currentSection
      const secData = navSections.find((s) => s.id === currentSection);
      if (secData && secData.subsections && secData.subsections.length > 0) {
        let currentSub = secData.subsections[0].id;
        for (let j = 0; j < secData.subsections.length; j++) {
          const sub = secData.subsections[j];
          const subEl = document.getElementById(sub.id);
          if (subEl) {
            const subRect = subEl.getBoundingClientRect();
            if (subRect.top <= targetOffset + 60) {
              currentSub = sub.id;
            }
          }
        }
        setActiveSubSection(currentSub);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTarget = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -88;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    scrollToTarget(id);
  };

  const handleSectionClick = (sectionId, hasSubs) => {
    setActiveSection(sectionId);
    if (hasSubs) {
      setExpandedSectionId((prev) => (prev === sectionId ? null : sectionId));
    } else {
      setExpandedSectionId(null);
    }
    scrollToTarget(sectionId);
  };

  const handleSubSectionClick = (e, subId) => {
    e.stopPropagation();
    setActiveSubSection(subId);
    scrollToTarget(subId);
  };

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleFaq = (index) => {
    setExpandedFaq((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Apple Public Offerings & Debt Issuances Data (Crisp, real figures)
  const offeringsData = [
    {
      date: '2023-05-08',
      name: 'Apple Inc. $5.25B Senior Notes Offering',
      investors: 'Institutional',
      raised: '$5,250,000,000',
      lead: 'Goldman Sachs, BofA Securities, Barclays',
      type: 'Senior Notes / Green Bond'
    },
    {
      date: '2022-08-01',
      name: 'Apple Inc. $5.5B 4-Tranche Senior Notes',
      investors: 'Institutional',
      raised: '$5,500,000,000',
      lead: 'Morgan Stanley, J.P. Morgan, Goldman Sachs',
      type: 'Senior Corporate Notes'
    },
    {
      date: '2021-07-29',
      name: 'Apple Inc. $6.5B Multi-Tranche Notes',
      investors: 'Institutional',
      raised: '$6,500,000,000',
      lead: 'Goldman Sachs, Deutsche Bank',
      type: 'Senior Corporate Debt'
    },
    {
      date: '2020-05-04',
      name: 'Apple Inc. $8.5B 4-Part Bond Sale',
      investors: 'Institutional',
      raised: '$8,500,000,000',
      lead: 'BofA Securities, Barclays, Goldman Sachs',
      type: 'Senior Notes'
    },
    {
      date: '1980-12-12',
      name: 'Apple Computer Inc. Initial Public Offering',
      investors: 'Public Markets',
      raised: '$100,000,000',
      lead: 'Morgan Stanley, Hambrecht & Quist',
      type: 'Initial Public Offering (Nasdaq: Apple)'
    }
  ];

  const filteredOfferings = offeringsData.filter(item =>
    item.name.toLowerCase().includes(fundingSearch.toLowerCase()) ||
    item.type.toLowerCase().includes(fundingSearch.toLowerCase()) ||
    item.lead.toLowerCase().includes(fundingSearch.toLowerCase())
  );

  // Marquee Apple Acquisitions (Documented acquisitions, real deal values)
  const acquisitionsData = [
    {
      name: 'Beats Electronics & Beats Music',
      date: '2014-05-28',
      price: '$3,000,000,000',
      desc: 'Formed foundation of Apple Music streaming service & premium audio engineering'
    },
    {
      name: 'Intel Smartphone Modem Business',
      date: '2019-07-25',
      price: '$1,000,000,000',
      desc: 'Acquired 17,000+ wireless patents and 2,200 engineers to develop in-house 5G/6G basebands'
    },
    {
      name: 'NeXT Computer',
      date: '1996-12-20',
      price: '$429,000,000',
      desc: 'Brought Steve Jobs back to Apple and became architectural core of macOS and iOS'
    },
    {
      name: 'Shazam Entertainment',
      date: '2017-12-11',
      price: '$400,000,000',
      desc: 'Integrated machine audition & music identification natively into iOS, Siri, and Apple Music'
    },
    {
      name: 'AuthenTec',
      date: '2012-07-27',
      price: '$356,000,000',
      desc: 'Fingerprint hardware sensor tech that created Apple Touch Id biometric authentication'
    },
    {
      name: 'P.A. Semi (Personal Computer Ant)',
      date: '2008-04-23',
      price: '$278,000,000',
      desc: 'Assembled founding microprocessor engineering team behind Apple Silicon A-series and M-series chips'
    },
    {
      name: 'Siri Inc.',
      date: '2010-04-28',
      price: '$200,000,000',
      desc: 'Voice assistant artificial intelligence integrated directly into iOS beginning with iPhone 4S'
    },
    {
      name: 'Beddit Oy',
      date: '2017-05-08',
      price: 'Undisclosed',
      desc: 'Ballistocardiography and sleep-tracking sensor patents integrated into Apple Health'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] text-[14.5px] flex flex-col font-['Inter',sans-serif] antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Top Navigation Bar — Frost 360 Header with Dropdown Mega-Menu */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/[0.08] transition-all">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-6">
          {/* Left: Frost 360 Brand */}
          <div className="flex items-center flex-shrink-0">
            {/* Frost 360 Brand Logotype (FROST in Full Capitals Black, 360 in Vibrant Blue, 24px, 800 weight, FROST360) */}
            <a href="#" className="flex items-center group flex-shrink-0 py-0.5" aria-label="Frost 360 Home">
              <span className="font-brand-logo font-['Inter'] text-[24px] font-[800] tracking-tight leading-none select-none flex items-center">
                <span className="text-[#1d1d1f]">FROST</span>
                <span className="text-[#0071e3]">360</span>
              </span>
            </a>
          </div>

          {/* Middle: Clean Minimalist Search Bar with Advance Search on its right */}
          <div className="flex items-center gap-4 flex-1 max-w-[720px]">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#86868b]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search companies, markets, filings..."
                className="w-full pl-11 pr-4 py-2 bg-[#f5f5f7] hover:bg-[#ebebee] focus:bg-white text-[14px] text-[#1d1d1f] placeholder-[#86868b] border border-transparent focus:border-[#0071e3]/40 rounded-full transition-all outline-none"
              />
            </div>

            {/* Advance Search Button in Search Bar Color Style Without Stroke */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] font-medium transition-all cursor-pointer select-none whitespace-nowrap border-0 outline-none active:scale-[0.98] ${
                isMenuOpen
                  ? 'bg-[#ebebee] text-[#0071e3]'
                  : 'bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f]'
              }`}
              aria-expanded={isMenuOpen}
            >
              <span>Advance Search</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-[#0071e3]' : 'text-[#86868b]'}`} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Frost Pro Button on Left Side */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[14px] font-medium rounded-full shadow-xs transition-all cursor-pointer active:scale-[0.98]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Frost Pro</span>
            </button>

            {/* Log In Button (Button Type) */}
            <button
              type="button"
              className="px-4.5 py-2 bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f] text-[14px] font-medium rounded-full border border-black/[0.08] transition-all cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mega-Menu Dropdown Panel */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-black/[0.1] shadow-2xl z-40 transition-all animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-8 grid grid-cols-12 gap-8 items-start">
              {/* Column 1: Sectors & Verticals List */}
              <div className="col-span-12 lg:col-span-3 space-y-1 pr-4 border-r border-black/[0.06]">
                <div className="text-[13px] font-medium text-[#86868b] mb-3 px-3">
                  Sectors & Verticals
                </div>
                {menuCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    onMouseEnter={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14.5px] transition-all text-left cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#f5f5f7] font-medium text-[#1d1d1f]'
                        : 'text-[#515154] hover:bg-[#fafafc] hover:text-[#1d1d1f]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-colors ${selectedCategory === cat.id ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`} />
                  </button>
                ))}
              </div>

              {/* Middle 3 Columns: Categories, Top Companies (clean single-line, no sublines), and Market Tier */}
              <div className="col-span-12 lg:col-span-6 grid grid-cols-3 gap-6 pr-4 border-r border-black/[0.06]">
                {/* Sub-column 1: Categories / Subsectors */}
                <div>
                  <div className="text-[13px] font-medium text-[#86868b] mb-3">
                    Categories
                  </div>
                  <div className="space-y-1.5">
                    {activeCategoryData.subsectors.map((sub, idx) => (
                      <div
                        key={idx}
                        className="text-[14px] text-[#515154] hover:text-[#0071e3] transition-colors py-1 cursor-pointer"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-column 2: Top Companies / Brands (clean unwrapped text list, no button wrapping) */}
                <div>
                  <div className="text-[13px] font-medium text-[#86868b] mb-3">
                    Top Companies
                  </div>
                  <div className="space-y-1.5">
                    {activeCategoryData.companies.map((company, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (company.name.includes('Apple')) {
                            setIsMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="text-[14px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors py-1 cursor-pointer"
                      >
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-column 3: Market Tier */}
                <div>
                  <div className="text-[13px] font-medium text-[#86868b] mb-3">
                    Market Tier
                  </div>
                  <div className="space-y-1.5">
                    {activeCategoryData.tiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className="text-[14px] text-[#515154] hover:text-[#1d1d1f] transition-colors py-1 cursor-pointer"
                      >
                        {tier}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: The Blue Card Ad — "Get Frost 360 Pro" (Solid Blue, No Gradient, No Overloaded Boxes, Slim Width, No Badge Text) */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-[#0071e3] rounded-[24px] p-6 text-white shadow-md flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <h3 className="text-[22px] font-medium tracking-tight text-white leading-snug">
                      Get Frost 360 Pro
                    </h3>
                    <p className="text-white/90 text-[13.5px] leading-relaxed">
                      Institutional financial intelligence, real-time SEC filing disclosures, and unrestricted account exports.
                    </p>
                  </div>

                  {/* Clean Call to Action Button & Microcopy */}
                  <div className="pt-6 space-y-2">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 bg-white text-[#0071e3] hover:bg-[#f5f5f7] rounded-full font-medium text-[14px] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <span>Unlock Pro Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-center text-[11.5px] text-white/80">
                      14-day free trial • Cancel anytime • No credit card needed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Layout Container */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-8 flex-1 w-full flex gap-10 bg-white">
        {/* Left Sticky Sidebar: Apple Inc. Profile Card (Collapsible on Scroll) + Navigation Menu Below */}
        <aside className="w-[340px] flex-shrink-0 hidden lg:block sticky top-[84px] self-start max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none space-y-6">
          {/* TwoStep Therapeutics Company Detail Section in Sidebar (340px width with generous breathing space & proper height, flat styling without drop shadows) */}
          <div className="bg-[#fbfbfd] border border-black/[0.08] rounded-[22px] p-4 transition-all duration-300">
            {/* Header / Primary Identity: Logo on top (100px), moves to left (48px) with name & website on the right when collapsed */}
            <div className={`transition-all duration-300 ${
              isScrolled ? 'flex items-center gap-3.5' : 'flex flex-col space-y-3'
            }`}>
              <div
                className={`bg-[#111827] flex items-center justify-center flex-shrink-0 select-none transition-all duration-300 overflow-hidden ${
                  isScrolled ? 'w-[48px] h-[48px] rounded-[13px] p-2' : 'w-[100px] h-[100px] rounded-[20px] p-3.5'
                }`}
              >
                <img
                  src="/twostep-icon.png"
                  alt="TwoStep Therapeutics"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Company Name (17px always) + Verification Checkmark */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <h1 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight truncate leading-tight">
                    TwoStep Therapeutics
                  </h1>
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#0071e3] fill-[#0071e3] text-white flex-shrink-0" />
                </div>

                {/* Directly below company name: Website link & Share action */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <a
                    href="https://www.twosteptx.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] text-[#0071e3] hover:underline font-medium truncate"
                  >
                    www.twosteptx.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyShare}
                    title="Share profile"
                    className="p-1 rounded-full hover:bg-black/[0.05] text-[#1d1d1f] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Share2 className="w-4 h-4 text-[#1d1d1f]" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Key Metrics — Unwrapped into ONE single box with black right-side contents */}
            <div className="pt-3.5 border-t border-black/[0.06] mt-3.5">
              <div className="bg-white rounded-[14px] border border-black/[0.06] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#86868b]">Stage</span>
                  <span className="font-medium text-[#1d1d1f]">Series A ($71.2M)</span>
                </div>

                <div className="flex items-center justify-between text-[13px] pt-2 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Total Funding</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                    <span>$71.2 M</span>
                    <span className="text-[12px]">Series A</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[13px] pt-2 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Targeting Lead</span>
                  <span className="font-medium text-[#1d1d1f]">#1 Knottin PIP</span>
                </div>

                <div className="flex items-center justify-between text-[13px] pt-2 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Readiness</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                    <span>Phase 3 (2028)</span>
                    <span className="text-[12px]">Level 3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Metadata Details — Hide this only when page is scrolled */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isScrolled
                  ? 'max-h-0 opacity-0 mt-0 pointer-events-none'
                  : 'max-h-[500px] opacity-100 mt-4 space-y-3 text-[13px] text-[#6e6e73] pt-4 border-t border-black/[0.06]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Technology</span>
                <span className="font-medium text-[#1d1d1f] text-right">Peptide-conjugate therapeutics</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Type of Ownership</span>
                <span className="font-medium text-[#1d1d1f] text-right">Private</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Year Founded</span>
                <span className="font-medium text-[#1d1d1f] text-right">2024</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Headquarters</span>
                <span className="font-medium text-[#1d1d1f] text-right">San Carlos, California</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Key Markets</span>
                <span className="font-medium text-[#1d1d1f] text-right">United States</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">Annual Revenue</span>
                <span className="font-medium text-[#1d1d1f] text-right">NA</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#86868b]">No. of Employees</span>
                <span className="font-medium text-[#1d1d1f] text-right">2-10</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Below Company Details — On Click Reveal Only, Pure Typography, Zero Button Feel */}
          <nav className="space-y-3 pt-2">
            {navSections.map((section) => {
              const isExpanded = expandedSectionId === section.id;
              const isActive = activeSection === section.id;
              const hasSubs = section.subsections && section.subsections.length > 0;

              return (
                <div key={section.id} className="space-y-1">
                  {/* Main Section Header Link (Pure Typography, Zero Button Feel) */}
                  <button
                    type="button"
                    onClick={() => handleSectionClick(section.id, hasSubs)}
                    className={`w-full text-left text-[14.5px] transition-colors flex items-center justify-between cursor-pointer py-1 font-medium ${
                      isActive
                        ? 'text-[#0071e3]'
                        : 'text-[#1d1d1f] hover:text-[#0071e3]'
                    }`}
                  >
                    <span className="truncate">{section.label}</span>
                    {hasSubs && (
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ml-2 ${
                          isExpanded ? 'rotate-90 text-[#0071e3]' : 'text-[#86868b]'
                        }`}
                      />
                    )}
                  </button>

                  {/* Subsections: ONLY Shown Inside When Clicked / Expanded */}
                  {hasSubs && isExpanded && (
                    <div className="pl-4 space-y-1.5 py-1 transition-all duration-200 ease-in-out">
                      {section.subsections.map((sub) => {
                        const isSubActive = activeSubSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={(e) => handleSubSectionClick(e, sub.id)}
                            className={`w-full text-left text-[13.5px] transition-colors block cursor-pointer py-0.5 ${
                              isSubActive
                                ? 'text-[#0071e3] font-medium'
                                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Right / Main Content Column (Expands to fill available container width without right-side gap) */}
        <main className="flex-1 min-w-0 space-y-14 lg:space-y-16">
          {/* Mobile Header Card (Visible only on screens below lg) */}
          <div className="lg:hidden bg-[#fbfbfd] border border-black/[0.08] rounded-[20px] p-4 space-y-3">
            <div className="w-[100px] h-[100px] rounded-[20px] bg-[#111827] flex items-center justify-center select-none overflow-hidden p-3.5">
              <img
                src="/twostep-icon.png"
                alt="TwoStep Therapeutics"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 min-w-0">
                <h1 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight truncate leading-tight">
                  TwoStep Therapeutics
                </h1>
                <CheckCircle2 className="w-[18px] h-[18px] text-[#0071e3] fill-[#0071e3] text-white flex-shrink-0" />
              </div>

              {/* Below company name: Website link and Share action */}
              <div className="flex items-center justify-between gap-2 mt-1">
                <a
                  href="https://www.twosteptx.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#0071e3] hover:underline font-medium truncate"
                >
                  www.twosteptx.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyShare}
                  title="Share profile"
                  className="p-1 rounded-full hover:bg-black/[0.05] text-[#1d1d1f] transition-colors cursor-pointer flex-shrink-0"
                >
                  <Share2 className="w-4 h-4 text-[#1d1d1f]" />
                </button>
              </div>
            </div>

            {/* 4 Key Metrics — Unwrapped into ONE single box with black right-side contents */}
            <div className="pt-2 border-t border-black/[0.06]">
              <div className="bg-white rounded-[12px] border border-black/[0.06] p-3 space-y-2">
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="text-[#86868b]">Stage</span>
                  <span className="font-medium text-[#1d1d1f]">Series A ($71.2M)</span>
                </div>
                <div className="flex items-center justify-between text-[12.5px] pt-1.5 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Total Funding</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                    <span>$71.2M</span>
                    <span className="text-[11.5px]">Series A</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[12.5px] pt-1.5 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Targeting Lead</span>
                  <span className="font-medium text-[#1d1d1f]">#1 Knottin PIP</span>
                </div>
                <div className="flex items-center justify-between text-[12.5px] pt-1.5 border-t border-black/[0.04]">
                  <span className="text-[#86868b]">Readiness</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                    <span>Phase 3 (2028)</span>
                    <span className="text-[11.5px]">Level 3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[12.5px] text-[#6e6e73] pt-2 border-t border-black/[0.06]">
              <div>Technology: <span className="font-medium text-[#1d1d1f]">Peptide-conjugate therapeutics</span></div>
              <span>•</span>
              <div><span className="font-medium text-[#1d1d1f]">Private</span> (Series A)</div>
              <span>•</span>
              <div>Founded <span className="font-medium text-[#1d1d1f]">2024</span></div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#86868b]" />
                <span>San Carlos, California</span>
              </div>
              <span>•</span>
              <div>Key Markets: <span className="font-medium text-[#1d1d1f]">United States</span></div>
              <span>•</span>
              <div>Revenue: <span className="font-medium text-[#1d1d1f]">NA</span></div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#86868b]" />
                <span>2-10 Employees</span>
              </div>
            </div>
          </div>

          {/* TOP SCORE OVERVIEW STRIP — Clean Bento Grid without badge colors or circle wraps */}
          <section id="scores-overview" className="scroll-mt-24 space-y-4">
            <h2 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
              Evaluation Scores
            </h2>

            {/* Master Bento Container */}
            <div className="bg-white border border-black/[0.08] rounded-[24px] overflow-hidden">
              {/* Upper Section: Hero on Left + 2x2 Grid on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.08]">
                {/* HERO CARD: Commercialization Readiness (col-span-5) */}
                <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[16px] font-medium text-[#1d1d1f] tracking-tight">
                        Commercialization Readiness
                      </span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#2563eb] shrink-0">
                        <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                        <span>Readout in 2028</span>
                      </div>
                    </div>

                    {/* Display Score */}
                    <div className="flex items-baseline gap-1 mt-3 mb-1">
                      <span className="text-[52px] sm:text-[60px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                        3
                      </span>
                      <span className="text-[20px] font-normal text-[#86868b] ml-1">/ 5</span>
                    </div>

                    {/* Custom Readiness Area Graph (matching reference design: ramp up, plateau, dashed guide & dot) */}
                    <div className="mt-2 -mb-2 max-w-full" style={{ width: '377.09px' }}>
                      <svg
                        viewBox="0 0 377.09 90"
                        className="h-[90px] sm:h-[105px] overflow-visible"
                        style={{ width: '377.09px', maxWidth: '100%' }}
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="readiness-area-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Shaded Area Fill — exactly 377.09px width */}
                        <path
                          d="M 0,75 L 85,36 C 105,24 130,24 160,24 L 377.09,24 L 377.09,88 L 0,88 Z"
                          fill="url(#readiness-area-gradient)"
                        />

                        {/* Main Trend Line — exactly 377.09px width matching Application Potential 3px thickness */}
                        <path
                          d="M 0,75 L 85,36 C 105,24 130,24 160,24 L 377.09,24"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Vertical Dashed Target Guide */}
                        <line
                          x1="373.5"
                          y1="24"
                          x2="373.5"
                          y2="8"
                          stroke="#2563eb"
                          strokeWidth="1.5"
                          strokeDasharray="2.5 2.5"
                        />

                        {/* Milestone Target Dot */}
                        <circle cx="373.5" cy="8" r="3.5" fill="#2563eb" />
                      </svg>
                    </div>
                  </div>

                  {/* Hero narrative description */}
                  <p className="text-[13px] text-[#86868b] leading-[1.65] mt-4 pt-4 border-t border-black/[0.04]">
                    Basilea expects phase 3 data readout and regulatory submission in 2028. Hence, the product is at an <span className="text-[#1d1d1f] font-medium">advanced clinical-stage</span>, pre-approval readiness level.
                  </p>
                </div>

                {/* 2x2 GRID (col-span-7) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-black/[0.08] bg-white">
                  {/* Risks (Top-Left) */}
                  <div className="p-6 border-b sm:border-r border-black/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Risks</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#0284c7] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>Medium</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#0284c7]/15 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#0284c7] rounded-full" style={{ width: '60%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          3
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      Novel Gwt1-inhibition & rare mould heterogeneity
                    </div>
                  </div>

                  {/* Regional Impact (Top-Right) */}
                  <div className="p-6 border-b border-black/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Regional Impact</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a958] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#00a958] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#00a958]/20 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#00a958] rounded-full" style={{ width: '80%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          4
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      North America & Europe primary priority markets
                    </div>
                  </div>

                  {/* Application Potential (Bottom-Left) */}
                  <div className="p-6 border-b sm:border-b-0 sm:border-r border-black/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Application Potential</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ec4899] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#ec4899] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↓</span>
                          <span>Medium</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#ec4899]/15 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#ec4899] rounded-full" style={{ width: '60%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          3
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      Candida auris, Lomentosporiosis & Mucormycosis
                    </div>
                  </div>

                  {/* Buzzworthiness (Bottom-Right) */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Buzzworthiness</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#8b5cf6] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#8b5cf6]/15 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: '100%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      First-in-class antifungal with Phase 3 & BARDA support
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: 3-Column Connected Row — Hidden by default, shown when expanded */}
              {isScoresExpanded && (
                <div className="border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] bg-white transition-all">
                  {/* Technology Competition */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Technology Competition</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#6366f1] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#6366f1]/15 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#6366f1] rounded-full" style={{ width: '100%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      Broad-spectrum differentiation against pharma incumbents
                    </div>
                  </div>

                  {/* Revenue Magnitude Potential */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Revenue Magnitude Potential</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a958] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#00a958] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#00a958]/20 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#00a958] rounded-full" style={{ width: '100%' }} />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[32px] sm:text-[36px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          $281.7 M
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b]">(5 / 5)</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      Basilea Pharmaceutica annual commercial revenue
                    </div>
                  </div>

                  {/* Investor Lens */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">Investor Lens</span>
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#2563eb] shrink-0">
                          <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-[#2563eb]/15 rounded-full overflow-hidden mt-3 mb-4" style={{ height: '3px' }}>
                        <div className="h-full bg-[#2563eb] rounded-full" style={{ width: '100%' }} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[36px] sm:text-[40px] font-medium text-[#1d1d1f] tracking-tight leading-none">
                          5
                        </span>
                        <span className="text-[14px] font-normal text-[#86868b] ml-1">/ 5</span>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#86868b] mt-3">
                      $37M upfront with up to $110M milestone potential
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Expand/Collapse Bar */}
              <div className="border-t border-black/[0.08] bg-[#fbfbfd]">
                <button
                  type="button"
                  onClick={() => setIsScoresExpanded(!isScoresExpanded)}
                  className="w-full py-2.5 px-6 flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#1d1d1f] hover:bg-black/[0.02] cursor-pointer transition-colors"
                >
                  <span>{isScoresExpanded ? 'Collapse additional metrics' : 'Expand additional metrics (Technology Competition, Revenue, Investor Lens)'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#86868b] transition-transform duration-200 ${isScoresExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 1: ABOUT THE COMPANY */}
          <section id="about-company" className="scroll-mt-24 pt-6 pb-16 border-b border-black/[0.08] space-y-4">
            <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
              About the Company
            </h2>
            <p className="text-[#3a3a3c] text-[16px] leading-[1.8] max-w-[920px]">
              TwoSteps Therapeutics is a clinical-stage biotechnology company developing a pipeline of versatile targeting peptides that selectively bind to multiple tumor-associated integrins, a unique feature that enables it to deliver various payloads to virtually any solid tumor. The company's foundational technology is based on research at Stanford University in the labs of researchers Jennifer Cochran, Ron Levy, and Nobel Laureate Carolyn Bertozzi.
            </p>
          </section>

          {/* SECTION 2: TECHNOLOGY PLATFORM */}
          <section id="technology" className="scroll-mt-24 py-16 border-b border-black/[0.08] space-y-12">
            {/* What Problem Does the Technology Solve? */}
            <div id="tech-problem" className="scroll-mt-24 space-y-3.5">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                What Problem Does the Technology Solve?
              </h3>
              <p className="text-[#3a3a3c] text-[15.5px] leading-[1.8] max-w-[920px]">
                Most tumor-targeted therapies rely on a single cell-surface target, but solid tumors exhibit significant variability in target expression across tumor types, patients, and even within individual tumors. This heterogeneity limits patient selection and may allow certain tumor cells to evade treatment. In contrast, TwoStep employs a polyspecific integrin-binding peptide (PIP) as a more versatile targeting component in its therapies, enabling broader tumor coverage, improved targeting precision, and the potential to deliver therapeutic payloads across a wide range of solid tumors.
              </p>
            </div>

            {/* Technology Snapshot */}
            <div id="tech-snapshot" className="scroll-mt-24 space-y-3.5">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Technology Snapshot
              </h3>
              <p className="text-[#3a3a3c] text-[15.5px] leading-[1.8] max-w-[920px]">
                TwoStep Therapeutics has developed an engineered ultra-stable knottin polyspecific integrin-binding peptide (PIP) to be used as targeting component it its therapies. PIP is a small, synthetic peptide that targets five tumor-associated integrins expressed across a broad range of solid tumors.
              </p>
            </div>

            {/* Technology Attributes */}
            <div id="tech-attributes" className="scroll-mt-24 space-y-4">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Technology Attributes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-2 border-l-2 border-black/[0.12] pl-4">
                  <h4 className="text-[16px] font-medium text-[#1d1d1f]">
                    Multi-specific Integrin Targeting
                  </h4>
                  <p className="text-[#515154] text-[14.5px] leading-[1.75]">
                    PIP can target multiple antigens rather than depending on single antigen expression. This increases tumour recognition and improves consistency in identifying heterogeneous tumors.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-black/[0.12] pl-4">
                  <h4 className="text-[16px] font-medium text-[#1d1d1f]">
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
          <section id="commercialization" className="scroll-mt-24 py-16 border-b border-black/[0.08] space-y-12">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
                Commercialization Readiness & Risks
              </h2>
            </div>

            {/* Commercialization Readiness Level */}
            <div id="comm-readiness" className="scroll-mt-24 bg-white border border-black/[0.08] rounded-[18px] p-6 lg:p-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight">
                  Commercialization Readiness Level
                </h3>
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#2563eb]">
                  <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                  <span>Level 3 of 5 (Readout in 2028)</span>
                </div>
              </div>

              {/* Horizontal Stepper — Mathematically centered */}
              <div className="py-2">
                <div className="relative max-w-[650px]">
                  {/* Connecting Line — precisely centered through the 32px circles at top: 16px */}
                  <div className="absolute left-10 right-10 top-4 -translate-y-1/2 h-[2px] bg-black/[0.08]">
                    <div className="h-full bg-[#2563eb]" style={{ width: '50%' }} />
                  </div>
                  
                  <div className="relative flex items-start justify-between">
                    {[
                      { step: 1, label: 'Stage 1' },
                      { step: 2, label: 'Stage 2' },
                      { step: 3, label: 'Current (3)' },
                      { step: 4, label: 'Stage 4' },
                      { step: 5, label: 'Stage 5' },
                    ].map(({ step, label }) => {
                      const isPassed = step < 3;
                      const isCurrent = step === 3;
                      return (
                        <div key={step} className="flex flex-col items-center z-10 w-20 text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[12.5px] font-medium transition-all ring-4 ring-white ${
                              isCurrent
                                ? 'bg-[#2563eb] text-white shadow-[0_0_0_2px_rgba(37,99,235,0.25)]'
                                : isPassed
                                ? 'bg-[#dbeafe] text-[#2563eb]'
                                : 'bg-white border border-black/[0.18] text-[#86868b]'
                            }`}
                          >
                            {step}
                          </div>
                          <span
                            className={`text-[12px] mt-2 font-medium tracking-tight ${
                              isCurrent ? 'text-[#2563eb] font-semibold' : 'text-[#86868b]'
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-black/[0.06] text-[#515154] text-[14.5px] leading-[1.75]">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] mt-2 shrink-0" />
                  <p>Basilea expects phase 3 data readout and regulatory submission in 2028.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] mt-2 shrink-0" />
                  <p>Hence, the product at an advanced clinical-stage, pre-approval readiness level.</p>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div id="comm-risks" className="scroll-mt-24 bg-white border border-black/[0.08] rounded-[18px] p-6 lg:p-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight">
                  Risks
                </h3>
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#0284c7]">
                  <span className="w-4 h-4 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                  <span>Medium (Score: 3 / 5)</span>
                </div>
              </div>

              {/* Spectrum — Correctly structured without clipping */}
              <div className="space-y-3 py-1 max-w-[650px]">
                <div className="relative pt-3 pb-1">
                  <div className="grid grid-cols-3 gap-1.5 h-2.5 rounded-full">
                    <div className="bg-[#0284c7]/15 rounded-l-full" />
                    <div className="bg-[#0284c7]/40" />
                    <div className="bg-black/[0.08] rounded-r-full" />
                  </div>
                  {/* Indicator marker pin centered on middle 'Medium' bar */}
                  <div className="absolute left-1/2 top-1.5 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#0284c7] ring-2 ring-white shadow-sm" />
                  </div>
                </div>

                <div className="flex justify-between text-[12px] font-medium text-[#86868b]">
                  <span>Low (1 - 2)</span>
                  <span className="text-[#0284c7] font-semibold">Medium (3) • Active</span>
                  <span>High (4 - 5)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06]">
                <p className="text-[#515154] text-[14.5px] leading-[1.75] max-w-[920px]">
                  The novel Gwt1-inhibition mechanism may not deliver sufficient clinical benefit or an acceptable safety profile in the ongoing phase 3 studies of invasive candidiasis and invasive mould infections, particularly given the heterogeneity of rare mould infections and salvage-treatment populations.
                </p>
              </div>
            </div>

            {/* Regional Impact & Application Potential Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-black/[0.06]">
              {/* Regional Impact */}
              <div id="comm-impact" className="scroll-mt-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight">
                    Regional Impact
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a958]">
                    <span className="w-4 h-4 rounded-full bg-[#00a958] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                    <span>Score: 4 / 5 (High)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                    <span className="text-[14.5px] font-medium text-[#1d1d1f]">North America</span>
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00a958]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00a958]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00a958]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00a958]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.1]" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#00a958] bg-[#00a958]/10 px-2.5 py-0.5 rounded-full">High</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                    <span className="text-[14.5px] font-medium text-[#1d1d1f]">Europe</span>
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.1]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/[0.1]" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#0284c7] bg-[#0284c7]/10 px-2.5 py-0.5 rounded-full">Medium</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-[#86868b]">
                  <span>Low</span>
                  <span className="text-[#0284c7] font-semibold">Medium</span>
                  <span className="text-[#00a958] font-semibold">High</span>
                </div>
              </div>

              {/* Application Potential */}
              <div id="comm-applications" className="scroll-mt-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight">
                    Application Potential
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ec4899]">
                    <span className="w-4 h-4 rounded-full bg-[#ec4899] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↓</span>
                    <span>Score: 3 / 5 (Medium)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[13px] font-medium text-[#86868b]">Target Infections:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-black/[0.04] rounded-md text-[13px] font-medium text-[#1d1d1f]">
                      Candida auris infections
                    </span>
                    <span className="px-2.5 py-1 bg-black/[0.04] rounded-md text-[13px] font-medium text-[#1d1d1f]">
                      Lomentosporiosis
                    </span>
                    <span className="px-2.5 py-1 bg-black/[0.04] rounded-md text-[13px] font-medium text-[#1d1d1f]">
                      Mucormycosis
                    </span>
                  </div>
                </div>

                <p className="text-[13.5px] text-[#515154] leading-relaxed pt-1">
                  Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $ 37 million upfront with up to $110 million in potential commercial sales milestones.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: MARKET INTELLIGENCE */}
          <section id="market-intel" className="scroll-mt-24 py-16 border-b border-black/[0.08] space-y-12">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
                Market Intelligence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Buzzworthiness */}
              <div id="intel-buzz" className="scroll-mt-24 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">
                    Buzzworthiness
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#8b5cf6]">
                    <span className="w-4 h-4 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                    <span>Rating: High (5/5)</span>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-[#86868b] py-1 border-y border-black/[0.05]">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#8b5cf6] font-semibold">High • Active</span>
                </div>
                <p className="text-[#515154] text-[14px] leading-relaxed">
                  Fosmanogepix is gaining attention as a first-in-class antifungal targeting multidrug-resistant Candida auris and rare molds, supported by two Phase 3 trials and BARDA funding.
                </p>
              </div>

              {/* Technology Competition Level */}
              <div id="intel-competition" className="scroll-mt-24 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">
                    Technology Competition Level
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#6366f1]">
                    <span className="w-4 h-4 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                    <span>Score: 5 / 5 (High)</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="grid grid-cols-5 gap-1.5">
                    <div className="h-7 bg-[#6366f1]/10 rounded flex items-center justify-center text-[11.5px] text-[#6366f1]/70 font-medium">1</div>
                    <div className="h-7 bg-[#6366f1]/10 rounded flex items-center justify-center text-[11.5px] text-[#6366f1]/70 font-medium">2</div>
                    <div className="h-7 bg-[#6366f1]/10 rounded flex items-center justify-center text-[11.5px] text-[#6366f1]/70 font-medium">3</div>
                    <div className="h-7 bg-[#6366f1]/10 rounded flex items-center justify-center text-[11.5px] text-[#6366f1]/70 font-medium">4</div>
                    <div className="h-7 bg-[#6366f1] text-white rounded flex items-center justify-center text-[11.5px] font-medium shadow-sm">5 High</div>
                  </div>
                  <div className="flex justify-between text-[11px] font-medium text-[#86868b]">
                    <span>Low</span>
                    <span>Medium</span>
                    <span className="text-[#6366f1] font-semibold">High</span>
                  </div>
                </div>
                <p className="text-[#515154] text-[14px] leading-relaxed">
                  Fosmanogepix is competing against established antifungal therapies from major pharmaceutical companies. However, the mechanism and broad spectrum activity offer differentiation, particularly for difficult-to-treat infections.
                </p>
              </div>

              {/* Revenue Magnitude Potential */}
              <div id="intel-revenue" className="scroll-mt-24 space-y-3 pt-6 border-t border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">
                    Revenue Magnitude Potential
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#00a958]">
                    <span className="w-4 h-4 rounded-full bg-[#00a958] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                    <span>Score: 5 / 5 (High)</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between py-1 border-y border-black/[0.05]">
                  <span className="text-[24px] font-medium text-[#1d1d1f] tracking-tight">$ 281.7 M</span>
                  <span className="text-[12.5px] font-semibold text-[#00a958]">Level 5</span>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-[#86868b]">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#00a958] font-semibold">High • Level 5</span>
                </div>
                <p className="text-[#515154] text-[14px] leading-relaxed">
                  Basilea Pharmaceutica's revenue is $ 281.7 M.
                </p>
              </div>

              {/* Investor Lens */}
              <div id="intel-investor" className="scroll-mt-24 space-y-3 pt-6 border-t border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">
                    Investor Lens
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#2563eb]">
                    <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[10px] leading-none shrink-0 font-bold">↑</span>
                    <span>Score: 5 / 5 (High)</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 py-1">
                  <div className="bg-black/[0.03] rounded-lg p-2.5 text-center">
                    <div className="text-[11px] text-[#86868b]">Upfront</div>
                    <div className="text-[15px] font-medium text-[#1d1d1f] mt-0.5">$ 37 M</div>
                  </div>
                  <div className="bg-black/[0.03] rounded-lg p-2.5 text-center">
                    <div className="text-[11px] text-[#86868b]">Milestones</div>
                    <div className="text-[15px] font-medium text-[#1d1d1f] mt-0.5">Up to $110 M</div>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-[#86868b]">
                  <span>Low</span>
                  <span>Medium</span>
                  <span className="text-[#2563eb] font-semibold">High • Level 5</span>
                </div>
                <p className="text-[#515154] text-[14px] leading-relaxed">
                  Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $ 37 million upfront with up to $110 million in potential commercial sales milestones.
                </p>
              </div>
            </div>

            {/* Analyst's Insights */}
            <div id="intel-analyst" className="scroll-mt-24 space-y-3 pt-8 border-t border-black/[0.06]">
              <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                Analyst's Insights
              </h3>
              <p className="text-[#3a3a3c] text-[15.5px] leading-[1.8] max-w-[920px]">
                Fosmanogepix is Basilea's most advanced clinical-stage antifungal, expanding its portfolio beyond Cresemba through a novel mechanism and broad yeast and mold activity. Its potential against resistant Candida auris, Candida glabrata and rare molds could address unmet needs in difficult-to-treat infections. Oral and intravenous formulations offer flexibility in treatment. Its clinical potential will depend on demonstrating efficacy and safety in the ongoing Phase 3 trials, FAST-IC and FORWARD-IM.
              </p>
            </div>
          </section>

          {/* SECTION 5: DAYONE DATA CENTERS & STRATEGIC ANALYSIS */}
          <section id="strategic-analysis" className="scroll-mt-24 py-16 space-y-12">
            {/* Value Proposition of DayOne Data Centers */}
            <div id="strat-value" className="scroll-mt-24 space-y-3.5">
              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
                Value Proposition of DayOne Data Centers
              </h2>
              <p className="text-[#3a3a3c] text-[15.5px] leading-[1.8] max-w-[920px]">
                DayOne's competitive advantage stems from its ONEShell, ONEPod and ONEFactory engineering architectures, built to standardize data center delivery across markets. Its model combines early site and power access, anchor customer commitments, modular construction and long-term service contracts. But the company concedes some newer engineering designs have not yet been put into production with customers, while fast-changing AI hardware, rack density and cooling can lead to costly redesigns.
              </p>
            </div>

            {/* Key Competitors */}
            <div id="strat-competitors" className="scroll-mt-24 space-y-3.5 pt-6 border-t border-black/[0.06]">
              <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                Key Competitors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
                {[
                  { name: 'Digital Realty', country: 'United States' },
                  { name: 'AirTrunk', country: 'Australia' },
                  { name: 'NTT Global Data Centers', country: 'Japan' },
                  { name: 'QTS Realty Trust', country: 'United States' },
                  { name: 'Equinix, Inc.', country: 'United States' },
                ].map((c) => (
                  <div key={c.name} className="py-2.5 px-3 bg-white border border-black/[0.08] rounded-[10px] space-y-0.5">
                    <div className="text-[13.5px] font-medium text-[#1d1d1f] truncate">{c.name}</div>
                    <div className="text-[12px] text-[#86868b]">{c.country}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Analysis (SWOT) */}
            <div id="strat-swot" className="scroll-mt-24 space-y-4 pt-6 border-t border-black/[0.06]">
              <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                Strategic Analysis
              </h3>

              <div className="bg-white border border-black/[0.08] rounded-[18px] overflow-hidden">
                {/* Top Row: S & W */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
                  {/* Strengths */}
                  <div className="p-6 space-y-2.5">
                    <div className="text-[15px] font-medium text-[#1d1d1f]">Strengths</div>
                    <ul className="space-y-1.5 text-[13.5px] text-[#515154] leading-relaxed">
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
                  <div className="p-6 space-y-2.5">
                    <div className="text-[15px] font-medium text-[#1d1d1f]">Weaknesses</div>
                    <ul className="space-y-1.5 text-[13.5px] text-[#515154] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Power-intensive expansion increases infrastructure cost exposure.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Large CapEx constrain expansion flexibility.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Row: O & T */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] border-t border-black/[0.08]">
                  {/* Opportunities */}
                  <div className="p-6 space-y-2.5">
                    <div className="text-[15px] font-medium text-[#1d1d1f]">Opportunities</div>
                    <p className="text-[13.5px] text-[#515154] leading-relaxed">
                      DayOne aims to enhance its development pipeline while addressing long-term lease obligations. The cancellation of one lease has reduced future payments from $894.1M to $429.1M, with another data center anticipated to be operational by 2028. This scenario underscores the need for the company to synchronize lease commitments with construction timelines and customer demand as it scales.
                    </p>
                  </div>

                  {/* Threats */}
                  <div className="p-6 space-y-2.5">
                    <div className="text-[15px] font-medium text-[#1d1d1f]">Threats</div>
                    <ul className="space-y-1.5 text-[13.5px] text-[#515154] leading-relaxed">
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
            </div>

            {/* IP / Patent Activity & Future Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-black/[0.06]">
              <div id="strat-ip" className="scroll-mt-24 space-y-2">
                <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                  IP/Patent Activity
                </h4>
                <p className="text-[14.5px] text-[#515154] leading-relaxed">
                  There are no active trademarks or patents registered in its name.
                </p>
              </div>

              <div id="strat-future" className="scroll-mt-24 space-y-2">
                <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                  Future Focus Areas
                </h4>
                <ul className="space-y-2 text-[14.5px] text-[#515154]">
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
        </main>
      </div>

      {/* Clean White Footer — Frost 360 */}
      <footer className="bg-white border-t border-black/[0.08] mt-24 pt-16 pb-20 text-[14px] text-[#6e6e73]">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
          {/* Footer Brand Banner */}
          <div className="mb-12 pb-8 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-brand-logo font-['Inter'] text-[24px] font-[800] tracking-tight leading-none select-none flex items-center">
              <span className="text-[#1d1d1f]">FROST</span>
              <span className="text-[#0071e3]">360</span>
            </span>
            <span className="text-[14px] text-[#86868b]">
              Institutional Market Intelligence & Corporate Analytics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div>
              <div className="font-medium text-[#1d1d1f] text-[15px] mb-4">Browse Frost 360</div>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071e3]">Public Corporations</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Executive Profiles</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Capital Markets & Public Offerings</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Debt & Note Offerings</a></li>
              </ul>
            </div>

            <div>
              <div className="font-medium text-[#1d1d1f] text-[15px] mb-4">Market Intelligence</div>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071e3]">Frost 360 Mega-Cap Index</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Quarterly Earnings Radar</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Strategic M&A Tracker</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Daily Market Dispatch</a></li>
              </ul>
            </div>

            <div>
              <div className="font-medium text-[#1d1d1f] text-[15px] mb-4">Frost 360 Platform</div>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071e3]">About Frost 360</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Enterprise Solutions</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Institutional Research</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">API & Data Feeds</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Security & Compliance</a></li>
              </ul>
            </div>

            <div>
              <div className="font-medium text-[#1d1d1f] text-[15px] mb-4">Products & Plans</div>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071e3]">Frost 360 Pro</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Frost 360 Enterprise</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Custom Filings Screener</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Benchmarking Matrices</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Pricing Overview</a></li>
              </ul>
            </div>

            <div>
              <div className="font-medium text-[#1d1d1f] text-[15px] mb-4">Resources & Support</div>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071e3]">Documentation</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Methodology & Data Sources</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Contact Support</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Privacy Statement</a></li>
                <li><a href="#" className="hover:text-[#0071e3]">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-black/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[#86868b]">
            <div>
              <p className="text-[14px]">
                Frost 360 provides institutional market intelligence, verified corporate disclosures, and executive registry analytics.
              </p>
              <p className="mt-1 text-[14px]">
                Terms of Service | Privacy Policy | Regulatory Compliance | © 2026 Frost 360 Inc. All Rights Reserved.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[14px]">
              <a href="#" className="hover:text-[#1d1d1f]">Cookie Preferences</a>
              <span>|</span>
              <a href="#" className="hover:text-[#1d1d1f]">Do Not Sell My Personal Information</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
