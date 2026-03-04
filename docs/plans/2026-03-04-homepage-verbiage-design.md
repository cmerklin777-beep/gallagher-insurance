# Homepage Verbiage Redesign

**Date:** 2026-03-04
**Scope:** Homepage only — copy swaps + one micro-stat swap
**Tone:** Subtle confidence
**Core narrative:** Direct-to-consumer / no middlemen = savings passed to the customer

---

## Approach

Copy Swaps + New Micro-Elements (Approach 2). No new sections are added.
Every change weaves the direct-pricing story into the existing page structure.
The cost story is told through *why* (no showroom, no broker) rather than discount badges.

---

## Section-by-Section Changes

### 1. Hero (HeroSection.tsx)

| Element | Current | New |
|---------|---------|-----|
| Pill badge | "Trusted by thousands of drivers" | "Direct-to-you coverage — no dealership markup" |
| H1 | "We're here to keep you on the road." | "Coverage built for you, not for middlemen." |
| Body | "Real people, real coverage. Our team helps you find the right Vehicle Service Contract so unexpected repairs never slow you down." | "We cut out the dealership markup and broker commissions so you get the same top-tier protection at a fraction of the cost — all online, in minutes." |
| Micro stat 1 | "4 Coverage Tiers" | "No Dealer Markup" |

Micro stats 2 and 3 unchanged (Nationwide Network, $0 Deductible Options).

### 2. Value Proposition (page.tsx — "Why choose eTags")

| Element | Current | New |
|---------|---------|-----|
| H2 | "Your car takes care of you. Let us take care of it." | "The protection you'd expect from a dealership — without the dealership price tag." |
| Body | "Unexpected repairs happen — but they don't have to break the bank. Our Vehicle Service Contracts give you the peace of mind..." | "Dealerships charge a premium because they can. We built a smarter way — the same certified coverage, sold directly to you online. No showroom overhead, no broker fees, just honest pricing on Vehicle Service Contracts that actually protect you." |

### 3. Feature Highlight Cards (page.tsx)

| Card | Title Change | New Body |
|------|-------------|----------|
| 1 | No change ("Plans that fit your life") | "From powertrain basics to bumper-to-bumper, pick the tier that fits — priced without the dealership markup baked in." |
| 2 | "Quick and easy enrollment" → "Built for how you buy" | "No waiting rooms, no finance-office upsell. Our platform was designed from day one to get you covered online in minutes." |
| 3 | No change ("Four tiers of protection") | No change |
| 4 | No change ("Repairs anywhere you are") | "Use any ASE-Certified mechanic at thousands of shops nationwide. You choose where — not a dealership service department." |

### 4. Trust Signals (TrustSignals.tsx)

| Element | Current | New |
|---------|---------|-----|
| Section H2 | "Why families trust us" | "Why drivers switch to us" |
| Sub-heading | "We make protecting your vehicle simple, honest, and affordable." | "Same certified protection. Direct pricing. No middlemen." |
| $0 Deductible card body | "Keep more money in your pocket. Choose a plan with zero out-of-pocket costs at the repair shop." | "Zero out-of-pocket at the shop — savings we can offer because we don't have a showroom to pay for." |

ASE Certified, Nationwide Coverage, and Hassle-Free Claims cards unchanged.

### 5. How It Works (HowItWorks.tsx)

| Element | Current | New |
|---------|---------|-----|
| Section H2 | "Getting covered is easy" | "We made it this simple on purpose" |
| Sub-heading | "Three simple steps. No phone calls, no pressure." | "No phone calls, no finance office, no pressure. Just you and your quote." |
| Step 2 body | "We'll show you coverage plans tailored to your vehicle, with clear pricing and no hidden fees." | "See coverage plans tailored to your vehicle with direct-to-you pricing — no hidden fees, no dealer markups." |

Steps 1 and 3 unchanged.

### 6. Testimonials (Testimonials.tsx)

No changes. Authentic social proof should not be modified.

### 7. Final CTA (page.tsx)

| Element | Current | New |
|---------|---------|-----|
| H2 | "Let's get you covered" | "See what coverage costs without the markup" |
| Body | "It takes less than a minute to see your personalized coverage options. No sales calls, no commitment — just honest protection for your vehicle." | "It takes less than a minute to see your personalized options — priced directly, with nothing added on. No sales calls, no commitment." |

---

## Files Modified

1. `src/components/landing/HeroSection.tsx` — pill, H1, body, micro stat
2. `src/app/page.tsx` — value prop section, feature cards, final CTA
3. `src/components/landing/TrustSignals.tsx` — header, sub, one card body
4. `src/components/landing/HowItWorks.tsx` — header, sub, step 2 body

## Files Not Modified

- `src/components/landing/Testimonials.tsx`
- `src/components/landing/QuoteEntryForm.tsx`
