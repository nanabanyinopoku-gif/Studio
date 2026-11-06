import React, { useEffect } from 'react';
import { Shield, X, Lock, FileText, Globe, Smartphone, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/65 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FBF9F5] text-[#1C1917] h-full overflow-y-auto border-l border-[#D6CEBE] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD5] px-6 py-5 md:px-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono-num text-[#C2410C]">
              <Shield className="w-4 h-4" />
              <span>DATA PROTECTION ACT, 2012 (ACT 843) · GDPR · APPLE/GOOGLE MOBILE</span>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1C1917] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Close Policy</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8 md:px-10 space-y-8">
            <div className="space-y-3 border-b border-[#E5DFD5] pb-6">
              <h2 id="privacy-policy-title" className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1C1917]">
                Privacy Policy, Data Governance & Intellectual Property Charter
              </h2>
              <p className="text-xs font-mono-num text-[#78716C]">
                Effective Date: November 2026 · Controller: Apex Koncepts Studio Ltd (Registered in Accra, Republic of Ghana · Reg No. CS194820126)
              </p>
              <p className="font-editorial text-sm md:text-base text-[#44403C] leading-relaxed">
                Apex Koncepts Studio Ltd (“Apex Koncepts”, “we”, “our”) is committed to protecting the confidentiality of your unannounced brand architectures, creative briefs, personal data, and local/international payment credentials across our Web, iOS, and Android applications.
              </p>
            </div>

            <div className="space-y-6 text-sm text-[#44403C] leading-relaxed">
              <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-num uppercase text-[#C2410C] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>01. Statutory Compliance in Ghana & Internationally</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Ghana Data Protection Commission (Act 843) & EU/UK GDPR
                </h3>
                <p className="text-xs leading-relaxed">
                  We process all personal and corporate data in strict compliance with the <strong>Republic of Ghana Data Protection Act, 2012 (Act 843)</strong> overseen by the Data Protection Commission (DPC) in Accra, as well as the EU General Data Protection Regulation (GDPR) for our international clients in Europe, the United Kingdom, and North America.
                </p>
              </div>

              <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-num uppercase text-[#C2410C] font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>02. Information We Collect & Mutual Non-Disclosure</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Creative Briefs, Scope Configurations & Client Identity
                </h3>
                <p className="text-xs leading-relaxed">
                  When you configure a scope in our Estimator or submit a project dossier, we collect your name, corporate email, organization name, telephone/Mobile Money number, and project specifications. Every creative brief submitted through this platform is automatically governed by our <strong>Mutual Non-Disclosure Undertaking</strong>—your unreleased product names, packaging CAD files, and strategic timelines are never shared with third parties.
                </p>
              </div>

              <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-num uppercase text-[#C2410C] font-semibold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>03. Mobile Money (MoMo) & International Payment Security</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Bank of Ghana & PCI-DSS Level 1 Tokenization
                </h3>
                <p className="text-xs leading-relaxed">
                  Apex Koncepts does not store raw credit card numbers or Mobile Money PIN codes on our servers. Local Ghanaian transactions (MTN Mobile Money, Telecel Cash, AT Money, and GhIPSS Instant Pay) are authorized via encrypted USSD/push tokens regulated by the <strong>Bank of Ghana</strong>. International card, Apple Pay, Google Pay, and SWIFT transactions are processed via PCI-DSS Level 1 certified gateways.
                </p>
              </div>

              <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-num uppercase text-[#C2410C] font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>04. iOS & Android Mobile App Permissions & Offline Storage</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Progressive Web App (PWA) Local Cache & Zero Tracking
                </h3>
                <p className="text-xs leading-relaxed">
                  When installed on Apple iOS (iPhone/iPad) or Android devices, our application caches typography, vector schematics, and your current estimator selections locally on your device using standard Service Worker storage so the app works seamlessly offline. We do not access your mobile contacts, microphone, camera, or background GPS location, and we never sell user data to advertising networks.
                </p>
              </div>

              <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-num uppercase text-[#C2410C] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>05. Your Data Rights & Data Protection Officer (Accra)</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Access, Erasure, Portability & Contact Coordinates
                </h3>
                <p className="text-xs leading-relaxed">
                  You have the right to request a copy of all personal and project records held by Apex Koncepts, request immediate erasure of pre-contract briefs, or revoke processing consent at any time. Contact our Data Protection Officer at:
                </p>
                <div className="pt-2 text-xs font-mono-num text-[#1C1917]">
                  <div>Data Protection Officer — Apex Koncepts Studio Ltd</div>
                  <div>No. 14 Patrice Lumumba Road, Airport Residential Area, Accra, Ghana</div>
                  <div>Digital Address: GA-056-8492 · Email: privacy@apexkoncepts.com.gh · Tel: +233 (0) 30 278 4910</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-20 bg-[#F4EFEA] border-t border-[#D6CEBE] px-6 py-4 md:px-10 flex items-center justify-between">
          <span className="text-xs text-[#57534E]">
            Compliant with Ghana Act 843, GDPR & Apple/Google App Privacy Standards
          </span>
          <button
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium hover:bg-[#C2410C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
