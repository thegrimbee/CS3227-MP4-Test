import assert from "node:assert/strict";
import { test } from "node:test";
import { applyDiscount } from "../src/discount.ts";

test("rounds $19.99 at 15% off to $16.99", () => {
  assert.equal(applyDiscount(19.99, 15), 16.99);
});

test("rounds discounted prices up and down to the nearest cent", () => {
  assert.equal(applyDiscount(10.01, 10), 9.01);
  assert.equal(applyDiscount(10.04, 10), 9.04);
});

test("applies 25% off $200 as $150", () => {
  assert.equal(applyDiscount(200, 25), 150);
});

test("rejects negative prices", () => {
  assert.throws(() => applyDiscount(-19.99, 15), RangeError);
});

test("rejects discounts above 100%", () => {
  assert.throws(() => applyDiscount(100, 150), RangeError);
});

test("rejects negative discounts", () => {
  assert.throws(() => applyDiscount(100, -1), RangeError);
});

test("accepts zero prices and discounts at both boundaries", () => {
  assert.equal(applyDiscount(0, 15), 0);
  assert.equal(applyDiscount(19.99, 0), 19.99);
  assert.equal(applyDiscount(19.99, 100), 0);
});

const invalidInputs: ReadonlyArray<readonly [string, unknown]> = [
  ["missing", undefined],
  ["null", null],
  ["numeric string", "19.99"],
  ["non-numeric string", "invalid"],
  ["empty string", ""],
  ["boolean", true],
  ["object", {}],
  ["NaN", NaN],
  ["positive infinity", Infinity],
  ["negative infinity", -Infinity],
];

for (const [label, value] of invalidInputs) {
  test(`rejects a ${label} price`, () => {
    assert.throws(() => Reflect.apply(applyDiscount, undefined, [value, 15]), TypeError);
  });

  test(`rejects a ${label} discount`, () => {
    assert.throws(() => Reflect.apply(applyDiscount, undefined, [100, value]), TypeError);
  });
}

test("rejects omitted arguments", () => {
  assert.throws(() => Reflect.apply(applyDiscount, undefined, []), TypeError);
  assert.throws(() => Reflect.apply(applyDiscount, undefined, [100]), TypeError);
});
