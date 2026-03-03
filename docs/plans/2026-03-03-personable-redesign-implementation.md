# Personable Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Shift the eTags site to a lighter blue palette, replace PCRS with Lot Solutions Inc. in customer-facing text, and redesign landing components for a warmer, more personable feel with testimonials.

**Architecture:** Update CSS custom properties in globals.css for the palette shift (all components inherit automatically). Rewrite 4 landing components (HeroSection, TrustSignals, HowItWorks, + new Testimonials). Update Header/Footer colors and PCRS text. Adjust copy tone on About/FAQ/Contact pages.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React icons, TypeScript

---

### Task 1: Update Color Palette in globals.css

**Files:**
- Modify: `src/app/globals.css:1-130`

**Step 1: Replace CSS custom property values**

Replace the `@theme inline` block (lines 3-31) with the new lighter palette:

```css
@theme inline {
  --color-background: #f8f8f9;
  --color-foreground: #1a5276cc;
  --color-navy-950: #1a5276;
  --color-navy-900: #2471a3;
  --color-navy-800: #2e86c1;
  --color-navy-700: #3498db;
  --color-navy-600: #5dade2;
  --color-navy-500: #85c1e9;
  --color-navy-100: #d6eaf8;
  --color-navy-50: #ebf5fb;
  --color-accent: #00ae47;
  --color-accent-hover: #009a3e;
  --color-accent-light: #44b743;
  --color-accent-muted: rgba(0, 174, 71, 0.12);
  --color-action: #fac142;
  --color-action-hover: #e0ab35;
  --color-action-light: #ffd06a;
  --color-primary: #3094e8;
  --color-primary-hover: #2680cc;
  --color-success: #44b743;
  --color-success-light: #6cc96b;
  --color-warning: #fac142;
  --color-glass: rgba(255, 255, 255, 0.06);
  --color-glass-border: rgba(255, 255, 255, 0.1);
  --color-glass-strong: rgba(255, 255, 255, 0.12);
  --font-sans: var(--font-roboto);
  --font-display: var(--font-roboto);
}
```

**Step 2: Update the hero-mesh gradient**

Replace line 63:
```css
.hero-mesh {
  background: linear-gradient(165deg, #1a5276 0%, #2471a3 30%, #2e86c1 70%, #3498db 100%);
}
```

**Step 3: Update scrollbar colors**

Replace lines 111-120:
```css
::-webkit-scrollbar-track {
  background: #ebf5fb;
}
::-webkit-scrollbar-thumb {
  background: #d6eaf8;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #85c1e9;
}
```

**Step 4: Verify the dev server loads without errors**

Run: `npm run dev`
Expected: No build errors. Open browser — palette should visibly shift lighter across all pages.

**Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "style: shift color palette to lighter blue"
```

---

### Task 2: Rewrite HeroSection.tsx

**Files:**
- Modify: `src/components/landing/HeroSection.tsx:1-56`

**Step 1: Replace entire file with new split-layout hero**

```tsx
import Link from 'next/link';
import { ArrowRight, ShieldCheck, MapPin, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-mesh relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up stagger-1 mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Trusted by thousands of drivers
            </div>

            <h1 className="animate-fade-up stagger-2 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;re here to keep you{' '}
              <span className="text-accent">on the road</span>.
            </h1>

            <p className="animate-fade-up stagger-3 mt-6 max-w-xl text-lg leading-relaxed text-white/70">
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
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                See How It Works
              </Link>
            </div>

            {/* Micro stats */}
            <div className="animate-fade-up stagger-5 mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>4 Coverage Tiers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Nationwide Network</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Star className="h-4 w-4 text-accent" />
                <span>$0 Deductible Options</span>
              </div>
            </div>
          </div>

          {/* Right — Person image placeholder */}
          <div className="animate-fade-up stagger-3 hidden lg:flex justify-center">
            <div className="relative h-96 w-80 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden">
              <div className="text-center px-8">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
                  <ShieldCheck className="h-10 w-10 text-accent" />
                </div>
                <p className="text-lg font-semibold text-white">Your peace of mind starts here</p>
                <p className="mt-2 text-sm text-white/60">
                  Replace this with a photo of a friendly team member or happy customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Run dev server and check homepage. Hero should show split layout with warmer copy on left and placeholder card on right.

**Step 3: Commit**

```bash
git add src/components/landing/HeroSection.tsx
git commit -m "feat: rewrite hero section with personable split layout"
```

---

### Task 3: Create Testimonials.tsx

**Files:**
- Create: `src/components/landing/Testimonials.tsx`

**Step 1: Create new testimonials component**

```tsx
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
    <section className="bg-white py-20 sm:py-28">
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
```

**Step 2: Verify component renders**

Import into homepage (next task) and check browser.

**Step 3: Commit**

```bash
git add src/components/landing/Testimonials.tsx
git commit -m "feat: add testimonials section with placeholder reviews"
```

---

### Task 4: Rewrite TrustSignals.tsx

**Files:**
- Modify: `src/components/landing/TrustSignals.tsx:1-65`

**Step 1: Replace entire file with warmer design**

```tsx
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
```

**Step 2: Verify in browser**

Check homepage — TrustSignals should now show centered card layout with friendlier copy.

**Step 3: Commit**

```bash
git add src/components/landing/TrustSignals.tsx
git commit -m "feat: rewrite trust signals with warmer copy and centered layout"
```

---

### Task 5: Rewrite HowItWorks.tsx

**Files:**
- Modify: `src/components/landing/HowItWorks.tsx:1-76`

**Step 1: Replace entire file with friendlier design**

```tsx
import { Car, Search, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Car,
    step: '1',
    title: 'Tell us about your car',
    description:
      'Just enter your VIN and current mileage. It takes less than 30 seconds — seriously.',
  },
  {
    icon: Search,
    step: '2',
    title: 'Compare your options',
    description:
      'We\'ll show you coverage plans tailored to your vehicle, with clear pricing and no hidden fees.',
  },
  {
    icon: ShieldCheck,
    step: '3',
    title: 'Drive with confidence',
    description:
      'Pick your plan, check out online, and you\'re covered. It\'s that easy.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
            Getting covered is easy
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Three simple steps. No phone calls, no pressure.
          </p>
        </div>

        {/* Step cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.step} className="relative flex">
              {/* Connector line between cards */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden w-8 -translate-y-1/2 translate-x-full border-t-2 border-dashed border-navy-100 lg:block" />
              )}

              <div className="relative w-full overflow-hidden rounded-2xl border border-navy-100 bg-navy-50 p-8 shadow-sm">
                {/* Step number */}
                <span className="absolute right-6 top-4 font-display text-6xl leading-none text-navy-100">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-muted">
                  <item.icon className="h-7 w-7 text-accent" />
                </div>

                {/* Text */}
                <h3 className="mt-5 text-xl font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Check homepage — HowItWorks should show friendlier step titles and casual copy.

**Step 3: Commit**

```bash
git add src/components/landing/HowItWorks.tsx
git commit -m "feat: rewrite how-it-works with friendlier copy"
```

---

### Task 6: Update Homepage to include Testimonials and warmer copy

**Files:**
- Modify: `src/app/page.tsx:1-117`

**Step 1: Replace entire file with updated homepage flow**

```tsx
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
```

**Step 2: Verify in browser**

Full homepage flow: Hero → Quote Form → "Your car takes care of you" → Features → TrustSignals → Testimonials → HowItWorks → CTA

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update homepage with testimonials and warmer copy"
```

---

### Task 7: Update Header.tsx colors

**Files:**
- Modify: `src/components/layout/Header.tsx:23-24,87`

**Step 1: Update header background color class**

The header already uses `bg-navy-900` and `border-navy-800` which will automatically pick up the new lighter palette values from globals.css. No code changes needed — the CSS variable update in Task 1 handles this.

Verify in browser that the header now appears as lighter blue (`#2471a3`) with `#2e86c1` border.

**Step 2: Commit**

No commit needed — already handled by Task 1.

---

### Task 8: Update Footer.tsx — PCRS rename + palette

**Files:**
- Modify: `src/components/layout/Footer.tsx:160-161`

**Step 1: Replace PCRS text**

Find on line 161:
```
All plans are administered by PCRS and backed by licensed
```

Replace with:
```
All plans are administered by Lot Solutions Inc. and backed by licensed
```

**Step 2: Verify in browser**

Scroll to footer — should read "administered by Lot Solutions Inc."

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "fix: replace PCRS with Lot Solutions Inc. in footer"
```

---

### Task 9: Update chatbot-knowledge.ts — PCRS rename

**Files:**
- Modify: `src/lib/chatbot-knowledge.ts:4`

**Step 1: Replace PCRS text**

Find on line 4:
```
All contracts are administered by PCRS and backed by licensed insurers.
```

Replace with:
```
All contracts are administered by Lot Solutions Inc. and backed by licensed insurers.
```

**Step 2: Commit**

```bash
git add src/lib/chatbot-knowledge.ts
git commit -m "fix: replace PCRS with Lot Solutions Inc. in chatbot knowledge"
```

---

### Task 10: Update CheckoutStep.tsx — PCRS rename

**Files:**
- Modify: `src/components/quote/CheckoutStep.tsx:246-247`

**Step 1: Replace PCRS error message**

Find on lines 246-247:
```tsx
          noteData ||
            'Error adding note to PCRS'
```

Replace with:
```tsx
          noteData ||
            'Error adding note to contract'
```

**Step 2: Commit**

```bash
git add src/components/quote/CheckoutStep.tsx
git commit -m "fix: remove PCRS reference from checkout error message"
```

---

### Task 11: Update About page copy tone

**Files:**
- Modify: `src/app/about/page.tsx:1-127`

**Step 1: Update hero text and company story for warmth**

Replace the hero subtitle (lines 46-50) with:
```tsx
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              We started eTags because we believe protecting your car shouldn&apos;t be
              complicated. We&apos;re a small team with a big mission: making Vehicle Service
              Contracts simple, transparent, and actually worth it.
            </p>
```

Replace the company story paragraph (lines 63-69) with:
```tsx
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              We know what it&apos;s like to get hit with an unexpected repair bill — it&apos;s
              stressful. That&apos;s why we built eTags to be different. No confusing jargon, no
              surprise exclusions, just honest coverage you can count on. From our first customer
              to today, we treat every person like family, because that&apos;s exactly how we&apos;d
              want to be treated.
            </p>
```

Replace the CTA section subtitle (lines 110-113) with:
```tsx
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            We&apos;d love to help you find the right plan. Get a personalized quote in under a
            minute — no pressure, no sales calls.
          </p>
```

**Step 2: Verify in browser**

Visit `/about` — should feel warmer and more personal.

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "style: update about page with warmer, personable copy"
```

---

### Task 12: Update FAQ page copy tone

**Files:**
- Modify: `src/app/faq/page.tsx:6-51`

**Step 1: Update FAQ answers to be more conversational**

Replace the `faqItems` array (lines 6-51) with:

```tsx
const faqItems = [
  {
    question: 'What types of coverage does eTags offer?',
    answer:
      'We offer four coverage tiers so you can pick the one that fits your needs and budget. Whether you just want to cover the big stuff (engine & transmission) or want near-complete coverage, we\'ve got you.',
  },
  {
    question: 'What is auto coverage and why do I need it?',
    answer:
      'Think of it as a safety net for your car. If something mechanical breaks down, your Vehicle Service Contract helps cover the repair costs so you\'re not stuck with a huge bill out of nowhere.',
  },
  {
    question: 'Can I transfer my coverage if I sell my vehicle?',
    answer:
      'Absolutely! Most of our plans are transferable, which is actually a great selling point when you go to sell your car. The new owner gets coverage, and your vehicle is worth more.',
  },
  {
    question: 'How does the purchasing process work at eTags?',
    answer:
      'It\'s really easy. Enter your VIN and mileage, compare plans, pick the one you like, and check out online. The whole thing takes a few minutes.',
  },
  {
    question: 'What is a Vehicle Service Contract?',
    answer:
      'It\'s a service agreement that covers specific repairs after your factory warranty expires. Think of it as extended protection for your car — when something breaks, we help pay for it.',
  },
  {
    question: 'How do I file a claim with eTags?',
    answer:
      'Just call the claims number on your fulfillment packet or use the claims portal. Give them the details, and we\'ll take it from there. We pay the shop directly, so you don\'t have to deal with reimbursements.',
  },
  {
    question: 'Are there any additional benefits with an eTags coverage?',
    answer:
      'Yes! Most of our plans include roadside assistance and rental car reimbursement, so you\'re covered even while your car is in the shop.',
  },
  {
    question: 'How long does coverage last?',
    answer:
      'That depends on the plan you choose. We offer flexible terms from short to long duration. Get a quote to see what\'s available for your specific vehicle.',
  },
  {
    question: 'What makes eTags different?',
    answer:
      'Honestly? We keep it simple. Transparent pricing, no sales pressure, real people you can talk to, and a fast online process. We think buying coverage should be as easy as everything else you do online.',
  },
];
```

**Step 2: Verify in browser**

Visit `/faq` — answers should read more like a friendly conversation.

**Step 3: Commit**

```bash
git add src/app/faq/page.tsx
git commit -m "style: update FAQ answers with conversational tone"
```

---

### Task 13: Update Contact page copy tone

**Files:**
- Modify: `src/app/contact/page.tsx:33-42,89-95,201-206`

**Step 1: Update hero text**

Replace lines 33-34 with:
```tsx
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;d love to hear from you
            </h1>
```

Replace lines 39-42 with:
```tsx
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Have a question about coverage, need help with a claim, or just want to say hi?
              Our team is friendly, responsive, and always happy to help.
            </p>
```

**Step 2: Update contact form intro**

Replace lines 89-95 with:
```tsx
            <div className="text-center">
              <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
                Send us a message
              </h2>
              <p className="mt-3 text-lg text-navy-600">
                Fill out the form below and we&apos;ll get back to you as soon as we can.
              </p>
            </div>
```

**Step 3: Update CTA section**

Replace lines 201-206 with:
```tsx
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Ready to get covered?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Our team is here whenever you need us. In the meantime, grab a free
            quote and see how affordable real protection can be.
          </p>
```

**Step 4: Verify in browser**

Visit `/contact` — should feel welcoming and personal.

**Step 5: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "style: update contact page with friendlier copy"
```

---

### Task 14: Final verification

**Step 1: Run the dev server and visually check all pages**

Run: `npm run dev`

Check each page:
- `/` — Lighter blue hero gradient → white, split hero layout, testimonials section, warm copy
- `/about` — Lighter hero, personal story copy
- `/faq` — Conversational answers
- `/contact` — Welcoming tone
- `/quote` — Colors cascade through (no content changes)
- `/auto-coverage` — Colors cascade through
- Footer on every page — "Lot Solutions Inc." instead of PCRS

**Step 2: Run build to check for errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 3: Commit any fixes if needed**

If build reveals issues, fix and commit individually.
