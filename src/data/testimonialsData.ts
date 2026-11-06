export interface TestimonialStory {
  id: string;
  pillarId: 'corporate-identity' | 'ui-ux-design' | 'logo-design' | 'marketing-collateral' | 'illustration';
  pillarLabel: string;
  clientName: string;
  clientTitle: string;
  organization: string;
  location: string;
  year: string;
  primaryMetric: string;
  metricLabel: string;
  secondaryMetrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  quote: string;
  deliverablesUsed: string[];
  timeline: string;
  industry: string;
  verificationBadge: string;
  deliverableIdsToLoad: string[];
}

export const TESTIMONIAL_STORIES: TestimonialStory[] = [
  {
    id: 'vanguard-nordics',
    pillarId: 'corporate-identity',
    pillarLabel: 'Corporate Identity System',
    clientName: 'Kofi Mensah-Addison',
    clientTitle: 'Managing Partner & CIO',
    organization: 'Vanguard Nordics & West Africa Infra',
    location: 'Oslo, Norway & Accra, Ghana',
    year: '2026',
    primaryMetric: '$420M',
    metricLabel: 'Fund Capital Closed Across 14 Sovereign Offices',
    secondaryMetrics: [
      { label: 'Offices Unified', value: '14 Global Nodes' },
      { label: 'Asset Production Speed', value: '3.2× Faster Decks' },
      { label: 'LP Investor Approval', value: '100% First-Pass' },
    ],
    challenge:
      'Fragmented regional visual representations across Stockholm, Oslo, London, and Accra created investor friction and diluted institutional credibility during a $400M green infrastructure capital raise.',
    solution:
      'Apex Koncepts formulated an architectural 12-column Swiss visual constitution, a 74-page Brand Bible, custom typography rules with tabular financial numerals, and executive cloth-bound LP prospectus monographs.',
    quote:
      'Apex Koncepts brought an architectural seriousness we had previously only witnessed in Zurich design ateliers. The unified visual constitution eliminated internal design chaos and conveyed such institutional authority that our $420M sustainable infrastructure fund closed ahead of schedule.',
    deliverablesUsed: [
      'Comprehensive Brand Identity Monograph (74 Pages)',
      'Boardroom & Series-A/B Pitch Deck Master System',
      'Executive Tactile Stationery & Foil Emboss Spec',
    ],
    timeline: '7 Weeks Cadence',
    industry: 'Sovereign Wealth & Climate Infrastructure',
    verificationBadge: 'Verified Institutional Fund Close',
    deliverableIdsToLoad: ['ci-brand-bible', 'ci-deck-system', 'ci-stationery-suite'],
  },
  {
    id: 'helios-analytics',
    pillarId: 'ui-ux-design',
    pillarLabel: 'UI/UX & Digital Product Systems',
    clientName: 'Dr. Aris Thorne',
    clientTitle: 'Chief Product Officer',
    organization: 'Helios Quantitative Analytics',
    location: 'London, UK & New York, USA',
    year: '2026',
    primaryMetric: '+140%',
    metricLabel: 'Enterprise Demo Requests & Trial-to-Paid Lift',
    secondaryMetrics: [
      { label: 'Task Execution Time', value: '-38% Trader Latency' },
      { label: 'Design System Tokens', value: '80+ Auto-Layout Nodes' },
      { label: 'Frontend Dev Velocity', value: '2.0× Faster Sprints' },
    ],
    challenge:
      'A dense algorithmic risk platform suffered from high churn; Wall Street portfolio managers struggled with cluttered legacy tables, ambiguous data visualizations, and lack of responsive contrast compliance.',
    solution:
      'Engineered an editorial SaaS design system utilizing tabular typography (`tabular-nums`), sub-200ms interaction physics, strict WCAG AAA contrast hierarchy, and complete 1:1 Tailwind v4 token parity.',
    quote:
      'The transition from our legacy terminal to Apex’s tokenized design system transformed how Wall Street traders perceive our analytical power. Our trial-to-paid conversion spiked by 140%, and our engineering velocity doubled because their Figma design variables mirrored our Tailwind CSS properties without translation loss.',
    deliverablesUsed: [
      'Tokenized Multi-Brand Figma Component Library',
      'Flagship Web Experience & Conversion Architecture',
      'Accessibility, Contrast & Conversion Teardown Audit',
    ],
    timeline: '6 Weeks Cadence',
    industry: 'Institutional FinTech & Quantitative SaaS',
    verificationBadge: 'Live Enterprise Production Release',
    deliverableIdsToLoad: ['ui-design-system', 'ui-flagship-web', 'ui-ux-audit'],
  },
  {
    id: 'krono-horology',
    pillarId: 'logo-design',
    pillarLabel: 'Logo Architecture & Visual Marks',
    clientName: 'Eléonore de Saint-Germain',
    clientTitle: 'Head of Brand & Heritage',
    organization: 'Krono Horology Geneva',
    location: 'Geneva & Zurich, Switzerland',
    year: '2025',
    primaryMetric: '0.4mm',
    metricLabel: 'Micro-CNC Crown Engraving Without Stroke Fill-In',
    secondaryMetrics: [
      { label: 'Authorized Dealer Adoption', value: '+68% Expansion' },
      { label: 'Trademark Clearance', value: '100% USPTO & WIPO' },
      { label: 'Ink-Trap Precision', value: '15.0° Optical Cut' },
    ],
    challenge:
      'The brand’s historic heraldic mark was un-reproducible below 20mm, blurring when CNC micro-milled onto titanium watch crowns and disappearing completely as a 16px digital icon.',
    solution:
      'Constructed a mathematically perfected geometric mark on Cartesian and golden-ratio radii, incorporating 15° optical ink-traps and extremal bezier node placements verified for both laser-milling and retina displays.',
    quote:
      'Apex Koncepts executed what Swiss ateliers deemed impossible: an insignia that laser-etches flawlessly into a 4mm titanium watch crown without losing its crisp geometry, yet holds monumental gravitas when cast across our flagship boutique facades on Rue du Rhône.',
    deliverablesUsed: [
      'Primary Wordmark, Symbol & Responsive Lockup Suite',
      'Geometric Construction & Clearspace Specification Blueprint',
      'Kinetic Logomark Idents (60fps Vector Motion)',
    ],
    timeline: '4 Weeks Cadence',
    industry: 'Precision Mechanical Luxury Horology',
    verificationBadge: 'Swiss Horology Trade Exhibition Distinction',
    deliverableIdsToLoad: ['logo-primary-suite', 'logo-optical-grid', 'logo-motion-sting'],
  },
  {
    id: 'kente-botanicals',
    pillarId: 'marketing-collateral',
    pillarLabel: 'Marketing Collateral & Packaging',
    clientName: 'Nana Ama Osei-Bonsu',
    clientTitle: 'Founder & Managing Director',
    organization: 'Kente Botanicals & Apothecary',
    location: 'Accra, Ghana & London, UK',
    year: '2026',
    primaryMetric: '+53%',
    metricLabel: 'Retail Shelf Pick-Up Rate Across West Africa & UK',
    secondaryMetrics: [
      { label: 'Press Room Reprints', value: '0 Overrun Errors' },
      { label: 'Packaging Substrates', value: 'FSC Uncoated Cotton' },
      { label: 'Duty-Free Placement', value: '4 International Hubs' },
    ],
    challenge:
      'An organic luxury apothecary line formulated in Ghana was competing against French and Japanese heritage brands in international luxury department stores with generic off-the-shelf packaging.',
    solution:
      'Created custom CAD structural folding carton die-lines, blind deboss plates on tactile 350gsm Fedrigoni Savile Row cotton stock, and a subtle foil accent system honoring traditional Adinkra mathematics.',
    quote:
      'Within two months of launching the structural packaging designed by Apex Koncepts, our shelf pick-up velocity jumped 53% in Accra Mall, Kotoka Airport duty-free, and London department stores. Our German printers were stunned by the pre-press file precision—zero reprints, zero wasted runs.',
    deliverablesUsed: [
      'Structural Retail Packaging & Unboxing System',
      'Editorial Monograph & Product Lookbook (48 Pages)',
      'Exhibition Booth & Retail Display Architecture',
    ],
    timeline: '5 Weeks Cadence',
    industry: 'Luxury Organic Beauty & Retail Goods',
    verificationBadge: 'West Africa Design Excellence Award',
    deliverableIdsToLoad: ['mc-packaging-suite', 'mc-monograph-book', 'mc-exhibition-kit'],
  },
  {
    id: 'aether-robotics',
    pillarId: 'illustration',
    pillarLabel: 'Bespoke Illustration & Iconography',
    clientName: 'Markus Lindqvist',
    clientTitle: 'VP of Product Engineering',
    organization: 'Aether Autonomous Robotics',
    location: 'Frankfurt, Germany & Stockholm, Sweden',
    year: '2025',
    primaryMetric: '18 Plates',
    metricLabel: 'Isometric Technical Cutaways Explaining Complex Sensors',
    secondaryMetrics: [
      { label: 'Exhibition Distinction', value: 'Best in Show (Hannover)' },
      { label: 'Iconography Library', value: '75 Pixel-Snapped Icons' },
      { label: 'Asset Payload Weight', value: '< 3.8KB Per SVG' },
    ],
    challenge:
      'Enterprise buyers struggled to understand the multi-sensor LIDAR and machine-vision capabilities of autonomous factory robotics through standard CAD blueprints and stock 3D renders.',
    solution:
      'Apex crafted a bespoke isometric vector grammar with uniform 1.5px keyline mechanics, 18 architectural exploded-view cutaways, and a 75-piece hardware telemetry icon library.',
    quote:
      'Complex multi-axis industrial robotics usually alienate enterprise purchasers with dense CAD wiring diagrams. Apex Koncepts transformed our mechanical patents into gorgeous, immediately comprehensible architectural cutaways. Our pavilion took Best in Show at Hannover Messe.',
    deliverablesUsed: [
      'Series of 6 Bespoke Editorial / Technical Illustrations',
      'Custom 60-Piece Geometric Iconography System',
      'Proprietary Brand Textile & Technical Pattern Library',
    ],
    timeline: '5 Weeks Cadence',
    industry: 'Industrial Robotics & Factory Automation',
    verificationBadge: 'Hannover Messe Industrial Showcase Award',
    deliverableIdsToLoad: ['ill-hero-series', 'ill-icon-matrix', 'ill-packaging-pattern'],
  },
  {
    id: 'volta-trust',
    pillarId: 'ui-ux-design',
    pillarLabel: 'Fintech & Digital Banking Architecture',
    clientName: 'Ewura Esi Tandoh',
    clientTitle: 'Head of Digital Banking & Treasury',
    organization: 'Volta Merchant Bank & Trust',
    location: 'Accra, Ghana & Abidjan, Côte d’Ivoire',
    year: '2026',
    primaryMetric: '+84%',
    metricLabel: 'Treasury Portal Mobile Adoption & Onboarding Speed',
    secondaryMetrics: [
      { label: 'Onboarding Velocity', value: '48h vs 14 Days' },
      { label: 'Dispute Reduction', value: '-72% Support Tickets' },
      { label: 'GhIPSS & SWIFT Clarity', value: '99.98% Clean Flows' },
    ],
    challenge:
      'Regional ECOWAS corporate treasurers managing multi-currency treasury operations faced cognitive overload and high error rates when switching between local Mobile Money and SWIFT wires.',
    solution:
      'Designed a clean, tabular financial interface with high-contrast legibility, explicit transaction claim-to-proof confirmation receipts, and seamless integration between GhIPSS instant transfers and global wire tracking.',
    quote:
      'Apex Koncepts solved the fundamental problem of regional corporate treasury: cognitive overload. Their modular tabular architecture reduced customer onboarding from two weeks to 48 hours, with corporate treasurers across West Africa praising the visual calm and precision.',
    deliverablesUsed: [
      'Tokenized Multi-Brand Figma Component Library',
      'Flagship Web Experience & Conversion Architecture',
      'Accessibility, Contrast & Conversion Teardown Audit',
    ],
    timeline: '6 Weeks Cadence',
    industry: 'Regional Digital Banking & Corporate Treasury',
    verificationBadge: 'Bank of Ghana Compliance Audited',
    deliverableIdsToLoad: ['ui-design-system', 'ui-flagship-web', 'ui-ux-audit'],
  },
];
