export type DiscountAuditEntry = {
  price: number;
  percent: number;
  discountedPrice: number;
};

const discountAuditTrail: DiscountAuditEntry[] = [];

export function applyDiscount(price: number, percent: number): number {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    throw new TypeError("price must be a finite number");
  }
  if (typeof percent !== "number" || !Number.isFinite(percent)) {
    throw new TypeError("percent must be a finite number");
  }
  if (price < 0) {
    throw new RangeError("price must not be negative");
  }
  if (percent < 0 || percent > 100) {
    throw new RangeError("percent must be between 0 and 100");
  }

  const result = price * (1 - percent / 100);
  const discountedPrice =
    result < Number.MAX_VALUE / 100
      ? Math.round((result + Number.EPSILON) * 100) / 100
      : result;
  discountAuditTrail.push({ price, percent, discountedPrice });
  return discountedPrice;
}

export function getDiscountAuditTrail(): DiscountAuditEntry[] {
  return discountAuditTrail.map((entry) => ({ ...entry }));
}
