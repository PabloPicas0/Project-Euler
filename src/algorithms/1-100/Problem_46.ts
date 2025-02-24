// Problem 46: Goldbach's other conjecture
// It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.

// 9 = 7 + 2×12
// 15 = 7 + 2×22
// 21 = 3 + 2×32
// 25 = 7 + 2×32
// 27 = 19 + 2×22
// 33 = 31 + 2×12
// It turns out that the conjecture was false.

// What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
export function goldbachsOtherConjecture() {
  const compositeNumbers = getCompositeNumbers(54);

  for (let i = 0; i < compositeNumbers.size; ++i) {
    const compositeNumber = compositeNumbers.get(i);

    if (!compositeNumber) return false;

    const primeTable = sieve(compositeNumber);
    let isComposite = false;

    for (let j = 0; j < primeTable.length; ++j) {
      const prime = primeTable[j];
      let k = 1;

      while (true) {
        const goldbach = prime + 2 * k ** 2;

        if (goldbach > compositeNumber) {
          break;
        }

        if (goldbach === compositeNumber) {
          isComposite = true;
          break;
        }

        ++k;
      }

      if (isComposite) break;
    }

    if (!isComposite) {
      return compositeNumber;
    }
  }

  return false;
}

function getCompositeNumbers(n: number) {
  const oddComposite = new Map<number, number>();
  const primes = sieve(n);
  let x = 0;

  for (let i = 1; i < primes.length; ++i) {
    const nthPrime = primes[i];

    for (let j = 0; j < 29; ++j) {
      const n = nthPrime ** 2 + 2 * nthPrime * j;
      oddComposite.set(x, n);
      ++x;
    }
  }

  return oddComposite;
}

