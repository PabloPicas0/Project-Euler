// Problem 49: Prime permutations
// The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.

// There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.

// What 12-digit number do you form by concatenating the three terms in this sequence?
export function primePermutations() {
  let numbers: number[] = [];
  const primes = sieveMap(9999);
  const nextPrime = 236; // Next prime after sequence given in the problem

  for (let i = nextPrime; i < primes.size; ++i) {
    const prime = primes.get(i);

    if (!prime) continue;

    const digits = String(prime).split("");
    let nextPossiblePrime = prime;
    let isPermutation = true;

    numbers.push(prime);

    while (true) {
      nextPossiblePrime += 3330;

      // Check if its still 4 digits and is prime
      if (nextPossiblePrime > 9999 || !isPrime(nextPossiblePrime)) {
        numbers = [];
        break;
      }

      // check if its permutation of base prime
      const nextPossiblePrimeDigits = String(nextPossiblePrime).split("");

      for (let j = 0; j < nextPossiblePrimeDigits.length; ++j) {
        const digit = nextPossiblePrimeDigits[j];

        if (!digits.includes(digit)) {
          isPermutation = false;
          break;
        }
      }

      if (!isPermutation) {
        numbers = [];
        break;
      }

      numbers.push(nextPossiblePrime);

      if (numbers.length === 3) {
        return Number(numbers.reduce((acc, number) => acc + number, ""));
      }
    }
  }
}

