'use client';

import { create } from 'zustand';
import type {
  WizardStep,
  VehicleInfo,
  SelectedCoverage,
  CostBreakdown,
  PreviewBucket,
  Customer,
  CoverageRate,
} from '@/lib/types';

interface VehicleState {
  vehicle: VehicleInfo | null;
  coverage: SelectedCoverage | null;
  costs: CostBreakdown | null;
  previewBuckets: PreviewBucket[] | null;
  saleOdometer: number;
}

interface QuoteState {
  // Wizard navigation
  currentStep: WizardStep;
  setStep: (step: WizardStep) => void;

  // Vehicle data (max 2)
  vehicles: VehicleState[];
  currentVehicleIndex: number;
  setVehicleInfo: (index: number, vehicle: VehicleInfo, odometer: number) => void;
  setVehicleCoverage: (index: number, coverage: SelectedCoverage, costs: CostBreakdown) => void;
  setVehiclePreview: (index: number, buckets: PreviewBucket[]) => void;
  addVehicleSlot: () => void;
  setCurrentVehicleIndex: (index: number) => void;
  removeVehicle: (index: number) => void;

  // Available rates (from API)
  availableRates: CoverageRate[];
  setAvailableRates: (rates: CoverageRate[]) => void;

  // Pending tier selection (between tier-selection and options-addons steps)
  pendingTierCode: string | null;
  pendingTermIndex: number;
  setPendingTier: (code: string, termIndex: number) => void;

  // Customer
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;

  // Cart
  paymentType: 'full' | 'buydown';
  setPaymentType: (type: 'full' | 'buydown') => void;
  getMasterPrice: () => number;

  /** Amount actually charged at checkout (after discounts); set on payment success for success page */
  amountPaidAtCheckout: number | null;
  setAmountPaidAtCheckout: (amount: number) => void;

  // Reset
  reset: () => void;
}

const emptyVehicle = (): VehicleState => ({
  vehicle: null,
  coverage: null,
  costs: null,
  previewBuckets: null,
  saleOdometer: 0,
});

export const useQuoteStore = create<QuoteState>((set, get) => ({
  currentStep: 'vehicle-info',
  setStep: (step) => set({ currentStep: step }),

  vehicles: [emptyVehicle()],
  currentVehicleIndex: 0,
  setVehicleInfo: (index, vehicle, odometer) =>
    set((state) => {
      const vehicles = [...state.vehicles];
      vehicles[index] = { ...vehicles[index], vehicle, saleOdometer: odometer };
      return { vehicles };
    }),
  setVehicleCoverage: (index, coverage, costs) =>
    set((state) => {
      const vehicles = [...state.vehicles];
      vehicles[index] = { ...vehicles[index], coverage, costs };
      return { vehicles };
    }),
  setVehiclePreview: (index, buckets) =>
    set((state) => {
      const vehicles = [...state.vehicles];
      vehicles[index] = { ...vehicles[index], previewBuckets: buckets };
      return { vehicles };
    }),
  addVehicleSlot: () =>
    set((state) => {
      if (state.vehicles.length >= 2) return state;
      return {
        vehicles: [...state.vehicles, emptyVehicle()],
        currentVehicleIndex: state.vehicles.length,
      };
    }),
  setCurrentVehicleIndex: (index) => set({ currentVehicleIndex: index }),
  removeVehicle: (index) =>
    set((state) => {
      const vehicles = state.vehicles.filter((_, i) => i !== index);
      // Always keep at least one slot
      if (vehicles.length === 0) vehicles.push(emptyVehicle());
      return {
        vehicles,
        currentVehicleIndex: Math.min(state.currentVehicleIndex, vehicles.length - 1),
      };
    }),

  availableRates: [],
  setAvailableRates: (rates) => set({ availableRates: rates }),

  pendingTierCode: null,
  pendingTermIndex: 0,
  setPendingTier: (code, termIndex) => set({ pendingTierCode: code, pendingTermIndex: termIndex }),

  customer: null,
  setCustomer: (customer) => set({ customer }),

  paymentType: 'full',
  setPaymentType: (type) => set({ paymentType: type }),

  getMasterPrice: () => {
    const state = get();
    let total = 0;
    for (const v of state.vehicles) {
      if (v.costs) total += v.costs.totalPrice;
    }
    return total;
  },

  amountPaidAtCheckout: null,
  setAmountPaidAtCheckout: (amount) => set({ amountPaidAtCheckout: amount }),

  reset: () =>
    set({
      currentStep: 'vehicle-info',
      vehicles: [emptyVehicle()],
      currentVehicleIndex: 0,
      availableRates: [],
      pendingTierCode: null,
      pendingTermIndex: 0,
      customer: null,
      paymentType: 'full',
      amountPaidAtCheckout: null,
    }),
}));
