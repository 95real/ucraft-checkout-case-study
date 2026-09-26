/**
 * This is a simplified illustrative example reconstructed for this case study.
 * It is not UCRAFT production source code.
 */

export type ValidationIssue = {
  field: string;
  message: string;
};

export type Validator<T> = (value: T) => ValidationIssue[];

export type CheckoutDraft = {
  contact?: string;
  fulfillmentChoice?: string;
  paymentChoice?: string;
};

export type CheckoutCapabilities = {
  collectContact: boolean;
  collectFulfillment: boolean;
  collectPayment: boolean;
};

export function composeValidators<T>(
  ...validators: Validator<T>[]
): Validator<T> {
  return value => validators.flatMap(validate => validate(value));
}

const requireContact: Validator<CheckoutDraft> = draft =>
  draft.contact ? [] : [{ field: 'contact', message: 'Contact is required' }];

const requireFulfillment: Validator<CheckoutDraft> = draft =>
  draft.fulfillmentChoice
    ? []
    : [{ field: 'fulfillmentChoice', message: 'Choose fulfillment' }];

const requirePayment: Validator<CheckoutDraft> = draft =>
  draft.paymentChoice
    ? []
    : [{ field: 'paymentChoice', message: 'Choose payment' }];

export function buildCheckoutValidator(
  capabilities: CheckoutCapabilities
): Validator<CheckoutDraft> {
  const validators: Validator<CheckoutDraft>[] = [];

  if (capabilities.collectContact) validators.push(requireContact);
  if (capabilities.collectFulfillment) validators.push(requireFulfillment);
  if (capabilities.collectPayment) validators.push(requirePayment);

  return composeValidators(...validators);
}
