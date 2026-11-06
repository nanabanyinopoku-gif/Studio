import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Quote,
  CheckCircle2,
  ExternalLink,
  Layers,
  Clock,
  Building2,
  MapPin,
  X,
  FileCheck2,
  TrendingUp,
} from 'lucide-react';
import { TESTIMONIAL_STORIES, TestimonialStory } from '../data/testimonialsData';

interface TestimonialCarouselProps {
  onLoadDeliverables?: (deliverableIds: string[]) => void;
  onNavigateToEstimator?: () => void;
  onNavigateToCommission?: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onLoadDeliverables,
  onNavigateToEstimator,
  onNavigateToCommission,
}) => {
  // Category / Discipline filter state
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [inspectedStory, setInspectedStory] = useState<TestimonialStory | null>(null);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Filtered stories list
  const filteredStories = React.useMemo(() => {
    if (selectedFilter === 'all') return TESTIMONIAL_STORIES;
    return TESTIMONIAL_STORIES.filter((story) => story.pillarId === selectedFilter);
  }, [selectedFilter]);

  // Keep index within bounds if filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  const activeStory = filteredStories[currentIndex] || filteredStories[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  }, [filteredStories.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  }, [filteredStories.length]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (!isPlaying || filteredStories.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      handleNext();
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, filteredStories.length, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -50) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Deliverables loading helper
  const handleApplyDeliverables = (story: TestimonialStory) => {
    if (onLoadDeliverables) {
      onLoadDeliverables(story.deliverableIdsToLoad);
    }
    if (onNavigateToEstimator) {
      onNavigateToEstimator();
    }
  };

  // Client initials helper
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section
      id="testimonials"
      aria-label="Client success stories and verified project outcomes"
      className="py-16 md:py-24 border-b border-[#E5DFD5] bg-[#FBF9F5]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-10">
        {/* SECTION HEADER (Swiss Editorial Rhythm) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E5DFD5] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              07 · Client Success Stories & Verified Project Outcomes
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Proven Commercial Impact Across Six Jurisdictions
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Every design system we ship is evaluated on concrete business outcomes: fund
              closures, micro-milling precision, retail shelf pick-up velocity, and engineering
              velocity. Explore verified case evidence from global and West African category leaders.
            </p>
          </div>

          {/* Interactive Discipline Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F4EFEA] p-1.5 border border-[#D6CEBE]">
            {[
              { id: 'all', label: 'All Stories (6)' },
              { id: 'corporate-identity', label: 'Corporate Identity' },
              { id: 'ui-ux-design', label: 'UI/UX & Fintech' },
              { id: 'logo-design', label: 'Logo Architecture' },
              { id: 'marketing-collateral', label: 'Packaging & Print' },
              { id: 'illustration', label: 'Technical Illustration' },
            ].map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CAROUSEL CONTROLS BAR (Counter, Autoplay, Prev/Next) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DFD5] pb-4">
          <div className="flex items-center gap-3 text-xs font-mono-num text-[#78716C]">
            <span className="text-[#C2410C] font-semibold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(filteredStories.length).padStart(2, '0')}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline text-[#1C1917] font-medium">
              {activeStory.organization}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Autoplay Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause auto-rotation' : 'Start auto-rotation'}
              className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-[#F4EFEA] border border-[#D6CEBE] hover:border-[#1C1917] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={isPlaying ? 'Pause slide rotation' : 'Resume slide rotation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span className="hidden sm:inline">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#57534E]" />
                  <span className="hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous client success story"
              className="min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-[#F4EFEA] border border-[#D6CEBE] hover:border-[#1C1917] inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next client success story"
              className="min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-medium text-[#FBF9F5] bg-[#1C1917] hover:bg-[#C2410C] inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRIMARY TESTIMONIAL CARD: SWISS EDITORIAL SPLIT CONTAINER */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-[#F4EFEA] border border-[#D6CEBE] p-6 md:p-10 lg:p-12 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* LEFT COLUMN: EXECUTIVE QUOTE & ATTRIBUTION (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-num text-[#78716C]">
                  <span className="text-[#C2410C] font-semibold">
                    {activeStory.pillarLabel.toUpperCase()}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeStory.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeStory.year}</span>
                </div>

                {/* Editorial Quote */}
                <div className="relative pl-1">
                  <Quote className="w-7 h-7 text-[#C2410C] mb-3 opacity-90" />
                  <blockquote className="font-editorial text-lg sm:text-xl lg:text-2xl text-[#1C1917] leading-relaxed italic">
                    “{activeStory.quote}”
                  </blockquote>
                </div>
              </div>

              {/* Client Executive Profile Lockup */}
              <div className="pt-6 border-t border-[#D6CEBE] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-[#1C1917] text-[#FBF9F5] flex items-center justify-center font-mono-num text-sm font-semibold tracking-wider shrink-0 border border-[#292524]">
                    {getInitials(activeStory.clientName)}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[#1C1917]">
                      {activeStory.clientName}
                    </div>
                    <div className="text-xs text-[#57534E] font-medium">
                      {activeStory.clientTitle}
                    </div>
                    <div className="text-xs font-mono-num text-[#78716C] flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3 h-3 text-[#C2410C]" />
                      <span>{activeStory.organization}</span>
                      <span aria-hidden="true">·</span>
                      <MapPin className="w-3 h-3 text-[#78716C]" />
                      <span>{activeStory.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono-num uppercase tracking-wider text-[#15803D] flex items-center gap-1.5 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>{activeStory.verificationBadge}</span>
                  </div>
                  <div className="text-xs text-[#78716C] mt-0.5">
                    Engagement Duration: {activeStory.timeline}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROJECT OUTCOME DOSSIER & QUANTITATIVE SPEC (5 Columns) */}
            <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#D6CEBE] p-6 md:p-7 flex flex-col justify-between space-y-6">
              {/* Primary Quantified Outcome Banner */}
              <div className="space-y-2 border-b border-[#E5DFD5] pb-5">
                <div className="text-[11px] font-mono-num uppercase tracking-wider text-[#78716C]">
                  Key Verified Project Outcome
                </div>
                <div className="text-4xl md:text-5xl font-semibold font-mono-num text-[#C2410C] tracking-tight">
                  {activeStory.primaryMetric}
                </div>
                <div className="text-sm font-medium text-[#1C1917] leading-snug">
                  {activeStory.metricLabel}
                </div>
              </div>

              {/* Secondary Metrics Trio */}
              <div className="grid grid-cols-3 gap-3 border-b border-[#E5DFD5] pb-5 text-center">
                {activeStory.secondaryMetrics.map((item, idx) => (
                  <div key={idx} className="bg-[#F4EFEA] p-2.5 border border-[#E5DFD5]">
                    <div className="text-xs font-semibold font-mono-num text-[#1C1917]">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-[#78716C] mt-0.5 leading-tight">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Before & After Summary */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-semibold text-[#1C1917] block mb-0.5">
                    The Initial Friction:
                  </span>
                  <p className="text-[#57534E]">{activeStory.challenge}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#C2410C] block mb-0.5">
                    Apex Architectural Intervention:
                  </span>
                  <p className="text-[#44403C]">{activeStory.solution}</p>
                </div>
              </div>

              {/* Action Buttons: Inspect Case Dossier + Load Deliverables */}
              <div className="pt-4 border-t border-[#E5DFD5] flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setInspectedStory(activeStory)}
                  className="flex-1 min-h-[44px] px-3.5 py-2 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#C2410C] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Inspect Outcome Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyDeliverables(activeStory)}
                  className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-[#1C1917] bg-[#F4EFEA] border border-[#D6CEBE] hover:border-[#1C1917] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  title="Configure project scope using deliverables deployed in this project"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Use Scope in Estimator</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL QUICK-JUMP MATRIX: JUMP DIRECTLY TO ANY CLIENT STORY */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono-num uppercase tracking-wider text-[#78716C]">
            All Verified Client Success Stories (Tap to Switch)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredStories.map((story, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917] ring-1 ring-[#C2410C]'
                      : 'bg-[#FBF9F5] text-[#1C1917] border-[#D6CEBE] hover:border-[#1C1917]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full text-[10px] font-mono-num">
                    <span className={isSelected ? 'text-[#C2410C] font-semibold' : 'text-[#78716C]'}>
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        isSelected ? 'text-[#F59E0B]' : 'text-[#C2410C]'
                      }`}
                    >
                      {story.primaryMetric}
                    </span>
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <div className="text-xs font-semibold leading-tight line-clamp-1">
                      {story.organization}
                    </div>
                    <div
                      className={`text-[10px] line-clamp-1 ${
                        isSelected ? 'text-[#D6CEBE]' : 'text-[#78716C]'
                      }`}
                    >
                      {story.clientName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED OUTCOME DOSSIER SLIDE-OVER / MODAL */}
      {inspectedStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <div className="relative w-full max-w-3xl bg-[#FBF9F5] border border-[#1C1917] shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5DFD5] pb-4">
              <div>
                <div className="text-xs font-mono-num uppercase tracking-wider text-[#C2410C]">
                  Project Outcome Dossier · {inspectedStory.pillarLabel}
                </div>
                <h3 id="dossier-modal-title" className="text-2xl font-semibold text-[#1C1917] mt-1">
                  {inspectedStory.organization}
                </h3>
                <div className="text-xs text-[#57534E] flex flex-wrap items-center gap-2 mt-1">
                  <span>{inspectedStory.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{inspectedStory.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>Completed {inspectedStory.year}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedStory(null)}
                aria-label="Close project dossier"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big Outcome Banner */}
            <div className="p-5 bg-[#F4EFEA] border border-[#D6CEBE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono-num uppercase text-[#78716C]">
                  Verified Commercial Impact
                </div>
                <div className="text-3xl sm:text-4xl font-mono-num font-semibold text-[#C2410C]">
                  {inspectedStory.primaryMetric}
                </div>
                <div className="text-xs text-[#1C1917] font-medium mt-0.5">
                  {inspectedStory.metricLabel}
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-[#D6CEBE] sm:pl-6 text-xs font-mono-num space-y-1">
                <div className="text-[#15803D] font-semibold flex items-center gap-1 sm:justify-end">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{inspectedStory.verificationBadge}</span>
                </div>
                <div className="text-[#78716C] flex items-center gap-1 sm:justify-end">
                  <Clock className="w-3 h-3" />
                  <span>{inspectedStory.timeline}</span>
                </div>
              </div>
            </div>

            {/* Before vs After Analysis */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                Comparative Project Diagnosis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FBF9F5] border border-[#E5DFD5] space-y-2">
                  <div className="text-xs font-semibold text-[#78716C] uppercase font-mono-num">
                    Pre-Engagement Challenge
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {inspectedStory.challenge}
                  </p>
                </div>
                <div className="p-4 bg-[#F4EFEA] border border-[#D6CEBE] space-y-2">
                  <div className="text-xs font-semibold text-[#C2410C] uppercase font-mono-num">
                    Apex Architectural Intervention
                  </div>
                  <p className="text-xs text-[#1C1917] leading-relaxed">
                    {inspectedStory.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables Suite Deployed */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#C2410C]" />
                <span>Production Deliverables Package Shipped</span>
              </h4>
              <div className="divide-y divide-[#E5DFD5] border border-[#E5DFD5] bg-[#FBF9F5]">
                {inspectedStory.deliverablesUsed.map((deliv, i) => (
                  <div
                    key={i}
                    className="p-3 text-xs text-[#1C1917] flex items-center justify-between"
                  >
                    <span>{deliv}</span>
                    <span className="text-xs font-mono-num text-[#15803D]">Shipped & Assigned</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote Callout */}
            <div className="p-4 bg-[#1C1917] text-[#FBF9F5] space-y-2">
              <div className="text-[11px] font-mono-num uppercase tracking-wider text-[#F59E0B]">
                Executive Sign-Off
              </div>
              <blockquote className="font-editorial text-sm italic text-[#D6CEBE] leading-relaxed">
                “{inspectedStory.quote}”
              </blockquote>
              <div className="text-xs font-mono-num text-[#A8A29E] pt-2 border-t border-[#292524]">
                — {inspectedStory.clientName}, {inspectedStory.clientTitle} (
                {inspectedStory.organization})
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setInspectedStory(null)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2 text-xs font-medium bg-[#F4EFEA] text-[#57534E] hover:text-[#1C1917] border border-[#D6CEBE] transition-colors cursor-pointer"
              >
                Close Dossier
              </button>

              <button
                type="button"
                onClick={() => {
                  handleApplyDeliverables(inspectedStory);
                  setInspectedStory(null);
                }}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#C2410C] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Configure Similar Scope in Estimator</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
