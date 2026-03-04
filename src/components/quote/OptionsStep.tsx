'use client';

import { useState, useMemo } from 'react';
import { useQuoteStore } from '@/store/quote-store';
import { TIER_ORDER, formatCurrency } from '@/lib/constants';
import type { LossCode } from '@/lib/types';
import { ArrowLeft, Plus, Minus, ShieldCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';

function getTierName(description: string): string {
  for (const tier of [...TIER_ORDER].reverse()) {
    if (description.toLowerCase().includes(tier.toLowerCase())) return tier;
  }
  return description;
}

/** Brief human-friendly descriptions for common loss code / add-on names */
function getOptionDescription(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('roadside') || lower.includes('road')) {
    return 'Covers towing, flat tire change, jump starts, lockout service, and fuel delivery when you\'re stranded. Peace of mind wherever you drive.';
  }
  if (lower.includes('rental') || lower.includes('car rental')) {
    return 'Reimburses rental car costs while your vehicle is in the shop for a covered repair, so you stay on the road.';
  }
  if (lower.includes('gap') || lower.includes('loan')) {
    return 'Covers the difference between your vehicle\'s actual value and the remaining loan balance if your vehicle is totaled.';
  }
  if (lower.includes('tire') || lower.includes('wheel')) {
    return 'Protects against damage from road hazards like potholes, nails, and debris. Covers repair or replacement costs.';
  }
  if (lower.includes('key') || lower.includes('fob')) {
    return 'Covers replacement of lost, stolen, or damaged key fobs and smart keys — which can cost hundreds at the dealer.';
  }
  if (lower.includes('dent') || lower.includes('ding')) {
    return 'Covers paintless dent repair for minor dents and dings from parking lots, hail, and everyday mishaps.';
  }
  if (lower.includes('windshield') || lower.includes('glass')) {
    return 'Covers repair or replacement of your windshield and auto glass damaged by road debris or weather events.';
  }
  if (lower.includes('maintenance') || lower.includes('oil')) {
    return 'Covers routine maintenance items like oil changes, filter replacements, and fluid top-offs at scheduled intervals.';
  }
  if (lower.includes('surcharge') || lower.includes('diesel') || lower.includes('turbo')) {
    return 'Additional cost applied based on your vehicle\'s specific configuration (e.g., diesel engine, turbo, high-performance).';
  }
  if (lower.includes('hybrid') || lower.includes('electric')) {
    return 'Covers specialized hybrid or electric vehicle components including battery pack, inverter, and electric motor.';
  }
  if (lower.includes('seal') || lower.includes('gasket')) {
    return 'Covers replacement of seals and gaskets that prevent fluid leaks in the engine, transmission, and other systems.';
  }
  if (lower.includes('a/c') || lower.includes('air condition')) {
    return 'Covers the A/C compressor, condenser, evaporator, and related components to keep your cabin cool.';
  }
  if (lower.includes('paint') || lower.includes('appearance') || lower.includes('exterior')) {
    return 'Protects your vehicle\'s exterior finish against chips, scratches, fading, and environmental damage.';
  }
  if (lower.includes('interior') || lower.includes('upholstery') || lower.includes('fabric') || lower.includes('leather')) {
    return 'Covers interior surfaces including seats, carpet, and headliner against stains, tears, and wear.';
  }
  if (lower.includes('theft') || lower.includes('anti-theft') || lower.includes('stolen')) {
    return 'Provides theft-related benefits including deductible reimbursement and replacement assistance if your vehicle is stolen.';
  }
  if (lower.includes('electronics') || lower.includes('navigation') || lower.includes('infotainment')) {
    return 'Covers electronic components including navigation, infotainment, and display systems against hardware failure.';
  }
  if (lower.includes('commercial') || lower.includes('business')) {
    return 'Required surcharge for vehicles used for business or commercial purposes.';
  }
  if (lower.includes('high mileage') || lower.includes('mileage')) {
    return 'Surcharge applied based on your vehicle\'s current odometer reading.';
  }
  if (lower.includes('luxury') || lower.includes('premium vehicle')) {
    return 'Surcharge applied to luxury, high-performance, or specialty vehicles due to higher parts and labor costs.';
  }
  if (lower.includes('transfer') || lower.includes('case')) {
    return 'Covers the transfer case, differentials, and 4WD/AWD engagement components for drivetrain protection.';
  }
  if (lower.includes('brake') || lower.includes('braking')) {
    return 'Covers brake calipers, master cylinder, brake lines, hoses, and ABS actuator. Pads and rotors are maintenance items.';
  }
  if (lower.includes('cooling') || lower.includes('radiator') || lower.includes('water pump')) {
    return 'Covers the radiator, water pump, thermostat, and all cooling circuit components that prevent engine overheating.';
  }
  if (lower.includes('steer') || lower.includes('power steering')) {
    return 'Covers the rack and pinion, power steering pump, electric steering motor, and steering column components.';
  }
  if (lower.includes('fuel') || lower.includes('injection') || lower.includes('injector')) {
    return 'Covers the fuel pump, injectors, fuel pressure regulator, and tank sending unit for reliable fuel delivery.';
  }
  if (lower.includes('cv') || lower.includes('axle') || lower.includes('drive shaft')) {
    return 'Covers CV axle shafts, CV joints, and drive shaft assemblies that transfer power to your wheels.';
  }
  if (lower.includes('suspension') || lower.includes('shock') || lower.includes('strut')) {
    return 'Covers suspension components including shocks, struts, control arms, and ball joints for a smooth ride.';
  }
  if (lower.includes('engine') || lower.includes('motor')) {
    return 'Covers all internally lubricated engine components including pistons, crankshaft, camshaft, and cylinder heads.';
  }
  if (lower.includes('transmission') || lower.includes('transaxle')) {
    return 'Covers the full transmission assembly including torque converter, valve body, clutch packs, and solenoid pack.';
  }
  if (lower.includes('electrical') || lower.includes('alternator') || lower.includes('starter')) {
    return 'Covers the alternator, starter motor, wiring harness, and relay assemblies that power your vehicle\'s systems.';
  }
  return 'Extends your coverage for this specific component group. Adds additional protection beyond your base plan.';
}

export default function OptionsStep() {
  const {
    availableRates,
    pendingTierCode,
    pendingTermIndex,
    currentVehicleIndex,
    vehicles,
    setVehicleCoverage,
    setStep,
  } = useQuoteStore();

  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  function toggleDescription(id: number) {
    setExpandedDescriptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Find the rate matching the pending tier code
  const rate = useMemo(
    () => availableRates.find((r) => r.code === pendingTierCode),
    [availableRates, pendingTierCode]
  );

  const term = rate?.terms[pendingTermIndex];
  const tierName = rate ? getTierName(rate.description) : '';

  // Surcharges: non-selectable loss codes from components[0] that are auto-selected
  const surcharges = useMemo(() => {
    if (!term?.components[0]) return [];
    return term.components[0].lossCodes.filter(
      (lc: LossCode) => !lc.isSelectable && lc.isSelected
    );
  }, [term]);

  // Selectable add-ons: from components[1]
  const addOns = useMemo(() => {
    if (!term?.components[1]) return [];
    return term.components[1].lossCodes.filter(
      (lc: LossCode) => lc.isSelectable
    );
  }, [term]);

  // Price calculations
  const basePrice = term?.dealerCost ?? 0;
  const surchargeCost = surcharges.reduce((sum, lc) => sum + lc.dealerCost, 0);
  const optionsCost = addOns
    .filter((lc) => selectedAddOns.has(lc.coverageLossCodeId))
    .reduce((sum, lc) => sum + lc.dealerCost, 0);
  const totalPrice = basePrice + surchargeCost + optionsCost;

  function toggleAddOn(id: number) {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleContinue() {
    if (!rate || !term) return;

    // Collect all loss code IDs (surcharges + selected add-ons)
    const allLossCodes: number[] = [];
    if (term.components[0]) {
      for (const lc of term.components[0].lossCodes) {
        if (lc.isSelected) allLossCodes.push(lc.coverageLossCodeId);
      }
    }
    for (const id of selectedAddOns) {
      allLossCodes.push(id);
    }

    setVehicleCoverage(
      currentVehicleIndex,
      {
        planCode: rate.code,
        planDescription: rate.description,
        retailCost: totalPrice,
        termMonths: term.termMonths,
        termOdometer: term.termOdometer,
        deductible: term.deductible,
        coverageLossCodes: allLossCodes,
      },
      { basePrice, surchargeCost, optionsCost, totalPrice }
    );

    setStep('cart-review');
  }

  if (!rate || !term) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <p className="text-navy-600">No plan selected. Please go back and choose a plan.</p>
          <button
            onClick={() => setStep('plan-selection')}
            className="mt-4 rounded-lg bg-action px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-action-hover"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const vehicle = vehicles[currentVehicleIndex]?.vehicle;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep('plan-selection')}
          className="flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-accent transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="text-right">
          <h2 className="text-xl font-bold font-display text-navy-900">Customize Your Coverage</h2>
          {vehicle && (
            <p className="text-sm text-navy-500">
              {vehicle.vehicleYear} {vehicle.make} {vehicle.model}
            </p>
          )}
        </div>
      </div>

      {/* Selected Plan Summary */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-navy-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-muted">
            <ShieldCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-navy-900">{tierName}</h3>
            <p className="text-xs text-navy-500">
              {term.termMonths}mo / {term.termOdometer.toLocaleString()}mi &mdash; {formatCurrency(term.deductible.amount)} deductible
            </p>
          </div>
          <span className="ml-auto text-lg font-bold text-navy-900">{formatCurrency(basePrice)}</span>
        </div>
      </div>

      {/* Included Surcharges (informational — auto-applied) */}
      {surcharges.length > 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wide mb-3">
            Included Surcharges
          </h3>
          <p className="text-xs text-navy-400 mb-3">
            These are automatically applied based on your vehicle and plan.
          </p>
          <div className="space-y-2">
            {surcharges.map((lc) => {
              const isExpanded = expandedDescriptions.has(lc.coverageLossCodeId);
              return (
                <div key={lc.coverageLossCodeId} className="rounded-lg bg-navy-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleDescription(lc.coverageLossCodeId)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-navy-100/50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Info className="h-3.5 w-3.5 text-navy-400 shrink-0" />
                      <span className="text-sm text-navy-700">{lc.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy-600">+{formatCurrency(lc.dealerCost)}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5 text-navy-400" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-navy-400" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-0">
                      <p className="text-xs text-navy-500 leading-relaxed pl-5.5">
                        {getOptionDescription(lc.description)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selectable Add-Ons */}
      {addOns.length > 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wide mb-3">
            Optional Add-Ons
          </h3>
          <p className="text-xs text-navy-400 mb-3">
            Enhance your coverage with these optional protections.
          </p>
          <div className="space-y-3">
            {addOns.map((lc) => {
              const isSelected = selectedAddOns.has(lc.coverageLossCodeId);
              return (
                <div
                  key={lc.coverageLossCodeId}
                  className={`rounded-xl border-2 overflow-hidden transition ${
                    isSelected
                      ? 'border-accent bg-accent/5'
                      : 'border-navy-100 bg-navy-50 hover:border-navy-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAddOn(lc.coverageLossCodeId)}
                    className="w-full flex items-center px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                          isSelected ? 'bg-accent text-white' : 'bg-navy-200 text-navy-500'
                        }`}
                      >
                        {isSelected ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className={`text-sm font-medium ${isSelected ? 'text-accent' : 'text-navy-700'}`}>
                          {lc.description}
                        </span>
                        <p className="mt-0.5 text-xs text-navy-400 leading-relaxed">
                          {getOptionDescription(lc.description)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold shrink-0 ml-3 ${isSelected ? 'text-accent' : 'text-navy-600'}`}>
                      +{formatCurrency(lc.dealerCost)}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No add-ons or surcharges message */}
      {surcharges.length === 0 && addOns.length === 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-md text-center">
          <p className="text-sm text-navy-500">
            No additional options or surcharges apply to this plan. You&apos;re all set!
          </p>
        </div>
      )}

      {/* Running Total */}
      <div className="rounded-2xl bg-navy-950 p-5 shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-navy-300">
            <span>Base Price ({tierName})</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          {surchargeCost > 0 && (
            <div className="flex justify-between text-navy-300">
              <span>Surcharges</span>
              <span>+{formatCurrency(surchargeCost)}</span>
            </div>
          )}
          {optionsCost > 0 && (
            <div className="flex justify-between text-navy-300">
              <span>Add-Ons</span>
              <span>+{formatCurrency(optionsCost)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-navy-700">
            <span className="text-lg font-bold text-white">Vehicle Total</span>
            <span className="text-lg font-bold text-white">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Continue */}
      <button
        onClick={handleContinue}
        className="w-full rounded-lg bg-action px-6 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-[1.02] active:scale-100"
      >
        Continue to Review
      </button>
    </div>
  );
}
