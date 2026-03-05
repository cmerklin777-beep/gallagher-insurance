'use client';

import { useState } from 'react';

/**
 * Interactive home diagram with coverage hotspot pins.
 * Pins are color-coded by coverage status based on the selected tier.
 * Tier 1 = Appliance, 2 = Systems, 3 = Total
 */

interface VehicleDiagramProps {
  tierLevel: 1 | 2 | 3;
}

interface PartDef {
  id: string;
  label: string;
  x: number;
  y: number;
  minTier: number;
  desc: string;
}

const PARTS: PartDef[] = [
  // Tier 1 — Appliance  (pin x/y = % position on the house illustration)
  { id: 'refrigerator', label: 'Refrigerator', x: 68, y: 62, minTier: 1, desc: 'Refrigerator and freezer including compressor, thermostat, ice maker, and internal components.' },
  { id: 'oven', label: 'Oven / Range / Cooktop', x: 55, y: 64, minTier: 1, desc: 'Oven, range, or cooktop including burners, igniters, heating elements, thermostats, and internal components.' },
  { id: 'dishwasher', label: 'Dishwasher', x: 78, y: 66, minTier: 1, desc: 'Dishwasher including pump, motor, spray arms, timer, and electronic controls.' },
  { id: 'microwave', label: 'Built-In Microwave', x: 55, y: 52, minTier: 1, desc: 'Built-in microwave including magnetron, turntable motor, door switches, and control panel.' },
  { id: 'washer_dryer', label: 'Washer & Dryer', x: 82, y: 80, minTier: 1, desc: 'Clothes washer and dryer including motors, pumps, timers, belts, and heating elements.' },
  { id: 'disposal', label: 'Garbage Disposal', x: 65, y: 74, minTier: 1, desc: 'Garbage disposal unit including motor, grinding mechanism, and internal components.' },
  // Tier 2 — Systems
  { id: 'hvac', label: 'HVAC System', x: 50, y: 22, minTier: 2, desc: 'Central heating and air conditioning including furnace, compressor, condenser, evaporator coil, and blower motor.' },
  { id: 'electrical', label: 'Electrical System', x: 25, y: 45, minTier: 2, desc: 'Interior electrical system including wiring, outlets, switches, circuit breakers, and junction boxes.' },
  { id: 'plumbing', label: 'Plumbing System', x: 35, y: 70, minTier: 2, desc: 'Interior plumbing including supply lines, drain lines, faucets, valves, and toilet components.' },
  { id: 'water_heater', label: 'Water Heater', x: 20, y: 78, minTier: 2, desc: 'Water heater including tank, heating elements, thermostat, pressure relief valve, and gas valve.' },
  { id: 'ductwork', label: 'Ductwork', x: 40, y: 30, minTier: 2, desc: 'Ductwork including supply and return ducts, dampers, registers, and grilles.' },
  { id: 'exhaust_fans', label: 'Exhaust Fans', x: 72, y: 38, minTier: 2, desc: 'Kitchen and bathroom exhaust fans including motors, blades, and switches.' },
  // Tier 3 — Total (additional items beyond Appliance + Systems)
  { id: 'garage_door', label: 'Garage Door Opener', x: 12, y: 65, minTier: 3, desc: 'Garage door opener including motor, chain/belt drive, remote receiver, and safety sensors.' },
  { id: 'ceiling_fans', label: 'Ceiling Fans', x: 50, y: 42, minTier: 3, desc: 'Ceiling fans including motor, blades, pull chains, speed controls, and light kits.' },
  { id: 'doorbells', label: 'Doorbells', x: 15, y: 52, minTier: 3, desc: 'Doorbell systems including chimes, transformers, wired buttons, and wiring.' },
];

const TIER_LABELS: Record<number, string> = {
  1: 'Appliance',
  2: 'Systems',
  3: 'Total',
};

export default function VehicleDiagram({ tierLevel }: VehicleDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const activeId = selected || hovered;
  const activePart = selected ? PARTS.find((p) => p.id === selected) : null;
  const coveredCount = PARTS.filter((p) => tierLevel >= p.minTier).length;

  function isCovered(part: PartDef) {
    return tierLevel >= part.minTier;
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center justify-center gap-5 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="text-navy-600">Covered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-navy-200" />
          <span className="text-navy-600">Not Covered</span>
        </div>
      </div>

      {/* House illustration with hotspot pins */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-b from-sky-50 to-white" style={{ aspectRatio: '16/10' }}>
        {/* SVG House Illustration */}
        <svg viewBox="0 0 800 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Sky background */}
          <rect width="800" height="500" fill="url(#skyGrad)" />
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <rect x="0" y="400" width="800" height="100" fill="#d1fae5" rx="0" />
          <rect x="0" y="395" width="800" height="10" fill="#a7f3d0" rx="5" />

          {/* Driveway */}
          <rect x="50" y="400" width="120" height="100" fill="#d1d5db" rx="2" />

          {/* Main House Body */}
          <rect x="130" y="200" width="500" height="200" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" rx="4" />

          {/* Roof */}
          <polygon points="100,210 380,60 660,210" fill="#475569" stroke="#334155" strokeWidth="2" />
          {/* Roof trim */}
          <polygon points="120,210 380,75 640,210" fill="#64748b" stroke="none" />

          {/* Chimney */}
          <rect x="500" y="90" width="45" height="120" fill="#78716c" stroke="#57534e" strokeWidth="1.5" rx="2" />
          <rect x="495" y="85" width="55" height="12" fill="#57534e" rx="2" />

          {/* Garage */}
          <rect x="50" y="240" width="120" height="160" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" rx="4" />
          {/* Garage door */}
          <rect x="62" y="290" width="96" height="107" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" rx="3" />
          <line x1="62" y1="315" x2="158" y2="315" stroke="#94a3b8" strokeWidth="1" />
          <line x1="62" y1="340" x2="158" y2="340" stroke="#94a3b8" strokeWidth="1" />
          <line x1="62" y1="365" x2="158" y2="365" stroke="#94a3b8" strokeWidth="1" />
          {/* Garage door handle */}
          <rect x="102" y="370" width="16" height="4" fill="#64748b" rx="2" />

          {/* Front Door */}
          <rect x="330" y="280" width="60" height="118" fill="#0f145b" stroke="#1e1b4b" strokeWidth="2" rx="3" />
          {/* Door handle */}
          <circle cx="378" cy="345" r="4" fill="#fac142" />
          {/* Door window */}
          <rect x="342" y="292" width="36" height="30" fill="#bfdbfe" stroke="#1e1b4b" strokeWidth="1" rx="2" />

          {/* Windows - left side */}
          <rect x="185" y="250" width="80" height="65" fill="#bfdbfe" stroke="#94a3b8" strokeWidth="2" rx="3" />
          <line x1="225" y1="250" x2="225" y2="315" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="185" y1="282" x2="265" y2="282" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Windows - right side */}
          <rect x="445" y="250" width="80" height="65" fill="#bfdbfe" stroke="#94a3b8" strokeWidth="2" rx="3" />
          <line x1="485" y1="250" x2="485" y2="315" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="445" y1="282" x2="525" y2="282" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Upper window (attic/loft) */}
          <circle cx="380" cy="160" r="28" fill="#bfdbfe" stroke="#94a3b8" strokeWidth="2" />
          <line x1="380" y1="132" x2="380" y2="188" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="352" y1="160" x2="408" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Utility area / side of house */}
          <rect x="630" y="280" width="100" height="120" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" rx="4" />
          {/* Water heater */}
          <rect x="648" y="310" width="30" height="50" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" rx="3" />
          {/* AC unit */}
          <rect x="690" y="320" width="28" height="28" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
          <line x1="692" y1="334" x2="716" y2="334" stroke="#94a3b8" strokeWidth="0.5" />
          <line x1="692" y1="338" x2="716" y2="338" stroke="#94a3b8" strokeWidth="0.5" />

          {/* Doorbell circle */}
          <circle cx="322" cy="330" r="5" fill="#fac142" stroke="#94a3b8" strokeWidth="1" />

          {/* Stepping stones */}
          <ellipse cx="340" cy="420" rx="20" ry="8" fill="#d1d5db" />
          <ellipse cx="350" cy="450" rx="18" ry="7" fill="#d1d5db" />
          <ellipse cx="335" cy="475" rx="20" ry="8" fill="#d1d5db" />

          {/* Bushes */}
          <ellipse cx="175" cy="395" rx="30" ry="15" fill="#86efac" />
          <ellipse cx="540" cy="395" rx="25" ry="13" fill="#86efac" />
          <ellipse cx="580" cy="398" rx="20" ry="10" fill="#6ee7b7" />
        </svg>

        {/* Hotspot pins */}
        {PARTS.map((part) => {
          const covered = isCovered(part);
          const isActive = activeId === part.id;
          const isDimmed = activeId !== null && !isActive;

          return (
            <div
              key={part.id}
              className="absolute cursor-pointer"
              style={{
                left: `${part.x}%`,
                top: `${part.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 20 : 10,
                opacity: isDimmed ? 0.3 : 1,
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={() => setHovered(part.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected((prev) => (prev === part.id ? null : part.id))}
            >
              {/* Tooltip */}
              {isActive && (
                <div
                  className="absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg pointer-events-none"
                  style={{ backgroundColor: covered ? 'var(--color-accent)' : '#94a3b8' }}
                >
                  {part.label}
                  {/* Arrow */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0"
                    style={{
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `5px solid ${covered ? 'var(--color-accent)' : '#94a3b8'}`,
                    }}
                  />
                </div>
              )}

              {/* Checkmark / X icon */}
              <div
                className="flex items-center justify-center rounded-full transition-all duration-150"
                style={{
                  width: isActive ? 22 : 18,
                  height: isActive ? 22 : 18,
                  backgroundColor: covered ? 'var(--color-accent)' : '#94a3b8',
                  border: `2px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.9)'}`,
                  boxShadow: isActive
                    ? `0 0 0 4px ${covered ? 'rgba(0,122,51,0.25)' : 'rgba(148,163,184,0.25)'}, 0 2px 8px rgba(0,0,0,0.25)`
                    : '0 1px 4px rgba(0,0,0,0.25)',
                }}
              >
                {covered ? (
                  <svg width={isActive ? 12 : 10} height={isActive ? 12 : 10} viewBox="0 0 12 12" fill="none" className="text-white">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width={isActive ? 10 : 8} height={isActive ? 10 : 8} viewBox="0 0 10 10" fill="none" className="text-white">
                    <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected part detail card */}
      {activePart && (
        <div className="rounded-xl border border-navy-100 bg-white p-4 shadow-sm animate-fade-up">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-navy-900">{activePart.label}</h4>
              <div
                className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  isCovered(activePart)
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-navy-50 text-navy-400 border border-navy-200'
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    isCovered(activePart) ? 'bg-accent' : 'bg-navy-300'
                  }`}
                />
                {isCovered(activePart) ? 'Covered' : `Requires ${TIER_LABELS[activePart.minTier]}`}
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-navy-300 hover:text-navy-500 transition text-lg leading-none shrink-0"
            >
              &times;
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-navy-500">{activePart.desc}</p>
        </div>
      )}

      {/* Component coverage grid */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {PARTS.map((part) => {
          const covered = isCovered(part);
          const isActive = activeId === part.id;
          return (
            <div
              key={part.id}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] sm:text-xs font-medium cursor-pointer transition-all duration-200 ${
                isActive
                  ? covered
                    ? 'bg-accent/15 text-accent border border-accent/30 ring-1 ring-accent/20'
                    : 'bg-navy-100 text-navy-500 border border-navy-300 ring-1 ring-navy-200'
                  : covered
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-navy-50 text-navy-300 border border-transparent'
              }`}
              onMouseEnter={() => setHovered(part.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected((prev) => (prev === part.id ? null : part.id))}
            >
              <div
                className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-200 ${
                  covered ? 'bg-accent' : 'bg-navy-200'
                }`}
              />
              {part.label}
            </div>
          );
        })}
      </div>

      {/* Coverage counter */}
      <p className="text-center text-xs text-navy-400">
        <span className="font-semibold text-accent">{coveredCount}</span> of{' '}
        {PARTS.length} component groups covered with{' '}
        <span className="font-semibold text-navy-600">{TIER_LABELS[tierLevel]}</span>
      </p>
    </div>
  );
}
