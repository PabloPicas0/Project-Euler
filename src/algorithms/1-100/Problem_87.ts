// Problem 87: Prime power triples
// The smallest number expressible as the sum of a prime square, prime cube, and prime fourth power is 28.
//In fact, there are exactly four numbers below fifty that can be expressed in such a way:

// 28 = 22 + 23 + 24
// 33 = 32 + 23 + 24
// 49 = 52 + 23 + 24
// 47 = 22 + 33 + 24

// How many numbers below n can be expressed as the sum of a prime square, prime cube, and prime fourth power?
export function primePowerTriples(n: number) {
  const primes = sieve(Math.floor(n / 4));
  let nums = new Map();

  for (let i = 0; i < primes.length / 2; ++i) {
    const a = primes[i] ** 2;

    if (a > n) break;
    for (let j = 0; j < primes.length / 3; ++j) {
      const b = primes[j] ** 3;

      if (b > n) break;
      for (let k = 0; k < Math.floor(primes.length / 4); ++k) {
        const c = primes[k] ** 4;

        const sum = a + b + c;

        if (sum >= n || !Number.isSafeInteger(sum) || c > n) break;

        nums.set(sum, [primes[i], primes[j], primes[k]]);
      }
    }
  }

  return nums.size;
}

