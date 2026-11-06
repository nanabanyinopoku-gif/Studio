import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Eye, Sliders, Type, Palette, Grid, CheckCircle2 } from 'lucide-react';

interface SwatchDef {
  name: string;
  pms: string;
  hex: string;
  cmyk: string;
  rgb: string;
  usage: string;
  isLight: boolean;
}

const SWATCH_LIBRARY: SwatchDef[] = [
  {
    name: 'Antique Obsidian Ink',
    pms: 'Pantone Black 6C',
    hex: '#1C1917',
    cmyk: '60 / 52 / 53 / 78',
    rgb: '28, 25, 23',
    usage: '60% Structural Typography & Logomarks',
    isLight: false,
  },
  {
    name: 'Burnt Cadmium Cinnabar',
    pms: 'Pantone 173C',
    hex: '#C2410C',
    cmyk: '0 / 84 / 96 / 15',
    rgb: '194, 65, 12',
    usage: '10% High-Intent Focal Accent & Hot Foil',
    isLight: false,
  },
  {
    name: 'Archival Warm Alabaster',
    pms: 'Pantone 7527C (Uncoated)',
    hex: '#FBF9F5',
    cmyk: '0 / 1 / 3 / 2',
    rgb: '251, 249, 245',
    usage: 'Cotton Stock Base & Uncoated Field',
    isLight: true,
  },
  {
    name: 'Warm Limestone Stone',
    pms: 'Pantone Warm Gray 1C',
    hex: '#F4EFEA',
    cmyk: '2 / 3 / 5 / 4',
    rgb: '244, 239, 234',
    usage: '30% Secondary Panels & Packaging Board',
    isLight: true,
  },
  {
    name: 'Gold Coast Raw Ochre',
    pms: 'Pantone 7555C',
    hex: '#B45309',
    cmyk: '12 / 62 / 100 / 18',
    rgb: '180, 83, 9',
    usage: 'Embossed Crests & Metallic Seals',
    isLight: false,
  },
];

export const BrandLabSpecimen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'typography' | 'chroma' | 'grid'>('typography');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [specimenText, setSpecimenText] = useState('Apex Koncepts Studio Accra');
  const [typeScalePx, setTypeScalePx] = useState(48);
  const [showGridLines, setShowGridLines] = useState(true);
  const [showInkTraps, setShowInkTraps] = useState(true);
  const [substrate, setSubstrate] = useState<'alabaster' | 'obsidian' | 'limestone'>('alabaster');
  const [fontPreset, setFontPreset] = useState<'modern' | 'swiss' | 'grotesk'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('apex_font_preset') as 'modern' | 'swiss' | 'grotesk') || 'modern';
    }
    return 'modern';
  });

  const handleSelectFontPreset = (preset: 'modern' | 'swiss' | 'grotesk') => {
    setFontPreset(preset);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font-preset', preset);
      localStorage.setItem('apex_font_preset', preset);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="brand-lab" className="py-16 md:py-20 border-b border-[#E5DFD5] bg-[#F4EFEA]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D6CEBE] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#C2410C]">
              Interactive Brand Architecture Laboratory
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917]">
              Apex Specimen & Vector Calibration Workbench
            </h2>
            <p className="text-sm md:text-base text-[#44403C] leading-relaxed">
              Test our typographic scales in real time, copy calibrated Pantone/CMYK press formulas, and inspect how Swiss modular grid mathematics govern our identity systems.
            </p>
          </div>

          {/* Workbench Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FBF9F5] p-1.5 border border-[#D6CEBE]" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'typography'}
              onClick={() => setActiveTab('typography')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'typography'
                  ? 'bg-[#1C1917] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Typographic Scales</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'chroma'}
              onClick={() => setActiveTab('chroma')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'chroma'
                  ? 'bg-[#1C1917] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Pantone Chemistry</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'grid'}
              onClick={() => setActiveTab('grid')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'grid'
                  ? 'bg-[#1C1917] text-[#FBF9F5]'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid & Bezier Geometry</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TYPOGRAPHY LABORATORY */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-6 space-y-6">
              {/* Professional Font System Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F4EFEA] border border-[#D6CEBE]">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono-num uppercase font-semibold text-[#1C1917] flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Select Active Website Font Preset:</span>
                  </span>
                  <p className="text-[11px] text-[#78716C]">
                    Changes the typographic hierarchy in real time across the entire site.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectFontPreset('modern')}
                    className={`min-h-[38px] px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      fontPreset === 'modern'
                        ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                        : 'bg-[#FBF9F5] text-[#57534E] border-[#D6CEBE] hover:border-[#1C1917]'
                    }`}
                  >
                    <span>Modern Grotesque (Plus Jakarta)</span>
                    {fontPreset === 'modern' && <Check className="w-3 h-3 text-[#FBF9F5]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectFontPreset('swiss')}
                    className={`min-h-[38px] px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      fontPreset === 'swiss'
                        ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                        : 'bg-[#FBF9F5] text-[#57534E] border-[#D6CEBE] hover:border-[#1C1917]'
                    }`}
                  >
                    <span>Swiss Modern (Inter)</span>
                    {fontPreset === 'swiss' && <Check className="w-3 h-3 text-[#FBF9F5]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectFontPreset('grotesk')}
                    className={`min-h-[38px] px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      fontPreset === 'grotesk'
                        ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                        : 'bg-[#FBF9F5] text-[#57534E] border-[#D6CEBE] hover:border-[#1C1917]'
                    }`}
                  >
                    <span>Neo-Brutalist (Space Grotesk)</span>
                    {fontPreset === 'grotesk' && <Check className="w-3 h-3 text-[#FBF9F5]" />}
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center border-b border-[#E5DFD5] pb-5">
                <div className="md:col-span-6 space-y-1.5">
                  <label htmlFor="specimen-input" className="block text-xs font-mono-num text-[#78716C] uppercase">
                    Interactive Specimen String
                  </label>
                  <input
                    id="specimen-input"
                    type="text"
                    value={specimenText}
                    onChange={(e) => setSpecimenText(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[#F4EFEA] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917]"
                  />
                </div>

                <div className="md:col-span-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-num text-[#78716C]">
                    <span>Type Scale: {typeScalePx}px</span>
                    <span>Ratio φ 1.618</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={72}
                    value={typeScalePx}
                    onChange={(e) => setTypeScalePx(Number(e.target.value))}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInkTraps(!showInkTraps)}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-mono-num border transition-colors cursor-pointer ${
                      showInkTraps
                        ? 'bg-[#C2410C] text-[#FBF9F5] border-[#C2410C]'
                        : 'bg-[#F4EFEA] text-[#57534E] border-[#D6CEBE]'
                    }`}
                  >
                    {showInkTraps ? 'Ink Traps: ON' : 'Ink Traps: OFF'}
                  </button>
                </div>
              </div>

              {/* Live Specimen Viewports */}
              <div className="space-y-8">
                {/* Display Face */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-num text-[#78716C] border-b border-[#E5DFD5] pb-1">
                    <span>
                      PRIMARY HEADLINE DISPLAY · {fontPreset === 'modern' ? 'PLUS JAKARTA SANS (700 WEIGHT · GEOMETRIC NEO-GROTESQUE)' : fontPreset === 'swiss' ? 'INTER (600 WEIGHT · SWISS FUNCTIONALIST)' : 'SPACE GROTESK (700 WEIGHT · ARCHITECTURAL)'}
                    </span>
                    <span>HERO HEADLINES & MONOGRAMS</span>
                  </div>
                  <div
                    style={{ fontSize: `${typeScalePx}px` }}
                    className="font-display font-semibold tracking-tight text-[#1C1917] leading-tight break-words py-2 select-all"
                  >
                    {specimenText || 'Apex Koncepts Studio Accra'}
                  </div>
                </div>

                {/* Editorial Serif: Newsreader */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-num text-[#78716C] border-b border-[#E5DFD5] pb-1">
                    <span>EDITORIAL MONOGRAPH SERIF · NEWSREADER (OPTICAL 72 · ITALIC)</span>
                    <span>BRAND CONSTITUTIONS & ESSAY PROSE</span>
                  </div>
                  <div
                    style={{ fontSize: `${Math.round(typeScalePx * 0.55)}px` }}
                    className="font-editorial text-[#44403C] leading-relaxed italic py-2 select-all"
                  >
                    "{specimenText || 'Apex Koncepts'} — Engineering visual clarity through unyielding mathematical discipline, rigorous grid alignment, and tactile restraint."
                  </div>
                </div>

                {/* Tabular Mono: JetBrains Mono */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-num text-[#78716C] border-b border-[#E5DFD5] pb-1">
                    <span>DATA TELEMETRY & SPECIFICATIONS · JETBRAINS MONO (TABULAR-NUMS)</span>
                    <span>LEDGERS, DIE-LINES, GANTT SPRINT TIMELINES & VAT INVOICES</span>
                  </div>
                  <div className="font-mono-num text-xs sm:text-sm text-[#1C1917] bg-[#F4EFEA] p-4 border border-[#E5DFD5] grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[#78716C] block">KERNING:</span>
                      <span>OPTICAL 100%</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">X-HEIGHT:</span>
                      <span>538 UNITS</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">GRID ANCHOR:</span>
                      <span>8PT BASELINE</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">OPENTYPE:</span>
                      <span>LIGATURES: ON</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PANTONE & CHROMATIC CHEMISTRY */}
        {activeTab === 'chroma' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#78716C]">
              <span>Click any card below to copy certified print formulas to your clipboard</span>
              <span className="font-mono-num">Fogra39 / Fogra51 Certified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SWATCH_LIBRARY.map((swatch) => {
                const isCopied = copiedHex === swatch.hex;
                return (
                  <div
                    key={swatch.hex}
                    onClick={() => handleCopy(swatch.hex)}
                    className="bg-[#FBF9F5] border border-[#D6CEBE] hover:border-[#1C1917] transition-all p-4 space-y-4 cursor-pointer group"
                  >
                    {/* Color Swatch Box */}
                    <div
                      style={{ backgroundColor: swatch.hex }}
                      className="w-full h-28 border border-[#1C1917]/10 flex items-end p-2 justify-between"
                    >
                      <span
                        className={`text-[10px] font-mono-num font-bold px-1.5 py-0.5 ${
                          swatch.isLight
                            ? 'bg-[#1C1917] text-[#FBF9F5]'
                            : 'bg-[#FBF9F5] text-[#1C1917]'
                        }`}
                      >
                        {swatch.hex}
                      </span>
                      {isCopied && (
                        <span className="bg-[#15803D] text-[#FBF9F5] text-[10px] font-mono-num px-1.5 py-0.5 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="font-semibold text-[#1C1917] leading-tight">{swatch.name}</div>
                      <div className="text-[11px] font-mono-num text-[#C2410C]">{swatch.pms}</div>
                      <div className="text-[10px] text-[#78716C] font-mono-num space-y-0.5 pt-1 border-t border-[#E5DFD5]">
                        <div>CMYK: {swatch.cmyk}</div>
                        <div>RGB: {swatch.rgb}</div>
                      </div>
                      <div className="text-[10px] text-[#44403C] leading-snug pt-1">
                        {swatch.usage}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: GRID & BEZIER GEOMETRY */}
        {activeTab === 'grid' && (
          <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DFD5] pb-4">
              <div>
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Swiss 12-Column Grid & Golden Spiral Geometry
                </h3>
                <p className="text-xs text-[#78716C]">
                  Toggle the geometric guidelines below to inspect the mathematical scaffolding behind our brand architectures.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGridLines(!showGridLines)}
                  className={`min-h-[40px] px-3.5 py-1.5 text-xs font-mono-num border transition-colors cursor-pointer ${
                    showGridLines
                      ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                      : 'bg-[#F4EFEA] text-[#57534E] border-[#D6CEBE]'
                  }`}
                >
                  {showGridLines ? 'Grid Lines: VISIBLE' : 'Grid Lines: HIDDEN'}
                </button>
              </div>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative w-full h-72 md:h-80 bg-[#F4EFEA] border border-[#D6CEBE] overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 300" className="w-full h-full text-[#1C1917]" aria-label="Interactive Swiss Grid Canvas">
                <defs>
                  <pattern id="brandlab-subgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2DCD0" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="300" fill="url(#brandlab-subgrid)" />

                {/* 12-Column Swiss Overlays */}
                {showGridLines && (
                  <g stroke="#C2410C" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.65">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <line key={i} x1={50 + i * 41.6} y1={20} x2={50 + i * 41.6} y2={280} />
                    ))}
                    <line x1={30} y1={150} x2={570} y2={150} />
                    <circle cx={300} cy={150} r={105} fill="none" stroke="#B45309" strokeWidth="0.8" />
                    <circle cx={300} cy={150} r={65} fill="none" stroke="#B45309" strokeWidth="0.8" />
                  </g>
                )}

                {/* Central Emblem Monogram */}
                <path
                  d="M300 60 L380 220 L340 220 L300 140 L260 220 L220 220 Z"
                  fill="#1C1917"
                />
                <circle cx={300} cy={195} r="14" fill="#C2410C" />

                {/* Bezier Extreme Nodes */}
                {showGridLines && (
                  <g fill="#FBF9F5" stroke="#C2410C" strokeWidth="1.5">
                    <rect x="296" y="56" width="8" height="8" />
                    <rect x="376" y="216" width="8" height="8" />
                    <rect x="216" y="216" width="8" height="8" />
                    <rect x="296" y="136" width="8" height="8" />
                  </g>
                )}

                <text x="50" y="40" className="text-[10px] font-mono fill-[#78716C]">
                  COL 01/12 · 41.66MM MODULE
                </text>
                <text x="440" y="275" className="text-[10px] font-mono fill-[#C2410C]">
                  RADIAL PHI: 1.618
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
