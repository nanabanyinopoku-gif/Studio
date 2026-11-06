import React, { useState } from 'react';
import { CheckCircle2, Send, Download, AlertCircle, Shield } from 'lucide-react';
import { CurrencyCode, formatCurrency } from '../utils/currency';

interface BriefSubmissionSectionProps {
  currency: CurrencyCode;
  selectedDeliverableNames: string[];
  estimatedInvestmentUSD: number;
  estimatedWeeks: number;
  onOpenPrivacyPolicy: () => void;
  onOpenClientPortal?: (referenceId: string) => void;
}

export const BriefSubmissionSection: React.FC<BriefSubmissionSectionProps> = ({
  currency,
  selectedDeliverableNames,
  estimatedInvestmentUSD,
  estimatedWeeks,
  onOpenPrivacyPolicy,
  onOpenClientPortal,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phoneOrMomo, setPhoneOrMomo] = useState('');
  const [projectObjective, setProjectObjective] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState<{
    referenceId: string;
    timestamp: string;
  } | null>(null);

  const formattedEstimate = formatCurrency(estimatedInvestmentUSD, currency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !organization.trim()) {
      setErrorMessage('Please enter your full name and organization name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail.trim())) {
      setErrorMessage('Please provide a valid corporate or studio email address.');
      return;
    }
    if (!acceptedPrivacy) {
      setErrorMessage('Please acknowledge the Apex Koncepts Ghana Act 843 & GDPR Privacy Policy.');
      return;
    }
    setErrorMessage('');
    const refId = `AK-GH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedBrief({
      referenceId: refId,
      timestamp: new Date().toLocaleDateString('en-GH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
  };

  const handleDownloadBriefTxt = () => {
    const lines = [
      'APEX KONCEPTS STUDIO LTD (ACCRA, GHANA) — ARCHITECTURAL GRAPHIC DESIGN BRIEF',
      '==============================================================================',
      `Date: ${new Date().toISOString().split('T')[0]}`,
      `Client: ${clientName || 'Prospective Partner'} (${organization || 'Organization'})`,
      `Email: ${clientEmail || 'Not provided'}`,
      `Telephone / Mobile Money: ${phoneOrMomo || 'Not provided'}`,
      '',
      `ESTIMATED INVESTMENT (${currency}): ${formattedEstimate}`,
      `ESTIMATED TIMELINE: ~${estimatedWeeks} Weeks`,
      '',
      'CONFIGURED DELIVERABLES:',
      ...(selectedDeliverableNames.length > 0
        ? selectedDeliverableNames.map((n, i) => `  0${i + 1}. ${n}`)
        : ['  - Custom Multi-Discipline Consultation']),
      '',
      'PROJECT CONTEXT & OBJECTIVES:',
      projectObjective || 'Standard scope inquiry across selected studio pillars.',
      '',
      'HEADQUARTERS: No. 14 Patrice Lumumba Rd, Airport Residential Area, Accra, Ghana (GA-056-8492)',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apex-Koncepts-Ghana-Scope-Brief.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="commission" className="py-16 md:py-20 bg-[#FBF9F5] border-b border-[#E5DFD5]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Editorial Context & Direct Ghana Studio Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Initiate Commission · Accra Flagship Studio
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Transmit Your Configured Scope Dossier
            </h2>
            <p className="font-editorial text-base text-[#44403C] leading-relaxed">
              From our flagship design studio in Airport Residential Area, Accra, and our creative liaison office in Kumasi, we serve category-defining West African enterprises and global technology leaders.
            </p>

            {/* Live Scope Summary Card */}
            <div className="p-6 bg-[#F4EFEA] border border-[#D6CEBE] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                <span className="text-xs font-mono-num uppercase text-[#78716C]">
                  Attached Scope Configuration
                </span>
                <span className="text-sm font-mono-num font-semibold text-[#C2410C]">
                  {formattedEstimate} · ~{estimatedWeeks} Wks
                </span>
              </div>

              {selectedDeliverableNames.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#1C1917]">
                  {selectedDeliverableNames.map((name, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C2410C] font-mono-num">0{idx + 1}.</span>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#78716C]">
                  No specific deliverables toggled yet. You can customize deliverables in the Estimator above or submit a general inquiry.
                </p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownloadBriefTxt}
                  className="min-h-[40px] inline-flex items-center gap-2 text-xs font-medium text-[#1C1917] underline underline-offset-4 hover:text-[#C2410C] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scope Specification (.TXT)</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#57534E]">
              <div>
                <div className="font-semibold text-[#1C1917]">Accra Headquarters</div>
                <div className="mt-1">No. 14 Patrice Lumumba Road</div>
                <div>Airport Residential Area, Accra, Ghana</div>
                <div className="font-mono-num text-[#78716C] mt-0.5">GhanaPost GPS: GA-056-8492</div>
              </div>
              <div>
                <div className="font-semibold text-[#1C1917]">Direct Studio Desk</div>
                <div className="mt-1 font-mono-num">commissions@apexkoncepts.com.gh</div>
                <div className="font-mono-num">+233 (0) 30 278 4910</div>
                <div className="font-mono-num">+233 (0) 54 019 8200 (WhatsApp/MoMo)</div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Commission Form */}
          <div className="lg:col-span-7 bg-[#F4EFEA] border border-[#D6CEBE] p-6 md:p-10">
            {submittedBrief ? (
              <div className="py-8 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono-num uppercase tracking-wider text-[#15803D]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dossier Logged in Accra · Reference {submittedBrief.referenceId}</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#1C1917]">
                  Medaase, {clientName}. Your creative brief has been assigned to a Managing Partner in Accra.
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  We have registered your configuration for <strong>{organization}</strong> ({selectedDeliverableNames.length} deliverables, estimated at {formattedEstimate}). You will receive a written architectural response and discovery schedule at <strong>{clientEmail}</strong> within 1 business day.
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {onOpenClientPortal && (
                    <button
                      type="button"
                      onClick={() => onOpenClientPortal(submittedBrief.referenceId)}
                      className="min-h-[44px] px-4 py-2.5 text-xs font-medium bg-[#C2410C] hover:bg-[#9A3412] text-[#FBF9F5] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Track in Client Portal</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDownloadBriefTxt}
                    className="min-h-[44px] px-4 py-2.5 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#292524] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Copy of Brief</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmittedBrief(null)}
                    className="min-h-[44px] px-4 py-2.5 text-xs font-medium border border-[#1C1917] text-[#1C1917] hover:bg-[#E5DFD5] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Modify Brief Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-[#D6CEBE] pb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#1C1917]">
                    Client & Project Dossier
                  </h3>
                  <span className="text-xs text-[#78716C] font-mono-num">
                    Protected under Ghana Act 843 & NDA
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-[#FEF2F2] border border-[#DC2626] text-xs text-[#991B1B] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="client-name" className="block text-xs font-medium text-[#1C1917]">
                      Your Name & Title *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Kwame Mensah, Managing Director"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="client-org" className="block text-xs font-medium text-[#1C1917]">
                      Organization / Venture *
                    </label>
                    <input
                      id="client-org"
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Gold Coast Meridian Holdings"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="client-email" className="block text-xs font-medium text-[#1C1917]">
                      Corporate Email Address *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="k.mensah@gcmeridian.com.gh"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="client-phone" className="block text-xs font-medium text-[#1C1917]">
                      Telephone / WhatsApp / MoMo Number
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      value={phoneOrMomo}
                      onChange={(e) => setPhoneOrMomo(e.target.value)}
                      placeholder="+233 24 412 3456"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="project-objective" className="block text-xs font-medium text-[#1C1917]">
                    Commercial Context, Launch Deadlines & Specific Substrates
                  </label>
                  <textarea
                    id="project-objective"
                    rows={3}
                    value={projectObjective}
                    onChange={(e) => setProjectObjective(e.target.value)}
                    placeholder="Share your upcoming product launch window in Ghana or globally, target markets, or specific packaging/digital touchpoints..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                  />
                </div>

                {/* Privacy Policy Consent Checkbox */}
                <div className="pt-1 flex items-start gap-3">
                  <input
                    id="privacy-consent"
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#C2410C] cursor-pointer"
                  />
                  <label htmlFor="privacy-consent" className="text-xs text-[#44403C] leading-relaxed">
                    I agree to the processing of this creative brief under the{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="font-semibold text-[#1C1917] underline underline-offset-2 hover:text-[#C2410C] cursor-pointer"
                    >
                      Apex Koncepts Privacy Policy (Ghana Data Protection Act 843 & GDPR)
                    </button>{' '}
                    and Mutual Non-Disclosure Charter.
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#78716C] inline-flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Includes {selectedDeliverableNames.length} configured deliverables ({formattedEstimate})</span>
                  </span>
                  <button
                    type="submit"
                    className="min-h-[48px] px-6 py-3 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Scope & Request Partner Call</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
