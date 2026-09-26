/**
 * This is a simplified illustrative example reconstructed for this case study.
 * It is not UCRAFT production source code.
 */

/**
 * Present-day improvement: this registry illustrates how the design could
 * evolve. It does not describe the original production implementation.
 */

export type PaymentFlow = 'embedded' | 'redirect' | 'offline';

export type PaymentRequest = {
  amount: number;
  currency: string;
};

export type PaymentResult =
  | { status: 'completed'; reference: string }
  | { status: 'redirect'; destination: string }
  | { status: 'pending'; instructions: string };

export type PaymentAdapter = {
  flow: PaymentFlow;
  submit(request: PaymentRequest): Promise<PaymentResult>;
};

export function createPaymentRegistry(
  adapters: Record<string, PaymentAdapter>
): ReadonlyMap<string, PaymentAdapter> {
  return new Map(Object.entries(adapters));
}

export async function submitPayment(
  registry: ReadonlyMap<string, PaymentAdapter>,
  adapterId: string,
  request: PaymentRequest
): Promise<PaymentResult> {
  const adapter = registry.get(adapterId);

  if (!adapter) {
    throw new Error(`Unknown payment adapter: ${adapterId}`);
  }

  return adapter.submit(request);
}
