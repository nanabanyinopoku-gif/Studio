import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight, HelpCircle } from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'workflow' | 'payments' | 'ip-legal' | 'production';
  index: string;
  question: string;
  answer: string;
  keyTakeaway: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-workflow-phases',
    category: 'workflow',
    index: '01',
    question: 'How is a design engagement structured from kick-off to final delivery?',
    answer:
      'Every project follows our 4-phase architectural methodology: (1) Semiotic Discovery & Competitive Audit, (2) Vector Geometry & Typographic Exploration, (3) Systemization & Multi-Substrate Stress-Testing, and (4) Master Production & Press-Ready Compilation. Sprints run in dedicated 2-week milestones with direct Senior Partner guidance, weekly video walk-throughs, and staging review links.',
    keyTakeaway: 'Predictable 2-week milestone reviews with zero junior hand-offs.',
  },
  {
    id: 'faq-payment-timelines',
    category: 'payments',
    index: '02',
    question: 'What are your payment terms, milestone tranches, and accepted settlement platforms?',
    answer:
      'Standard studio engagements are structured as a 50% commencement retainer to secure your dedicated sprint dates on our studio calendar, followed by a 50% milestone balance upon final deliverable sign-off prior to master vector release. For enterprise brand architecture programs exceeding $25,000 / GH₵380,000, we offer a 40/30/30 phased payment schedule tied directly to approved phase deliverables.',
    keyTakeaway: '50% kick-off deposit + 50% final sign-off. Phased schedules available for enterprise programs.',
  },
  {
    id: 'faq-local-international-pay',
    category: 'payments',
    index: '03',
    question: 'Can we settle in Ghana Cedis via Mobile Money, or in USD/EUR via international wire?',
    answer:
      'Yes. Being headquartered in Airport Residential Area, Accra with international treasury accounts, we natively process Ghana Cedi (GH₵) payments via MTN Mobile Money (*170#), Telecel Cash (*110#), AT Money, and GhIPSS Instant Pay (Ecobank, GCB, Stanbic, Fidelity) with official Ghana Revenue Authority (GRA) e-VAT/NHIL invoices. International clients can pay seamlessly via Visa, Mastercard, Apple Pay, Google Pay, Wise, PayPal, or SWIFT/IBAN wire.',
    keyTakeaway: 'Full Bank of Ghana MoMo/GIP compliance alongside global SWIFT and card checkout.',
  },
  {
    id: 'faq-ip-transfer',
    category: 'ip-legal',
    index: '04',
    question: 'When is Intellectual Property (IP) and copyright transferred to our organization?',
    answer:
      'Full, exclusive, worldwide intellectual property rights and copyright assignment transfer to your company immediately upon receipt of final settlement. You receive complete ownership of all approved wordmarks, symbols, custom vector illustrations, CAD die-lines, and layout systems with full legal clearance for international trademark registration (Registrar General Ghana, USPTO, EUIPO, UKIPO).',
    keyTakeaway: '100% exclusive worldwide IP assignment transferred immediately upon final settlement.',
  },
  {
    id: 'faq-working-raw-files',
    category: 'ip-legal',
    index: '05',
    question: 'What is the distinction between production masters and open raw working archives?',
    answer:
      'All engagements include our Production Master Suite (.AI, .EPS, .SVG, .PDF/X-4, tokenized Figma libraries, and 8K PNGs) ready for commercial deployment. Clients requiring our un-flattened working layered archives, early exploratory vector branches, and proprietary CAD structural dies can select our Global Working Buyout option (+15%) in the Scope Estimator.',
    keyTakeaway: 'Production masters are included by default; open working sketch archives can be bundled anytime.',
  },
  {
    id: 'faq-nda-confidentiality',
    category: 'ip-legal',
    index: '06',
    question: 'Do you sign Mutual Non-Disclosure Agreements (NDAs) prior to project review?',
    answer:
      'Yes. We operate under strict mutual confidentiality protocols. All unreleased product names, stealth technology specifications, architectural blueprints, and investment rounds shared with Apex Koncepts are protected under the Ghana Data Protection Act 843 and our bilateral NDA charter. We never disclose client work until public market launch.',
    keyTakeaway: 'Bilateral NDA protection executed before any proprietary data is reviewed.',
  },
  {
    id: 'faq-production-print-checks',
    category: 'production',
    index: '07',
    question: 'Do you supervise physical printing and packaging manufacturing runs?',
    answer:
      'Yes. Unlike digital-only agencies, our team has extensive pre-press and press-room expertise. We provide ISO 15930 PDF/X-4 certified print files with exact ink limits (TAC ≤ 300%), Pantone Spot formulations, and separate vector layers for foil stamping, embossing, and die-cuts. For flagship packaging runs in Ghana, West Africa, and Europe, our partners conduct on-site press checks or wet-proof reviews.',
    keyTakeaway: 'Pre-press certified PDF/X-4 files with optional on-site press room supervision.',
  },
  {
    id: 'faq-revisions-and-scope',
    category: 'workflow',
    index: '08',
    question: 'How do you handle revisions, scope modifications, and post-launch brand support?',
    answer:
      'Each phase incorporates two thorough iterative review cycles within the agreed architectural direction. Scope adjustments identified during discovery are transparently calculated using our modular ledger before work commences. Following asset handover, we provide 30 days of complimentary engineering and press-room technical support, with optional quarterly brand guardianship retainers.',
    keyTakeaway: 'Two structured revision rounds per phase + 30 days of post-handoff press support.',
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'workflow' | 'payments' | 'ip-legal' | 'production'>('all');
  const [openItemIds, setOpenItemIds] = useState<string[]>(['faq-workflow-phases', 'faq-ip-transfer']);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#FBF9F5]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E5DFD5] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Operational Governance & Protocols
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Frequently Addressed Studio Inquiries
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Transparent answers regarding our sprint cadence, payment tranches, Bank of Ghana Mobile Money settlement, intellectual property transfers, and print manufacturing quality standards.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F4EFEA] p-1.5 border border-[#D6CEBE]">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#1C1917] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              All Inquiries ({FAQ_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('workflow')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'workflow'
                  ? 'bg-[#C2410C] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Workflow & Sprints
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('payments')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'payments'
                  ? 'bg-[#C2410C] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Payments & MoMo
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('ip-legal')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'ip-legal'
                  ? 'bg-[#C2410C] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              IP & Legal Transfer
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('production')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'production'
                  ? 'bg-[#C2410C] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Print & Press Checks
            </button>
          </div>
        </div>

        {/* 2-Column Swiss Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 4 Columns: Curatorial Summary & Quick Actions */}
          <div className="lg:col-span-4 bg-[#F4EFEA] border border-[#D6CEBE] p-6 md:p-8 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-num text-[#C2410C] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Partner Consultations</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1C1917]">
                Require a bespoke engagement charter?
              </h3>
              <p className="text-xs text-[#44403C] leading-relaxed">
                If your procurement team requires customized master services agreements (MSAs), international tax withholding schedules (W-8BEN-E / GRA exemptions), or bespoke escrow terms, our Accra studio directors will review your brief within 24 hours.
              </p>
            </div>

            <div className="pt-4 border-t border-[#D6CEBE] space-y-3 text-xs">
              <div className="flex items-baseline justify-between font-mono-num">
                <span className="text-[#78716C]">Direct Inquiries:</span>
                <span className="text-[#1C1917] font-semibold">legal@apexkoncepts.com.gh</span>
              </div>
              <div className="flex items-baseline justify-between font-mono-num">
                <span className="text-[#78716C]">Studio Desk:</span>
                <span className="text-[#1C1917]">+233 (0) 30 278 4910</span>
              </div>
              <div className="flex items-baseline justify-between font-mono-num">
                <span className="text-[#78716C]">Response SLA:</span>
                <span className="text-[#C2410C]">≤ 24 Business Hours</span>
              </div>
            </div>

            <a
              href="#commission"
              className="min-h-[44px] w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Transmit Scope Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right 8 Columns: Swiss Accordion Stream */}
          <div className="lg:col-span-8 divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
            {filteredItems.map((item) => {
              const isOpen = openItemIds.includes(item.id);
              return (
                <div key={item.id} className="py-5 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group min-h-[44px]"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono-num text-[#C2410C] font-semibold shrink-0">
                        {item.index}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-[#1C1917] group-hover:text-[#C2410C] transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-[#D6CEBE] group-hover:border-[#1C1917] transition-colors shrink-0 bg-[#F4EFEA] text-[#1C1917] mt-0.5">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#C2410C]" />
                      ) : (
                        <Plus className="w-4 h-4 group-hover:text-[#C2410C] transition-colors" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-8 md:pl-10 pr-2 space-y-4">
                          <p className="text-sm text-[#44403C] leading-relaxed font-editorial">
                            {item.answer}
                          </p>

                          {/* Subtle Swiss Key Takeaway strip */}
                          <div className="p-3.5 bg-[#F4EFEA] border-l-2 border-[#C2410C] text-xs flex items-baseline gap-2">
                            <span className="font-mono-num uppercase font-semibold text-[#C2410C] text-[10px] tracking-wider shrink-0">
                              Studio Rule:
                            </span>
                            <span className="text-[#1C1917] font-medium">
                              {item.keyTakeaway}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
