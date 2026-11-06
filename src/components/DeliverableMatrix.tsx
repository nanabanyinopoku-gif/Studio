import React from 'react';
import { DELIVERABLE_COMPARISON_MATRIX, SERVICE_PILLARS, ServicePillar } from '../data/servicesData';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { ArrowUpRight } from 'lucide-react';

interface DeliverableMatrixProps {
  currency: CurrencyCode;
  onSelectService: (service: ServicePillar) => void;
}

export const DeliverableMatrix: React.FC<DeliverableMatrixProps> = ({
  currency,
  onSelectService,
}) => {
  const [highlightedPillar, setHighlightedPillar] = React.useState<ServicePillar['id'] | 'all'>('all');

  return (
    <section id="specifications" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#FBF9F5]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Technical Hand-Off Ledger
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Cross-Discipline Deliverable & Specification Matrix
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Every engagement concludes with an archival-grade engineering and print handoff. Compare master artifacts, calibrated color profiles, and intellectual property rights across all five studio practices.
            </p>
          </div>

          {/* Interactive Column Highlight Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F4EFEA] p-1.5 border border-[#E5DFD5]">
            <button
              onClick={() => setHighlightedPillar('all')}
              className={`min-h-[40px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                highlightedPillar === 'all'
                  ? 'bg-[#1C1917] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              All 5 Pillars
            </button>
            {SERVICE_PILLARS.map((p) => (
              <button
                key={p.id}
                onClick={() => setHighlightedPillar(p.id)}
                className={`min-h-[40px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  highlightedPillar === p.id
                    ? 'bg-[#C2410C] text-[#FBF9F5]'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {p.index}. {p.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Swiss Table */}
        <div className="overflow-x-auto border border-[#D6CEBE] bg-[#FBF9F5]">
          <table className="w-full text-left border-collapse min-w-[920px]">
            <thead>
              <tr className="border-b border-[#1C1917] bg-[#F4EFEA]">
                <th className="p-4 text-xs font-mono-num uppercase tracking-wider text-[#78716C] w-44 border-r border-[#E5DFD5]">
                  Specification Axis
                </th>
                {SERVICE_PILLARS.map((pillar) => {
                  const isFocused = highlightedPillar === pillar.id;
                  return (
                    <th
                      key={pillar.id}
                      className={`p-4 align-top border-r last:border-r-0 border-[#E5DFD5] transition-colors ${
                        isFocused ? 'bg-[#1C1917] text-[#FBF9F5]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-mono-num ${
                            isFocused ? 'text-[#F59E0B]' : 'text-[#C2410C]'
                          }`}
                        >
                          {pillar.index}
                        </span>
                        <button
                          onClick={() => onSelectService(pillar)}
                          className={`inline-flex items-center gap-1 text-[11px] font-medium underline underline-offset-2 cursor-pointer whitespace-nowrap shrink-0 ${
                            isFocused ? 'text-[#D6CEBE] hover:text-white' : 'text-[#57534E] hover:text-[#1C1917]'
                          }`}
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-sm font-semibold mt-1">{pillar.title}</div>
                      <div
                        className={`text-xs font-mono-num mt-1 ${
                          isFocused ? 'text-[#D6CEBE]' : 'text-[#78716C]'
                        }`}
                      >
                        From {formatCurrency(pillar.startingInvestment, currency)} · {pillar.typicalTimeline}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD5] text-xs">
              {DELIVERABLE_COMPARISON_MATRIX.map((row) => (
                <tr key={row.category} className="hover:bg-[#F4EFEA]/60 transition-colors">
                  <td className="p-4 align-top border-r border-[#E5DFD5] bg-[#F4EFEA]/40">
                    <div className="font-semibold text-[#1C1917]">{row.category}</div>
                    <div className="text-[11px] text-[#78716C] mt-0.5">{row.specification}</div>
                  </td>
                  <td
                    className={`p-4 align-top border-r border-[#E5DFD5] leading-relaxed ${
                      highlightedPillar === 'logo-design' ? 'bg-[#F4EFEA] font-medium text-[#1C1917]' : 'text-[#44403C]'
                    }`}
                  >
                    {row.logoDesign}
                  </td>
                  <td
                    className={`p-4 align-top border-r border-[#E5DFD5] leading-relaxed ${
                      highlightedPillar === 'corporate-identity'
                        ? 'bg-[#F4EFEA] font-medium text-[#1C1917]'
                        : 'text-[#44403C]'
                    }`}
                  >
                    {row.corporateIdentity}
                  </td>
                  <td
                    className={`p-4 align-top border-r border-[#E5DFD5] leading-relaxed ${
                      highlightedPillar === 'ui-ux-design' ? 'bg-[#F4EFEA] font-medium text-[#1C1917]' : 'text-[#44403C]'
                    }`}
                  >
                    {row.uiUxDesign}
                  </td>
                  <td
                    className={`p-4 align-top border-r border-[#E5DFD5] leading-relaxed ${
                      highlightedPillar === 'illustration' ? 'bg-[#F4EFEA] font-medium text-[#1C1917]' : 'text-[#44403C]'
                    }`}
                  >
                    {row.illustration}
                  </td>
                  <td
                    className={`p-4 align-top leading-relaxed ${
                      highlightedPillar === 'marketing-collateral'
                        ? 'bg-[#F4EFEA] font-medium text-[#1C1917]'
                        : 'text-[#44403C]'
                    }`}
                  >
                    {row.marketingCollateral}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
