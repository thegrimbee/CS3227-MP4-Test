import { applyDiscount } from "../src/discount";

test("applies a normal discount", () => {
  expect(applyDiscount(200, 25)).toBe(150);
});

test("throws on invalid percent", () => {
  expect(() => applyDiscount(100, 150)).toThrow();
});
