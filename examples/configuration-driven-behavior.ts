/**
 * This is a simplified illustrative example reconstructed for this case study.
 * It is not UCRAFT production source code.
 */

export type ProductFamily =
  | 'physical'
  | 'digital'
  | 'subscription'
  | 'scheduled-service'
  | 'stored-value';

export type CheckoutStep = 'details' | 'fulfillment' | 'payment';
export type CustomerState = 'guest' | 'authenticated';

export type CheckoutContext = {
  productFamily: ProductFamily;
  step: CheckoutStep;
  customer: CustomerState;
  project: {
    journey: 'single-page' | 'guided';
    guestCheckout: boolean;
  };
  hasAmountDue: boolean;
};

export type CheckoutCapabilities = {
  collectContact: boolean;
  collectFulfillment: boolean;
  collectSchedule: boolean;
  collectPayment: boolean;
  showStepNavigation: boolean;
  allowGuestProgress: boolean;
};

export function deriveCheckoutCapabilities(
  context: CheckoutContext
): CheckoutCapabilities {
  const allSectionsVisible = context.project.journey === 'single-page';

  return {
    collectContact: allSectionsVisible || context.step === 'details',
    collectFulfillment:
      context.productFamily === 'physical' &&
      (allSectionsVisible || context.step === 'fulfillment'),
    collectSchedule: context.productFamily === 'scheduled-service',
    collectPayment:
      context.hasAmountDue &&
      (allSectionsVisible || context.step === 'payment'),
    showStepNavigation: context.project.journey === 'guided',
    allowGuestProgress:
      context.customer === 'authenticated' || context.project.guestCheckout
  };
}
