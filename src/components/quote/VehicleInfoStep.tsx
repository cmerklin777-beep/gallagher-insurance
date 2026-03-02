'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuoteStore } from '@/store/quote-store';
import { AlertCircle, Car, ArrowLeft, CheckCircle2, X, Loader2 } from 'lucide-react';

interface VehicleInfoStepProps {
  initialVin?: string;
  initialMileage?: number;
}

export default function VehicleInfoStep({ initialVin, initialMileage }: VehicleInfoStepProps) {
  const { currentVehicleIndex, setVehicleInfo, setAvailableRates, setStep } = useQuoteStore();
  const currentYear = new Date().getFullYear();

  const [vin, setVin] = useState(initialVin ?? '');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState(initialMileage !== undefined ? String(initialMileage) : '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // VIN decode state
  const [vinDecoding, setVinDecoding] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [vinError, setVinError] = useState('');
  const hasDecodedRef = useRef(''); // track which VIN was decoded to avoid duplicate calls

  useEffect(() => {
    if (initialVin) setVin(initialVin);
    if (initialMileage !== undefined) setMileage(String(initialMileage));
  }, [initialVin, initialMileage]);

  // Auto-decode VIN when it reaches 17 valid characters
  useEffect(() => {
    const cleanVin = vin.trim().toUpperCase();
    if (cleanVin.length !== 17) {
      // Reset decoded state if VIN changes away from 17
      if (vinDecoded) {
        setVinDecoded(false);
        setYear('');
        setMake('');
        setModel('');
      }
      return;
    }
    if (/[IOQ]/.test(cleanVin)) return;
    if (hasDecodedRef.current === cleanVin) return; // already decoded this VIN

    hasDecodedRef.current = cleanVin;
    setVinDecoding(true);
    setVinError('');
    setVinDecoded(false);

    fetch('/api/vehicles/decode-vin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vin: cleanVin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setVinError(data.error);
          setVinDecoded(false);
        } else {
          setYear(String(data.year));
          setMake(data.make);
          setModel(data.model);
          setVinDecoded(true);
          setVinError('');
        }
      })
      .catch(() => {
        setVinError('Failed to decode VIN. Please enter details manually.');
        setVinDecoded(false);
      })
      .finally(() => {
        setVinDecoding(false);
      });
  }, [vin, vinDecoded]);

  function handleClearVin() {
    setVin('');
    setYear('');
    setMake('');
    setModel('');
    setVinDecoded(false);
    setVinError('');
    hasDecodedRef.current = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const parsedYear = parseInt(year, 10);
    const parsedMileage = parseInt(mileage, 10);
    const cleanVin = vin.trim().toUpperCase();

    if (isNaN(parsedYear) || parsedYear < 1990 || parsedYear > currentYear + 1) {
      setError('Please enter a valid vehicle year (1990 - ' + (currentYear + 1) + ').');
      return;
    }
    if (!make.trim()) {
      setError('Please enter the vehicle make.');
      return;
    }
    if (!model.trim()) {
      setError('Please enter the vehicle model.');
      return;
    }
    if (isNaN(parsedMileage) || parsedMileage < 0 || parsedMileage > 300000) {
      setError('Please enter a valid mileage (0 - 300,000).');
      return;
    }
    if (cleanVin.length !== 17) {
      setError('VIN must be exactly 17 characters.');
      return;
    }
    if (/[IOQ]/i.test(cleanVin)) {
      setError('VIN cannot contain the letters I, O, or Q.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/coverage/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleYear: parsedYear,
          make: make.trim(),
          model: model.trim(),
          vin: cleanVin,
          mileage: parsedMileage,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorDetails = data.error?.details || data.details;
        if (Array.isArray(errorDetails)) {
          const notEligible = errorDetails.find(
            (d: { code?: string }) => d.code === 'CNT0122'
          );
          if (notEligible) {
            setError('Your vehicle is not eligible for coverage. This may be due to the age, mileage, or type of vehicle.');
            setLoading(false);
            return;
          }
        }
        setError(data.error?.message || data.error || 'Failed to retrieve coverage options. Please try again.');
        setLoading(false);
        return;
      }

      setVehicleInfo(
        currentVehicleIndex,
        {
          vehicleYear: parsedYear,
          make: make.trim(),
          model: model.trim(),
          vin: cleanVin,
          vehicleAgeType: parsedMileage > 0 ? 'Used' : 'New',
        },
        parsedMileage
      );

      const rates = data.rates ?? data;
      setAvailableRates(Array.isArray(rates) ? rates : []);
      setStep('plan-selection');
    } catch {
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  // Shared input class
  const inputClass =
    'mt-1 block w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-3 text-sm placeholder-navy-500 transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 focus:outline-none';
  const readOnlyClass =
    'mt-1 block w-full rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 text-sm text-navy-800 cursor-not-allowed';

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
        {currentVehicleIndex > 0 && (
          <button
            onClick={() => setStep('cart-review')}
            className="flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-accent transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-muted">
            <Car className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-navy-900">Vehicle Information</h2>
            <p className="text-sm text-navy-500">Tell us about your vehicle to see available coverage plans.</p>
          </div>
        </div>

        {/* Skeleton loader during coverage API call */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="rounded-lg bg-accent-muted p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-accent font-medium">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scanning Manufacturer Database...
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded bg-navy-100" />
              <div className="h-4 w-1/2 rounded bg-navy-100" />
              <div className="h-4 w-2/3 rounded bg-navy-100" />
              <div className="h-10 w-full rounded-lg bg-navy-100" />
            </div>
          </div>
        )}

        {/* Form */}
        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* VIN — first field */}
            <div>
              <label htmlFor="vehicle-vin" className="block text-sm font-medium text-navy-700">
                VIN (Vehicle Identification Number)
              </label>
              <div className="relative">
                <input
                  id="vehicle-vin"
                  type="text"
                  maxLength={17}
                  placeholder="e.g. 1HGCG5655WA014677"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className={`${inputClass} font-mono tracking-wider ${vinDecoded ? 'pr-10 border-green-300 bg-green-50/50' : 'pr-4'}`}
                  required
                />
                {vinDecoded && (
                  <button
                    type="button"
                    onClick={handleClearVin}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition"
                    title="Clear VIN and re-enter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-navy-500">
                Found on your dashboard (driver&apos;s side) or inside the driver&apos;s door frame.
              </p>
              {vinError && (
                <p className="mt-1 text-xs text-amber-600">{vinError}</p>
              )}
            </div>

            {/* Decoded vehicle info or manual entry */}
            {/* Year */}
            <div>
              <label htmlFor="vehicle-year" className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                Year
                {vinDecoded && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
              </label>
              {vinDecoding ? (
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-sm text-navy-400">Decoding VIN...</span>
                </div>
              ) : (
                <input
                  id="vehicle-year"
                  type="number"
                  min={1990}
                  max={currentYear + 1}
                  placeholder="e.g. 2020"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={vinDecoded ? readOnlyClass : inputClass}
                  readOnly={vinDecoded}
                  required
                />
              )}
            </div>

            {/* Make */}
            <div>
              <label htmlFor="vehicle-make" className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                Make
                {vinDecoded && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
              </label>
              {vinDecoding ? (
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-sm text-navy-400">Decoding VIN...</span>
                </div>
              ) : (
                <input
                  id="vehicle-make"
                  type="text"
                  placeholder="e.g. Honda"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className={vinDecoded ? readOnlyClass : inputClass}
                  readOnly={vinDecoded}
                  required
                />
              )}
            </div>

            {/* Model */}
            <div>
              <label htmlFor="vehicle-model" className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                Model
                {vinDecoded && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
              </label>
              {vinDecoding ? (
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-sm text-navy-400">Decoding VIN...</span>
                </div>
              ) : (
                <input
                  id="vehicle-model"
                  type="text"
                  placeholder="e.g. Accord"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={vinDecoded ? readOnlyClass : inputClass}
                  readOnly={vinDecoded}
                  required
                />
              )}
            </div>

            {/* Mileage */}
            <div>
              <label htmlFor="vehicle-mileage" className="block text-sm font-medium text-navy-700">
                Current Mileage
              </label>
              <input
                id="vehicle-mileage"
                type="number"
                min={0}
                max={300000}
                placeholder="e.g. 45000"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={vinDecoding}
              className="w-full rounded-lg bg-action px-6 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Check My Coverage Options
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
