// Problem 37: Truncatable primes
// The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

// Find the sum of the only n (8 ≤ n ≤ 11) primes that are both truncatable from left to right and right to left.

// NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
export function truncatablePrimes(n: number) {
  let sum = 0;
  let primesFound = 0;
  let number = 23;

  while (primesFound < n) {
    if (!isPrime(number)) {
      ++number;
      continue;
    }

    const s = String(number);
    const truncToRight = s.split("");
    const truncToLeft = s.split("");

    let isTruncatablePrime = true;

    for (let i = 1; i < s.length; ++i) {
      truncToRight.shift();
      truncToLeft.pop();

      if (!isPrime(Number(truncToRight.join(""))) || !isPrime(Number(truncToLeft.join("")))) {
        isTruncatablePrime = false;
        break;
      }
    }

    if (!isTruncatablePrime) {
      ++number;
      continue;
    }

    sum += number;

    ++primesFound;
    ++number;
  }

  return sum;
}

