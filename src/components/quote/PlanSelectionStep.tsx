'use client';

import { useState, useMemo } from 'react';
import { useQuoteStore } from '@/store/quote-store';
import { TIER_ORDER, formatCurrency } from '@/lib/constants';
import type { CoverageRate, CoverageTerm } from '@/lib/types';
import PlanCard from './PlanCard';
import VehicleDiagram from './VehicleDiagram';
import { ArrowLeft } from 'lucide-react';

function getTierLevel(description: string): 1 | 2 | 3 | 4 {
  const lower = description.toLowerCase();
  if (lower.includes('exclusive')) return 4;
  if (lower.includes('premium')) return 3;
  if (lower.includes('essential plus')) return 2;
  return 1;
}

function getTierName(description: string): string {
  for (const tier of [...TIER_ORDER].reverse()) {
    if (description.toLowerCase().includes(tier.toLowerCase())) return tier;
  }
  return description;
}

function getDefaultTermIndex(terms: CoverageTerm[]): number {
  const preferred = terms.findIndex(
    (t) => t.termMonths === 36 && t.termOdometer === 45000
  );
  return preferred >= 0 ? preferred : 0;
}

function getFeatures(tierName: string): string[] {
  switch (tierName) {
    case 'Essential':
      return [
        'Engine Coverage',
        'Transmission / Transaxle',
        'Transfer Case / AWD',
      ];
    case 'Essential Plus':
      return [
        'Everything in Essential',
        'CV Joints & Water Pump',
        'Fuel System & Oil Pump',
        'Electrical Components',
        'Factory Turbo / Supercharger',
        'A/C Compressor',
        'Seals & Gaskets',
      ];
    case 'Premium':
      return [
        'Everything in Essential Plus',
        'Cooling System',
        'Brake System',
        'Steering Components',
        'Fluids & Lubricants',
      ];
    case 'Exclusive':
      return [
        'All Components Covered',
        'Exclusion-Based (Most Comprehensive)',
        'High-Tech Electronics',
        'Navigation & Infotainment',
        'Advanced Driver Assist Systems',
      ];
    default:
      return ['Coverage Included'];
  }
}

export default function PlanSelectionStep() {
  const { availableRates, currentVehicleIndex, vehicles, setPendingTier, setStep } =
    useQuoteStore();

  // Per-tier state: selected term index
  const [selectedTermByTier, setSelectedTermByTier] = useState<Record<string, number>>({});
  // Which tier is highlighted (user-clicked); null = use recommended tier (Exclusive)
  const [highlightedTier, setHighlightedTier] = useState<string | null>(null);
  // Which tier is being hovered for the diagram
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  // Sort rates by TIER_ORDER
  const sortedRates = useMemo(() => {
    const rates = [...availableRates];
    rates.sort((a, b) => {
      const aIdx = TIER_ORDER.findIndex((t) =>
        a.description.toLowerCase().includes(t.toLowerCase())
      );
      const bIdx = TIER_ORDER.findIndex((t) =>
        b.description.toLowerCase().includes(t.toLowerCase())
      );
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    });
    return rates;
  }, [availableRates]);

  function getTermIndex(rate: CoverageRate): number {
    const tierName = getTierName(rate.description);
    if (selectedTermByTier[tierName] !== undefined) {
      return selectedTermByTier[tierName];
    }
    return getDefaultTermIndex(rate.terms);
  }

  function handleSelect(rate: CoverageRate) {
    const termIdx = getTermIndex(rate);

    // Store pending tier selection and advance to options step
    setPendingTier(rate.code, termIdx);
    setStep('options-addons');
  }

  // Recommended tier: Exclusive if available, else highest
  const recommendedTier = useMemo(() => {
    const names = sortedRates.map((r) => getTierName(r.description));
    if (names.includes('Exclusive')) return 'Exclusive';
    if (names.includes('Premium')) return 'Premium';
    return names[names.length - 1] ?? '';
  }, [sortedRates]);

  // Determine which tier level to show in the diagram
  const diagramTierLevel: 1 | 2 | 3 | 4 = useMemo(() => {
    const activeTier = hoveredTier ?? highlightedTier ?? recommendedTier;
    const rate = sortedRates.find((r) => getTierName(r.description) === activeTier);
    return rate ? getTierLevel(rate.description) : 4;
  }, [hoveredTier, highlightedTier, recommendedTier, sortedRates]);

  if (sortedRates.length === 0) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <p className="text-navy-600">No coverage plans available for this vehicle.</p>
          <button
            onClick={() => setStep('vehicle-info')}
            className="mt-4 rounded-lg bg-action px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-action-hover"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep('vehicle-info')}
          className="flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-accent transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="text-right">
          <h2 className="text-xl font-bold font-display text-navy-900">Choose Your Protection Plan</h2>
          {vehicles[currentVehicleIndex]?.vehicle && (
            <p className="text-sm text-navy-500">
              {vehicles[currentVehicleIndex].vehicle!.vehicleYear}{' '}
              {vehicles[currentVehicleIndex].vehicle!.make}{' '}
              {vehicles[currentVehicleIndex].vehicle!.model}
            </p>
          )}
        </div>
      </div>

      {/* Vehicle Diagram — shows coverage for hovered/selected tier */}
      <div className="rounded-2xl bg-white p-4 shadow-md border border-navy-100 transition-all">
        <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2 text-center">
          Coverage Overview — {hoveredTier ?? highlightedTier ?? recommendedTier}
        </p>
        <VehicleDiagram tierLevel={diagramTierLevel} />
      </div>

      {/* Plan Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {sortedRates.map((rate) => {
          const tierName = getTierName(rate.description);
          const tierLevel = getTierLevel(rate.description);
          const termIdx = getTermIndex(rate);
          const term = rate.terms[termIdx];
          const isHighlighted = tierName === (highlightedTier ?? recommendedTier);

          return (
            <div
              key={rate.code}
              className="flex flex-col gap-3 h-full"
              onMouseEnter={() => setHoveredTier(tierName)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              <PlanCard
                name={tierName}
                price={term.dealerCost}
                frequency="one-time"
                features={getFeatures(tierName)}
                isRecommended={isHighlighted}
                showBestValueBadge={tierName === recommendedTier}
                tierLevel={tierLevel}
                onSelect={() => handleSelect(rate)}
                onTierClick={() => setHighlightedTier(tierName)}
              />

              {/* Term Selector */}
              <div className="rounded-xl bg-white p-3 shadow-sm border border-navy-100">
                <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
                  Term Length
                </label>
                <select
                  value={termIdx}
                  onChange={(e) =>
                    setSelectedTermByTier((prev) => ({
                      ...prev,
                      [tierName]: parseInt(e.target.value, 10),
                    }))
                  }
                  className="w-full rounded-lg border border-navy-100 bg-navy-50 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                >
                  {rate.terms.map((t, i) => (
                    <option key={i} value={i}>
                      {t.termMonths}mo / {t.termOdometer.toLocaleString()}mi &mdash;{' '}
                      {formatCurrency(t.dealerCost)}
                    </option>
                  ))}
                </select>

                {/* Deductible Display */}
                <p className="mt-1.5 text-xs text-navy-500">
                  Deductible: {formatCurrency(term.deductible.amount)} ({term.deductible.type})
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
