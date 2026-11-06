import React, { useMemo } from 'react';
import { Check, ArrowRight, RotateCcw, FileText, Sparkles } from 'lucide-react';
import { SERVICE_PILLARS, ServicePillar } from '../data/servicesData';
import { CurrencyCode, formatCurrency } from '../utils/currency';

interface ScopeEstimatorProps {
  currency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  selectedDeliverableIds: string[];
  onToggleDeliverable: (id: string) => void;
  onSelectPresetPillar: (pillar: ServicePillar) => void;
  onResetScope: () => void;
  timelineSpeed: 'standard' | 'accelerated';
  onChangeTimelineSpeed: (speed: 'standard' | 'accelerated') => void;
  ipTier: 'standard' | 'global-buyout';
  onChangeIpTier: (tier: 'standard' | 'global-buyout') => void;
  onProceedToBrief: (summaryData: {
    totalInvestment: number;
    estimatedWeeks: number;
    selectedNames: string[];
  }) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  currency,
  onChangeCurrency,
  selectedDeliverableIds,
  onToggleDeliverable,
  onSelectPresetPillar,
  onResetScope,
  timelineSpeed,
  onChangeTimelineSpeed,
  ipTier,
  onChangeIpTier,
  onProceedToBrief,
}) => {
  const allDeliverables = useMemo(() => {
    return SERVICE_PILLARS.flatMap((pillar) =>
      pillar.deliverables.map((d) => ({
        ...d,
        pillarId: pillar.id,
        pillarTitle: pillar.title,
        pillarIndex: pillar.index,
      }))
    );
  }, []);

  const calculation = useMemo(() => {
    const chosen = allDeliverables.filter((d) => selectedDeliverableIds.includes(d.id));
    const baseSubtotal = chosen.reduce((acc, item) => acc + item.standalonePrice, 0);
    const totalDays = chosen.reduce((acc, item) => acc + item.estimatedDays, 0);

    const bundleDiscount = chosen.length >= 4 ? Math.round(baseSubtotal * 0.1) : 0;
    const afterDiscount = baseSubtotal - bundleDiscount;

    const speedAddon = timelineSpeed === 'accelerated' ? Math.round(afterDiscount * 0.2) : 0;
    const ipAddon = ipTier === 'global-buyout' ? Math.round(afterDiscount * 0.15) : 0;

    const finalTotal = afterDiscount + speedAddon + ipAddon;

    const rawWeeks = Math.max(1, Math.ceil(totalDays / 5));
    const adjustedWeeks =
      chosen.length === 0
        ? 0
        : timelineSpeed === 'accelerated'
        ? Math.max(1, Math.ceil(rawWeeks * 0.7))
        : rawWeeks;

    return {
      chosen,
      baseSubtotal,
      bundleDiscount,
      speedAddon,
      ipAddon,
      finalTotal,
      adjustedWeeks,
    };
  }, [allDeliverables, selectedDeliverableIds, timelineSpeed, ipTier]);

  return (
    <section id="estimator" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#F4EFEA]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D6CEBE] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Interactive Scope & Investment Architecture (GHS / USD / EUR / GBP)
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Configure Your Custom Deliverable Matrix
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Select specific design artifacts across our five studio pillars to calculate transparent project timelines, multi-discipline bundle efficiencies, and exact deliverable formats in Ghana Cedis or international currencies.
            </p>
          </div>

          {/* Currency & Quick Pillar Presets */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-1.5 bg-[#FBF9F5] p-1 border border-[#D6CEBE]">
              {(['GHS', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onChangeCurrency(code)}
                  className={`min-h-[38px] px-3 py-1 text-xs font-mono-num font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    currency === code
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {code === 'GHS' ? 'GH₵ (GHS)' : code}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#78716C] mr-1">Quick Load Pillar:</span>
              {SERVICE_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => onSelectPresetPillar(pillar)}
                  className="min-h-[40px] px-3 py-1.5 text-xs font-medium bg-[#FBF9F5] text-[#1C1917] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {pillar.index}. {pillar.title.split(' ')[0]}
                </button>
              ))}
              <button
                onClick={onResetScope}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                title="Clear all selected deliverables"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 12-Column Interactive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Deliverable Checklists by Service */}
          <div className="lg:col-span-8 space-y-6">
            {SERVICE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="bg-[#FBF9F5] border border-[#E5DFD5] p-5 md:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                  <div>
                    <span className="text-xs font-mono-num text-[#C2410C] mr-2">{pillar.index}</span>
                    <h3 className="inline text-base font-semibold text-[#1C1917]">{pillar.title}</h3>
                  </div>
                  <button
                    onClick={() => onSelectPresetPillar(pillar)}
                    className="min-h-[40px] px-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Select Core {pillar.title.split(' ')[0]} Kit
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {pillar.deliverables.map((item) => {
                    const isChecked = selectedDeliverableIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => onToggleDeliverable(item.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onToggleDeliverable(item.id);
                          }
                        }}
                        className={`p-4 border transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isChecked
                            ? 'bg-[#F4EFEA] border-[#1C1917]'
                            : 'bg-[#FBF9F5] border-[#E5DFD5] hover:border-[#A8A29E]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`mt-0.5 w-6 h-6 border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-[#C2410C] border-[#C2410C] text-[#FBF9F5]'
                                : 'border-[#A8A29E] bg-[#FBF9F5]'
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4" />}
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-[#1C1917]">{item.name}</div>
                            <div className="text-xs text-[#57534E]">{item.description}</div>
                            <div className="text-[11px] font-mono-num text-[#78716C]">
                              Formats: {item.formats.join(', ')} · {item.colorProfile}
                            </div>
                          </div>
                        </div>

                        <div className="sm:text-right font-mono-num shrink-0 pl-9 sm:pl-0">
                          <div className="text-sm font-semibold text-[#1C1917]">
                            {formatCurrency(item.standalonePrice, currency)}
                          </div>
                          <div className="text-[11px] text-[#78716C]">{item.estimatedDays} days</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 Columns: Live Cost & Schedule Dossier */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 bg-[#1C1917] text-[#FBF9F5] p-6 md:p-8 space-y-6">
            <div className="border-b border-[#292524] pb-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono-num uppercase tracking-widest text-[#C2410C]">
                  Live Specification Ledger ({currency})
                </div>
                <h3 className="text-lg font-semibold text-[#FBF9F5]">Project Scope & Estimate</h3>
              </div>
              <FileText className="w-5 h-5 text-[#A8A29E]" />
            </div>

            {/* Parameters: Speed & IP */}
            <div className="space-y-4 border-b border-[#292524] pb-6">
              <div className="space-y-2">
                <label className="block text-xs text-[#A8A29E]">Production Cadence</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeTimelineSpeed('standard')}
                    className={`min-h-[44px] px-3 py-2 text-xs font-medium border text-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      timelineSpeed === 'standard'
                        ? 'bg-[#FBF9F5] text-[#1C1917] border-[#FBF9F5]'
                        : 'bg-transparent text-[#A8A29E] border-[#44403C] hover:text-[#FBF9F5]'
                    }`}
                  >
                    Standard Pace
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTimelineSpeed('accelerated')}
                    className={`min-h-[44px] px-3 py-2 text-xs font-medium border text-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      timelineSpeed === 'accelerated'
                        ? 'bg-[#C2410C] text-[#FBF9F5] border-[#C2410C]'
                        : 'bg-transparent text-[#A8A29E] border-[#44403C] hover:text-[#FBF9F5]'
                    }`}
                  >
                    Accelerated (+20%)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-[#A8A29E]">Intellectual Property & Source Rights</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeIpTier('standard')}
                    className={`min-h-[44px] px-3 py-2 text-xs font-medium border text-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      ipTier === 'standard'
                        ? 'bg-[#FBF9F5] text-[#1C1917] border-[#FBF9F5]'
                        : 'bg-transparent text-[#A8A29E] border-[#44403C] hover:text-[#FBF9F5]'
                    }`}
                  >
                    Full Commercial IP
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeIpTier('global-buyout')}
                    className={`min-h-[44px] px-3 py-2 text-xs font-medium border text-center transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      ipTier === 'global-buyout'
                        ? 'bg-[#C2410C] text-[#FBF9F5] border-[#C2410C]'
                        : 'bg-transparent text-[#A8A29E] border-[#44403C] hover:text-[#FBF9F5]'
                    }`}
                  >
                    Working Raw Files (+15%)
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Items List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              <div className="text-xs text-[#A8A29E] flex items-center justify-between">
                <span>Selected Deliverables ({calculation.chosen.length})</span>
                {calculation.chosen.length >= 4 && (
                  <span className="text-[#F59E0B] font-mono-num">10% Multi-Item Efficiency</span>
                )}
              </div>

              {calculation.chosen.length === 0 ? (
                <p className="text-xs text-[#78716C] py-4 italic">
                  Select one or more deliverables on the left to compute your project timeline and investment.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {calculation.chosen.map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-2 text-[#D6CEBE]">
                      <span className="leading-snug">{item.name}</span>
                      <span className="font-mono-num text-[#FBF9F5] shrink-0">
                        {formatCurrency(item.standalonePrice, currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="border-t border-[#292524] pt-4 space-y-2 text-xs font-mono-num">
              <div className="flex justify-between text-[#A8A29E]">
                <span>Deliverables Subtotal</span>
                <span>{formatCurrency(calculation.baseSubtotal, currency)}</span>
              </div>
              {calculation.bundleDiscount > 0 && (
                <div className="flex justify-between text-[#F59E0B]">
                  <span>Multi-Discipline Bundle (-10%)</span>
                  <span>-{formatCurrency(calculation.bundleDiscount, currency)}</span>
                </div>
              )}
              {calculation.speedAddon > 0 && (
                <div className="flex justify-between text-[#D6CEBE]">
                  <span>Accelerated Sprint Cadence</span>
                  <span>+{formatCurrency(calculation.speedAddon, currency)}</span>
                </div>
              )}
              {calculation.ipAddon > 0 && (
                <div className="flex justify-between text-[#D6CEBE]">
                  <span>Open Working Source Archive</span>
                  <span>+{formatCurrency(calculation.ipAddon, currency)}</span>
                </div>
              )}

              <div className="border-t border-[#44403C] pt-4 mt-2 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase text-[#A8A29E]">Estimated Investment</div>
                  <div className="text-xs text-[#A8A29E] mt-0.5">
                    Duration: ~{calculation.adjustedWeeks} {calculation.adjustedWeeks === 1 ? 'Week' : 'Weeks'}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-semibold text-[#FBF9F5]">
                  {formatCurrency(calculation.finalTotal, currency)}
                </div>
              </div>
            </div>

            {/* CTA to Lock Scope into Brief */}
            <button
              type="button"
              disabled={calculation.chosen.length === 0}
              onClick={() =>
                onProceedToBrief({
                  totalInvestment: calculation.finalTotal,
                  estimatedWeeks: calculation.adjustedWeeks,
                  selectedNames: calculation.chosen.map((c) => c.name),
                })
              }
              className="w-full min-h-[48px] py-3 px-4 bg-[#C2410C] hover:bg-[#9A3412] disabled:bg-[#292524] disabled:text-[#78716C] text-[#FBF9F5] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proceed to Payment & Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
