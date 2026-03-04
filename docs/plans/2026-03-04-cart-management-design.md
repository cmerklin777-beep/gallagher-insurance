# Cart Management — Edit/Remove Vehicles in Cart Review

**Date:** 2026-03-04
**Status:** Approved

## Problem

On the Cart Review step, users cannot edit or remove individual vehicle coverages. The only options are "Add More Coverage" (starts a new vehicle) or "Proceed to Checkout." If a user wants to change a plan or remove a vehicle, they have no path back.

## Design

Add **Edit** and **Remove** actions to each vehicle's summary card on the Cart Review page.

### Store Changes (`quote-store.ts`)

Add a `removeVehicle(index: number)` action:
- Splices the vehicle out of the `vehicles` array
- Adjusts `currentVehicleIndex` if needed (clamp to valid range)

### Component Changes

**`VehicleCoverageSummary.tsx`** — Add optional `onEdit` and `onRemove` callback props:
- When present, render a pencil (Edit) and trash (Remove) icon button in the card header row
- Buttons only appear when callbacks are provided (so Checkout summary cards remain read-only)

**`CartReview.tsx`** — Wire up handlers:
- **Edit:** Sets `currentVehicleIndex` to the vehicle's index, then navigates to `plan-selection`. Vehicle info (VIN, make, model, mileage) is preserved — user just re-selects plan/options.
- **Remove:** Inline confirm pattern — first click swaps the Remove button to "Remove this vehicle?" confirmation text with Confirm/Cancel. Second click calls `removeVehicle(index)`. If no covered vehicles remain, redirect to `vehicle-info`.

### Key Behaviors

- Checkout page's summary cards do NOT get edit/remove (payment step is too late)
- After editing, user flows Plan → Options → Cart Review naturally
- Removing the only vehicle sends user back to Vehicle Info step
- Max 2 vehicles enforced elsewhere; no changes needed here

### Files Modified

1. `src/store/quote-store.ts` — add `removeVehicle` action
2. `src/components/quote/VehicleCoverageSummary.tsx` — optional edit/remove callbacks + UI
3. `src/components/quote/CartReview.tsx` — pass handlers, handle post-remove redirect
