import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    vehicle: '2019 Honda CR-V',
    rating: 5,
    quote:
      'When my transmission started acting up, I was dreading the repair bill. eTags covered the entire repair — I only paid my deductible. The process was so smooth!',
  },
  {
    name: 'James T.',
    vehicle: '2020 Ford F-150',
    rating: 5,
    quote:
      'I was skeptical about Vehicle Service Contracts, but the team at eTags walked me through everything. Three months later, my A/C compressor failed and it was fully covered.',
  },
  {
    name: 'Maria L.',
    vehicle: '2018 Toyota Camry',
    rating: 5,
    quote:
      'The online process took me less than five minutes. No pushy sales calls, just straightforward coverage. I recommend eTags to everyone I know.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white/90 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
            Real stories from real drivers
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            See why thousands of customers trust us with their vehicles.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-lift rounded-2xl border border-navy-100 bg-white p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-action text-action"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-navy-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-6 border-t border-navy-100 pt-4">
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-xs text-navy-500">{t.vehicle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
