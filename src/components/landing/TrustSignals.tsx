import { Wrench, Globe, DollarSign, Clock } from 'lucide-react';

const signals = [
  {
    icon: Wrench,
    title: 'Licensed Handymen',
    description:
      'Your home is in good hands. Every repair is handled by licensed, vetted handymen you can trust.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    description:
      'Whether you just moved or have been in your home for years, your coverage protects you at any address nationwide.',
  },
  {
    icon: DollarSign,
    title: '$0 Service Fee Options',
    description:
      'Zero out-of-pocket on service calls — savings we pass directly to you through our streamlined online process.',
  },
  {
    icon: Clock,
    title: 'Hassle-Free Claims',
    description:
      'No paperwork headaches. We pay the service provider directly so you can get back to your routine faster.',
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-white/70 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
            Why homeowners switch to us
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Trusted coverage. Transparent pricing. Nationwide service.
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
                <signal.icon className="h-7 w-7 text-accent" aria-hidden="true" />
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
