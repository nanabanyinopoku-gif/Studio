import React, { useEffect, useState } from 'react';
import { X, Check, ArrowRight, FileCheck, Layers, TrendingUp, Award } from 'lucide-react';
import { ServicePillar } from '../data/servicesData';
import { ServiceSchematicPlate } from './ServiceSchematicPlate';
import { CurrencyCode, formatCurrency } from '../utils/currency';

interface ServiceDetailModalProps {
  currency: CurrencyCode;
  service: ServicePillar | null;
  onClose: () => void;
  selectedDeliverableIds: string[];
  onToggleDeliverable: (deliverableId: string) => void;
  onAddFullServiceToScope: (service: ServicePillar) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  currency,
  service,
  onClose,
  selectedDeliverableIds,
  onToggleDeliverable,
  onAddFullServiceToScope,
}) => {
  const [activeTab, setActiveTab] = useState<'process' | 'deliverables' | 'value'>('process');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/60 backdrop-blur-[2px] transition-opacity duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#FBF9F5] text-[#1C1917] h-full overflow-y-auto border-l border-[#D6CEBE] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD5] px-5 py-4 md:px-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#78716C] font-mono-num">
              <span>DISCIPLINE {service.index}</span>
              <span aria-hidden="true">·</span>
              <span>{service.typicalTimeline}</span>
              <span aria-hidden="true">·</span>
              <span>From {formatCurrency(service.startingInvestment, currency)}</span>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1C1917] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Close service specification"
            >
              <span>Close Specification</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-5 py-8 md:px-10 space-y-10">
            {/* Hero Title & Schematic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs tracking-wider uppercase text-[#C2410C] font-medium">
                  {service.kicker}
                </p>
                <h2 id="modal-service-title" className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
                  {service.index}. {service.title}
                </h2>
                <p className="font-editorial text-lg text-[#44403C] leading-relaxed">
                  {service.editorialLead}
                </p>
              </div>
              <div className="lg:col-span-5">
                <ServiceSchematicPlate serviceId={service.id} className="h-52" />
              </div>
            </div>

            {/* Interactive Section Switcher (Functional Tabs) */}
            <div className="border-y border-[#E5DFD5] py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'process'}
                  onClick={() => setActiveTab('process')}
                  className={`min-h-[44px] px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'process'
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  01. Methodology & 4-Phase Process
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'deliverables'}
                  onClick={() => setActiveTab('deliverables')}
                  className={`min-h-[44px] px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'deliverables'
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  02. Deliverable Specifications ({service.deliverables.length})
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'value'}
                  onClick={() => setActiveTab('value')}
                  className={`min-h-[44px] px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'value'
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  03. Strategic Value & Client Proof
                </button>
              </div>
            </div>

            {/* TAB 1: PROCESS */}
            {activeTab === 'process' && (
              <div className="space-y-8">
                <div className="flex items-baseline justify-between border-b border-[#E5DFD5] pb-3">
                  <h3 className="text-lg font-semibold text-[#1C1917]">
                    Four-Stage Architectural Execution
                  </h3>
                  <span className="text-xs text-[#78716C] font-mono-num">
                    Typical Duration: {service.typicalTimeline}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.process.map((phase) => (
                    <div
                      key={phase.step}
                      className="p-6 bg-[#F4EFEA] border border-[#E5DFD5] flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-[#78716C] font-mono-num">
                          <span className="text-[#C2410C] font-medium">{phase.step}</span>
                          <span>{phase.duration}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-[#1C1917]">{phase.title}</h4>
                        <p className="text-sm text-[#44403C] leading-relaxed">{phase.description}</p>
                      </div>

                      <div className="pt-4 border-t border-[#E5DFD5] space-y-1.5">
                        <div className="text-[11px] uppercase tracking-wider text-[#78716C]">
                          Milestone Artifacts
                        </div>
                        <div className="text-xs text-[#1C1917] font-medium">
                          {phase.keyOutputs.join(' · ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Standards Block */}
                <div className="p-6 bg-[#FBF9F5] border border-[#D6CEBE] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                    <Layers className="w-4 h-4 text-[#C2410C]" />
                    <span>Apex Production & Quality Assurance Standards</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {service.technicalStandards.map((std, i) => (
                      <li key={i} className="text-xs text-[#44403C] leading-relaxed border-t border-[#E5DFD5] pt-2">
                        {std}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: DELIVERABLES */}
            {activeTab === 'deliverables' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD5] pb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1C1917]">
                      Production Deliverable Kits & File Specifications
                    </h3>
                    <p className="text-xs text-[#78716C]">
                      Click any deliverable below to add or remove it from your live project scope estimator.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {service.deliverables.map((item) => {
                    const isSelected = selectedDeliverableIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-6 border transition-colors ${
                          isSelected
                            ? 'bg-[#F4EFEA] border-[#1C1917]'
                            : 'bg-[#FBF9F5] border-[#E5DFD5] hover:border-[#A8A29E]'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="space-y-2 max-w-xl">
                            <div className="flex items-center gap-2 text-xs text-[#78716C] font-mono-num">
                              <FileCheck className="w-3.5 h-3.5 text-[#C2410C]" />
                              <span>{item.formats.join(' / ')}</span>
                              <span aria-hidden="true">·</span>
                              <span>{item.colorProfile}</span>
                            </div>
                            <h4 className="text-base font-semibold text-[#1C1917]">{item.name}</h4>
                            <p className="text-sm text-[#44403C] leading-relaxed">{item.description}</p>
                          </div>

                          <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#E5DFD5]">
                            <div className="text-right font-mono-num">
                              <div className="text-base font-semibold text-[#1C1917]">
                                {formatCurrency(item.standalonePrice, currency)}
                              </div>
                              <div className="text-xs text-[#78716C]">Est. {item.estimatedDays} working days</div>
                            </div>

                            <button
                              onClick={() => onToggleDeliverable(item.id)}
                              className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                isSelected
                                  ? 'bg-[#C2410C] text-[#FBF9F5]'
                                  : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#292524]'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added to Scope</span>
                                </>
                              ) : (
                                <span>+ Add to Estimator</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: STRATEGIC VALUE & CASE PROOF */}
            {activeTab === 'value' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#1C1917] border-b border-[#E5DFD5] pb-3">
                    Commercial Return & Strategic Defensibility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.strategicValue.map((val, idx) => (
                      <div key={idx} className="p-6 bg-[#F4EFEA] border border-[#E5DFD5] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono-num font-semibold text-[#C2410C]">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{val.metric}</span>
                        </div>
                        <h4 className="text-base font-semibold text-[#1C1917]">{val.title}</h4>
                        <p className="text-xs text-[#44403C] leading-relaxed">{val.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attributable Case Study Proof */}
                <div className="p-6 md:p-8 bg-[#1C1917] text-[#FBF9F5] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A8A29E] font-mono-num">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#C2410C]" />
                      <span>VERIFIED CLIENT OUTCOME · {service.caseProof.year}</span>
                    </div>
                    <span>{service.caseProof.industry}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-[#FBF9F5]">
                      {service.caseProof.client} — {service.caseProof.outcomeMetric}
                    </h4>
                    <p className="text-sm text-[#D6CEBE] leading-relaxed max-w-2xl">
                      {service.caseProof.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#292524] text-xs text-[#A8A29E]">
                    <span>Deliverables Deployed: </span>
                    <span className="text-[#FBF9F5]">{service.caseProof.deliverablesUsed.join(' · ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Modal Footer Action */}
        <div className="sticky bottom-0 z-20 bg-[#F4EFEA] border-t border-[#D6CEBE] px-5 py-4 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#44403C]">
            Configure all core deliverables for <strong className="text-[#1C1917]">{service.title}</strong> in the interactive calculator.
          </div>
          <button
            onClick={() => {
              onAddFullServiceToScope(service);
              onClose();
            }}
            className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#C2410C] text-[#FBF9F5] hover:bg-[#9A3412] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Load Full {service.title} Package in Estimator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
