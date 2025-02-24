import { bigSqrt } from "../utils/bigSqrt.ts";
// Problem 80: Square root digital expansion
// It is well known that if the square root of a natural number is not an integer, then it is irrational.
// The decimal expansion of such square roots is infinite without any repeating pattern at all.


// The square root of two is 1.41421356237309504880..., and the digital sum of the first one hundred decimal digits is 475.

// For the first n natural numbers, find the total of the digital sums of the first one hundred decimal digits for all the irrational square roots.

// Source for arbitrary sqrt
// https://stackoverflow.com/questions/58170806/how-to-compute-and-store-the-digits-of-sqrtn-up-to-106-decimal-places
export function sqrtDigitalExpansion(n: number) {
  const sums = [];

  for (let i = 2; i <= n; ++i) {
    const isInteger = Number.isInteger(Math.sqrt(i));

    if (isInteger) continue;

    const sum = bigSqrt(i, 100)
      .split(".")
      .join("")
      .split("")
      .reduce((a, n) => a + Number(n), 0);

    sums.push(sum);
  }

  return sums.reduce((acc, num) => acc + num);
}

