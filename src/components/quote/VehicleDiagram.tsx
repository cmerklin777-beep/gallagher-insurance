'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Interactive exploded-view vehicle diagram with coverage hotspot pins.
 * Pins are color-coded by coverage status based on the selected tier.
 * Tier 1 = Essential, 2 = Essential Plus, 3 = Premium, 4 = Exclusive
 */

interface VehicleDiagramProps {
  tierLevel: 1 | 2 | 3 | 4;
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
  // Tier 1 — Essential  (pin x/y = % position on the exploded-view image)
  { id: 'engine', label: 'Engine', x: 16, y: 53, minTier: 1, desc: 'All internally lubricated engine components including pistons, crankshaft, camshaft, cylinder heads, and timing components.' },
  { id: 'transmission', label: 'Transmission', x: 24, y: 55, minTier: 1, desc: 'Automatic transmission assembly including torque converter, valve body, clutch packs, solenoid pack, and TCM.' },
  { id: 'transfer_case', label: 'Transfer Case / AWD', x: 86, y: 72, minTier: 1, desc: 'Transfer case assembly, front and rear differentials, and AWD/4WD engagement components.' },
  // Tier 2 — Essential Plus
  { id: 'turbo', label: 'Turbo / Supercharger', x: 16, y: 13, minTier: 2, desc: 'Turbocharger or supercharger assembly including housing, shaft, bearings, and wastegate actuator.' },
  { id: 'ac', label: 'A/C Compressor', x: 92, y: 15, minTier: 2, desc: 'A/C compressor and clutch, condenser, evaporator core, expansion valve, and receiver/drier.' },
  { id: 'cv_joints', label: 'CV Joints', x: 30, y: 79, minTier: 2, desc: 'Front and rear CV axle shafts, CV joints, and drive shaft assemblies.' },
  { id: 'electrical', label: 'Electrical System', x: 72, y: 37, minTier: 2, desc: 'Alternator, starter motor, wiring harness, fuse box, and relay assemblies.' },
  { id: 'fuel_system', label: 'Fuel System', x: 58, y: 60, minTier: 2, desc: 'Fuel pump, high-pressure fuel pump, injectors, fuel pressure regulator, and tank sending unit.' },
  { id: 'seals', label: 'Seals & Gaskets', x: 17, y: 28, minTier: 2, desc: 'All internal seals and gaskets required as part of a covered repair.' },
  // Tier 3 — Premium
  { id: 'cooling', label: 'Cooling System', x: 5, y: 42, minTier: 3, desc: 'Radiator, water pump, thermostat, intercooler, coolant reservoir, and all associated cooling circuit components.' },
  { id: 'brakes', label: 'Brake System', x: 30, y: 69, minTier: 3, desc: 'Brake calipers, master cylinder, brake lines and hoses, and ABS actuator. Pads and rotors are maintenance exclusions.' },
  { id: 'steering', label: 'Steering', x: 33, y: 52, minTier: 3, desc: 'Rack and pinion assembly, power steering pump, electric power steering motor, column, and tie rod ends.' },
  // Tier 4 — Exclusive
  { id: 'hi_tech', label: 'Hi-Tech Electronics', x: 38, y: 42, minTier: 4, desc: 'ECM/PCM, body control module, ABS module, and SRS modules. Hardware failure covered.' },
  { id: 'navigation', label: 'Navigation / Infotainment', x: 48, y: 32, minTier: 4, desc: 'Navigation head unit, display, infotainment system, and connectivity modules.' },
  { id: 'adas', label: 'ADAS / Driver Assist', x: 30, y: 22, minTier: 4, desc: 'Radar modules, camera arrays, blind-spot sensors, and lane departure hardware.' },
];

const TIER_LABELS: Record<number, string> = {
  1: 'Essential',
  2: 'Essential Plus',
  3: 'Premium',
  4: 'Exclusive',
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

      {/* Exploded vehicle image with hotspot pins */}
      <div className="relative rounded-lg overflow-hidden bg-white">
        <Image
          src="/images/vehicle-exploded.jpg"
          alt="Exploded vehicle diagram showing covered components"
          width={1200}
          height={750}
          className="w-full h-auto select-none"
          draggable={false}
          priority
        />

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

              {/* Pin dot */}
              <div
                className="rounded-full transition-all duration-150"
                style={{
                  width: isActive ? 18 : 13,
                  height: isActive ? 18 : 13,
                  backgroundColor: covered ? 'var(--color-accent)' : '#cbd5e1',
                  border: `2.5px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.85)'}`,
                  boxShadow: isActive
                    ? `0 0 0 4px ${covered ? 'rgba(0,122,51,0.25)' : 'rgba(148,163,184,0.25)'}, 0 2px 8px rgba(0,0,0,0.25)`
                    : '0 1px 4px rgba(0,0,0,0.25)',
                }}
              />
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
