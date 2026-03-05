'use client';

import { useQuoteStore } from '@/store/quote-store';
import { formatCurrency } from '@/lib/constants';
import { CheckCircle, Printer, Home } from 'lucide-react';

export default function SuccessPage() {
  const { vehicles, getMasterPrice, amountPaidAtCheckout, reset } = useQuoteStore();

  const coveredVehicles = vehicles.filter((v) => v.vehicle && v.coverage && v.costs);
  /** Show the amount actually charged (after bundle discount / buydown), or master total if not set */
  const totalPaid = amountPaidAtCheckout ?? getMasterPrice();

  function handlePrint() {
    window.print();
  }

  function handleReturnHome() {
    reset();
    window.location.href = '/';
  }

  return (
    <div className="mx-auto max-w-xl text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-muted">
          <CheckCircle className="h-12 w-12 text-accent" />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-extrabold font-display text-navy-900">Your Coverage is Active!</h1>
        <p className="mt-2 text-navy-500">
          Thank you for choosing AssuredPartners. Your protection is now in effect.
        </p>
      </div>

      {/* Purchase Summary */}
      <div className="rounded-2xl bg-white p-6 shadow-md text-left space-y-4">
        <h2 className="text-lg font-bold text-navy-900">Purchase Summary</h2>

        {coveredVehicles.map((v, idx) => (
          <div key={idx} className="border-b border-navy-100 pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-navy-900">
                  {v.vehicle!.vehicleYear} {v.vehicle!.make} {v.vehicle!.model}
                </p>
                <p className="text-sm text-navy-500">{v.coverage!.planDescription}</p>
                <p className="text-xs text-navy-500">
                  {v.coverage!.termMonths}mo / {v.coverage!.termOdometer.toLocaleString()}mi
                </p>
              </div>
              <span className="font-semibold text-navy-900">
                {formatCurrency(v.costs!.totalPrice)}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-2">
          <span className="text-lg font-bold text-navy-900">Total Paid</span>
          <span className="text-lg font-bold text-navy-900">{formatCurrency(totalPaid)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleReturnHome}
          className="flex items-center justify-center gap-2 rounded-lg bg-action px-6 py-3 text-sm font-semibold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover"
        >
          <Home className="h-4 w-4" />
          Return Home
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 rounded-lg border border-navy-100 bg-white px-6 py-3 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>
      </div>

      {/* Legal Footer */}
      <p className="text-xs text-navy-500 leading-relaxed">
        Your Home Warranty Contract details will be emailed to you at the address provided.
        Please allow up to 24 hours for delivery. If you have questions about your coverage,
        please contact our support team.
      </p>
    </div>
  );
}
