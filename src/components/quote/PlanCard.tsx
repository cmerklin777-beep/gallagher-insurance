'use client';

import { Check, X } from 'lucide-react';

interface PlanCardProps {
  name: string;
  price: number;
  frequency: string;
  features: string[];
  isRecommended?: boolean;
  /** Show "Best Value" badge (e.g. only on Premium tier) */
  showBestValueBadge?: boolean;
  tierLevel: 1 | 2 | 3;
  onSelect: () => void;
  /** Called when the user clicks the card to focus/highlight it */
  onTierClick?: () => void;
}

const EXCLUDED_BY_TIER: Record<number, string[]> = {
  1: ['HVAC System', 'Plumbing System', 'Electrical System'],
  2: ['Appliance Coverage', 'Garage Door Opener'],
  3: [],
};

const TIER_STARS: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
};

export default function PlanCard({
  name,
  price,
  frequency,
  features,
  isRecommended = false,
  showBestValueBadge = false,
  tierLevel,
  onSelect,
  onTierClick,
}: PlanCardProps) {
  const excluded = EXCLUDED_BY_TIER[tierLevel] ?? [];
  const stars = TIER_STARS[tierLevel] ?? 1;

  return (
    <div
      className={`relative flex flex-1 flex-col min-h-0 rounded-2xl transition-all duration-200 ${
        isRecommended
          ? 'scale-105 border-2 border-accent bg-white shadow-xl ring-1 ring-accent/10'
          : 'border border-navy-100 bg-navy-50 shadow-md hover:shadow-lg'
      } ${onTierClick ? 'cursor-pointer' : ''}`}
      onClick={onTierClick}
      role={onTierClick ? 'button' : undefined}
      tabIndex={onTierClick ? 0 : undefined}
      onKeyDown={onTierClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTierClick(); } } : undefined}
    >
      {/* Recommended Badge */}
      {showBestValueBadge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            Recommended
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < stars ? 'text-accent' : 'text-navy-100'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h3 className="text-lg font-bold text-navy-900">{name}</h3>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-navy-900">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-navy-500">{frequency}</span>
          </div>
        </div>

        {/* Included Features */}
        <ul className="mb-4 flex-1 space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              <span className="text-sm text-navy-700">{feature}</span>
            </li>
          ))}

          {/* Excluded items */}
          {excluded.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-navy-100" />
              <span className="text-sm text-navy-500 line-through">{item}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition hover:scale-[1.02] active:scale-100 ${
            isRecommended
              ? 'bg-action text-navy-950 shadow-lg shadow-action/20 hover:bg-action-hover'
              : 'bg-navy-800 text-white hover:bg-navy-700'
          }`}
        >
          Select This Plan
        </button>

        {/* Footer Disclaimer */}
        <p className="mt-3 text-center text-[11px] text-navy-500">
          *See Terms for full Service Contract details.
        </p>
      </div>
    </div>
  );
}
