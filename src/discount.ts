export function applyDiscount(price: number, percent: number): number {
  if (percent < 0 || percent > 100) {
    throw new RangeError("percent must be between 0 and 100");
  }
  return price * (1 - percent / 100);
}
