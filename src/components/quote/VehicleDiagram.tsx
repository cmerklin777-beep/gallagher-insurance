'use client';

import Image from 'next/image';

/**
 * Vehicle coverage diagram: professional raster illustration with
 * an HTML component grid showing tier-based coverage.
 * Tier 1 = Essential, 2 = Essential Plus, 3 = Premium, 4 = Exclusive
 */

interface VehicleDiagramProps {
  tierLevel: 1 | 2 | 3 | 4;
}

interface ComponentDef {
  key: string;
  label: string;
  minTier: number;
}

const COMPONENTS: ComponentDef[] = [
  // Tier 1 — Essential
  { key: 'engine',        label: 'Engine',                     minTier: 1 },
  { key: 'transmission',  label: 'Transmission',               minTier: 1 },
  { key: 'transfer_case', label: 'Transfer Case / AWD',        minTier: 1 },
  // Tier 2 — Essential Plus
  { key: 'turbo',         label: 'Turbo / Supercharger',       minTier: 2 },
  { key: 'ac',            label: 'A/C Compressor',             minTier: 2 },
  { key: 'cv_joints',     label: 'CV Joints',                  minTier: 2 },
  { key: 'electrical',    label: 'Electrical System',          minTier: 2 },
  { key: 'fuel_system',   label: 'Fuel System',                minTier: 2 },
  { key: 'seals',         label: 'Seals & Gaskets',            minTier: 2 },
  // Tier 3 — Premium
  { key: 'cooling',       label: 'Cooling System',             minTier: 3 },
  { key: 'brakes',        label: 'Brake System',               minTier: 3 },
  { key: 'steering',      label: 'Steering',                   minTier: 3 },
  // Tier 4 — Exclusive
  { key: 'hi_tech',       label: 'Hi-Tech Electronics',        minTier: 4 },
  { key: 'navigation',    label: 'Navigation / Infotainment',  minTier: 4 },
  { key: 'adas',          label: 'ADAS / Driver Assist',       minTier: 4 },
];

const TIER_LABELS: Record<number, string> = {
  1: 'Essential',
  2: 'Essential Plus',
  3: 'Premium',
  4: 'Exclusive',
};

export default function VehicleDiagram({ tierLevel }: VehicleDiagramProps) {
  const coveredCount = COMPONENTS.filter(c => tierLevel >= c.minTier).length;

  return (
    <div className="space-y-4">
      {/* Professional vehicle illustration */}
      <div className="relative rounded-lg overflow-hidden bg-white">
        <Image
          src="/images/vehicle-components-diagram.jpg"
          alt="Exploded vehicle diagram showing covered components"
          width={800}
          height={500}
          className="w-full h-auto"
          priority
        />
        {/* Subtle overlay when not all components are covered */}
        {tierLevel < 4 && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 pointer-events-none" />
        )}
      </div>

      {/* Component coverage grid */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {COMPONENTS.map((comp) => {
          const covered = tierLevel >= comp.minTier;
          return (
            <div
              key={comp.key}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] sm:text-xs font-medium transition-all duration-200 ${
                covered
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-navy-50 text-navy-300 border border-transparent'
              }`}
            >
              <div
                className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-200 ${
                  covered ? 'bg-accent' : 'bg-navy-200'
                }`}
              />
              {comp.label}
            </div>
          );
        })}
      </div>

      {/* Coverage counter */}
      <p className="text-center text-xs text-navy-400">
        <span className="font-semibold text-accent">{coveredCount}</span> of {COMPONENTS.length} component groups covered with{' '}
        <span className="font-semibold text-navy-600">{TIER_LABELS[tierLevel]}</span>
      </p>
    </div>
  );
}
