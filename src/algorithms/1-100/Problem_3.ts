import { sieve } from "../utils/sieve.ts";

// Problem 3: Largest prime factor
// The prime factors of 13195 are 5, 7, 13 and 29.


// What is the largest prime factor of the given number?

export function largestPrimeFactor(number: number) {
  const primes = sieve(10000);
  const factors = [];

  for (let i = 0; i < primes.length; ++i) {
    const possibleFactor = number / primes[i];

    if (!Number.isInteger(possibleFactor)) continue;

    factors.push(primes[i]);

    if (possibleFactor === 1) break;
  }

  const last = factors.length - 1;

  return factors[last];
}
