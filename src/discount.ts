// src/discount.ts
export function applyDiscount(price: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new RangeError("percent must be between 0 and 100");
  }
  if (price < 0) {
    throw new RangeError("price must be non-negative");
  }
  return Math.round(price * (1 - percent / 100) * 100) / 100;
}
