import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, DollarSign, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home Coverage | AssuredPartners',
  description:
    'Explore our comprehensive home warranty coverage tiers. From appliance protection to whole-home coverage.',
};

/* ------------------------------------------------------------------ */
/*  Tier data                                                          */
/* ------------------------------------------------------------------ */

const tiers = [
  {
    name: 'Appliance',
    tier: 1,
    items: [
      'Refrigerator',
      'Oven / Range / Cooktop',
      'Dishwasher',
      'Built-In Microwave',
      'Washer & Dryer',
      'Garbage Disposal',
    ],
    border: 'border-navy-200',
    extra: 'shadow-sm',
    badge: null,
  },
  {
    name: 'Systems',
    tier: 2,
    items: [
      'HVAC (Heating & Cooling)',
      'Electrical System',
      'Plumbing System',
      'Water Heater',
      'Ductwork',
      'Exhaust Fans',
    ],
    border: 'border-navy-200',
    extra: 'shadow-sm',
    badge: null,
  },
  {
    name: 'Total',
    tier: 3,
    items: [
      'Everything in Appliance & Systems',
      'Garage Door Opener',
      'Ceiling Fans',
      'Doorbells',
      'Central Vacuum',
      'Additional Appliance Coverage',
    ],
    border: 'border-accent',
    extra: 'ring-1 ring-accent/20 shadow-xl',
    badge: 'Most Popular',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AutoCoveragePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Comprehensive Home Coverage
            </h1>
          </div>

          {/* Two value-prop cards */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
              <div className="mb-3 inline-flex rounded-xl bg-accent-muted p-3">
                <Shield className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Comprehensive Coverage</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Our home warranty plans cover a wide range of repairs, ensuring your home stays in top
                condition.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
              <div className="mb-3 inline-flex rounded-xl bg-accent-muted p-3">
                <DollarSign className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Affordable Plans</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Choose from various plans that fit your budget without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
            Explore Comprehensive Home Protection
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent" />
          <p className="mt-8 text-lg leading-relaxed text-navy-600">
            At AssuredPartners, we offer customized coverage tiers designed specifically to fit your
            family&apos;s lifestyles and budget. Enjoy complete peace of mind with our plans ranging
            from basic appliance protection to whole-home coverage, protecting your home from
            unexpected costs. Key benefits include Appliance, Systems, and combined Total coverage.
          </p>
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
              Compare Our Coverage Tiers
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              Explore and contrast the comprehensive benefits across our various coverage tiers to
              confidently identify the coverage that aligns with your individual needs and budget.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`card-lift relative rounded-2xl border-2 ${t.border} ${t.extra} bg-white p-6`}
              >
                {/* Badge */}
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white shadow-md">
                    {t.badge}
                  </span>
                )}

                {/* Tier label */}
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Tier {t.tier}
                </p>
                <h3 className="mt-1 text-xl font-bold text-navy-900">{t.name}</h3>

                {/* Divider */}
                <div className="my-4 h-px bg-navy-100" />

                {/* Items */}
                <ul className="space-y-3">
                  {t.items.map((item) => {
                    const isHeading = item.startsWith('Everything');
                    return (
                      <li key={item} className="flex items-start gap-2">
                        {isHeading ? (
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        ) : (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        )}
                        <span
                          className={`text-sm leading-relaxed ${
                            isHeading ? 'font-semibold text-accent' : 'text-navy-700'
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 relative py-24 text-center section-fade-top">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Secure Your Peace of Mind Today
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-100">
            Choose the coverage tier that best suits your needs and enjoy peace of mind knowing
            you&apos;re protected. Explore our comprehensive coverage options and take the first step
            towards worry-free homeownership.
          </p>
          <Link
            href="/quote"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
          >
            Get Your Free Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
