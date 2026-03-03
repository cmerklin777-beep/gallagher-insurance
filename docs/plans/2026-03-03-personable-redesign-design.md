# eTags Personable Redesign — Design Document

**Date:** 2026-03-03
**Approach:** Component Redesign (Approach B)

## Goals

1. Replace customer-facing "PCRS" references with "Lot Solutions Inc."
2. Make the site more personable — friendly tone, testimonials, warmth
3. Shift color scheme to lighter blue with gradient to white

## 1. Color Scheme Overhaul

All colors are defined as CSS custom properties in `src/app/globals.css`. The entire palette shifts lighter.

### New Palette

| Token | Old | New | Usage |
|-------|-----|-----|-------|
| `navy-950` | `#01132c` | `#1a5276` | Footer |
| `navy-900` | `#0F1F3D` | `#2471a3` | Header |
| `navy-800` | `#1B365D` | `#2e86c1` | Borders, accents |
| `navy-700` | `#2A4A7F` | `#3498db` | Mid-tone |
| `navy-600` | `#3B6098` | `#5dade2` | Secondary |
| `navy-500` | `#5A7EB5` | `#85c1e9` | Light accents |
| `navy-100` | `#C8D6E5` | `#d6eaf8` | Light borders |
| `navy-50` | `#EDF2F7` | `#ebf5fb` | Subtle backgrounds |

### Gradient Strategy

- **Header:** Solid `#2471a3`
- **Hero:** Gradient `#2e86c1` → `#85c1e9` → white
- **Body:** White with alternating `#ebf5fb` section backgrounds
- **Footer:** `#1a5276` for grounding
- `.hero-mesh` class rewritten for the new gradient

## 2. PCRS → Lot Solutions Inc.

Customer-facing text only. Internal API code unchanged.

| File | Change |
|------|--------|
| `Footer.tsx` | "administered by PCRS" → "administered by Lot Solutions Inc." |
| `chatbot-knowledge.ts` | "administered by PCRS" → "administered by Lot Solutions Inc." |
| `CheckoutStep.tsx` | "Error adding note to PCRS" → "Error adding note to contract" |

## 3. Component Redesign

### 3a. HeroSection.tsx (rewrite)

- Split layout: warm copy on left, person image placeholder on right
- Headline: "We're here to keep you on the road" (or similar warm phrasing)
- Subtext emphasizing real people helping real customers
- CTA buttons remain
- Micro-stats get softer card treatment with rounded icons
- Light blue gradient background flowing to white

### 3b. Testimonials.tsx (new component)

- Card grid with 3 placeholder testimonials
- Each card: quote text, customer name, star rating, vehicle type
- Rounded cards, subtle shadows, decorative quote marks
- Placed between TrustSignals and HowItWorks on homepage

### 3c. TrustSignals.tsx (rewrite)

- Same 4 signals (ASE Certified, Nationwide, $0 Deductible, Quick Claims)
- Friendlier design with warmer descriptions
- Section header: "Why families trust us"

### 3d. HowItWorks.tsx (rewrite)

- Same 3 steps with friendlier illustrations and connector lines
- Warmer copy
- Section header: "Getting covered is easy"

### 3e. Header.tsx (update)

- Lighter blue background matching new palette
- Same navigation structure
- Phone number stays prominent

### 3f. Footer.tsx (update)

- "Lot Solutions Inc." replaces PCRS
- Lighter treatment matching new palette
- Same link structure

### 3g. Copy Tone Shift

- About page: warmer "we're real people" language
- FAQ: more conversational answers
- Contact: "we'd love to hear from you" feel

## 4. Homepage Flow (top to bottom)

1. Header (lighter blue)
2. Hero (gradient blue → white, split layout with person image placeholder)
3. QuoteEntryForm (white background)
4. Feature Cards (white/light blue alternating)
5. TrustSignals ("Why families trust us")
6. **Testimonials (NEW)**
7. HowItWorks ("Getting covered is easy")
8. CTA banner
9. Footer (Lot Solutions Inc.)

## 5. Out of Scope

- Quote wizard flow (`/quote`) — only color cascade
- API routes — no backend changes
- ChatWidget — functional changes, just color cascade
- Auto-coverage, Terms, Cookies pages — color cascade only
- State management (Zustand) — untouched
- Package dependencies — no new packages
