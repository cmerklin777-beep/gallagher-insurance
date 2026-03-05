import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, DollarSign, MapPin, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-mesh relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <div className="text-center lg:text-left">
            <h1 className="animate-fade-up stagger-1 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Coverage built for you,{' '}
              <span className="text-action">not for middlemen</span>.
            </h1>

            <p className="animate-fade-up stagger-2 mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              We cut out the call center markup and broker commissions so you
              get the same top-tier home protection at a fraction of the cost — all
              online, in minutes.
            </p>

            <div className="animate-fade-up stagger-3 mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-action px-8 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
              >
                Get Your Free Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                See How It Works
              </Link>
            </div>

            {/* Micro stats */}
            <div className="animate-fade-up stagger-4 mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <DollarSign className="h-4 w-4 text-accent-light" />
                <span>No Call Center Markup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <MapPin className="h-4 w-4 text-accent-light" />
                <span>Nationwide Network</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Star className="h-4 w-4 text-accent-light" />
                <span>$0 Deductible Options</span>
              </div>
            </div>
          </div>

          {/* Right — Person photo */}
          <div className="animate-fade-up stagger-2 hidden lg:flex justify-end items-start">
            <Image
              src="/images/people/hero-mechanic.png"
              alt="Happy homeowner"
              width={630}
              height={882}
              className="w-full max-w-md object-contain drop-shadow-2xl"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
