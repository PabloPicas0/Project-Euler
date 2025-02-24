// Problem 50: Consecutive prime sum
// The prime 41, can be written as the sum of six consecutive primes:

// 41 = 2 + 3 + 5 + 7 + 11 + 13
// This is the longest sum of consecutive primes that adds to a prime below one-hundred.

// The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

// Which prime, below one-million, can be written as the sum of the most consecutive primes?
export function consecutivePrimeSum(limit: number) {
  const primesMap = sieveMap(limit);
  const primes = Array.from(primesMap);
  let currentBiggestConsecutivePrime = { prime: 0, length: 0 };

  for (let i = 0; i < primesMap.size; ++i) {
    let consecutivePrimes: number[] = [];

    for (let j = i; j < primes.length; ++j) {
      const prime = primes[j][0];
      const sum = consecutivePrimes.reduce((acc, n) => acc + n, 0) + prime;

      if (sum > limit) break;

      consecutivePrimes.push(prime);

      const currentConsecutiveLength = consecutivePrimes.length;
      const biggestConsecutiveLength = currentBiggestConsecutivePrime.length;

      if (
        primesMap.has(sum) &&
        currentConsecutiveLength > biggestConsecutiveLength &&
        sum > currentBiggestConsecutivePrime.prime
      ) {
        currentBiggestConsecutivePrime.prime = sum;
        currentBiggestConsecutivePrime.length = consecutivePrimes.length;
      }
    }
  }

  return currentBiggestConsecutivePrime.prime;
}

