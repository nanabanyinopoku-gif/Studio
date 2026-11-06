import React from 'react';
import { ServicePillar } from '../data/servicesData';

interface ServiceSchematicPlateProps {
  serviceId: ServicePillar['id'];
  className?: string;
}

export const ServiceSchematicPlate: React.FC<ServiceSchematicPlateProps> = ({ serviceId, className = '' }) => {
  switch (serviceId) {
    case 'logo-design':
      return (
        <div className={`relative overflow-hidden bg-[#F4EFEA] border border-[#E5DFD5] p-6 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 200" className="w-full h-full max-h-48 text-[#1C1917]" aria-label="Logo Geometric Construction Grid">
            {/* Fine Swiss Grid Lines */}
            <defs>
              <pattern id="swiss-grid-logo" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2DCD0" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="360" height="200" fill="url(#swiss-grid-logo)" />
            {/* Construction Circles & Golden Ratio Guides */}
            <circle cx="180" cy="100" r="72" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="180" cy="100" r="44.5" fill="none" stroke="#C2410C" strokeWidth="0.85" strokeDasharray="2 2" />
            <circle cx="152" cy="100" r="27.5" fill="none" stroke="#A8A29E" strokeWidth="0.75" />
            <circle cx="208" cy="100" r="27.5" fill="none" stroke="#A8A29E" strokeWidth="0.75" />
            <line x1="60" y1="100" x2="300" y2="100" stroke="#A8A29E" strokeWidth="0.75" />
            <line x1="180" y1="16" x2="180" y2="184" stroke="#A8A29E" strokeWidth="0.75" />
            <line x1="115" y1="165" x2="245" y2="35" stroke="#C2410C" strokeWidth="0.75" />
            {/* Primary Geometric Apex Symbol */}
            <path
              d="M180 36 L236 148 L208 148 L180 92 L152 148 L124 148 Z"
              fill="#1C1917"
            />
            <circle cx="180" cy="128" r="9" fill="#C2410C" />
            {/* Bezier Anchor Nodes */}
            <rect x="177" y="33" width="6" height="6" fill="#FBF9F5" stroke="#C2410C" strokeWidth="1.5" />
            <rect x="233" y="145" width="6" height="6" fill="#FBF9F5" stroke="#C2410C" strokeWidth="1.5" />
            <rect x="121" y="145" width="6" height="6" fill="#FBF9F5" stroke="#C2410C" strokeWidth="1.5" />
            {/* Technical Callouts */}
            <text x="14" y="24" className="text-[9px] font-mono fill-[#78716C]">FIG. 01 // φ = 1.61803</text>
            <text x="262" y="186" className="text-[9px] font-mono fill-[#C2410C]">INK TRAP: 15.0°</text>
          </svg>
        </div>
      );

    case 'corporate-identity':
      return (
        <div className={`relative overflow-hidden bg-[#F4EFEA] border border-[#E5DFD5] p-6 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 200" className="w-full h-full max-h-48 text-[#1C1917]" aria-label="Corporate Identity System Spec">
            {/* Editorial Spread Layout */}
            <rect x="24" y="20" width="148" height="160" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.2" />
            <rect x="172" y="20" width="148" height="160" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.2" />
            {/* Left Page: Typography Scale */}
            <text x="38" y="56" className="text-[28px] font-serif fill-[#1C1917]">Aa</text>
            <line x1="38" y1="68" x2="154" y2="68" stroke="#E5DFD5" strokeWidth="1" />
            <rect x="38" y="80" width="84" height="5" fill="#1C1917" />
            <rect x="38" y="92" width="110" height="3" fill="#78716C" />
            <rect x="38" y="100" width="102" height="3" fill="#78716C" />
            <rect x="38" y="108" width="90" height="3" fill="#78716C" />
            <text x="38" y="158" className="text-[8px] font-mono fill-[#78716C]">GRID: 12-COL SWISS</text>
            {/* Right Page: Pantone Swatch Architecture */}
            <rect x="188" y="36" width="34" height="52" fill="#1C1917" />
            <rect x="228" y="36" width="34" height="52" fill="#C2410C" />
            <rect x="268" y="36" width="34" height="52" fill="#D6CEBE" stroke="#1C1917" strokeWidth="0.5" />
            <text x="188" y="102" className="text-[7px] font-mono fill-[#57534E]">INK 900</text>
            <text x="228" y="102" className="text-[7px] font-mono fill-[#C2410C]">PMS 173C</text>
            <text x="268" y="102" className="text-[7px] font-mono fill-[#57534E]">WARM 200</text>
            {/* Baseline Grid Lines */}
            <line x1="188" y1="122" x2="302" y2="122" stroke="#1C1917" strokeWidth="0.75" />
            <line x1="188" y1="138" x2="302" y2="138" stroke="#E5DFD5" strokeWidth="0.75" />
            <line x1="188" y1="154" x2="265" y2="154" stroke="#E5DFD5" strokeWidth="0.75" />
            <text x="242" y="168" className="text-[8px] font-mono fill-[#1C1917]">60 · 30 · 10 RATIO</text>
          </svg>
        </div>
      );

    case 'ui-ux-design':
      return (
        <div className={`relative overflow-hidden bg-[#F4EFEA] border border-[#E5DFD5] p-6 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 200" className="w-full h-full max-h-48 text-[#1C1917]" aria-label="UI/UX Design System Architecture">
            {/* Wireframe Window */}
            <rect x="28" y="18" width="304" height="164" rx="4" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.2" />
            <line x1="28" y1="42" x2="332" y2="42" stroke="#1C1917" strokeWidth="1" />
            <circle cx="44" cy="30" r="3" fill="#1C1917" />
            <circle cx="56" cy="30" r="3" fill="#A8A29E" />
            <text x="234" y="33" className="text-[8px] font-mono fill-[#78716C]">1440PX VIEWPORT</text>
            {/* Tokenized Component Grid */}
            <rect x="44" y="56" width="84" height="110" fill="#F4EFEA" stroke="#D6CEBE" strokeWidth="1" />
            <rect x="54" y="68" width="48" height="6" fill="#1C1917" />
            <rect x="54" y="82" width="64" height="4" fill="#A8A29E" />
            <rect x="54" y="92" width="56" height="4" fill="#A8A29E" />
            <rect x="54" y="140" width="64" height="14" rx="2" fill="#C2410C" />
            {/* Right Interactive Panel */}
            <rect x="142" y="56" width="174" height="50" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1" />
            <path d="M156 92 L182 74 L210 84 L248 64 L282 72 L302 60" fill="none" stroke="#C2410C" strokeWidth="1.75" />
            <rect x="142" y="116" width="82" height="50" fill="#F4EFEA" stroke="#D6CEBE" strokeWidth="1" />
            <rect x="234" y="116" width="82" height="50" fill="#1C1917" />
            <text x="246" y="145" className="text-[9px] font-mono fill-[#FBF9F5]">AA 14.8:1</text>
          </svg>
        </div>
      );

    case 'illustration':
      return (
        <div className={`relative overflow-hidden bg-[#F4EFEA] border border-[#E5DFD5] p-6 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 200" className="w-full h-full max-h-48 text-[#1C1917]" aria-label="Isometric Vector & Icon Keyline Grid">
            {/* 24px Keyline Box Left */}
            <rect x="34" y="30" width="130" height="130" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.2" />
            <line x1="34" y1="30" x2="164" y2="160" stroke="#D6CEBE" strokeWidth="0.75" />
            <line x1="164" y1="30" x2="34" y2="160" stroke="#D6CEBE" strokeWidth="0.75" />
            <circle cx="99" cy="95" r="46" fill="none" stroke="#C2410C" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="99,55 136,118 62,118" fill="none" stroke="#1C1917" strokeWidth="1.75" />
            {/* Isometric Projection Right */}
            <g transform="translate(250, 98)">
              <polygon points="0,-54 52,-26 0,2 -52,-26" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.25" />
              <polygon points="-52,-26 0,2 0,58 -52,30" fill="#E7E2D8" stroke="#1C1917" strokeWidth="1.25" />
              <polygon points="0,2 52,-26 52,30 0,58" fill="#1C1917" stroke="#1C1917" strokeWidth="1.25" />
              <line x1="0" y1="-68" x2="0" y2="72" stroke="#C2410C" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>
            <text x="34" y="178" className="text-[8px] font-mono fill-[#78716C]">KEYLINE: 24×24PX // 1.5PT</text>
            <text x="208" y="178" className="text-[8px] font-mono fill-[#C2410C]">ISO PROJECTION: 30.0°</text>
          </svg>
        </div>
      );

    case 'marketing-collateral':
      return (
        <div className={`relative overflow-hidden bg-[#F4EFEA] border border-[#E5DFD5] p-6 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 200" className="w-full h-full max-h-48 text-[#1C1917]" aria-label="Packaging Die-Line & Print Architecture">
            {/* Structural Packaging CAD Die-line */}
            <rect x="115" y="42" width="90" height="116" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.25" />
            <rect x="45" y="42" width="70" height="116" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.25" />
            <rect x="205" y="42" width="70" height="116" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1.25" />
            {/* Top & Bottom Tuck Flaps */}
            <path d="M115 42 L125 16 L195 16 L205 42" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1" />
            <path d="M115 158 L125 184 L195 184 L205 158" fill="#FBF9F5" stroke="#1C1917" strokeWidth="1" />
            {/* Glue Flap */}
            <path d="M275 42 L298 54 L298 146 L275 158" fill="none" stroke="#1C1917" strokeWidth="1" />
            {/* Red/Orange Crease Fold Lines */}
            <line x1="115" y1="42" x2="205" y2="42" stroke="#C2410C" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="115" y1="158" x2="205" y2="158" stroke="#C2410C" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="115" y1="42" x2="115" y2="158" stroke="#C2410C" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="205" y1="42" x2="205" y2="158" stroke="#C2410C" strokeWidth="1.2" strokeDasharray="4 2" />
            {/* Front Panel Typography Preview */}
            <text x="132" y="88" className="text-[11px] font-serif fill-[#1C1917]">APEX</text>
            <rect x="132" y="96" width="54" height="2" fill="#C2410C" />
            <text x="132" y="138" className="text-[7px] font-mono fill-[#78716C]">PDF/X-4 · 3MM BLEED</text>
          </svg>
        </div>
      );
  }
};
