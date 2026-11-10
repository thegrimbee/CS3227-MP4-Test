export type DiscountAuditEntry = {
  price: number;
  percent: number;
  discountedPrice: number;
};

const discountAuditTrail: DiscountAuditEntry[] = [];

export function applyDiscount(price: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new RangeError("percent must be between 0 and 100");
  }

  const discountedPrice = price * (1 - percent / 100);
  discountAuditTrail.push({ price, percent, discountedPrice });
  return discountedPrice;
}

export function getDiscountAuditTrail(): DiscountAuditEntry[] {
  return discountAuditTrail.map((entry) => ({ ...entry }));
}
