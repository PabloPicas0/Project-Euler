// Problem 123: Prime square remainders

// Let p_n be the nth prime: 2, 3, 5, 7, 11, ..., and let r be the remainder when (p_n−1)^n+(p_n+1)^n is divided by p_n^2.
// For example, when n=3, p3=5, and 43+63=280≡5 mod 25.
// The least value of n for which the remainder first exceeds 109 is 7037.
// Find the least value of n for which the remainder first exceeds 1010.

import { sieve } from "../utils/sieve.ts";

function primeSquareRemainders() {
  const primes = sieve(250000);
  let n = 7037;

  while (n < 21036) {
    const prime = primes[n];
    let rMin = 2 * n * prime;

    // +2 cuz first prime is even
    if (rMin > 10 ** 10) return n + 2;

    ++n;
  }

  return n;
}
