import React, { useState } from 'react';
import {
  Smartphone,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  ArrowRight,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { CurrencyCode, formatCurrency } from '../utils/currency';

export interface PaymentGatewayOption {
  id: string;
  name: string;
  category: 'ghana-momo' | 'ghana-bank' | 'international-card' | 'global-wire';
  providerBadge: string;
  supportedCurrencies: CurrencyCode[];
  settlementTime: string;
  instructions: string;
  ussdOrRouting?: string;
}

export const PAYMENT_PLATFORMS: PaymentGatewayOption[] = [
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money (MoMo Pay)',
    category: 'ghana-momo',
    providerBadge: 'Ghana Local · Instant USSD & App Push',
    supportedCurrencies: ['GHS'],
    settlementTime: 'Instant Settlement (Paystack / Hubtel Ghana)',
    instructions:
      'Enter your registered 10-digit MTN Ghana number to receive an instant USSD PIN prompt on your handset, or dial *170# and enter Merchant ID 849201 (APEX KONCEPTS LTD).',
    ussdOrRouting: 'Dial *170# · Merchant ID: 849201',
  },
  {
    id: 'telecel-cash',
    name: 'Telecel Cash (Vodafone Cash Ghana)',
    category: 'ghana-momo',
    providerBadge: 'Ghana Local · Zero Surcharge',
    supportedCurrencies: ['GHS'],
    settlementTime: 'Instant Settlement via Hubtel / Flutterwave',
    instructions:
      'Generate a one-time voucher via *110# or approve the direct Telecel Cash push prompt sent to your mobile device.',
    ussdOrRouting: 'Dial *110# · Till Number: 550912',
  },
  {
    id: 'at-money',
    name: 'AT Money (AirtelTigo Money)',
    category: 'ghana-momo',
    providerBadge: 'Ghana Local · Direct Wallet Debit',
    supportedCurrencies: ['GHS'],
    settlementTime: 'Instant Settlement',
    instructions:
      'Enter your AT Money wallet number for instant push authorization or dial *110# to authorize payment to Apex Koncepts Studio.',
    ussdOrRouting: 'Dial *110# · Merchant Code: 441802',
  },
  {
    id: 'ghipss-bank',
    name: 'Ghana Local Bank Transfer (GhIPSS / Ecobank / GCB / Stanbic / Fidelity)',
    category: 'ghana-bank',
    providerBadge: 'Ghana Commercial Banks · GIP Instant Pay',
    supportedCurrencies: ['GHS', 'USD'],
    settlementTime: 'Instant via GhIPSS Instant Pay (GIP) or ACH',
    instructions:
      'Transfer directly in GHS or USD to our corporate treasury accounts in Accra. GRA VAT/NHIL/GETFund tax invoice issued automatically upon confirmation.',
    ussdOrRouting: 'Ecobank Ghana (Head Office, Ridge Accra) · Acct: 1441002849102 · Branch Sort: 130101',
  },
  {
    id: 'visa-mastercard-amex',
    name: 'International Cards (Visa, Mastercard, American Express)',
    category: 'international-card',
    providerBadge: '3D Secure 2.0 · Global Cards',
    supportedCurrencies: ['GHS', 'USD', 'EUR', 'GBP'],
    settlementTime: 'Instant Authorization (Stripe & Paystack Global)',
    instructions:
      'Pay securely using any local Ghanaian or international corporate Visa, Mastercard, or Amex credit/debit card with 3D-Secure verification.',
    ussdOrRouting: 'PCI-DSS Level 1 Encrypted Gateway',
  },
  {
    id: 'apple-google-pay',
    name: 'Apple Pay & Google Pay (iOS & Android Biometric)',
    category: 'international-card',
    providerBadge: 'FaceID / TouchID / Android Biometric',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'GHS'],
    settlementTime: 'Instant One-Tap Biometric Checkout',
    instructions:
      'Use FaceID or TouchID on iPhone/iPad/Mac or Google Pay on Android for instant tokenized corporate card checkout.',
    ussdOrRouting: 'Native iOS Safari & Android Chrome Wallet',
  },
  {
    id: 'paypal-wise-swift',
    name: 'International Wire (SWIFT / IBAN / Wise / PayPal Business)',
    category: 'global-wire',
    providerBadge: 'Cross-Border Corporate Settlement',
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    settlementTime: 'Same-Day Wise/PayPal · 1–2 Days SWIFT',
    instructions:
      'Ideal for international enterprise retainers in North America, Europe, and the UK. Includes full SWIFT MT103 and multi-currency IBAN coordinates.',
    ussdOrRouting: 'SWIFT: ECOCGHAC · Wise / PayPal: treasury@apexkoncepts.com.gh',
  },
];

interface PaymentGatewayHubProps {
  currency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  estimatedAmountUSD: number;
  selectedDeliverableCount: number;
}

export const PaymentGatewayHub: React.FC<PaymentGatewayHubProps> = ({
  currency,
  onChangeCurrency,
  estimatedAmountUSD,
  selectedDeliverableCount,
}) => {
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('mtn-momo');
  const [paymentStage, setPaymentStage] = useState<'full' | 'milestone-50'>('milestone-50');
  const [momoPhone, setMomoPhone] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState<{
    txRef: string;
    gatewayName: string;
    amountFormatted: string;
    date: string;
  } | null>(null);
  const [validationError, setValidationError] = useState('');

  const selectedGateway =
    PAYMENT_PLATFORMS.find((p) => p.id === selectedGatewayId) || PAYMENT_PLATFORMS[0];

  const payableUSD =
    paymentStage === 'milestone-50' ? Math.round(estimatedAmountUSD * 0.5) : estimatedAmountUSD;

  const formattedPayable = formatCurrency(payableUSD, currency);
  const formattedFullTotal = formatCurrency(estimatedAmountUSD, currency);

  const handleCopyRouting = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payerEmail.trim() || !payerEmail.includes('@')) {
      setValidationError('Please enter a valid email address for your official GRA VAT & studio receipt.');
      return;
    }
    if (selectedGateway.category === 'ghana-momo' && momoPhone.replace(/\D/g, '').length < 9) {
      setValidationError('Please enter a valid 10-digit Ghana Mobile Money number (e.g., 024 412 3456).');
      return;
    }
    setValidationError('');
    const txRef = `GH-APK-${Math.floor(100000 + Math.random() * 900000)}`;
    setPaymentReceipt({
      txRef,
      gatewayName: selectedGateway.name,
      amountFormatted: formattedPayable,
      date: new Date().toLocaleString('en-GH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    });
  };

  return (
    <section id="payments" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#F4EFEA]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-10">
        {/* Header & Multi-Currency Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D6CEBE] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Accra Treasury · Local Ghana & Global Settlement Hub
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Integrated Ghana Mobile Money, Local Banks & International Checkout
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Headquartered in Airport Residential Area, Accra, Apex Koncepts Ltd accepts instant Ghana Cedi (GH₵) settlements via MTN MoMo, Telecel Cash, AT Money, and GhIPSS Instant Pay alongside international Visa, Mastercard, Apple Pay, Wise, and SWIFT transfers.
            </p>
          </div>

          {/* Live Currency Selector */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono-num uppercase text-[#78716C]">
              Select Settlement Currency
            </span>
            <div className="flex items-center gap-1.5 bg-[#FBF9F5] p-1.5 border border-[#D6CEBE]">
              {(['GHS', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onChangeCurrency(code)}
                  className={`min-h-[40px] px-3.5 py-1.5 text-xs font-mono-num font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    currency === code
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {code === 'GHS' ? 'GH₵ (GHS)' : code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Payment Platform Selector */}
          <div className="lg:col-span-7 space-y-6">
            {/* Group 1: Ghana Mobile Money & Local Banks */}
            <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#C2410C]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                    Ghana Local Payment Platforms (MoMo & GhIPSS Banks)
                  </h3>
                </div>
                <span className="text-xs font-mono-num text-[#78716C]">Bank of Ghana Regulated</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PAYMENT_PLATFORMS.filter(
                  (p) => p.category === 'ghana-momo' || p.category === 'ghana-bank'
                ).map((platform) => {
                  const isSelected = selectedGatewayId === platform.id;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => {
                        setSelectedGatewayId(platform.id);
                        setPaymentReceipt(null);
                      }}
                      className={`w-full text-left p-4 border transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#F4EFEA] border-[#1C1917]'
                          : 'bg-[#FBF9F5] border-[#E5DFD5] hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1C1917]">
                            {platform.name}
                          </span>
                        </div>
                        <div className="text-xs text-[#57534E]">{platform.providerBadge}</div>
                      </div>
                      <div className="text-xs font-mono-num text-[#C2410C] shrink-0">
                        {platform.supportedCurrencies.join(' / ')} →
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: International Cards, Apple/Google Pay & Global Wire */}
            <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C2410C]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                    International Payment Gateways & Cross-Border Wire
                  </h3>
                </div>
                <span className="text-xs font-mono-num text-[#78716C]">PCI-DSS Level 1</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PAYMENT_PLATFORMS.filter(
                  (p) => p.category === 'international-card' || p.category === 'global-wire'
                ).map((platform) => {
                  const isSelected = selectedGatewayId === platform.id;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => {
                        setSelectedGatewayId(platform.id);
                        setPaymentReceipt(null);
                      }}
                      className={`w-full text-left p-4 border transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#F4EFEA] border-[#1C1917]'
                          : 'bg-[#FBF9F5] border-[#E5DFD5] hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#1C1917]">{platform.name}</div>
                        <div className="text-xs text-[#57534E]">{platform.providerBadge}</div>
                      </div>
                      <div className="text-xs font-mono-num text-[#C2410C] shrink-0">
                        {platform.supportedCurrencies.join(' / ')} →
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Checkout & Invoice Terminal */}
          <div className="lg:col-span-5 bg-[#1C1917] text-[#FBF9F5] p-6 md:p-8 space-y-6">
            <div className="border-b border-[#292524] pb-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono-num uppercase tracking-widest text-[#F59E0B]">
                  Apex Koncepts Ghana Treasury
                </div>
                <h3 className="text-lg font-semibold text-[#FBF9F5] mt-0.5">
                  {selectedGateway.name}
                </h3>
              </div>
              {selectedGateway.category === 'ghana-momo' ? (
                <Smartphone className="w-5 h-5 text-[#F59E0B]" />
              ) : selectedGateway.category === 'ghana-bank' ? (
                <Building2 className="w-5 h-5 text-[#F59E0B]" />
              ) : (
                <CreditCard className="w-5 h-5 text-[#F59E0B]" />
              )}
            </div>

            {paymentReceipt ? (
              <div className="p-5 bg-[#292524] border border-[#15803D] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono-num text-[#4ADE80] uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Payment Prompt Dispatched · {paymentReceipt.txRef}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-mono-num font-semibold text-[#FBF9F5]">
                    {paymentReceipt.amountFormatted}
                  </div>
                  <div className="text-xs text-[#D6CEBE]">
                    Channel: {paymentReceipt.gatewayName}
                  </div>
                  <div className="text-xs text-[#A8A29E] font-mono-num">
                    Timestamp: {paymentReceipt.date}
                  </div>
                </div>
                <p className="text-xs text-[#D6CEBE] leading-relaxed">
                  An official Ghana Revenue Authority (GRA) e-VAT invoice and payment confirmation link have been dispatched to <strong>{payerEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setPaymentReceipt(null)}
                  className="min-h-[44px] w-full py-2.5 px-4 bg-[#FBF9F5] text-[#1C1917] text-xs font-medium cursor-pointer"
                >
                  Generate Another Payment Instruction
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuthorizePayment} className="space-y-5" noValidate>
                {/* Milestone Split Selector */}
                <div className="space-y-2">
                  <label className="block text-xs text-[#A8A29E]">
                    Select Retainer Tranche ({selectedDeliverableCount} Deliverables in Scope)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentStage('milestone-50')}
                      className={`min-h-[44px] px-3 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        paymentStage === 'milestone-50'
                          ? 'bg-[#C2410C] text-[#FBF9F5] border-[#C2410C]'
                          : 'border-[#44403C] text-[#A8A29E] hover:text-[#FBF9F5]'
                      }`}
                    >
                      50% Commencement Deposit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentStage('full')}
                      className={`min-h-[44px] px-3 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        paymentStage === 'full'
                          ? 'bg-[#C2410C] text-[#FBF9F5] border-[#C2410C]'
                          : 'border-[#44403C] text-[#A8A29E] hover:text-[#FBF9F5]'
                      }`}
                    >
                      100% Full Settlement
                    </button>
                  </div>
                </div>

                {/* Gateway Instructions & Copyable Merchant/USSD Code */}
                <div className="p-4 bg-[#292524] border border-[#44403C] space-y-3 text-xs">
                  <div className="text-[#D6CEBE] leading-relaxed">
                    {selectedGateway.instructions}
                  </div>
                  {selectedGateway.ussdOrRouting && (
                    <div className="pt-2 border-t border-[#44403C] flex items-center justify-between gap-2 font-mono-num text-[#F59E0B]">
                      <span className="truncate">{selectedGateway.ussdOrRouting}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyRouting(selectedGateway.ussdOrRouting!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1C1917] text-[#FBF9F5] text-[11px] hover:bg-[#C2410C] transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {validationError && (
                  <div className="p-3 bg-[#7F1D1D] text-xs text-[#FECACA]">
                    {validationError}
                  </div>
                )}

                {selectedGateway.category === 'ghana-momo' && (
                  <div className="space-y-1.5">
                    <label htmlFor="momo-number" className="block text-xs text-[#D6CEBE]">
                      Registered Ghana MoMo Number (MTN / Telecel / AT) *
                    </label>
                    <input
                      id="momo-number"
                      type="tel"
                      value={momoPhone}
                      onChange={(e) => setMomoPhone(e.target.value)}
                      placeholder="024 412 3456"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#292524] border border-[#44403C] focus:border-[#F59E0B] focus:outline-none text-[#FBF9F5] font-mono-num"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="payer-email" className="block text-xs text-[#D6CEBE]">
                    Finance / Billing Email for GRA e-VAT Receipt *
                  </label>
                  <input
                    id="payer-email"
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder="accounts@company.com.gh"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#292524] border border-[#44403C] focus:border-[#F59E0B] focus:outline-none text-[#FBF9F5]"
                  />
                </div>

                {/* Amount Summary */}
                <div className="pt-3 border-t border-[#292524] flex items-baseline justify-between font-mono-num">
                  <div>
                    <div className="text-[11px] uppercase text-[#A8A29E]">
                      {paymentStage === 'milestone-50' ? '50% Retainer Due Now' : '100% Total Scope'}
                    </div>
                    <div className="text-xs text-[#78716C]">
                      Total Project Scope: {formattedFullTotal}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold text-[#FBF9F5]">
                    {formattedPayable}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3 px-4 bg-[#C2410C] hover:bg-[#9A3412] text-[#FBF9F5] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {selectedGateway.category === 'ghana-momo'
                      ? `Send ${formattedPayable} MoMo Prompt`
                      : `Authorize ${formattedPayable} Settlement`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#A8A29E] pt-1">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Bank of Ghana & PCI-DSS Compliant
                  </span>
                  <span>TIN: C0049281742</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
