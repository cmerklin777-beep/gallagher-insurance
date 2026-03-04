// Tier descriptions for the info popups -- legally compliant (no forbidden terms)
export const TIER_DESCRIPTIONS: Record<string, { stars: number; summary: string }> = {
  Essential: {
    stars: 1,
    summary:
      'Essential Protection covers the engine, transmission/transaxle, and transfer case (or all-wheel drive mechanism). Ideal for high-mileage vehicles you want to keep on the road.',
  },
  'Essential Plus': {
    stars: 2,
    summary:
      'Essential Plus includes everything in Essential, plus CV joints, water pump, oil pump, fuel system, timing belt, electrical components, factory turbo/supercharger, A/C, seals and gaskets, and more.',
  },
  Premium: {
    stars: 3,
    summary:
      'Premium is the most extensive listed-component contract. Includes Essential Plus coverage, plus the cooling system, brake system, steering, fluids, and more.',
  },
  Exclusive: {
    stars: 4,
    summary:
      'Exclusive is the most comprehensive protection plan. Covers all vehicle components EXCEPT specifically listed exclusions (light bulbs, brake pads/rotors, keys/fobs, manual clutches, batteries, routine maintenance, tires, body panels, spark plugs). See Service Contract for full exclusion list.',
  },
};

export const TIER_ORDER = ['Essential', 'Essential Plus', 'Premium', 'Exclusive'];

export const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' }, { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

// Business rule constants shared across CartReview and CheckoutStep
export const BUNDLE_DISCOUNT_PERCENT = 10;
export const BUYDOWN_TERM_MONTHS = 6;
export const RESERVE_BUCKET_CODES = ['TOTALRATE', 'RESERVE', 'SURCHARGE', 'ROADF', 'ROADR'] as const;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
