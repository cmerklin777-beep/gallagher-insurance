# VIN Auto-Decode Design

**Date:** 2026-03-02
**Status:** Approved

## Problem

Users must manually enter Year, Make, and Model alongside their VIN on the quote form. This is redundant — all that info is encoded in the VIN — and creates friction (and potential mismatches).

## Solution

Auto-decode the VIN using the free NHTSA API. When a user enters a 17-character VIN, automatically populate Year, Make, and Model as read-only fields.

## Architecture

### New API Route: `POST /api/vehicles/decode-vin`

- Accepts `{ vin: string }`
- Validates VIN format (17 chars, no I/O/Q)
- Calls NHTSA: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{VIN}?format=json`
- Extracts and returns `{ year, make, model }` from NHTSA response
- Returns error message if VIN is invalid or NHTSA returns no data

### VehicleInfoStep Component Changes

**Field order change:** VIN (top) → Year → Make → Model → Mileage → Submit

**Auto-decode trigger:** When VIN input reaches exactly 17 valid characters, automatically call `/api/vehicles/decode-vin`.

**States:**
- *Idle:* VIN field empty or < 17 chars. Year/Make/Model are empty, editable placeholders.
- *Decoding:* VIN has 17 chars, API call in progress. Show small spinner on Year/Make/Model fields.
- *Decoded:* Success. Year/Make/Model are read-only with green checkmark. Show "clear" button on VIN to reset.
- *Error:* NHTSA returned no data. Show inline error, unlock Year/Make/Model for manual entry as fallback.

**URL param integration:** If `?vin=` is provided (e.g. from chatbot link), auto-decode on mount.

### Error Handling

- Invalid VIN format: inline validation error, no API call
- NHTSA returns no results: "Could not decode this VIN. Please enter vehicle details manually."
- Network error: same fallback to manual entry
- NHTSA timeout: 5-second timeout, fallback to manual

## Data Flow

```
User types VIN (17 chars)
  → POST /api/vehicles/decode-vin { vin }
    → NHTSA DecodeVinValues API
    ← { year, make, model }
  ← Auto-fill form fields (read-only)
User enters mileage
  → Clicks "Check My Coverage Options"
    → POST /api/coverage/rates (existing flow, unchanged)
```

## No New Dependencies

NHTSA API is free, no key required, no npm packages needed. Server-side fetch only.
