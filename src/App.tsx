/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  Sliders,
  Smartphone,
  Shield,
  CreditCard,
  Layers,
  Send,
} from 'lucide-react';
import { SERVICE_PILLARS, ServicePillar } from './data/servicesData';
import { ServiceSchematicPlate } from './components/ServiceSchematicPlate';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ScopeEstimator } from './components/ScopeEstimator';
import { DeliverableMatrix } from './components/DeliverableMatrix';
import { BriefSubmissionSection } from './components/BriefSubmissionSection';
import { PaymentGatewayHub } from './components/PaymentGatewayHub';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { PWAInstallModal, OfflineIndicator } from './components/PWAInstallBanner';
import { CurrencyCode, formatCurrency } from './utils/currency';

export default function App() {
  // Default currency set to Ghana Cedi (GHS) with instant toggle to USD, EUR, GBP
  const [currency, setCurrency] = useState<CurrencyCode>('GHS');

  // Active modal service state
  const [inspectedService, setInspectedService] = useState<ServicePillar | null>(null);

  // Privacy Policy & iOS/Android PWA Install Modals
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);

  // Active deep-dive pillar selector for the Process & Value Workbench
  const [activeWorkbenchPillarId, setActiveWorkbenchPillarId] =
    useState<ServicePillar['id']>('logo-design');

  // Interactive Scope Estimator state
  const [selectedDeliverableIds, setSelectedDeliverableIds] = useState<string[]>([
    'logo-primary-suite',
    'logo-optical-grid',
    'ci-brand-bible',
  ]);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'accelerated'>('standard');
  const [ipTier, setIpTier] = useState<'standard' | 'global-buyout'>('standard');

  const activeWorkbenchPillar = useMemo(
    () => SERVICE_PILLARS.find((p) => p.id === activeWorkbenchPillarId) || SERVICE_PILLARS[0],
    [activeWorkbenchPillarId]
  );

  // Toggle a single deliverable in the estimator
  const handleToggleDeliverable = (id: string) => {
    setSelectedDeliverableIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Load all deliverables for a given service pillar
  const handleSelectPresetPillar = (pillar: ServicePillar) => {
    const pillarDeliverableIds = pillar.deliverables.map((d) => d.id);
    setSelectedDeliverableIds((prev) => {
      const merged = new Set([...prev, ...pillarDeliverableIds]);
      return Array.from(merged);
    });
  };

  const handleResetScope = () => {
    setSelectedDeliverableIds([]);
    setTimelineSpeed('standard');
    setIpTier('standard');
  };

  // Computed summary for the BriefSubmissionSection & PaymentGatewayHub
  const scopeSummary = useMemo(() => {
    const allDeliverables = SERVICE_PILLARS.flatMap((p) => p.deliverables);
    const chosen = allDeliverables.filter((d) => selectedDeliverableIds.includes(d.id));
    const subtotal = chosen.reduce((sum, item) => sum + item.standalonePrice, 0);
    const days = chosen.reduce((sum, item) => sum + item.estimatedDays, 0);
    const discount = chosen.length >= 4 ? Math.round(subtotal * 0.1) : 0;
    const afterDiscount = subtotal - discount;
    const speedExtra = timelineSpeed === 'accelerated' ? Math.round(afterDiscount * 0.2) : 0;
    const ipExtra = ipTier === 'global-buyout' ? Math.round(afterDiscount * 0.15) : 0;
    const totalInvestmentUSD = afterDiscount + speedExtra + ipExtra;
    const rawWeeks = chosen.length === 0 ? 0 : Math.max(1, Math.ceil(days / 5));
    const estimatedWeeks =
      timelineSpeed === 'accelerated' ? Math.max(1, Math.ceil(rawWeeks * 0.7)) : rawWeeks;

    return {
      selectedNames: chosen.map((c) => c.name),
      totalInvestmentUSD,
      estimatedWeeks,
    };
  }, [selectedDeliverableIds, timelineSpeed, ipTier]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col pb-16 md:pb-0">
      <OfflineIndicator />

      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 h-14 md:h-16 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD5] px-5 md:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base md:text-lg font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
        >
          APEX KONCEPTS
        </a>

        {/* Zone 2: 5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <a
            href="#services-bento"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#methodology"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Process
          </a>
          <a
            href="#estimator"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Estimator
          </a>
          <a
            href="#testimonials"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Outcomes
          </a>
          <a
            href="#commission"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Commission
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollToSection('estimator')}
            className="min-h-[40px] px-4 py-2 text-xs font-medium text-[#FBF9F5] bg-[#1C1917] hover:bg-[#C2410C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Configure Project Scope
          </button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION: SWISS EDITORIAL SPLIT */}
        <section className="border-b border-[#E5DFD5] bg-[#FBF9F5]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-10 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Columns: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
                      Accra, Ghana Headquarters · Kumasi · London · Global Practice
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-[#1C1917] leading-[1.08]">
                    Visual Architecture & Comprehensive Design Systems for Category Leaders.
                  </h1>
                  <p className="font-editorial text-base md:text-xl text-[#44403C] leading-relaxed max-w-2xl">
                    Headquartered in Airport Residential Area, Accra, Apex Koncepts engineers enduring brand marks, corporate identities, tokenized UI/UX design systems, bespoke technical illustration, and tactile packaging for West Africa’s fastest-growing enterprises and global brands.
                  </p>
                </div>

                {/* Primary Hero CTAs + Currency & Mobile App Utility Bar */}
                <div className="space-y-5 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollToSection('services-bento')}
                      className="min-h-[48px] px-6 py-3.5 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#C2410C] transition-colors inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Explore All 5 Design Pillars</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollToSection('payments')}
                      className="min-h-[48px] px-5 py-3.5 text-xs font-medium bg-[#F4EFEA] text-[#1C1917] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <CreditCard className="w-4 h-4 text-[#C2410C]" />
                      <span>MoMo & Global Payments</span>
                    </button>
                    <button
                      onClick={() => setIsPWAModalOpen(true)}
                      className="min-h-[48px] px-5 py-3.5 text-xs font-medium bg-[#FBF9F5] text-[#1C1917] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Smartphone className="w-4 h-4 text-[#C2410C]" />
                      <span>iOS & Android App</span>
                    </button>
                  </div>

                  {/* Operational Utility Bar: Currency Toggle + Privacy Policy */}
                  <div className="pt-3 border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num uppercase text-[#78716C]">Display Currency:</span>
                      {(['GHS', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => setCurrency(code)}
                          className={`min-h-[36px] px-2.5 py-1 font-mono-num text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            currency === code
                              ? 'bg-[#1C1917] text-[#FBF9F5] font-semibold'
                              : 'bg-[#F4EFEA] text-[#57534E] hover:text-[#1C1917]'
                          }`}
                        >
                          {code === 'GHS' ? 'GH₵ (GHS)' : code}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="min-h-[36px] inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1917] underline underline-offset-4 hover:text-[#C2410C] cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>Ghana Act 843 & GDPR Privacy Policy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Architectural Spec Dossier Preview */}
              <div className="lg:col-span-5 bg-[#F4EFEA] border border-[#D6CEBE] p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4 text-xs font-mono-num text-[#78716C]">
                  <span>ACCRA STUDIO CATALOGUE · VOL. IX</span>
                  <span className="text-[#1C1917] font-medium">2026 EDITION</span>
                </div>

                {/* Interactive Quick-Jump Index of the 5 Services */}
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#78716C]">
                    Core Studio Capabilities (Tap to Inspect)
                  </div>
                  <div className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
                    {SERVICE_PILLARS.map((pillar) => (
                      <button
                        key={pillar.id}
                        onClick={() => setInspectedService(pillar)}
                        className="w-full min-h-[48px] py-3 flex items-center justify-between text-left group cursor-pointer"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs font-mono-num text-[#C2410C]">
                            {pillar.index}
                          </span>
                          <span className="text-sm font-semibold text-[#1C1917] group-hover:text-[#C2410C] transition-colors">
                            {pillar.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono-num text-[#78716C] shrink-0">
                          <span>{formatCurrency(pillar.startingInvestment, currency)}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#1C1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#57534E] flex flex-wrap items-center justify-between gap-2 pt-2">
                  <span>MTN MoMo · Telecel · AT · Visa · SWIFT</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Worldwide IP Transfer</span>
                </div>
              </div>
            </div>
          </div>

          {/* FULL-WIDTH METRICS BAR BELOW HERO SPLIT */}
          <div className="border-t border-[#E5DFD5] bg-[#F4EFEA]">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DFD5]">
              <div className="pt-3 sm:pt-0 sm:px-4 first:pl-0">
                <div className="text-2xl md:text-3xl font-semibold font-mono-num text-[#1C1917]">
                  140+
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Ghanaian, West African & Global Brand Systems Shipped
                </div>
              </div>
              <div className="pt-3 sm:pt-0 sm:px-6">
                <div className="text-2xl md:text-3xl font-semibold font-mono-num text-[#1C1917]">
                  GH₵ & USD
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Instant Local Mobile Money, GhIPSS & International Cards
                </div>
              </div>
              <div className="pt-3 sm:pt-0 sm:px-6">
                <div className="text-2xl md:text-3xl font-semibold font-mono-num text-[#1C1917]">
                  99.4%
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  First-Run Print & Registrar General / USPTO Trademark Clearance
                </div>
              </div>
              <div className="pt-3 sm:pt-0 sm:px-6">
                <div className="text-2xl md:text-3xl font-semibold font-mono-num text-[#C2410C]">
                  iOS & Android
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Offline-Ready Mobile Studio App with Act 843 Privacy Compliance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: MODULAR SWISS BENTO GRID OF ALL 5 SERVICE PILLARS */}
        <section id="services-bento" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#FBF9F5]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E5DFD5] pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
                  01 · Architectural Service Pillars
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
                  Five Integrated Graphic Design Disciplines
                </h2>
                <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
                  Explore our modular bento catalog below. Every discipline details our four-phase execution methodology, exact production deliverables, and strategic business value.
                </p>
              </div>
              <div className="text-xs text-[#78716C] font-mono-num">
                Tap any pillar card to open its full specification drawer
              </div>
            </div>

            {/* Asymmetric 12-Column Swiss Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {SERVICE_PILLARS.map((service) => {
                const colSpanClass =
                  service.id === 'logo-design'
                    ? 'lg:col-span-7'
                    : service.id === 'corporate-identity'
                    ? 'lg:col-span-5'
                    : service.id === 'ui-ux-design'
                    ? 'lg:col-span-4'
                    : service.id === 'illustration'
                    ? 'lg:col-span-4'
                    : 'lg:col-span-4';

                const isInEstimator = service.deliverables.some((d) =>
                  selectedDeliverableIds.includes(d.id)
                );

                return (
                  <article
                    key={service.id}
                    className={`${colSpanClass} bg-[#FBF9F5] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors p-6 md:p-8 flex flex-col justify-between space-y-6`}
                  >
                    <div className="space-y-5">
                      {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-num text-[#78716C]">
                        <div>
                          <span className="text-[#C2410C] font-semibold">PILLAR {service.index}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{service.typicalTimeline}</span>
                          <span aria-hidden="true"> · </span>
                          <span>From {formatCurrency(service.startingInvestment, currency)}</span>
                        </div>
                        {isInEstimator && (
                          <span className="text-[#15803D] font-medium">In Active Scope</span>
                        )}
                      </div>

                      {/* Vector Architectural Plate */}
                      <div
                        onClick={() => setInspectedService(service)}
                        className="cursor-pointer group"
                      >
                        <ServiceSchematicPlate
                          serviceId={service.id}
                          className="h-44 group-hover:border-[#1C1917] transition-colors"
                        />
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-2.5">
                        <div className="text-[11px] uppercase tracking-wider text-[#78716C]">
                          {service.kicker}
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight text-[#1C1917]">
                          {service.index}. {service.title}
                        </h3>
                        <p className="text-sm text-[#44403C] leading-relaxed">
                          {service.shortSummary}
                        </p>
                      </div>

                      {/* Condensed Process & Deliverables Snapshot */}
                      <div className="pt-4 border-t border-[#E5DFD5] space-y-3 text-xs">
                        <div>
                          <span className="font-semibold text-[#1C1917]">4-Phase Process: </span>
                          <span className="text-[#57534E]">
                            {service.process.map((p) => p.title.split('&')[0].trim()).join(' → ')}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1C1917]">Key Deliverables: </span>
                          <span className="text-[#57534E]">
                            {service.deliverables.map((d) => d.name.split('(')[0].trim()).join(' · ')}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#C2410C]">Verified Impact: </span>
                          <span className="text-[#1C1917] font-mono-num">
                            {service.strategicValue[0].metric} ({service.caseProof.client})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setInspectedService(service)}
                        className="min-h-[44px] px-4 py-2 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#C2410C] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Inspect Full Specification</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleSelectPresetPillar(service)}
                        className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-[#1C1917] bg-[#F4EFEA] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>Add Pillar to Estimator</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE DEEP-DIVE WORKBENCH (PROCESS, DELIVERABLES & VALUE BY SERVICE) */}
        <section id="methodology" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#F4EFEA]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D6CEBE] pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
                  02 · Complete Methodology, Deliverables & Value Explorer
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
                  Inside Each Discipline: How We Work & What You Receive
                </h2>
                <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
                  Switch between any of the five services below to audit its step-by-step creative workflow, production file packages, and the measurable commercial advantage Apex Koncepts brings.
                </p>
              </div>

              {/* Interactive Service Switcher Tabs */}
              <div className="flex flex-wrap gap-1.5 bg-[#FBF9F5] p-1.5 border border-[#D6CEBE]" role="tablist">
                {SERVICE_PILLARS.map((pillar) => {
                  const isActive = pillar.id === activeWorkbenchPillarId;
                  return (
                    <button
                      key={pillar.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveWorkbenchPillarId(pillar.id)}
                      className={`min-h-[44px] px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#1C1917] text-[#FBF9F5]'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {pillar.index}. {pillar.title.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Pillar Full Breakdown */}
            <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-5 md:p-10 space-y-12">
              {/* Top Discipline Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E5DFD5] pb-8">
                <div className="lg:col-span-8 space-y-3">
                  <div className="text-xs font-mono-num text-[#C2410C]">
                    DISCIPLINE {activeWorkbenchPillar.index} · {activeWorkbenchPillar.kicker}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1C1917]">
                    {activeWorkbenchPillar.title}
                  </h3>
                  <p className="font-editorial text-base md:text-lg text-[#44403C] leading-relaxed">
                    {activeWorkbenchPillar.editorialLead}
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <ServiceSchematicPlate serviceId={activeWorkbenchPillar.id} className="h-44" />
                </div>
              </div>

              {/* Part A: The 4-Phase Process */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#C2410C]" />
                    <h4 className="text-base font-semibold uppercase tracking-wider text-[#1C1917]">
                      Part I — The 4-Stage Execution Process
                    </h4>
                  </div>
                  <span className="text-xs font-mono-num text-[#78716C]">
                    Cadence: {activeWorkbenchPillar.typicalTimeline}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {activeWorkbenchPillar.process.map((phase) => (
                    <div
                      key={phase.step}
                      className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono-num">
                          <span className="text-[#C2410C] font-semibold">{phase.step}</span>
                          <span className="text-[#78716C]">{phase.duration}</span>
                        </div>
                        <h5 className="text-base font-semibold text-[#1C1917]">{phase.title}</h5>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#D6CEBE] text-[11px] text-[#1C1917]">
                        <span className="text-[#78716C] block mb-1 uppercase">Phase Outputs:</span>
                        {phase.keyOutputs.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part B: Concrete Deliverables & File Formats */}
              <div className="space-y-6 pt-4 border-t border-[#E5DFD5]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-[#C2410C]" />
                    <h4 className="text-base font-semibold uppercase tracking-wider text-[#1C1917]">
                      Part II — Production Deliverables & Technical Specifications
                    </h4>
                  </div>
                  <span className="text-xs text-[#78716C]">
                    Tap any deliverable to toggle it in your live project estimate
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeWorkbenchPillar.deliverables.map((deliv) => {
                    const isChecked = selectedDeliverableIds.includes(deliv.id);
                    return (
                      <div
                        key={deliv.id}
                        className={`p-6 border flex flex-col justify-between space-y-5 transition-colors ${
                          isChecked
                            ? 'bg-[#F4EFEA] border-[#1C1917]'
                            : 'bg-[#FBF9F5] border-[#E5DFD5]'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="text-xs font-mono-num text-[#C2410C]">
                            {deliv.formats.join(' · ')}
                          </div>
                          <h5 className="text-base font-semibold text-[#1C1917]">{deliv.name}</h5>
                          <p className="text-xs text-[#44403C] leading-relaxed">
                            {deliv.description}
                          </p>
                          <div className="text-[11px] font-mono-num text-[#78716C]">
                            Color Profile: {deliv.colorProfile}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between gap-2">
                          <div className="font-mono-num">
                            <span className="text-sm font-semibold text-[#1C1917]">
                              {formatCurrency(deliv.standalonePrice, currency)}
                            </span>
                            <span className="text-[11px] text-[#78716C] block">
                              {deliv.estimatedDays} working days
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleDeliverable(deliv.id)}
                            className={`min-h-[44px] px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              isChecked
                                ? 'bg-[#C2410C] text-[#FBF9F5]'
                                : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-[#292524]'
                            }`}
                          >
                            {isChecked ? '✓ In Estimator' : '+ Add to Scope'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part C: The Strategic Value Apex Koncepts Brings */}
              <div className="space-y-6 pt-4 border-t border-[#E5DFD5]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-[#C2410C]" />
                    <h4 className="text-base font-semibold uppercase tracking-wider text-[#1C1917]">
                      Part III — Strategic Value & The Apex Koncepts Advantage
                    </h4>
                  </div>
                  <span className="text-xs font-mono-num text-[#1C1917]">
                    Case Proof: {activeWorkbenchPillar.caseProof.client} ({activeWorkbenchPillar.caseProof.outcomeMetric})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeWorkbenchPillar.strategicValue.map((v, i) => (
                    <div key={i} className="p-6 bg-[#1C1917] text-[#FBF9F5] space-y-2.5">
                      <div className="text-xs font-mono-num text-[#F59E0B] uppercase tracking-wider">
                        {v.metric}
                      </div>
                      <h5 className="text-base font-semibold text-[#FBF9F5]">{v.title}</h5>
                      <p className="text-xs text-[#D6CEBE] leading-relaxed">{v.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE PROJECT SCOPE BUILDER & INSTANT COST ESTIMATOR */}
        <ScopeEstimator
          currency={currency}
          onChangeCurrency={setCurrency}
          selectedDeliverableIds={selectedDeliverableIds}
          onToggleDeliverable={handleToggleDeliverable}
          onSelectPresetPillar={handleSelectPresetPillar}
          onResetScope={handleResetScope}
          timelineSpeed={timelineSpeed}
          onChangeTimelineSpeed={setTimelineSpeed}
          ipTier={ipTier}
          onChangeIpTier={setIpTier}
          onProceedToBrief={() => scrollToSection('payments')}
        />

        {/* SECTION 4: CROSS-DISCIPLINE DELIVERABLE & SPECIFICATION MATRIX */}
        <DeliverableMatrix
          currency={currency}
          onSelectService={(service) => setInspectedService(service)}
        />

        {/* SECTION 5: GHANA LOCAL MOBILE MONEY & INTERNATIONAL PAYMENT PLATFORMS */}
        <PaymentGatewayHub
          currency={currency}
          onChangeCurrency={setCurrency}
          estimatedAmountUSD={scopeSummary.totalInvestmentUSD}
          selectedDeliverableCount={scopeSummary.selectedNames.length}
        />

        {/* SECTION 6: CREATIVE BRIEF & COMMISSION DOSSIER SUBMISSION */}
        <BriefSubmissionSection
          currency={currency}
          selectedDeliverableNames={scopeSummary.selectedNames}
          estimatedInvestmentUSD={scopeSummary.totalInvestmentUSD}
          estimatedWeeks={scopeSummary.estimatedWeeks}
          onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
        />

        {/* SECTION 7: CLIENT SUCCESS STORIES & PROJECT OUTCOMES (TESTIMONIAL CAROUSEL FOR SOCIAL PROOF) */}
        <TestimonialCarousel
          onLoadDeliverables={(deliverableIds) => {
            setSelectedDeliverableIds((prev) => {
              const merged = new Set([...prev, ...deliverableIds]);
              return Array.from(merged);
            });
          }}
          onNavigateToEstimator={() => scrollToSection('estimator')}
          onNavigateToCommission={() => scrollToSection('commission')}
        />
      </main>

      {/* QUIET EDITORIAL FOOTER WITH GHANA HEADQUARTERS, PRIVACY POLICY & MOBILE INSTALL */}
      <footer className="bg-[#1C1917] text-[#D6CEBE] py-14 px-5 md:px-10 border-t border-[#292524]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-2.5">
              <div className="text-base font-bold tracking-tight text-[#FBF9F5]">
                APEX KONCEPTS STUDIO LTD (GHANA)
              </div>
              <p className="text-xs text-[#A8A29E] max-w-md leading-relaxed">
                Multidisciplinary graphic design and brand architecture practice headquartered at No. 14 Patrice Lumumba Road, Airport Residential Area, Accra, Ghana (Digital Address: GA-056-8492). Registered with the Office of the Registrar of Companies & Ghana Data Protection Commission.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs text-[#A8A29E]">
              <div className="font-semibold text-[#FBF9F5] uppercase tracking-wider font-mono-num">
                Supported Payment Platforms
              </div>
              <p className="leading-relaxed">
                Local Ghana: MTN Mobile Money (*170#), Telecel Cash, AT Money, GhIPSS Instant Pay (Ecobank, GCB, Stanbic, Fidelity).
              </p>
              <p className="leading-relaxed">
                International: Visa, Mastercard, American Express, Apple Pay, Google Pay, PayPal Business, Wise & SWIFT Wire.
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="min-h-[44px] px-4 py-2.5 text-xs font-medium bg-[#292524] hover:bg-[#C2410C] text-[#FBF9F5] border border-[#44403C] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Privacy Policy (Act 843 & GDPR)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPWAModalOpen(true)}
                className="min-h-[44px] px-4 py-2.5 text-xs font-medium bg-[#292524] hover:bg-[#C2410C] text-[#FBF9F5] border border-[#44403C] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Install on iOS & Android</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#78716C] font-mono-num">
            <div>
              © {new Date().getFullYear()} Apex Koncepts Studio Ltd (Accra, Ghana). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[#A8A29E]">
              <a href="#services-bento" className="hover:text-[#FBF9F5]">Services</a>
              <a href="#estimator" className="hover:text-[#FBF9F5]">Estimator</a>
              <a href="#testimonials" className="hover:text-[#FBF9F5]">Client Proof</a>
              <a href="#payments" className="hover:text-[#FBF9F5]">MoMo & Global Pay</a>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-[#FBF9F5] underline underline-offset-4 cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR FOR iOS & ANDROID THUMB ERGONOMICS (<=15% Sticky Cap) */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#1C1917]/95 backdrop-blur-md border-t border-[#292524] grid grid-cols-5 items-center px-1"
      >
        <button
          type="button"
          onClick={() => scrollToSection('services-bento')}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#D6CEBE] hover:text-[#FBF9F5] active:text-[#C2410C] cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Services</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('estimator')}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#D6CEBE] hover:text-[#FBF9F5] active:text-[#C2410C] cursor-pointer"
        >
          <Sliders className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Estimator</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('payments')}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#F59E0B] hover:text-[#FBF9F5] cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">MoMo/Pay</span>
        </button>
        <button
          type="button"
          onClick={() => setIsPrivacyOpen(true)}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#D6CEBE] hover:text-[#FBF9F5] active:text-[#C2410C] cursor-pointer"
        >
          <Shield className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Privacy</span>
        </button>
        <button
          type="button"
          onClick={() => setIsPWAModalOpen(true)}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#D6CEBE] hover:text-[#FBF9F5] active:text-[#C2410C] cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Get App</span>
        </button>
      </nav>

      {/* SLIDE-OVER SERVICE SPECIFICATION MODAL */}
      <ServiceDetailModal
        currency={currency}
        service={inspectedService}
        onClose={() => setInspectedService(null)}
        selectedDeliverableIds={selectedDeliverableIds}
        onToggleDeliverable={handleToggleDeliverable}
        onAddFullServiceToScope={(service) => {
          handleSelectPresetPillar(service);
          scrollToSection('estimator');
        }}
      />

      {/* GHANA ACT 843 & GDPR PRIVACY POLICY MODAL */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* iOS & ANDROID INSTALL GUIDE MODAL */}
      <PWAInstallModal
        isOpen={isPWAModalOpen}
        onClose={() => setIsPWAModalOpen(false)}
      />
    </div>
  );
}
