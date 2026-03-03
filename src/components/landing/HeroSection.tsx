import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, MapPin, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-mesh relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up stagger-1 mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-action" />
              Trusted by thousands of drivers
            </div>

            <h1 className="animate-fade-up stagger-2 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;re here to keep you{' '}
              <span className="text-action">on the road</span>.
            </h1>

            <p className="animate-fade-up stagger-3 mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              Real people, real coverage. Our team helps you find the right
              Vehicle Service Contract so unexpected repairs never slow you down.
            </p>

            <div className="animate-fade-up stagger-4 mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
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
            <div className="animate-fade-up stagger-5 mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>4 Coverage Tiers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Nationwide Network</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Star className="h-4 w-4 text-accent" />
                <span>$0 Deductible Options</span>
              </div>
            </div>
          </div>

          {/* Right — Person photo */}
          <div className="animate-fade-up stagger-3 hidden lg:flex justify-center">
            <div className="relative h-96 w-80 rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
              <Image
                src="/images/people/hero-mechanic.jpg"
                alt="Smiling mechanic ready to help"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
