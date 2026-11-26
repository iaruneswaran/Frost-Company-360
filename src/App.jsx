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

/* 100% exact match to user attached gradient bar style (media_1795675205760_5bfeb2e1.png) */
const renderScoreScale = (score) => {
  // Center positions for 5 segments in 310-width viewBox (5 to 305 = 300px bar)
  // Segment 1: 5..65 (cx=35), 2: 65..125 (cx=95), 3: 125..185 (cx=155), 4: 185..245 (cx=215), 5: 245..305 (cx=275)
  const centers = {
    1: 35,
    2: 95,
    3: 155,
    4: 215,
    5: 275,
  };
  const cx = centers[score] ?? 155;
  const pinColors = {
    1: '#f70622',
    2: '#e58c18',
    3: '#febb39',
    4: '#70d55e',
    5: '#21b234',
  };
  const pinColor = pinColors[score] ?? '#70d55e';

  return (
    <div className="w-full max-w-[260px] my-2 select-none">
      {/* SVG Gradient Bar with Hourglass Split Cutout, Internal White Ticks, and Dual-Triangle Pin */}
      <div className="w-full">
        <svg
          viewBox="0 0 310 42"
          className="w-full h-auto overflow-visible block"
        >
          <defs>
            <linearGradient id="scoreBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f70622" />
              <stop offset="25%" stopColor="#e58c18" />
              <stop offset="50%" stopColor="#febb39" />
              <stop offset="75%" stopColor="#86de90" />
              <stop offset="100%" stopColor="#21b234" />
            </linearGradient>
          </defs>

          {/* Continuous Gradient Bar */}
          <rect
            x="5"
            y="8"
            width="300"
            height="24"
            rx="5"
            ry="5"
            fill="url(#scoreBarGradient)"
          />

          {/* 4 Internal White Tick Dashes (dividing the 5 equal segments at 20%, 40%, 60%, 80%) */}
          {[65, 125, 185, 245].map((tx) => (
            <line
              key={tx}
              x1={tx}
              y1="16"
              x2={tx}
              y2="24"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
          ))}

          {/* Hourglass / Inverted Chevron White Notch Cutout in the Bar at Active Position */}
          <polygon
            points={`${cx - 8},7 ${cx + 8},7 ${cx + 2.5},12.5 ${cx + 2.5},27.5 ${cx + 8},33 ${cx - 8},33 ${cx - 2.5},27.5 ${cx - 2.5},12.5`}
            fill="#ffffff"
          />

          {/* Pin Marker: Top Downward Triangle ▼ */}
          <polygon
            points={`${cx - 5},1 ${cx + 5},1 ${cx},7.5`}
            fill={pinColor}
          />

          {/* Pin Marker: Center Vertical Slit Line */}
          <line
            x1={cx}
            y1="12"
            x2={cx}
            y2="28"
            stroke={pinColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Pin Marker: Bottom Upward Triangle ▲ */}
          <polygon
            points={`${cx - 5},39 ${cx + 5},39 ${cx},32.5`}
            fill={pinColor}
          />
        </svg>
      </div>

      {/* Low, Medium, High Labels Below Bar */}
      <div className="flex justify-between px-1 mt-1 text-[10.5px] font-medium">
        <span className={score <= 2 ? 'text-[#dc2626] font-semibold' : 'text-[#86868b]'}>Low</span>
        <span className={score === 3 ? 'text-[#b45309] font-semibold' : 'text-[#86868b]'}>Medium</span>
        <span className={score >= 4 ? 'text-[#16a34a] font-semibold' : 'text-[#86868b]'}>High</span>
      </div>
    </div>
  );
};

/* Subline clamped to exactly 2 lines without read more action */
const CardSubline = ({ text }) => {
  return (
    <div className="mt-3">
      <p className="text-[12.5px] text-[#86868b] leading-[1.55] line-clamp-2 min-h-[38px]">
        {text}
      </p>
    </div>
  );
};

/* Precomputed radial rays for the Overall Score Semicircle Gauge (100% match to media_1795675305384_c8f45193.png) */
const OVERALL_GAUGE_RAYS = Array.from({ length: 85 }, (_, i) => {
  const t = i / 84;
  const theta = Math.PI * (1 - t);
  const cx = 140;
  const cy = 135;
  const rIn = 78;
  const rOut = 108;
  const x1 = (cx + rIn * Math.cos(theta)).toFixed(2);
  const y1 = (cy - rIn * Math.sin(theta)).toFixed(2);
  const x2 = (cx + rOut * Math.cos(theta)).toFixed(2);
  const y2 = (cy - rOut * Math.sin(theta)).toFixed(2);

  let color;
  if (t <= 0.25) {
    const f = t / 0.25;
    const r = Math.round(225 * (1 - f) + 249 * f);
    const g = Math.round(29 * (1 - f) + 115 * f);
    const b = Math.round(72 * (1 - f) + 22 * f);
    color = `rgb(${r},${g},${b})`;
  } else if (t <= 0.5) {
    const f = (t - 0.25) / 0.25;
    const r = Math.round(249 * (1 - f) + 234 * f);
    const g = Math.round(115 * (1 - f) + 179 * f);
    const b = Math.round(22 * (1 - f) + 8 * f);
    color = `rgb(${r},${g},${b})`;
  } else if (t <= 0.75) {
    const f = (t - 0.5) / 0.25;
    const r = Math.round(234 * (1 - f) + 132 * f);
    const g = Math.round(179 * (1 - f) + 204 * f);
    const b = Math.round(8 * (1 - f) + 22 * f);
    color = `rgb(${r},${g},${b})`;
  } else {
    const f = (t - 0.75) / 0.25;
    const r = Math.round(132 * (1 - f) + 34 * f);
    const g = Math.round(204 * (1 - f) + 197 * f);
    const b = Math.round(22 * (1 - f) + 94 * f);
    color = `rgb(${r},${g},${b})`;
  }

  return { x1, y1, x2, y2, color };
});

const OverallScoreGauge = ({
  score = 4.1,
  label = '4.1',
  subtitle = 'High Potential',
  badgeText = '6 pts',
}) => {
  const cx = 140;
  const cy = 135;
  const rMid = 93;
  const tAct = Math.max(0, Math.min(1, (score - 1) / 4));
  const thetaAct = Math.PI * (1 - tAct);
  const bx = (cx + rMid * Math.cos(thetaAct)).toFixed(2);
  const by = (cy - rMid * Math.sin(thetaAct)).toFixed(2);

  const filterId = `pillGlow-${badgeText.toString().replace(/[^a-zA-Z0-9]/g, '') || 'default'}`;

  return (
    <div className="relative w-full max-w-[285px] aspect-[280/155] flex items-center justify-center">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 280 155">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#16a34a" floodOpacity="0.25" />
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Dense Radial Rays Arc (Red -> Orange -> Yellow -> Green) */}
        {OVERALL_GAUGE_RAYS.map((ray, i) => (
          <line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke={ray.color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}

        {/* Floating Frosted Pill Badge at Active Position */}
        <g transform={`translate(${bx}, ${by})`} filter={`url(#${filterId})`}>
          <rect
            x="-31"
            y="-13"
            width="62"
            height="26"
            rx="13"
            fill="#ffffff"
          />
          {/* Green Upward Triangle ▲ */}
          <polygon
            points="-19,3 -12,3 -15.5,-4"
            fill="#16a34a"
          />
          {/* Badge text */}
          <text
            x="-7"
            y="4"
            className="text-[11.5px] font-bold fill-[#15803d] font-sans"
          >
            {badgeText}
          </text>
        </g>

        {/* Center Score Metric & Rating */}
        <text
          x="140"
          y="106"
          textAnchor="middle"
          className={`${label.length > 5 ? 'text-[28px]' : 'text-[44px]'} font-bold fill-[#1d1d1f] tracking-tight font-sans`}
        >
          {label}
        </text>
        <text
          x="140"
          y="128"
          textAnchor="middle"
          className="text-[12.5px] font-semibold fill-[#16a34a] font-sans"
        >
          {subtitle}
        </text>
      </svg>
    </div>
  );
};

/* 3D Isometric Geometric Icons for Strategic Analysis (SWOT) matching media_1795684549181_663a1f9a.png */
const SwotCubeIcon = () => (
  <svg className="w-16 h-16 overflow-visible" viewBox="0 0 68 68" fill="none">
    <defs>
      <filter id="swotCubeGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.25" />
      </filter>
      <linearGradient id="swotCubeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#4ade80" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="swotCubeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#15803d" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="swotCubeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#16a34a" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#14532d" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    
    <ellipse cx="34" cy="38" rx="22" ry="12" fill="#22c55e" opacity="0.18" filter="url(#swotCubeGlow)" />

    {/* Outer Translucent Isometric Wireframe Cube */}
    <polygon points="8,20 34,35 34,62 8,47" fill="url(#swotCubeLeftGrad)" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.7" />
    <polygon points="34,35 60,20 60,47 34,62" fill="url(#swotCubeRightGrad)" stroke="#16a34a" strokeWidth="1.2" strokeOpacity="0.8" />
    <polygon points="34,5 60,20 34,35 8,20" fill="url(#swotCubeTopGrad)" stroke="#4ade80" strokeWidth="1.4" strokeOpacity="0.9" />

    {/* Inner Solid Floating Core Cube */}
    <polygon points="23,34 34,40 34,51 23,45" fill="#15803d" />
    <polygon points="34,40 45,34 45,45 34,51" fill="#166534" />
    <polygon points="34,28 45,34 34,40 23,34" fill="#22c55e" stroke="#86efac" strokeWidth="0.8" />
  </svg>
);

const SwotLayersIcon = () => (
  <svg className="w-16 h-16 overflow-visible" viewBox="0 0 68 68" fill="none">
    <defs>
      <filter id="swotLayerGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.3" />
      </filter>
    </defs>

    <ellipse cx="34" cy="24" rx="20" ry="10" fill="#22c55e" opacity="0.25" filter="url(#swotLayerGlow)" />

    {/* Base Solid Isometric Block */}
    <polygon points="12,41 34,53 34,61 12,49" fill="#15803d" />
    <polygon points="34,53 56,41 56,49 34,61" fill="#14532d" />
    <polygon points="34,30 56,41 34,53 12,41" fill="#16a34a" />

    {/* Middle Floating Translucent Slab */}
    <polygon points="12,28 34,40 34,42 12,30" fill="rgba(34,197,94,0.3)" />
    <polygon points="34,40 56,28 56,30 34,42" fill="rgba(21,128,61,0.4)" />
    <polygon points="34,17 56,28 34,40 12,28" fill="rgba(74,222,128,0.45)" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.8" />

    {/* Top Floating Glass Canopy Slab */}
    <polygon points="12,17 34,29 34,31 12,19" fill="rgba(74,222,128,0.4)" />
    <polygon points="34,29 56,17 56,19 34,31" fill="rgba(34,197,94,0.5)" />
    <polygon points="34,6 56,17 34,29 12,17" fill="rgba(134,239,172,0.65)" stroke="#86efac" strokeWidth="1.4" />
  </svg>
);

const SwotBladesIcon = () => (
  <svg className="w-16 h-16 overflow-visible" viewBox="0 0 68 68" fill="none">
    <defs>
      <filter id="swotBladesGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.25" />
      </filter>
    </defs>

    <ellipse cx="34" cy="38" rx="22" ry="12" fill="#22c55e" opacity="0.2" filter="url(#swotBladesGlow)" />

    {/* Outer Left Translucent Hovering Wing */}
    <polygon points="6,27 16,33 16,53 6,47" fill="rgba(74,222,128,0.25)" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.7" />
    <polygon points="11,24 16,27 16,33 11,30" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="1" strokeOpacity="0.7" />

    {/* 4 Standing Isometric Server Blades */}
    <polygon points="18,19 24,15 24,46 18,50" fill="#15803d" />
    <polygon points="24,15 28,17 28,48 24,46" fill="#166534" />
    <polygon points="18,19 22,21 28,17 24,15" fill="#22c55e" />

    <polygon points="26,23 32,19 32,50 26,54" fill="#16a34a" />
    <polygon points="32,19 36,21 36,52 32,50" fill="#15803d" />
    <polygon points="26,23 30,25 36,21 32,19" fill="#4ade80" />

    <polygon points="34,27 40,23 40,54 34,58" fill="#22c55e" />
    <polygon points="40,23 44,25 44,56 40,54" fill="#16a34a" />
    <polygon points="34,27 38,29 44,25 40,23" fill="#86efac" />

    {/* Outer Right Translucent Hovering Wing */}
    <polygon points="52,27 62,33 62,53 52,47" fill="rgba(74,222,128,0.25)" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.7" />
    <polygon points="47,24 52,27 52,33 47,30" fill="rgba(134,239,172,0.4)" stroke="#86efac" strokeWidth="1" strokeOpacity="0.7" />
  </svg>
);

const SwotClusterIcon = () => (
  <svg className="w-16 h-16 overflow-visible" viewBox="0 0 68 68" fill="none">
    <defs>
      <filter id="swotClusterGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.28" />
      </filter>
    </defs>

    <ellipse cx="34" cy="24" rx="20" ry="10" fill="#22c55e" opacity="0.22" filter="url(#swotClusterGlow)" />

    {/* Clustered 3D Blocks at Base */}
    <polygon points="12,43 24,49 24,59 12,53" fill="#15803d" />
    <polygon points="24,49 32,45 32,55 24,59" fill="#14532d" />
    <polygon points="20,38 32,45 24,49 12,43" fill="#22c55e" />

    <polygon points="32,40 44,46 44,56 32,50" fill="#16a34a" />
    <polygon points="44,46 56,40 56,50 44,56" fill="#15803d" />
    <polygon points="44,34 56,40 44,46 32,40" fill="#4ade80" />

    <polygon points="22,48 34,54 34,64 22,58" fill="#166534" />
    <polygon points="34,54 46,48 46,58 34,64" fill="#14532d" />
    <polygon points="34,42 46,48 34,54 22,48" fill="#15803d" />

    {/* Floating Translucent Mid Layer */}
    <polygon points="12,25 34,36 34,38 12,27" fill="rgba(34,197,94,0.3)" />
    <polygon points="34,36 56,25 56,27 34,38" fill="rgba(21,128,61,0.4)" />
    <polygon points="34,14 56,25 34,36 12,25" fill="rgba(74,222,128,0.45)" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.8" />

    {/* Floating Top Translucent Canopy */}
    <polygon points="12,16 34,27 34,29 12,18" fill="rgba(74,222,128,0.4)" />
    <polygon points="34,27 56,16 56,18 34,29" fill="rgba(34,197,94,0.5)" />
    <polygon points="34,5 56,16 34,27 12,16" fill="rgba(134,239,172,0.65)" stroke="#86efac" strokeWidth="1.4" />
  </svg>
);

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
      id: 'market-intel',
      label: 'Market Intelligence',
      subsections: [
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
        setActiveSubSection('strat-future');
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

            {/* Financial Box below www.twosteptx.com — Remains visible even when collapse happens on scroll */}
            <div className="mt-3.5 bg-white border border-black/[0.08] rounded-[14px] p-3 space-y-2.5">
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Investment Stage</span>
                <span className="font-medium text-[#1d1d1f] text-right">Series A</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Total Funding</span>
                <span className="font-medium text-[#1d1d1f] text-right">$71.2 M</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Annual Revenue</span>
                <span className="font-medium text-[#1d1d1f] text-right">NA</span>
              </div>
            </div>

            {/* Company Snapshot Attributes — Collapsible on scroll */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isScrolled
                  ? 'max-h-0 opacity-0 mt-0 pointer-events-none'
                  : 'max-h-[500px] opacity-100 mt-3 pt-3 border-t border-black/[0.06] space-y-2.5 text-[13px]'
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

            {/* Financial Box below www.twosteptx.com — List view with left side and right side */}
            <div className="bg-white border border-black/[0.08] rounded-[14px] p-3 space-y-2.5">
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Investment Stage</span>
                <span className="font-medium text-[#1d1d1f] text-right">Series A</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Total Funding</span>
                <span className="font-medium text-[#1d1d1f] text-right">$71.2 M</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="text-[#86868b]">Annual Revenue</span>
                <span className="font-medium text-[#1d1d1f] text-right">NA</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[12.5px] text-[#6e6e73] pt-3 border-t border-black/[0.06]">
              <div>Technology: <span className="font-medium text-[#1d1d1f]">Peptide-conjugate therapeutics</span></div>
              <span>•</span>
              <div>Ownership: <span className="font-medium text-[#1d1d1f]">Private</span></div>
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
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#86868b]" />
                <span>2-10 Employees</span>
              </div>
            </div>
          </div>

          {/* TOP SCORE OVERVIEW STRIP — Uniform 3x3 Grid (3 lines of 3 boxes each, all same width) */}
          <section id="scores-overview" className="scroll-mt-24 space-y-4">
            <h2 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
              Evaluation Scores
            </h2>

            {/* Master 3x3 Bento Container */}
            <div className="bg-white border border-black/[0.08] rounded-[24px] overflow-hidden">
              {/* LINE 1: 3 Boxes (Overall Score, Risks, Regional Impact) */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
                {/* 1. Overall Score — Semicircle Speedometer Gauge */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Overall Score</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#16a34a] shrink-0">
                        <span className="font-bold">↑</span>
                        <span>High Potential</span>
                      </div>
                    </div>

                    {/* Semicircle Radial Rays Speedometer Gauge (100% match to media_1795675305384_c8f45193.png) */}
                    <div className="pt-2 pb-1 flex flex-col items-center justify-center">
                      <OverallScoreGauge />
                    </div>
                  </div>
                </div>

                {/* 2. Risks */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-[22px]">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Risks</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#b45309] shrink-0">
                        <span className="font-bold">↑</span>
                        <span>Medium</span>
                      </div>
                    </div>
                    {renderScoreScale(3)}
                  </div>
                  <CardSubline text="The novel Gwt1-inhibition mechanism may not deliver sufficient clinical benefit or an acceptable safety profile in the ongoing phase 3 studies of invasive candidiasis and invasive mould infections, particularly given the heterogeneity of rare mould infections and salvage-treatment populations." />
                </div>

                {/* 3. Regional Impact */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-[22px]">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Regional Impact</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#f97316] shrink-0">
                        <span className="font-bold">↑</span>
                        <span>High</span>
                      </div>
                    </div>
                    {renderScoreScale(4)}
                  </div>
                  <CardSubline text="North America & Europe primary priority focus regions for clinical trials and regulatory launch." />
                </div>
              </div>

              {/* LINE 2: 3 Boxes (Commercialization Readiness, Application Potential, Buzzworthiness) */}
              <div className="border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
                {/* 4. Commercialization Readiness */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-[22px]">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Commercialization Readiness</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#b45309] shrink-0">
                        <span className="font-bold">↑</span>
                        <span>Medium</span>
                      </div>
                    </div>
                    {renderScoreScale(3)}
                  </div>
                  <CardSubline text="Basilea expects phase 3 data readout and regulatory submission in 2028. Hence, the product at an advanced clinical-stage, pre-approval readiness level." />
                </div>

                {/* 5. Application Potential */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-[22px]">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Application Potential</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#b45309] shrink-0">
                        <span className="font-bold">↓</span>
                        <span>Medium</span>
                      </div>
                    </div>
                    {renderScoreScale(3)}
                  </div>
                  <CardSubline text="Target Infections: Candida auris infections, Lomentosporiosis & Mucormycosis." />
                </div>

                {/* 6. Buzzworthiness */}
                <div className="p-6 flex flex-col justify-between bg-white h-full min-h-[239.77px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-[22px]">
                      <span className="text-[15px] font-medium text-[#1d1d1f]">Buzzworthiness</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ef4444] shrink-0">
                        <span className="font-bold">↑</span>
                        <span>High</span>
                      </div>
                    </div>
                    {renderScoreScale(5)}
                  </div>
                  <CardSubline text="Fosmanogepix is gaining attention as a first-in-class antifungal targeting multidrug-resistant Candida auris and rare molds, supported by two Phase 3 trials and BARDA funding." />
                </div>
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

          {/* SECTION 3: MARKET INTELLIGENCE */}
          <section id="market-intel" className="scroll-mt-24 py-16 border-b border-black/[0.08] space-y-8">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
                Market Intelligence
              </h2>
            </div>

            {/* 2x2 Balanced Grid: Technology Competition, Revenue Magnitude, Investor Lens, Analyst's Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Technology Competition Level */}
              <div id="intel-competition" className="p-6 bg-white border border-black/[0.08] rounded-[20px] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-[22px]">
                    <span className="text-[15px] font-medium text-[#1d1d1f]">Technology Competition Level</span>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ef4444] shrink-0">
                      <span className="font-bold">↑</span>
                      <span>High</span>
                    </div>
                  </div>
                  {renderScoreScale(5)}
                </div>
                <div className="pt-3 border-t border-black/[0.06]">
                  <p className="text-[14px] text-[#515154] leading-[1.7]">
                    Fosmanogepix is competing against established antifungal therapies from major pharmaceutical companies. However, the mechanism and broad spectrum activity offer differentiation, particularly for difficult-to-treat infections.
                  </p>
                </div>
              </div>

              {/* 2. Revenue Magnitude Potential */}
              <div id="intel-revenue" className="p-6 bg-white border border-black/[0.08] rounded-[20px] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-[22px]">
                    <span className="text-[15px] font-medium text-[#1d1d1f]">Revenue Magnitude Potential</span>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ef4444] shrink-0">
                      <span className="font-bold">↑</span>
                      <span>High</span>
                    </div>
                  </div>
                  {renderScoreScale(5)}
                </div>
                <div className="pt-3 border-t border-black/[0.06] space-y-1.5">
                  <div className="text-[28px] font-bold text-[#1d1d1f] tracking-tight">
                    $ 281.7 M
                  </div>
                  <p className="text-[14px] text-[#515154] leading-[1.7]">
                    Basilea Pharmaceutica’s revenue is <span className="font-semibold text-[#1d1d1f]">$ 281.7 M</span>.
                  </p>
                </div>
              </div>

              {/* 3. Investor Lens */}
              <div id="intel-investor" className="p-6 bg-white border border-black/[0.08] rounded-[20px] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-[22px]">
                    <span className="text-[15px] font-medium text-[#1d1d1f]">Investor Lens</span>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#ef4444] shrink-0">
                      <span className="font-bold">↑</span>
                      <span>High</span>
                    </div>
                  </div>
                  {renderScoreScale(5)}
                </div>
                <div className="flex items-start gap-3 pt-3 border-t border-black/[0.06]">
                  <div className="w-9 h-9 rounded-xl bg-[#0071e3] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <span className="text-[16px] font-bold leading-none">$</span>
                  </div>
                  <p className="text-[14px] text-[#515154] leading-[1.7]">
                    Basilea acquired fosmanogepix through an asset purchase agreement with Amplyx Pharmaceuticals, an affiliate of Pfizer, in November 2023, paying $ 37 million upfront with up to $110 million in potential commercial sales milestones.
                  </p>
                </div>
              </div>

              {/* 4. Analyst's Insights */}
              <div id="intel-analyst" className="p-6 bg-white border border-black/[0.08] rounded-[20px] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[15px] font-medium text-[#1d1d1f]">Analyst's Insights</span>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#0071e3] shrink-0">
                      <span>Expert Commentary</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-black/[0.06]">
                  <p className="text-[14px] text-[#515154] leading-[1.75]">
                    Fosmanogepix is Basilea’s most advanced clinical-stage antifungal, expanding its portfolio beyond Cresemba through a novel mechanism and broad yeast and mold activity. Its potential against resistant Candida auris, Candida glabrata and rare molds could address unmet needs in difficult-to-treat infections. Oral and intravenous formulations offer flexibility in treatment. Its clinical potential will depend on demonstrating efficacy and safety in the ongoing Phase 3 trials, FAST-IC and FORWARD-IM.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DAYONE DATA CENTERS & STRATEGIC ANALYSIS */}
          <section id="strategic-analysis" className="scroll-mt-24 py-16 space-y-12">
            {/* Value Proposition of DayOne Data Centers */}
            <div id="strat-value" className="scroll-mt-24 space-y-3.5">
              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#1d1d1f] tracking-tight">
                Value Proposition of DayOne Data Centers
              </h2>
              <div className="text-[15px] font-medium text-[#0071e3]">
                Technology Assessment
              </div>
              <p className="text-[#3a3a3c] text-[15.5px] leading-[1.8] max-w-[920px]">
                DayOne's competitive advantage stems from its ONEShell, ONEPod and ONEFactory engineering architectures, built to standardize data center delivery across markets. Its model combines early site and power access, anchor customer commitments, modular construction and long-term service contracts. But the company concedes some newer engineering designs have not yet been put into production with customers, while fast-changing AI hardware, rack density and cooling can lead to costly redesigns.
              </p>
            </div>

            {/* Key Competitors — Redesigned matching user attached UI card design (media_1795685069466_7de94af1.png) */}
            <div id="strat-competitors" className="scroll-mt-24 space-y-3.5 pt-6 border-t border-black/[0.06]">
              <h3 className="text-[19px] font-medium text-[#1d1d1f] tracking-tight">
                Key Competitors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
                {[
                  { name: 'Digital Realty', country: 'United States', style: 'yellow' },
                  { name: 'AirTrunk', country: 'Australia', style: 'grey' },
                  { name: 'NTT Global Data Centers', country: 'Japan', style: 'yellow' },
                  { name: 'QTS Realty Trust', country: 'United States', style: 'grey' },
                  { name: 'Equinix, Inc.', country: 'United States', style: 'yellow' },
                ].map((c) => {
                  const isYellow = c.style === 'yellow';
                  return (
                    <div
                      key={c.name}
                      className="bg-white border border-black/[0.08] rounded-[16px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] hover:border-black/[0.14] transition-all flex flex-col justify-between"
                    >
                      {/* Top Header Banner matching the attached UI card style */}
                      <div
                        className={`px-3.5 py-2.5 ${
                          isYellow ? 'bg-[#fef9c3]' : 'bg-[#f0f1f4]'
                        } border-b border-black/[0.06] flex items-center min-h-[46px]`}
                      >
                        <span className="text-[13px] font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                          {c.name}
                        </span>
                      </div>

                      {/* Card Body matching the attached UI card style */}
                      <div className="bg-white px-3.5 py-3 rounded-b-[16px] min-h-[46px] flex items-center">
                        <span className="text-[13px] text-[#48484a] font-normal underline decoration-black/25 underline-offset-4">
                          {c.country}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strategic Analysis (SWOT) — Inspired by attached design (media_1795686606553_cca71723.jpg) in custom green palette */}
            <div id="strat-swot" className="scroll-mt-24 space-y-5 pt-6 border-t border-black/[0.06]">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-medium text-[#1d1d1f] tracking-tight">
                  Strategic Analysis
                </h3>
              </div>

              {/* Main SWOT Diagram Container with Left Sidebar & 2x2 Grid */}
              <div className="bg-white border border-black/[0.08] rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 bg-[#15803d] p-7 sm:p-9 text-white flex flex-col justify-between min-h-[220px] lg:min-h-full">
                  <div>
                    <div className="space-y-0.5">
                      <div className="text-[34px] sm:text-[42px] font-bold text-white tracking-tight leading-none">
                        SWOT
                      </div>
                      <div className="text-[22px] sm:text-[26px] font-normal text-emerald-100/85 tracking-tight">
                        Diagram
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 lg:pt-0 text-[12.5px] leading-snug text-emerald-100/80 font-normal">
                    <div>DayOne Data Centers</div>
                    <div className="text-white/90 font-medium">Strategic Assessment</div>
                  </div>
                </div>

                {/* Right Area: 2x2 Quadrant Grid — All White Backgrounds with Green Letter Badges */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 bg-white">
                  {/* Quadrant 1: Strengths (Top-Left) — White Background */}
                  <div className="p-6 sm:p-7 bg-white border-b border-black/[0.08] md:border-r flex flex-col justify-between min-h-[210px]">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <span className="w-11 h-11 bg-[#15803d] text-white text-[24px] font-bold flex items-center justify-center rounded-[10px] select-none shrink-0 shadow-sm">
                          S
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#1d1d1f] tracking-tight">
                          Strengths
                        </h4>
                      </div>
                      <ul className="space-y-2 text-[14px] text-[#515154] leading-[1.6]">
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Engineering architectures such as ONEShell, ONEPod and ONEFactory standardize delivery.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Long-term contracts provide revenue visibility.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Quadrant 2: Weaknesses (Top-Right) — White Background */}
                  <div className="p-6 sm:p-7 bg-white border-b border-black/[0.08] flex flex-col justify-between min-h-[210px]">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <span className="w-11 h-11 bg-[#15803d] text-white text-[24px] font-bold flex items-center justify-center rounded-[10px] select-none shrink-0 shadow-sm">
                          W
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#1d1d1f] tracking-tight">
                          Weaknesses
                        </h4>
                      </div>
                      <ul className="space-y-2 text-[14px] text-[#515154] leading-[1.6]">
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Power-intensive expansion increases infrastructure cost exposure.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Large CapEx constrain expansion flexibility.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Quadrant 3: Opportunities (Bottom-Left) — White Background */}
                  <div className="p-6 sm:p-7 bg-white border-b md:border-b-0 md:border-r border-black/[0.08] flex flex-col justify-between min-h-[210px]">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <span className="w-11 h-11 bg-[#15803d] text-white text-[24px] font-bold flex items-center justify-center rounded-[10px] select-none shrink-0 shadow-sm">
                          O
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#1d1d1f] tracking-tight">
                          Opportunities
                        </h4>
                      </div>
                      <ul className="space-y-2 text-[14px] text-[#515154] leading-[1.6]">
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Rising AI demand expands hyperscale capacity requirements.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Data sovereignty drives localised connectivity requirements.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Quadrant 4: Threats (Bottom-Right) — White Background */}
                  <div className="p-6 sm:p-7 bg-white flex flex-col justify-between min-h-[210px]">
                    <div>
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <span className="w-11 h-11 bg-[#15803d] text-white text-[24px] font-bold flex items-center justify-center rounded-[10px] select-none shrink-0 shadow-sm">
                          T
                        </span>
                        <h4 className="text-[18px] font-semibold text-[#1d1d1f] tracking-tight">
                          Threats
                        </h4>
                      </div>
                      <ul className="space-y-2 text-[14px] text-[#515154] leading-[1.6]">
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Power shortages can delay planned capacity expansion.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#1d1d1f] font-bold text-[14px] leading-tight shrink-0 select-none">•</span>
                          <span>Data-center regulations can restrict market expansion.</span>
                        </li>
                      </ul>
                    </div>
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
                <ul className="space-y-1.5 text-[14px] text-[#515154] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>There are no active trademarks or patents registered in its name.</span>
                  </li>
                </ul>
              </div>

              <div id="strat-future" className="scroll-mt-24 space-y-2">
                <h4 className="text-[17px] font-medium text-[#1d1d1f]">
                  Future Focus Areas
                </h4>
                <p className="text-[14px] text-[#515154] leading-relaxed">
                  DayOne aims to enhance its development pipeline while addressing long-term lease obligations. The cancellation of one lease has reduced future payments from $894.1M to $429.1M, with another data center anticipated to be operational by 2028. This scenario underscores the need for the company to synchronize lease commitments with construction timelines and customer demand as it scales.
                </p>
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
