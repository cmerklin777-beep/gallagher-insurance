'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useQuoteStore } from '@/store/quote-store';
import { US_STATES } from '@/lib/constants';
import { AlertCircle, Home, ArrowLeft, CheckCircle2, X, Loader2, Info } from 'lucide-react';

interface VehicleInfoStepProps {
  initialVin?: string;
  initialMileage?: number;
}

export default function VehicleInfoStep({ initialVin, initialMileage }: VehicleInfoStepProps) {
  const { currentVehicleIndex, setVehicleInfo, setAvailableRates, setStep } = useQuoteStore();

  const [vin, setVin] = useState(initialVin ?? '');
  const [city, setCity] = useState('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState('');
  const [homeType, setHomeType] = useState<string>('');
  const [mileage, setMileage] = useState(initialMileage !== undefined ? String(initialMileage) : '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVinInfo, setShowVinInfo] = useState(false);
  const [zipLooking, setZipLooking] = useState(false);
  const vinInfoRef = useRef<HTMLDivElement>(null);
  const lastLookedUpZip = useRef('');

  useEffect(() => {
    if (initialVin) setVin(initialVin);
    if (initialMileage !== undefined) setMileage(String(initialMileage));
  }, [initialVin, initialMileage]);

  // Close info popover on click outside
  useEffect(() => {
    if (!showVinInfo) return;
    function handleClickOutside(e: MouseEvent) {
      if (vinInfoRef.current && !vinInfoRef.current.contains(e.target as Node)) {
        setShowVinInfo(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showVinInfo]);

  // Auto-fill city & state when ZIP code reaches 5 digits
  useEffect(() => {
    const cleanZip = zipCode.replace(/\D/g, '');
    if (cleanZip.length !== 5 || lastLookedUpZip.current === cleanZip) return;
    lastLookedUpZip.current = cleanZip;
    setZipLooking(true);

    fetch(`https://api.zippopotam.us/us/${cleanZip}`)
      .then((res) => {
        if (!res.ok) throw new Error('Invalid ZIP');
        return res.json();
      })
      .then((data) => {
        const place = data.places?.[0];
        if (place) {
          setCity(place['place name'] || '');
          // Match state abbreviation to our US_STATES list
          const stateAbbr = place['state abbreviation'] || '';
          if (US_STATES.some((s) => s.code === stateAbbr)) {
            setState(stateAbbr);
          }
        }
      })
      .catch(() => {
        // ZIP not found — let user fill manually
      })
      .finally(() => setZipLooking(false));
  }, [zipCode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const cleanAddress = vin.trim();
    const parsedMileage = parseInt(mileage, 10);

    if (!cleanAddress) {
      setError('Please enter your property address.');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city.');
      return;
    }
    if (!state) {
      setError('Please select your state.');
      return;
    }
    if (!zipCode.trim() || !/^\d{5}$/.test(zipCode.trim())) {
      setError('Please enter a valid 5-digit ZIP code.');
      return;
    }
    if (!homeType) {
      setError('Please select your home type.');
      return;
    }
    if (isNaN(parsedMileage) || parsedMileage < 0 || parsedMileage > 300000) {
      setError('Please enter a valid square footage (0 - 300,000).');
      return;
    }

    setLoading(true);

    try {
      // Build a pseudo-VIN from address data for API compatibility
      const pseudoVin = `HOME${zipCode.trim()}${Date.now().toString(36).slice(-8)}`.slice(0, 17).padEnd(17, '0').toUpperCase();
      const currentYear = new Date().getFullYear();

      const response = await fetch('/api/coverage/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleYear: currentYear,
          make: zipCode.trim(),
          model: homeType,
          vin: pseudoVin,
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
            setError('Your property is not eligible for coverage.');
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
          vehicleYear: currentYear,
          make: zipCode.trim(),
          model: homeType,
          vin: pseudoVin,
          vehicleAgeType: 'Used',
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
  const selectClass =
    'mt-1 block w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-700 transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 focus:outline-none appearance-none cursor-pointer';

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
            <Home className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-navy-900">Home Information</h2>
            <p className="text-sm text-navy-500">Tell us about your home to see available coverage plans.</p>
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
                Checking Property Details...
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
            {/* Property Address */}
            <div>
              <div className="relative" ref={vinInfoRef}>
                <label htmlFor="property-address" className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  Property Address
                  <button
                    type="button"
                    onClick={() => setShowVinInfo(!showVinInfo)}
                    className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-navy-200 text-navy-600 hover:bg-accent hover:text-white transition-colors"
                    aria-label="Property address help"
                  >
                    <Info className="h-2.5 w-2.5" />
                  </button>
                </label>

                {/* Info Popover */}
                {showVinInfo && (
                  <div className="absolute z-50 top-7 left-0 w-80 rounded-xl bg-white border border-navy-100 shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-navy-900">Property Address Details</h4>
                      <button type="button" onClick={() => setShowVinInfo(false)} className="text-navy-400 hover:text-navy-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">1</div>
                        <div>
                          <p className="text-xs font-semibold text-navy-800">Full Street Address</p>
                          <p className="text-xs text-navy-500">Enter the complete street address of the property you want to cover.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">2</div>
                        <div>
                          <p className="text-xs font-semibold text-navy-800">Property Details</p>
                          <p className="text-xs text-navy-500">We use this information to look up your property details and determine eligible coverage plans.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">3</div>
                        <div>
                          <p className="text-xs font-semibold text-navy-800">Ownership Records</p>
                          <p className="text-xs text-navy-500">Check your deed, mortgage statement, or property tax records for the exact address.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <input
                id="property-address"
                type="text"
                placeholder="123 Street Rd"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="property-city" className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                City
                {zipLooking && <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />}
              </label>
              <input
                id="property-city"
                type="text"
                placeholder="Enter city or fill ZIP below"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${inputClass} ${city && !zipLooking ? 'border-green-200 bg-green-50/50' : ''}`}
                required
              />
            </div>

            {/* State Dropdown */}
            <div>
              <label htmlFor="property-state" className="block text-sm font-medium text-navy-700">
                State
              </label>
              <select
                id="property-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={selectClass}
                required
              >
                <option value="" disabled>Select your state</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ZIP Code */}
            <div>
              <label htmlFor="property-zip" className="block text-sm font-medium text-navy-700">
                ZIP Code
              </label>
              <input
                id="property-zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="e.g. 90210"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                className={inputClass}
                required
              />
            </div>

            {/* Home Type Dropdown */}
            <div>
              <label htmlFor="home-type" className="block text-sm font-medium text-navy-700">
                Home Type
              </label>
              <select
                id="home-type"
                value={homeType}
                onChange={(e) => setHomeType(e.target.value)}
                className={selectClass}
                required
              >
                <option value="" disabled>Select home type</option>
                <option value="Home">Home</option>
                <option value="Condo">Condo</option>
              </select>
            </div>

            {/* Square Footage */}
            <div>
              <label htmlFor="square-footage" className="block text-sm font-medium text-navy-700">
                Square Footage
              </label>
              <input
                id="square-footage"
                type="number"
                min={0}
                max={300000}
                placeholder="e.g. 2500"
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
