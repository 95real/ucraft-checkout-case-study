/**
 * This is a simplified illustrative example reconstructed for this case study.
 * It is not UCRAFT production source code.
 */

export type Unsubscribe = () => void;

export type DomainStore<T> = {
  getSnapshot(): Readonly<T>;
  subscribe(listener: () => void): Unsubscribe;
  update(reducer: (current: Readonly<T>) => T): void;
};

export function createDomainStore<T>(initialState: T): DomainStore<T> {
  let snapshot = initialState;
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(reducer) {
      snapshot = reducer(snapshot);
      listeners.forEach(listener => listener());
    }
  };
}

type CheckoutViewState = {
  stage: 'details' | 'fulfillment' | 'payment';
  busy: boolean;
};

export const checkoutViewStore = createDomainStore<CheckoutViewState>({
  stage: 'details',
  busy: false
});

export function moveToPayment(): void {
  checkoutViewStore.update(current => ({
    ...current,
    stage: 'payment'
  }));
}
