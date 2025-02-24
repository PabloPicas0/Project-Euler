// Problem 35: Circular primes
// The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

// How many circular primes are there below n, whereas 100 ≤ n ≤ 1000000?

// Note:

// Circular primes individual rotation can exceed n.
export function circularPrimes(n: number) {
  const primes = [2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, 97];

  if (n === 100) return primes.length;

  for (let i = 100; i < n; ++i) {
    const s = String(i);
    let isCircular = true;

    // This part can be done better especially when the numbers have more than 3 digits
    if (s[1] === "0" || s[2] === "0") continue;

    const rotations = [s];

    for (let j = 1; j < s.length; ++j) {
      const prevRotation = [...rotations[j - 1]];
      const firstDigit = prevRotation.splice(0, 1);

      rotations.push([...prevRotation, firstDigit].join(""));
    }

    for (let j = 0; j < rotations.length; ++j) {
      if (!isPrime(Number(rotations[j]))) {
        isCircular = false;
        break;
      }
    }

    if (isCircular) {
      primes.push(i);
    }
  }

  return primes.length;
}

