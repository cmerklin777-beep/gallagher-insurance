import { Wrench, Globe, DollarSign, Clock } from 'lucide-react';

const signals = [
  {
    icon: Wrench,
    title: 'ASE Certified Mechanics',
    description:
      'Your car is in good hands. Every repair is handled by ASE Certified technicians you can trust.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    description:
      'Whether you\'re across town or across the country, your coverage travels with you at any licensed facility.',
  },
  {
    icon: DollarSign,
    title: '$0 Deductible Options',
    description:
      'Keep more money in your pocket. Choose a plan with zero out-of-pocket costs at the repair shop.',
  },
  {
    icon: Clock,
    title: 'Hassle-Free Claims',
    description:
      'No paperwork headaches. We pay the repair shop directly so you can get back on the road faster.',
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-navy-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
            Why families trust us
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            We make protecting your vehicle simple, honest, and affordable.
          </p>
        </div>

        {/* Signal cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="card-lift rounded-2xl bg-white border border-navy-100 shadow-sm p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-muted">
                <signal.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-navy-900">{signal.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
