import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Car, MapPin } from 'lucide-react';
import HeroSection from '@/components/landing/HeroSection';
import QuoteEntryForm from '@/components/landing/QuoteEntryForm';
import TrustSignals from '@/components/landing/TrustSignals';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuoteEntryForm />

      {/* Why choose eTags */}
      <section className="bg-white/90 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-2xl shadow-lg lg:mx-0">
              <Image
                src="/images/people/car-repair.jpg"
                alt="Mechanic working on a car"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
                The protection you&apos;d expect from a dealership — without the dealership price tag.
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent lg:mx-0" />
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-600">
                Dealerships charge a premium because they can. We built a smarter way — the same
                certified coverage, sold directly to you online. No showroom overhead, no broker
                fees, just honest pricing on{' '}
                <span className="font-semibold text-navy-900 underline decoration-accent/60 underline-offset-4">
                  Vehicle Service Contracts
                </span>{' '}
                that actually protect you.
              </p>
              <Link
                href="/quote"
                className="mt-10 inline-block rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
              >
                See Your Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Plans that fit your life</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                From powertrain basics to bumper-to-bumper, pick the tier that fits — priced without the dealership markup baked in.
              </p>
            </div>

            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Built for how you buy</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                No waiting rooms, no finance-office upsell. Our platform was designed from day one to get you covered online in minutes.
              </p>
            </div>

            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Four tiers of protection</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Essential, Essential Plus, Premium, or Exclusive — we have coverage for every vehicle and every driver.
              </p>
            </div>

            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Repairs anywhere you are</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Use any ASE-Certified mechanic at thousands of shops nationwide. You choose where — not a dealership service department.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />
      <Testimonials />
      <HowItWorks />

      {/* Final CTA */}
      <section className="hero-mesh relative py-24 text-center section-fade-top">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            See what coverage costs without the markup
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            It takes less than a minute to see your personalized options — priced directly, with nothing added on. No sales calls, no commitment.
          </p>
          <Link
            href="/quote"
            className="mt-10 inline-block rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
          >
            Start Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
