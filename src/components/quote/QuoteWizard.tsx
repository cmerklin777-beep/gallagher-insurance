'use client';

import { useQuoteStore } from '@/store/quote-store';
import type { WizardStep } from '@/lib/types';
import VehicleInfoStep from './VehicleInfoStep';
import PlanSelectionStep from './PlanSelectionStep';
import OptionsStep from './OptionsStep';
import CartReview from './CartReview';
import CheckoutStep from './CheckoutStep';
import SuccessPage from './SuccessPage';

interface QuoteWizardProps {
  initialVin?: string;
  initialMileage?: number;
}

const STEPS: { key: WizardStep; label: string }[] = [
  { key: 'vehicle-info', label: 'Home Info' },
  { key: 'plan-selection', label: 'Select Plan' },
  { key: 'options-addons', label: 'Options' },
  { key: 'cart-review', label: 'Review' },
  { key: 'checkout', label: 'Checkout' },
];

function getProgressIndex(step: WizardStep): number {
  switch (step) {
    case 'vehicle-info':
      return 0;
    case 'plan-selection':
      return 1;
    case 'options-addons':
      return 2;
    case 'cart-review':
      return 3;
    case 'checkout':
      return 4;
    case 'success':
      return 5;
    default:
      return 0;
  }
}

export default function QuoteWizard({ initialVin, initialMileage }: QuoteWizardProps) {
  const currentStep = useQuoteStore((s) => s.currentStep);

  const progressIndex = getProgressIndex(currentStep);

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      {currentStep !== 'success' && (
        <nav aria-label="Quote progress" className="mx-auto max-w-3xl">
          <ol className="flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const isCompleted = idx < progressIndex;
              const isCurrent = idx === progressIndex;
              return (
                <li key={step.key} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5 w-full">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isCurrent
                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                            : 'bg-navy-100 text-navy-500'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isCurrent ? 'text-accent' : isCompleted ? 'text-success' : 'text-navy-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`mx-2 mt-[-1.25rem] h-0.5 flex-1 transition-colors ${
                        idx < progressIndex ? 'bg-success' : 'bg-navy-100'
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Active Step */}
      {currentStep === 'vehicle-info' && (
        <VehicleInfoStep initialVin={initialVin} initialMileage={initialMileage} />
      )}
      {currentStep === 'plan-selection' && <PlanSelectionStep />}
      {currentStep === 'options-addons' && <OptionsStep />}
      {currentStep === 'cart-review' && <CartReview />}
      {currentStep === 'checkout' && <CheckoutStep />}
      {currentStep === 'success' && <SuccessPage />}
    </div>
  );
}
