# Homepage Verbiage Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Weave a direct-to-consumer / no-middlemen narrative into the existing homepage copy to build trust and hint that technology-driven pricing saves customers money.

**Architecture:** Pure copy swaps across 4 existing files. No new components, no structural changes, no new dependencies. One icon swap in the hero micro-stats (ShieldCheck → DollarSign for "No Dealer Markup").

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, lucide-react icons

**Design doc:** `docs/plans/2026-03-04-homepage-verbiage-design.md`

---

### Task 1: Update Hero Section copy (HeroSection.tsx)

**Files:**
- Modify: `src/components/landing/HeroSection.tsx`

**Step 1: Swap the icon import**

Change line 3:
```tsx
// FROM:
import { ArrowRight, ShieldCheck, MapPin, Star } from 'lucide-react';
// TO:
import { ArrowRight, DollarSign, MapPin, Star } from 'lucide-react';
```

**Step 2: Update the pill badge text**

Change:
```
Trusted by thousands of drivers
```
To:
```
Direct-to-you coverage — no dealership markup
```

**Step 3: Update the H1**

Change:
```tsx
We&apos;re here to keep you{' '}
<span className="text-action">on the road</span>.
```
To:
```tsx
Coverage built for you,{' '}
<span className="text-action">not for middlemen</span>.
```

**Step 4: Update the body paragraph**

Change:
```
Real people, real coverage. Our team helps you find the right
Vehicle Service Contract so unexpected repairs never slow you down.
```
To:
```
We cut out the dealership markup and broker commissions so you
get the same top-tier protection at a fraction of the cost — all
online, in minutes.
```

**Step 5: Swap micro stat 1 — icon + label**

Change:
```tsx
<ShieldCheck className="h-4 w-4 text-accent" />
<span>4 Coverage Tiers</span>
```
To:
```tsx
<DollarSign className="h-4 w-4 text-accent" />
<span>No Dealer Markup</span>
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 7: Commit**

```bash
git add src/components/landing/HeroSection.tsx
git commit -m "copy: update hero section with direct-to-consumer messaging"
```

---

### Task 2: Update Value Prop + Feature Cards + Final CTA (page.tsx)

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update the value prop H2**

Change:
```
Your car takes care of you. Let us take care of it.
```
To:
```
The protection you&apos;d expect from a dealership — without the dealership price tag.
```

**Step 2: Update the value prop body paragraph**

Change:
```
Unexpected repairs happen — but they don&apos;t have to break the bank.
Our{' '}
<span className="font-semibold text-navy-900 underline decoration-accent/60 underline-offset-4">
  Vehicle Service Contracts
</span>{' '}
give you the peace of mind that comes from knowing you&apos;re covered, no matter what
the road throws at you.
```
To:
```
Dealerships charge a premium because they can. We built a smarter way — the same
certified coverage, sold directly to you online. No showroom overhead, no broker
fees, just honest pricing on{' '}
<span className="font-semibold text-navy-900 underline decoration-accent/60 underline-offset-4">
  Vehicle Service Contracts
</span>{' '}
that actually protect you.
```

**Step 3: Update feature card 1 body**

Change:
```
From basic powertrain to bumper-to-bumper, choose the coverage level that makes sense for you and your budget.
```
To:
```
From powertrain basics to bumper-to-bumper, pick the tier that fits — priced without the dealership markup baked in.
```

**Step 4: Update feature card 2 title + body**

Title change:
```
Quick and easy enrollment
```
To:
```
Built for how you buy
```

Body change:
```
No paperwork, no waiting rooms. Get covered online in minutes from the comfort of your couch.
```
To:
```
No waiting rooms, no finance-office upsell. Our platform was designed from day one to get you covered online in minutes.
```

**Step 5: Update feature card 4 body**

Change:
```
Take your car to any ASE-Certified mechanic at thousands of repair shops across the country.
```
To:
```
Use any ASE-Certified mechanic at thousands of shops nationwide. You choose where — not a dealership service department.
```

**Step 6: Update Final CTA H2**

Change:
```
Let&apos;s get you covered
```
To:
```
See what coverage costs without the markup
```

**Step 7: Update Final CTA body**

Change:
```
It takes less than a minute to see your personalized coverage options. No sales calls, no commitment — just honest protection for your vehicle.
```
To:
```
It takes less than a minute to see your personalized options — priced directly, with nothing added on. No sales calls, no commitment.
```

**Step 8: Verify build**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 9: Commit**

```bash
git add src/app/page.tsx
git commit -m "copy: update value prop, feature cards, and final CTA with direct pricing narrative"
```

---

### Task 3: Update Trust Signals (TrustSignals.tsx)

**Files:**
- Modify: `src/components/landing/TrustSignals.tsx`

**Step 1: Update section H2**

Change:
```
Why families trust us
```
To:
```
Why drivers switch to us
```

**Step 2: Update sub-heading**

Change:
```
We make protecting your vehicle simple, honest, and affordable.
```
To:
```
Same certified protection. Direct pricing. No middlemen.
```

**Step 3: Update $0 Deductible card description**

Change:
```
Keep more money in your pocket. Choose a plan with zero out-of-pocket costs at the repair shop.
```
To:
```
Zero out-of-pocket at the shop — savings we can offer because we don't have a showroom to pay for.
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 5: Commit**

```bash
git add src/components/landing/TrustSignals.tsx
git commit -m "copy: update trust signals with direct-pricing positioning"
```

---

### Task 4: Update How It Works (HowItWorks.tsx)

**Files:**
- Modify: `src/components/landing/HowItWorks.tsx`

**Step 1: Update section H2**

Change:
```
Getting covered is easy
```
To:
```
We made it this simple on purpose
```

**Step 2: Update sub-heading**

Change:
```
Three simple steps. No phone calls, no pressure.
```
To:
```
No phone calls, no finance office, no pressure. Just you and your quote.
```

**Step 3: Update step 2 description**

Change:
```
We'll show you coverage plans tailored to your vehicle, with clear pricing and no hidden fees.
```
To:
```
See coverage plans tailored to your vehicle with direct-to-you pricing — no hidden fees, no dealer markups.
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Compiles with no errors.

**Step 5: Commit**

```bash
git add src/components/landing/HowItWorks.tsx
git commit -m "copy: update how-it-works with tech-forward messaging"
```

---

### Task 5: Final verification + push

**Step 1: Full build**

Run: `npm run build`
Expected: Clean compile, no warnings related to changed files.

**Step 2: Visual check**

Start the dev server and verify the homepage loads correctly:
- Hero copy updated, "No Dealer Markup" stat visible with DollarSign icon
- Value prop section shows new headline and body
- Feature cards show updated titles/bodies
- Trust signals show "Why drivers switch to us" and updated $0 Deductible card
- How It Works shows "We made it this simple on purpose"
- Final CTA shows "See what coverage costs without the markup"

**Step 3: Push**

```bash
git push origin main
```
