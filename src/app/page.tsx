import Link from 'next/link';
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
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
            Your car takes care of you. Let us take care of it.
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent" />
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-navy-600">
            Unexpected repairs happen — but they don&apos;t have to break the bank.
            Our{' '}
            <span className="font-semibold text-navy-900 underline decoration-accent/60 underline-offset-4">
              Vehicle Service Contracts
            </span>{' '}
            give you the peace of mind that comes from knowing you&apos;re covered, no matter what
            the road throws at you.
          </p>
          <Link
            href="/quote"
            className="mt-10 inline-block rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
          >
            See Your Options
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Plans that fit your life</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                From basic powertrain to bumper-to-bumper, choose the coverage level that makes sense for you and your budget.
              </p>
            </div>

            <div className="card-lift rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Quick and easy enrollment</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                No paperwork, no waiting rooms. Get covered online in minutes from the comfort of your couch.
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
                Take your car to any ASE-Certified mechanic at thousands of repair shops across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />
      <Testimonials />
      <HowItWorks />

      {/* Final CTA */}
      <section className="hero-mesh relative py-24 text-center">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Let&apos;s get you covered
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            It takes less than a minute to see your personalized coverage options. No sales calls, no commitment — just honest protection for your vehicle.
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
