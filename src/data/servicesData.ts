export interface ProcessPhase {
  step: string;
  title: string;
  duration: string;
  description: string;
  keyOutputs: string[];
}

export interface DeliverableSpec {
  id: string;
  name: string;
  formats: string[];
  colorProfile: string;
  description: string;
  includedByDefault: boolean;
  standalonePrice: number;
  estimatedDays: number;
}

export interface StrategicValueItem {
  metric: string;
  title: string;
  explanation: string;
}

export interface CaseStudyProof {
  client: string;
  industry: string;
  year: string;
  outcomeMetric: string;
  summary: string;
  deliverablesUsed: string[];
}

export interface ServicePillar {
  id: 'logo-design' | 'corporate-identity' | 'ui-ux-design' | 'illustration' | 'marketing-collateral';
  index: string;
  title: string;
  subtitle: string;
  kicker: string;
  bentoSpan: 'large' | 'wide' | 'standard';
  shortSummary: string;
  editorialLead: string;
  startingInvestment: number;
  typicalTimeline: string;
  process: ProcessPhase[];
  deliverables: DeliverableSpec[];
  strategicValue: StrategicValueItem[];
  caseProof: CaseStudyProof;
  technicalStandards: string[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'logo-design',
    index: '01',
    title: 'Logo Architecture & Visual Marks',
    subtitle: 'Distilled geometric signifiers built for infinite scalability from 16px favicons to architectural signage.',
    kicker: 'Foundational Semiotics · Vector Construction · Optical Balance',
    bentoSpan: 'large',
    shortSummary:
      'We engineer enduring primary marks, typographic wordmarks, and responsive monograms anchored in mathematical grid geometry and optical weight correction.',
    editorialLead:
      'A logo is not an illustration; it is an economic signature. At Apex Koncepts, every mark undergoes rigorous Golden Ratio and Swiss modular grid stress-testing, extreme small-scale pixel hinting, and substrate reversal checks before a single vector node is finalized.',
    startingInvestment: 6500,
    typicalTimeline: '3–4 Weeks',
    process: [
      {
        step: 'Phase 01',
        title: 'Semiotic Audit & Competitive Topology',
        duration: 'Week 1',
        description:
          'We catalog 40+ category competitors, audit historical visual tropes in your sector, and isolate unoccupied geometric and typographic territory.',
        keyOutputs: ['Competitive Visual Matrix', 'Semiotic Territory Brief', 'Trademark Collision Pre-Screen']
      },
      {
        step: 'Phase 02',
        title: 'Analogue Sketching & Vector Grid Construction',
        duration: 'Week 2',
        description:
          'Over 120 rapid graphite studies are distilled into 3 distinct geometric directions plotted on strict Cartesian and radial construction grids.',
        keyOutputs: ['3 Distinct Concept Directions', 'Bezier Node & Curvature Diagrams', 'Monochrome Reversal Proofs']
      },
      {
        step: 'Phase 03',
        title: 'Optical Weighting & Micro-Scale Calibration',
        duration: 'Week 3',
        description:
          'We optically adjust stroke intersections, ink traps, and kerning pairs so the mark holds authority on both a 16×16px browser tab and a 12-meter building facade.',
        keyOutputs: ['Size-Specific Optical Masters', 'Small-Space Ink Trap Variants', 'Real-World Context Mockups']
      },
      {
        step: 'Phase 04',
        title: 'Master Artwork & IP Transfer Package',
        duration: 'Week 4',
        description:
          'Final vector compilation across Pantone solid/uncoated, CMYK, and sRGB color spaces alongside full copyright assignment documentation.',
        keyOutputs: ['Master Vector Archive', 'Safe-Zone & Lockup Sheet', 'Full IP & Trademark Assignment']
      }
    ],
    deliverables: [
      {
        id: 'logo-primary-suite',
        name: 'Primary Wordmark, Symbol & Responsive Lockup Suite',
        formats: ['.AI', '.EPS', '.SVG', '.PDF/X-4', '.PNG'],
        colorProfile: 'Pantone Solid / CMYK / sRGB',
        description: 'Horizontal, stacked, symbol-only, and micro-favicon variants engineered with exact optical kerning.',
        includedByDefault: true,
        standalonePrice: 3800,
        estimatedDays: 12
      },
      {
        id: 'logo-optical-grid',
        name: 'Geometric Construction & Clearspace Specification Blueprint',
        formats: ['.PDF', '.FIG', '.SVG'],
        colorProfile: 'Archival Monochrome & Redline',
        description: 'Exact X-height ratios, minimum reproduction sizes (print mm & digital px), and prohibited usage matrices.',
        includedByDefault: true,
        standalonePrice: 1500,
        estimatedDays: 4
      },
      {
        id: 'logo-motion-sting',
        name: 'Kinetic Logomark Idents (60fps Vector Motion)',
        formats: ['.JSON (Lottie)', '.MP4', '.MOV (ProRes 4444)'],
        colorProfile: 'Rec.709 / sRGB Alpha',
        description: 'Physics-based 2.5-second reveal animation for product splash screens, video reels, and investor decks.',
        includedByDefault: false,
        standalonePrice: 2200,
        estimatedDays: 5
      }
    ],
    strategicValue: [
      {
        metric: '+42% Unprompted Brand Recall',
        title: 'Instantaneous Silhouette Recognition',
        explanation:
          'Stripping away decorative noise ensures customers recognize your silhouette within 150 milliseconds on crowded shelves and social feeds.'
      },
      {
        metric: '100% Trademark Defensibility',
        title: 'Ownable Geometric Architecture',
        explanation:
          'Bespoke bezier construction and custom-modified letterforms eliminate generic font licensing traps and clear USPTO/EUIPO registration hurdles.'
      },
      {
        metric: 'Zero Reproduction Friction',
        title: 'Multi-Substrate Reliability',
        explanation:
          'Whether blind-debossed into 600gsm cotton stock, laser-etched on anodized aluminum, or rendered on OLED screens, the mark never blurs or fills in.'
      }
    ],
    caseProof: {
      client: 'Krono Horology Geneva',
      industry: 'Precision Mechanical Watches',
      year: '2025',
      outcomeMetric: '0.4mm Crown Engraving Precision · +68% Dealer Adoption',
      summary:
        'Engineered a hairline geometric crest capable of CNC micro-milling onto a 4mm titanium watch crown while anchoring flagship boutique signage in Zurich.',
      deliverablesUsed: ['Primary Wordmark & Crest', 'Micro-Scale CNC Vector Master', 'Horological Hallmark Spec']
    },
    technicalStandards: [
      'Zero stray anchor points; extremal nodes aligned to integer pixel grids',
      'Custom ink-traps cut at 15° angles for small-format letterpress & screen printing',
      'True Pantone Spot-to-CMYK lab-verified bridge values'
    ]
  },
  {
    id: 'corporate-identity',
    index: '02',
    title: 'Corporate Identity Systems',
    subtitle: 'Comprehensive visual constitutions governing typography, color chemistry, grid architecture, and stationery.',
    kicker: 'Brand Governance · Typographic Systems · Tactile Print Specs',
    bentoSpan: 'wide',
    shortSummary:
      'A complete institutional visual language—unifying bespoke type hierarchies, archival color palettes, photography art direction, and executive print suites.',
    editorialLead:
      'A logo alone cannot sustain an enterprise. Our Corporate Identity Systems operate as an architectural blueprint that aligns internal teams, external agencies, and industrial printers under one unmistakable visual constitution.',
    startingInvestment: 14000,
    typicalTimeline: '5–7 Weeks',
    process: [
      {
        step: 'Phase 01',
        title: 'Brand Positioning & Verbal-Visual Alignment',
        duration: 'Weeks 1–2',
        description:
          'Executive interviews and structural workshops to codify brand archetype, institutional tone, and visual tension points.',
        keyOutputs: ['Brand Architecture Manifesto', 'Visual Positioning Axis', 'Audit of Legacy Touchpoints']
      },
      {
        step: 'Phase 02',
        title: 'Typographic Pairing & Chromatic Chemistry',
        duration: 'Weeks 3–4',
        description:
          'Selection and licensing guidance for display, editorial prose, and tabular data typefaces alongside custom Pantone/RAL/HEX color equations.',
        keyOutputs: ['Proportional Type Scale Matrix', '60-30-10 Color Contrast Spec', 'Paper Stock & Foil Swatch Deck']
      },
      {
        step: 'Phase 03',
        title: 'Grid Systems & Executive Touchpoint Design',
        duration: 'Week 5',
        description:
          'Designing modular layout grids across business stationery, investor pitch templates, environmental wayfinding, and digital signatures.',
        keyOutputs: ['Swiss 12-Column Print & Deck Grids', 'Stationery Die-Lines', 'Art Direction & Photography Rules']
      },
      {
        step: 'Phase 04',
        title: 'The Brand Constitution (Guidelines Monograph)',
        duration: 'Weeks 6–7',
        description:
          'Compilation of a 60+ page interactive digital and print-ready Brand Bible alongside cloud asset libraries for seamless global rollout.',
        keyOutputs: ['60-Page Brand Monograph', 'Master Template Repository', 'Press & Vendor Print Kit']
      }
    ],
    deliverables: [
      {
        id: 'ci-brand-bible',
        name: 'Comprehensive Brand Identity Monograph (60+ Pages)',
        formats: ['.PDF/X-4', '.INDD', '.FIG', 'Web Portal'],
        colorProfile: 'CMYK Coated/Uncoated + sRGB',
        description: 'Exhaustive rulebook covering logo usage, typography scales, color ratios, grid mathematics, and photographic tone.',
        includedByDefault: true,
        standalonePrice: 6800,
        estimatedDays: 18
      },
      {
        id: 'ci-stationery-suite',
        name: 'Executive Tactile Stationery & Packaging Die-Lines',
        formats: ['.AI', '.PDF/X-4', '.INDD'],
        colorProfile: 'Pantone Uncoated + Blind Emboss / Foil Plates',
        description: 'Business cards, DIN/US letterhead, archival envelopes, presentation folders, and custom packaging sleeves.',
        includedByDefault: true,
        standalonePrice: 3600,
        estimatedDays: 10
      },
      {
        id: 'ci-deck-system',
        name: 'Boardroom & Series-A/B Pitch Deck Master System',
        formats: ['.FIG', '.KEY', '.PPTX', '.PDF'],
        colorProfile: 'sRGB High-Contrast Projection',
        description: '45 modular master slides with financial data tables, tabular chart components, and architectural layouts.',
        includedByDefault: true,
        standalonePrice: 3600,
        estimatedDays: 8
      }
    ],
    strategicValue: [
      {
        metric: '3.2× Faster Campaign Rollout',
        title: 'Elimination of Design Drift',
        explanation:
          'Pre-engineered templates and explicit typographic ratios allow internal teams to produce new assets in hours without diluting brand equity.'
      },
      {
        metric: '+28% Perceived Enterprise Valuation',
        title: 'Institutional Authority at Every Touchpoint',
        explanation:
          'Cohesive visual rigor across pitch decks, contracts, and physical packaging signals operational maturity to institutional investors and enterprise buyers.'
      },
      {
        metric: 'WCAG AAA/AA Verified',
        title: 'Mathematically Verified Contrast',
        explanation:
          'Every color pairing in the identity palette is pre-tested for luminance contrast across both coated print stocks and high-brightness displays.'
      }
    ],
    caseProof: {
      client: 'Vanguard Nordics Sovereign Fund',
      industry: 'Institutional Climate Infrastructure',
      year: '2026',
      outcomeMetric: '$420M Fund Close · 14 Global Offices Unified',
      summary:
        'Replaced 6 fragmented regional sub-brands with a unified Swiss-editorial identity system, hardcover annual report framework, and investor portal.',
      deliverablesUsed: ['74-Page Identity Monograph', 'Annual Report InDesign Grid', 'Executive Stationery Suite']
    },
    technicalStandards: [
      'Baseline grid locked to 4pt/8pt increments across all print and digital layouts',
      'FSC-certified archival cotton and uncoated paper stock specifications (Gmund / Fedrigoni)',
      'OpenType feature enforcement (`tabular-nums`, ligatures, optical margins)'
    ]
  },
  {
    id: 'ui-ux-design',
    index: '03',
    title: 'UI/UX & Digital Product Systems',
    subtitle: 'High-craft web platforms, tokenized Figma design systems, and zero-friction interactive software interfaces.',
    kicker: 'Design Systems · Information Architecture · Interactive Prototypes',
    bentoSpan: 'standard',
    shortSummary:
      'We bridge editorial graphic design and software engineering—delivering tokenized component libraries, high-conversion web experiences, and complex SaaS workflows.',
    editorialLead:
      'Most digital products suffer from generic template fatigue. We bring editorial typographic discipline, spatial clarity, and sub-200ms micro-interaction physics to complex web applications and flagship marketing sites.',
    startingInvestment: 11500,
    typicalTimeline: '4–6 Weeks',
    process: [
      {
        step: 'Phase 01',
        title: 'Information Architecture & User Flow Mapping',
        duration: 'Week 1',
        description:
          'Restructuring navigation hierarchies, user decision trees, and conversion funnels to eliminate cognitive friction.',
        keyOutputs: ['Interactive Sitemap', 'User Task Flow Blueprints', 'Low-Latency Wireframe Architecture']
      },
      {
        step: 'Phase 02',
        title: 'Visual Direction & Tokenized Design System',
        duration: 'Weeks 2–3',
        description:
          'Building atomic Figma variables for spacing, typography, elevation, and semantic light/dark color tokens.',
        keyOutputs: ['Figma Variable Token Architecture', 'Atomic Component Library', 'Responsive Breakpoint Matrix']
      },
      {
        step: 'Phase 03',
        title: 'High-Fidelity Interface Craft & Interactive States',
        duration: 'Weeks 4–5',
        description:
          'Designing desktop (1440px), tablet, and mobile viewports with complete hover, focus, loading, empty, and error states.',
        keyOutputs: ['Full Viewport Screen Flows', 'Interactive Clickable Prototype', 'Motion & Easing Curve Specs']
      },
      {
        step: 'Phase 04',
        title: 'Engineering Handoff & QA Audit',
        duration: 'Week 6',
        description:
          'Delivering annotated CSS/Tailwind token maps, SVG sprite sheets, and conducting live DOM visual QA alongside your developers.',
        keyOutputs: ['JSON Design Tokens', 'Developer Spec Annotations', 'Live Staging Visual QA Audit']
      }
    ],
    deliverables: [
      {
        id: 'ui-design-system',
        name: 'Tokenized Multi-Brand Figma Component Library',
        formats: ['.FIG', '.JSON (W3C Tokens)', '.CSS'],
        colorProfile: 'sRGB / Display P3 Semantic Tokens',
        description: '80+ auto-layout components with variants, interactive states, WCAG contrast badges, and Tailwind v4 variable exports.',
        includedByDefault: true,
        standalonePrice: 5500,
        estimatedDays: 14
      },
      {
        id: 'ui-flagship-web',
        name: 'Flagship Web Experience & Conversion Architecture',
        formats: ['.FIG', 'Interactive Prototype', '.SVG Assets'],
        colorProfile: 'sRGB / P3 Wide Gamut',
        description: '10–15 bespoke responsive templates across desktop and mobile with interactive calculators and editorial storytelling.',
        includedByDefault: true,
        standalonePrice: 6000,
        estimatedDays: 16
      },
      {
        id: 'ui-ux-audit',
        name: 'Accessibility, Contrast & Conversion Teardown',
        formats: ['.PDF', '.FIG Redlines'],
        colorProfile: 'Diagnostic Annotated Layer',
        description: 'Screen-by-screen heuristic audit resolving WCAG AA/AAA failures, layout shifts, and checkout drop-off bottlenecks.',
        includedByDefault: false,
        standalonePrice: 2800,
        estimatedDays: 6
      }
    ],
    strategicValue: [
      {
        metric: '+64% Qualified Conversion Lift',
        title: 'Clarity-Driven Conversion Architecture',
        explanation:
          'Replacing cluttered SaaS tropes with structured claim-to-proof hierarchies directly increases demo bookings and self-serve checkouts.'
      },
      {
        metric: '50% Faster Frontend Velocity',
        title: '1:1 Engineering Token Parity',
        explanation:
          'Because our Figma tokens mirror CSS custom properties and Tailwind scales, engineers ship pixel-accurate views without guesswork.'
      },
      {
        metric: 'Zero Accessibility Debt',
        title: 'Built-In Keyboard & Contrast Compliance',
        explanation:
          'Every interactive control ships with explicit focus-visible rings, >=44px touch targets, and verified 4.5:1 minimum text contrast.'
      }
    ],
    caseProof: {
      client: 'Helios Quantitative Analytics',
      industry: 'Institutional FinTech SaaS',
      year: '2026',
      outcomeMetric: '+140% Enterprise Demo Requests · -38% Task Completion Time',
      summary:
        'Redesigned both the public marketing architecture and the core portfolio risk workbench using tabular typography and a 120-component Figma library.',
      deliverablesUsed: ['Tokenized Figma System', 'Marketing & Product UI Suite', 'Tailwind Token Export']
    },
    technicalStandards: [
      '100% Auto-Layout 5.0 compliance with min/max responsive constraints',
      'Compositor-only motion specifications (`transform`, `opacity`) capped at <=200ms',
      'Tabular numeral enforcement across all data grids and pricing calculators'
    ]
  },
  {
    id: 'illustration',
    index: '04',
    title: 'Bespoke Illustration & Iconography',
    subtitle: 'Architectural technical drawings, custom vector icon matrices, and editorial visual metaphors.',
    kicker: 'Technical Isometric Art · Custom Icon Grids · Editorial Plates',
    bentoSpan: 'standard',
    shortSummary:
      'Custom-commissioned illustration systems and 24px/48px geometric icon families that make complex technical concepts immediately tangible.',
    editorialLead:
      'Stock vectors and generic 3D renders immediately erode brand credibility. We craft proprietary illustration languages—ranging from woodcut-inspired editorial plates to ultra-precise isometric architectural cutaways.',
    startingInvestment: 7200,
    typicalTimeline: '3–5 Weeks',
    process: [
      {
        step: 'Phase 01',
        title: 'Visual Metaphor & Stroke Grammar Definition',
        duration: 'Week 1',
        description:
          'Establishing line-weight mathematics, corner radii, shading hatching rules, and perspective projection angles (isometric 30° vs orthographic).',
        keyOutputs: ['Illustration Style Charter', 'Stroke & Corner Radius Rules', '3 Concept Pencil Studies']
      },
      {
        step: 'Phase 02',
        title: 'Hero Editorial & Technical Cutaway Drafting',
        duration: 'Weeks 2–3',
        description:
          'Precision vector construction of hero narrative illustrations, product cross-sections, and Packaging artwork plates.',
        keyOutputs: ['High-Detail Hero Vector Plates', 'Layered Component Diagrams', 'Print & Screen Color Separations']
      },
      {
        step: 'Phase 03',
        title: 'Systematic Iconography Matrix (24px / 48px Grid)',
        duration: 'Week 4',
        description:
          'Designing a cohesive family of 40–100 custom icons plotted on a pixel-snapped keyline grid with uniform optical volume.',
        keyOutputs: ['Pixel-Snapped Icon Family', 'Keyline Construction Grid', 'React/SVG Sprite Package']
      },
      {
        step: 'Phase 04',
        title: 'Animation Prep & Asset Optimization',
        duration: 'Week 5',
        description:
          'Grouping and naming vector paths for seamless SVG stroke-dash animation, Lottie export, or spot-color screen printing.',
        keyOutputs: ['SVGO-Optimized Code Bundle', 'Print Spot-Plate Separations', 'Illustration Usage Guide']
      }
    ],
    deliverables: [
      {
        id: 'ill-hero-series',
        name: 'Series of 6 Bespoke Editorial / Technical Illustrations',
        formats: ['.AI', '.SVG', '.EPS', '.PNG (8K)', '.PDF'],
        colorProfile: 'Pantone Spot Separations + sRGB',
        description: 'Custom narrative or technical cutaway illustrations tailored for hero headers, packaging, and annual reports.',
        includedByDefault: true,
        standalonePrice: 4400,
        estimatedDays: 14
      },
      {
        id: 'ill-icon-matrix',
        name: 'Custom 60-Piece Geometric Iconography System',
        formats: ['.SVG', '.FIG', 'React TSX Bundle', '.PDF'],
        colorProfile: 'CurrentColor Adaptive + Duotone',
        description: 'Built on a strict 24×24px and 48×48px optical grid with consistent 1.5px stroke mechanics.',
        includedByDefault: true,
        standalonePrice: 2800,
        estimatedDays: 10
      },
      {
        id: 'ill-packaging-pattern',
        name: 'Proprietary Brand Textile & Packaging Pattern Library',
        formats: ['.AI', '.TIFF', '.SVG'],
        colorProfile: 'CMYK + Metallic Foil Plate',
        description: 'Seamless geometric and botanical repeat patterns for tissue wraps, box interiors, and architectural glass.',
        includedByDefault: false,
        standalonePrice: 1900,
        estimatedDays: 5
      }
    ],
    strategicValue: [
      {
        metric: '100% Exclusive Copyright',
        title: 'Zero Stock-Art Overlap',
        explanation:
          'Every vector path is drawn from scratch and assigned exclusively to your organization—impossible for competitors to license or replicate.'
      },
      {
        metric: '2.4× Higher Technical Comprehension',
        title: 'Instant Explanation of Complex Systems',
        explanation:
          'Isometric schematics and architectural diagrams distill dense engineering or financial workflows into an immediate visual mental model.'
      },
      {
        metric: '< 4KB Per Vector Asset',
        title: 'Zero Performance Penalty',
        explanation:
          'Hand-tuned SVG path geometry delivers razor-sharp retina visuals at a fraction of the file weight of raster photography.'
      }
    ],
    caseProof: {
      client: 'Aether Autonomous Robotics',
      industry: 'Industrial Robotics & Sensing',
      year: '2025',
      outcomeMetric: '18 Technical Cutaways · Best in Show at Hannover Messe',
      summary:
        'Created a series of architectural exploded-view vector schematics and a 75-icon hardware telemetry library used across machine HUDs and trade pavilion walls.',
      deliverablesUsed: ['Exploded Isometric Schematics', '75-Icon Telemetry Matrix', 'Large-Format Pavilion Vectors']
    },
    technicalStandards: [
      'Strict 24×24px and 48×48px keyline templates with 2px live padding',
      'Clean boolean path operations; zero raster effects embedded in vector masters',
      'Semantic layer naming for direct CSS/JS path manipulation'
    ]
  },
  {
    id: 'marketing-collateral',
    index: '05',
    title: 'Marketing Collateral & Print Architecture',
    subtitle: 'Tactile packaging structures, architectural monographs, exhibition environments, and high-impact campaign assets.',
    kicker: 'Structural Packaging · Editorial Monographs · Exhibition Systems',
    bentoSpan: 'wide',
    shortSummary:
      'From embossed luxury retail packaging and thread-sewn hardcover catalogs to trade pavilion graphics and multi-format digital campaign suites.',
    editorialLead:
      'In a digital-saturated market, physical permanence commands extraordinary authority. We engineer print and packaging artifacts with obsessive attention to paper grain direction, structural die-lines, foil stamping pressure, and Swiss typographic pacing.',
    startingInvestment: 9500,
    typicalTimeline: '4–6 Weeks',
    process: [
      {
        step: 'Phase 01',
        title: 'Structural Engineering & Substrate Curation',
        duration: 'Week 1',
        description:
          'Selecting tactile paper stocks, carton flute weights, binding mechanics (Smyth-sewn, Swiss open-spine), and sustainable inks.',
        keyOutputs: ['Physical Paper & Board Spec', 'Structural CAD Die-Lines', 'Print Cost & Vendor Matrix']
      },
      {
        step: 'Phase 02',
        title: 'Editorial Layout & Campaign Art Direction',
        duration: 'Weeks 2–3',
        description:
          'Typesetting multi-page monographs, lookbooks, or packaging panels on a multi-column Swiss grid with micro-typographic polish.',
        keyOutputs: ['Full-Scale Layout Proofs', 'Packaging 3D Fold Mockups', 'OOH & Digital Campaign Masters']
      },
      {
        step: 'Phase 03',
        title: 'Pre-Press Color Separation & Wet-Proofing',
        duration: 'Week 4',
        description:
          'Preparing overprint trapping, 3mm/5mm bleeds, spot UV masks, brass embossing die vectors, and reviewing physical press proofs.',
        keyOutputs: ['PDF/X-4 Certified Press Files', 'Brass Die & Foil Plate Vectors', 'Chromalin / Wet-Press Sign-Off']
      },
      {
        step: 'Phase 04',
        title: 'Production Supervision & Multi-Channel Rollout',
        duration: 'Weeks 5–6',
        description:
          'On-press supervision with master printers alongside synchronized delivery of social, OOH, and retail display adaptations.',
        keyOutputs: ['Press-Checked Physical Run', 'Digital Campaign Asset Kit', 'Archival Production Binder']
      }
    ],
    deliverables: [
      {
        id: 'mc-packaging-suite',
        name: 'Structural Retail Packaging & Unboxing System',
        formats: ['.AI (CAD Die-Lines)', '.PDF/X-4', '3D Studio Renders'],
        colorProfile: 'CMYK + Pantone Metallic / Spot UV / Emboss Plates',
        description: 'Primary cartons, glass/vessel labels, fluted inserts, and tamper seals engineered for shelf impact and unboxing theater.',
        includedByDefault: true,
        standalonePrice: 5200,
        estimatedDays: 15
      },
      {
        id: 'mc-monograph-book',
        name: 'Editorial Monograph, Lookbook or Annual Report (32–96 Pages)',
        formats: ['.INDD', '.PDF/X-4', 'Interactive Digital Edition'],
        colorProfile: 'Fogra39 / Fogra51 Uncoated Profile',
        description: 'Museum-grade editorial publication with Swiss grid typography, figure captions, and custom binding specifications.',
        includedByDefault: true,
        standalonePrice: 4300,
        estimatedDays: 14
      },
      {
        id: 'mc-exhibition-kit',
        name: 'Exhibition Booth, Wayfinding & OOH Campaign Suite',
        formats: ['.AI', '.PDF (1:1 & 1:10 Scale)', '.TIFF'],
        colorProfile: 'CMYK Large-Format + Pantone Match',
        description: 'Architectural trade show walls, hanging banners, transit billboards, and synchronized social announcement cards.',
        includedByDefault: false,
        standalonePrice: 3800,
        estimatedDays: 10
      }
    ],
    strategicValue: [
      {
        metric: '+53% Retail Shelf Pick-Up Rate',
        title: 'Tactile Shelf Dominance',
        explanation:
          'Architectural typography combined with tactile paper stocks and foil accents creates an immediate sensory distinction in retail environments.'
      },
      {
        metric: 'Zero Press-Room Reprints',
        title: 'Obsessive Pre-Press Precision',
        explanation:
          'Our PDF/X-4 files include exact ink-density caps (TAC <=300%), trapping chokes, and verified die-line creases—preventing costly printing errors.'
      },
      {
        metric: '89% Executive Retention Rate',
        title: 'Physical Artifacts That Never Get Deleted',
        explanation:
          'While emails vanish in seconds, a Smyth-sewn monograph or heavy letterpress dossier remains on a decision-maker’s desk for months.'
      }
    ],
    caseProof: {
      client: 'Aura Botanica Apothecary',
      industry: 'Luxury Botanical Skincare',
      year: '2026',
      outcomeMetric: '+185% Direct-to-Consumer Repeat Orders · Featured in Wallpaper*',
      summary:
        'Engineered a 100% plastic-free fluted cotton packaging system with blind-debossed botanical plates and amber apothecary glass labeling.',
      deliverablesUsed: ['CAD Fluted Carton Die-Lines', 'Blind-Deboss Brass Plate Specs', '48-Page Botanical Monograph']
    },
    technicalStandards: [
      'ISO 15930 (PDF/X-4) pre-press certification with live transparency flattening',
      'Exact paper grain alignment parallel to spine/fold creases to prevent cracking',
      'Separate spot-channel layers for Die-Cut, Crease, Perf, Emboss, and Hot Foil'
    ]
  }
];

export interface ComparisonDimension {
  category: string;
  specification: string;
  logoDesign: string;
  corporateIdentity: string;
  uiUxDesign: string;
  illustration: string;
  marketingCollateral: string;
}

export const DELIVERABLE_COMPARISON_MATRIX: ComparisonDimension[] = [
  {
    category: 'Primary Output',
    specification: 'Core Master Artifacts',
    logoDesign: 'Wordmark, Symbol, Monogram & Responsive Lockups',
    corporateIdentity: '60+ Page Brand Bible, Type/Color System & Stationery',
    uiUxDesign: 'Tokenized Figma Library & Responsive Web/App Screens',
    illustration: '6 Hero Vector Plates + 60-Icon Pixel-Snapped Matrix',
    marketingCollateral: 'CAD Packaging Die-Lines, Editorial Books & OOH Kits'
  },
  {
    category: 'Source Formats',
    specification: 'Production File Extensions',
    logoDesign: '.AI, .EPS, .SVG, .PDF/X-4, .PNG (8K)',
    corporateIdentity: '.INDD, .PDF/X-4, .AI, .FIG, .KEY/.PPTX',
    uiUxDesign: '.FIG, W3C .JSON Tokens, .CSS, .SVG Sprites',
    illustration: '.AI, .SVG, .EPS, React .TSX, .TIFF',
    marketingCollateral: '.INDD, .AI (CAD Die-Lines), .PDF/X-4, 3D Renders'
  },
  {
    category: 'Color Architecture',
    specification: 'Calibrated Color Spaces',
    logoDesign: 'Pantone Solid/Uncoated, CMYK, sRGB, Monochrome',
    corporateIdentity: 'Pantone, RAL, CMYK (Fogra39/51), HEX, Display P3',
    uiUxDesign: 'Semantic Light/Dark sRGB & Display P3 Tokens',
    illustration: 'Spot-Color Separations + Adaptive CurrentColor SVG',
    marketingCollateral: 'CMYK <=300% TAC + Foil, Emboss & Spot UV Plates'
  },
  {
    category: 'Governance & QA',
    specification: 'Verification Standard',
    logoDesign: '16px Pixel Hinting + 0.4mm Micro-Engraving Test',
    corporateIdentity: 'WCAG AA/AAA Contrast + Multi-Vendor Print Spec',
    uiUxDesign: 'Auto-Layout 5.0 + >=44px Touch Target Verification',
    illustration: '24px/48px Keyline Grid + Boolean Path Cleanliness',
    marketingCollateral: 'ISO 15930 PDF/X-4 + Wet-Press Proof Supervision'
  },
  {
    category: 'Intellectual Property',
    specification: 'Licensing & Ownership',
    logoDesign: '100% Exclusive Worldwide IP & Trademark Transfer',
    corporateIdentity: 'Full System IP Transfer + Font Licensing Schedule',
    uiUxDesign: '100% Design System & Custom Component Ownership',
    illustration: '100% Exclusive Custom Artwork Copyright Assignment',
    marketingCollateral: 'Full Structural CAD & Editorial Layout Ownership'
  }
];
