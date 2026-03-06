'use client';

import { useState } from 'react';
import { useQuoteStore } from '@/store/quote-store';
import { formatCurrency, BUNDLE_DISCOUNT_PERCENT } from '@/lib/constants';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import VehicleCoverageSummary from './VehicleCoverageSummary';

export default function CartReview() {
  const { vehicles, getMasterPrice, setStep, setVehiclePreview, addVehicleSlot, setCurrentVehicleIndex, removeVehicle } = useQuoteStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmRemoveIdx, setConfirmRemoveIdx] = useState<number | null>(null);

  const masterTotal = getMasterPrice();

  const coveredVehicles = vehicles.filter((v) => v.vehicle && v.coverage);

  const bundleDiscount = coveredVehicles.length >= 2 ? BUNDLE_DISCOUNT_PERCENT : 0;
  const discountAmount = masterTotal * (bundleDiscount / 100);
  const discountedTotal = masterTotal - discountAmount;
  const hasBundleDiscount = bundleDiscount > 0;

  async function handleReviewSub() {
    if (coveredVehicles.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const contracts = coveredVehicles.map((v) => {
        const today = new Date().toISOString().split('T')[0];
        const { termMonths, termOdometer, deductible, ...coverageRest } = v.coverage!;
        return {
          coverages: [
            {
              term: { termOdometer, termMonths, deductible },
              generateForm: true,
              ...coverageRest,
            },
          ],
          combineForms: false,
          dealerNumber: process.env.NEXT_PUBLIC_DEALER_NUMBER_AUTO ?? '',
          saleDate: today,
          saleOdometer: v.saleOdometer,
          startingOdometer: v.saleOdometer,
          endingOdometer: v.saleOdometer + (v.coverage!.termOdometer ?? 0),
          vehicle: v.vehicle,
        };
      });

      const contPreview = await fetch('/api/coverage/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contracts }),
      });

      const contPrevData = await contPreview.json();

      if (!contPreview.ok || !contPrevData.results?.[0]?.success) {
        setError('Unable to generate coverage preview. Please try again.');
        return;
      }

      contPrevData.results.forEach((preview: Record<string, unknown>, index: number) => {
        const data = preview.data as Record<string, unknown>;
        const contracts = data.contracts as Record<string, unknown>[];
        const contract = contracts[0].contract as Record<string, unknown>;
        const buckets = contract.buckets as { code: string; amount: number; description: string }[];
        // Map result index back to actual vehicle index (coveredVehicles may be a subset)
        const realVehicleIndex = vehicles.indexOf(coveredVehicles[index]);
        setVehiclePreview(realVehicleIndex >= 0 ? realVehicleIndex : index, buckets);
      });

      setStep('checkout');
    } catch {
      setError('Something went wrong while preparing your checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(vehicleIndex: number) {
    setCurrentVehicleIndex(vehicleIndex);
    setStep('plan-selection');
  }

  function handleRemove(vehicleIndex: number) {
    removeVehicle(vehicleIndex);
    setConfirmRemoveIdx(null);
    // If no covered vehicles remain, go back to vehicle info
    const remaining = useQuoteStore.getState().vehicles.filter((v) => v.vehicle && v.coverage);
    if (remaining.length === 0) {
      setStep('vehicle-info');
    }
  }

  const canProceed = coveredVehicles.length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-6 w-6 text-accent" aria-hidden="true" />
        <h2 className="text-2xl font-bold font-display text-navy-900">Review Your Coverage</h2>
      </div>

      {/* Vehicle Coverages */}
      {coveredVehicles.map((v, idx) => {
        // Find the actual index in the vehicles array (not the filtered index)
        const realIndex = vehicles.findIndex((veh) => veh === v);
        const safeIndex = realIndex >= 0 ? realIndex : idx;
        return v.vehicle && v.coverage && v.costs ? (
          <div key={safeIndex}>
            <VehicleCoverageSummary
              vehicle={v.vehicle}
              coverage={v.coverage}
              costs={v.costs}
              onEdit={() => handleEdit(safeIndex)}
              onRemove={() => setConfirmRemoveIdx(safeIndex)}
            />
            {confirmRemoveIdx === safeIndex && (
              <div className="mt-2 flex items-center justify-end gap-2 rounded-xl bg-red-50 px-4 py-3">
                <span className="text-sm text-red-700 mr-auto">Remove this coverage?</span>
                <button
                  onClick={() => setConfirmRemoveIdx(null)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-navy-600 transition hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemove(safeIndex)}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ) : null;
      })}

      {/* Master Total */}
      <div className="rounded-2xl bg-navy-950 p-6 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Total Due</span>
            <div className="flex flex-col items-end gap-0.5">
              {hasBundleDiscount && (
                <span className="text-lg font-extrabold text-white/70 line-through">
                  {formatCurrency(masterTotal)}
                </span>
              )}
              <span className="text-3xl font-extrabold text-white">
                {formatCurrency(hasBundleDiscount ? discountedTotal : masterTotal)}
              </span>
            </div>
          </div>
          {hasBundleDiscount && (
            <p className="text-sm text-accent font-medium">
              {bundleDiscount}% bundle discount applied (−{formatCurrency(discountAmount)})
            </p>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {coveredVehicles.length < 2 && (
          <button
            onClick={() => { addVehicleSlot(); setStep('vehicle-info'); }}
            disabled={loading}
            className="flex-1 rounded-lg border border-navy-100 bg-white px-6 py-3 text-sm font-semibold text-navy-700 transition hover:bg-navy-50 disabled:opacity-50"
          >
            Add More Coverage
          </button>
        )}
        <button
          onClick={handleReviewSub}
          disabled={!canProceed || loading}
          className="flex-1 rounded-lg bg-action px-6 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Preparing Checkout...
            </span>
          ) : (
            'Proceed to Checkout'
          )}
        </button>
      </div>
    </div>
  );
}
