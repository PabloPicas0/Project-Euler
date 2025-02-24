// Problem 21: Amicable numbers
// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).

// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under n.
export function sumAmicableNum(n: number) {
  let numbers: number[][] = [];

  for (let i = 1; i < n; ++i) {
    const b = d(i);
    const a = d(b);
    const isInAmicablePair = numbers.some((number) => {
      const [a, b] = number;

      return a === i || b === i;
    });

    if (isInAmicablePair) continue;

    if (a === i && a !== b) {
      numbers.push([i, b]);
    }
  }
  const sum = numbers.reduce((acc, number) => {
    const [a, b] = number;

    return (acc += a + b);
  }, 0);

  return sum;
}

function d(n: number) {
  let sumOfProperDivisors = 0;

  for (let i = 1; i < n; ++i) {
    if (n % i === 0) {
      sumOfProperDivisors += i;
    }
  }

  return sumOfProperDivisors;
}

