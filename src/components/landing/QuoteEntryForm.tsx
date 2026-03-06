'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { US_STATES } from '@/lib/constants';

export default function QuoteEntryForm() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [homeType, setHomeType] = useState('');
  const [sqft, setSqft] = useState('');
  const [error, setError] = useState('');
  const [zipLooking, setZipLooking] = useState(false);
  const lastLookedUpZip = useRef('');

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
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

    const footage = parseInt(sqft, 10);
    if (isNaN(footage) || footage < 0 || footage > 300000) {
      setError('Please enter a valid square footage.');
      return;
    }

    // Pass data to the quote wizard via query params (mapped to existing API field names)
    const params = new URLSearchParams({
      vin: address.trim(),
      mileage: String(footage),
    });
    router.push(`/quote?${params.toString()}`);
  }

  const inputClass =
    'mt-2 block w-full rounded-lg border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm placeholder-navy-400 transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 focus:outline-none';
  const selectClass =
    'mt-2 block w-full rounded-lg border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-700 transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 focus:outline-none appearance-none cursor-pointer';

  return (
    <section aria-label="Get a quote" className="relative -mt-8 z-20 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-8 shadow-lg shadow-navy-900/8 sm:p-10">
          <h2 className="text-center font-display text-2xl text-navy-900 sm:text-3xl">
            Get Your Quote in Seconds
          </h2>
          <p className="mt-2 text-center text-sm text-navy-600">
            No phone call required. No commitment.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-describedby={error ? 'form-error' : undefined} noValidate>
            {/* Property Address */}
            <div>
              <label htmlFor="vin" className="block text-sm font-medium text-navy-900">
                Property Address
              </label>
              <input
                id="vin"
                type="text"
                placeholder="123 Street Rd"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
                aria-describedby="vin-hint"
                required
              />
              <p id="vin-hint" className="mt-1.5 text-xs text-navy-600">
                Enter your full property address
              </p>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="flex items-center gap-1.5 text-sm font-medium text-navy-900">
                City
                {zipLooking && <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden="true" />}
              </label>
              <input
                id="city"
                type="text"
                placeholder="Enter city or fill ZIP below"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${inputClass} ${city && !zipLooking ? 'border-green-200 bg-green-50/50' : ''}`}
                required
              />
            </div>

            {/* State & ZIP side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-navy-900">
                  State
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="" disabled>Select state</option>
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-navy-900">
                  ZIP Code
                </label>
                <input
                  id="zip"
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
            </div>

            {/* Home Type & Square Footage side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="homeType" className="block text-sm font-medium text-navy-900">
                  Home Type
                </label>
                <select
                  id="homeType"
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="" disabled>Select type</option>
                  <option value="Home">Home</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-navy-900">
                  Square Footage
                </label>
                <input
                  id="mileage"
                  type="number"
                  min={0}
                  max={300000}
                  placeholder="e.g. 2500"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div id="form-error" role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-action px-6 py-3.5 text-base font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-[1.02] active:scale-100"
            >
              Get Your Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
