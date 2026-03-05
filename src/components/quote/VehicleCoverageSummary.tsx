'use client';

import { formatCurrency } from '@/lib/constants';
import { Home, Pencil, Trash2 } from 'lucide-react';
import type { VehicleInfo, SelectedCoverage, CostBreakdown } from '@/lib/types';

interface VehicleCoverageSummaryProps {
  vehicle: VehicleInfo;
  coverage: SelectedCoverage;
  costs: CostBreakdown;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function VehicleCoverageSummary({
  vehicle,
  coverage,
  costs,
  onEdit,
  onRemove,
}: VehicleCoverageSummaryProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-muted">
          <Home className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-navy-900">
            {vehicle.vehicleYear} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-xs text-navy-500">VIN: {vehicle.vin}</p>
        </div>
        {(onEdit || onRemove) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                onClick={onEdit}
                className="rounded-lg p-2 text-navy-400 transition hover:bg-navy-50 hover:text-accent"
                title="Edit coverage"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onRemove && (
              <button
                onClick={onRemove}
                className="rounded-lg p-2 text-navy-400 transition hover:bg-red-50 hover:text-red-500"
                title="Remove vehicle"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-navy-600">Protection Plan</span>
          <span className="font-medium text-navy-900">{coverage.planDescription}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy-600">Term</span>
          <span className="font-medium text-navy-900">
            {coverage.termMonths} months
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy-600">Deductible</span>
          <span className="font-medium text-navy-900">
            {formatCurrency(coverage.deductible.amount)} ({coverage.deductible.type})
          </span>
        </div>

        <div className="border-t border-navy-100 pt-2 mt-2 space-y-1">
          <div className="flex justify-between text-navy-500">
            <span>Base Price</span>
            <span>{formatCurrency(costs.basePrice)}</span>
          </div>
          {costs.surchargeCost > 0 && (
            <div className="flex justify-between text-navy-500">
              <span>Surcharges</span>
              <span>+{formatCurrency(costs.surchargeCost)}</span>
            </div>
          )}
          {costs.optionsCost > 0 && (
            <div className="flex justify-between text-navy-500">
              <span>Optional Add-Ons</span>
              <span>+{formatCurrency(costs.optionsCost)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-navy-900 pt-1 border-t border-dashed border-navy-100">
            <span>Coverage Total</span>
            <span>{formatCurrency(costs.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
