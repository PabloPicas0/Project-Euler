// Problem 47: Distinct primes factors
// The first two consecutive numbers to have two distinct prime factors are:

// 14 = 2 × 7
// 15 = 3 × 5
// The first three consecutive numbers to have three distinct prime factors are:

// 644 = 22 × 7 × 23
// 645 = 3 × 5 × 43
// 646 = 2 × 17 × 19
// Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
export function distinctPrimeFactors(targetNumPrimes: number, targetConsecutive: number) {
  const primes = sieveMap(134048);
  let consecutive: number[] = [];
  let n = 12;

  while (true) {
    if (primes.has(n)) {
      ++n;
      continue;
    }

    const divisors = trialDevision(n);
    const shortDivisors: number[] = [];

    // Short some repetetive devisors like [2,2,3]
    for (let i = 0; i < divisors.length; ) {
      const currentNumber = divisors[i];
      let sum = 1;

      for (let j = i; j < divisors.length; ) {
        const nextNumber = divisors[j];

        if (nextNumber === currentNumber) {
          sum *= nextNumber;
          divisors.shift();
        } else {
          break;
        }
      }

      shortDivisors.push(sum);
      if (!divisors.length) break;
    }

    const isSameNumOfPrimes = shortDivisors.length === targetNumPrimes;

    if (isSameNumOfPrimes) {
      consecutive.push(n);

      const isConsecutive = consecutive.every((value, i) => i === 0 || +value === +consecutive[i - 1] + 1);

      if (!isConsecutive) {
        consecutive.shift();
      }

      if (consecutive.length === targetConsecutive) {
        break;
      }
    }

    ++n;
  }

  return consecutive[0];
}

function trialDevision(n: number) {
  const devisors: number[] = [];
  let f = 2;

  while (n > 1) {
    if (n % f === 0) {
      devisors.push(f);
      n /= f;
    } else {
      ++f;
    }
  }

  return devisors;
}

