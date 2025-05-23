import { bigFact } from "../utils/bigFact.ts";
// Problem 20: Factorial digit sum
// n! means n × (n − 1) × ... × 3 × 2 × 1


// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

// Find the sum of the digits n!
export function sumFactorialDigits(n: number) {
  const factorial = BigInt(bigFact(n));
  const sumOfDigits = String(factorial)
    .split("")
    .reduce((acc, number) => acc + Number(number), 0);

  return sumOfDigits;
}

