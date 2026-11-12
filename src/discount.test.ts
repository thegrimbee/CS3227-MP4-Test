// tests/discount.test.ts, added
test("rounds to cents", () => {
  expect(applyDiscount(19.99, 15)).toBe(16.99);
});
