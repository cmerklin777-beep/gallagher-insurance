# Quote Wizard Redesign — Design Document

**Date:** 2026-03-03

## Summary

Split the quote wizard's plan selection step into two distinct steps and add UX improvements: a VIN info popover, interactive vehicle coverage diagrams, and a dedicated options/surcharges step.

## Changes

### 1. VIN Info Popover
- Small `(i)` icon next to VIN input label
- On click, floating popover shows diagram of where to find a VIN:
  - Dashboard (driver's side near windshield)
  - Driver's door jamb sticker
  - Vehicle registration / insurance card
- Click outside or click icon again to dismiss

### 2. New Wizard Step Order (6 steps total, 5 visible in progress bar)
1. **Vehicle Info** — same as current, plus VIN info popover
2. **Tier Selection** — refactored from PlanSelectionStep (tier + term only, no add-ons)
3. **Options & Surcharges** — new step for selectable add-ons with descriptions and price impact
4. **Cart Review** — unchanged
5. **Checkout** — unchanged
6. **Success** — hidden from progress bar, unchanged

### 3. Tier Selection Step (refactored)
- Four horizontal cards (responsive: 4-col desktop, 2-col tablet, 1-col mobile)
- **Exclusive pre-selected** instead of Premium
- Each card: tier name, star rating, base price, term dropdown, deductible
- On hover: SVG vehicle diagram appears showing highlighted component regions covered by that tier
- No surcharges or add-on checkboxes — those move to next step
- Cleaner card layout; "Select This Plan" proceeds to options step

### 4. SVG Vehicle Diagram
- Side-profile SVG with labeled component regions
- Regions: Engine, Transmission, A/C, Cooling, Electrical, Brakes, Steering, Turbo, CV Joints, High-Tech Electronics, Navigation, ADAS
- Each tier highlights its covered regions in brand accent color; uncovered regions are dimmed gray
- Appears on hover (desktop) or tap (mobile) over a tier card

### 5. Options & Surcharges Step (new)
- Shows selectable add-ons from `components[1].lossCodes` where `isSelectable === true`
- Each add-on shows: description, price delta, checkbox
- Non-selectable surcharges from `components[0]` shown as informational line items
- Running total visible at bottom
- "Continue to Review" button stores final coverage + costs and advances to cart-review

### 6. WizardStep Type Update
Add `'options-addons'` to the union type.

### 7. Store Update
Add `pendingTierCode` and `pendingTermIndex` to hold intermediate selection between tier and options steps.

## Data Flow

```
VehicleInfoStep
  → fetches /api/coverage/rates → stores availableRates
  → advances to 'plan-selection'

TierSelectionStep (plan-selection)
  → user selects tier + term
  → stores pendingTierCode + pendingTermIndex in store
  → advances to 'options-addons'

OptionsStep (options-addons)
  → reads pendingTierCode from store, finds rate in availableRates
  → user toggles add-ons
  → on confirm: computes costs, calls setVehicleCoverage()
  → advances to 'cart-review'

CartReview → Checkout → Success (unchanged)
```

## Files Modified
- `src/lib/types.ts` — add `'options-addons'` to WizardStep
- `src/store/quote-store.ts` — add pending tier state
- `src/components/quote/VehicleInfoStep.tsx` — add VIN info popover
- `src/components/quote/PlanSelectionStep.tsx` — refactor into tier-only selection
- `src/components/quote/PlanCard.tsx` — minor adjustments
- `src/components/quote/QuoteWizard.tsx` — add new step, update progress bar

## Files Created
- `src/components/quote/VehicleDiagram.tsx` — SVG vehicle diagram
- `src/components/quote/OptionsStep.tsx` — surcharges/add-ons step
