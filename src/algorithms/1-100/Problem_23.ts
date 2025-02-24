// Problem 23: Non-abundant sums
// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all positive integers <= n which cannot be written as the sum of two abundant numbers.
const LIMIT = 28123;

export function sumOfNonAbundantNumbers(n: number) {
  let int = 0;
  const abundantNumbers: number[] = [];
  const sumsOfTwoAbundantNumbers = new Set();

  for (let i = 12; i <= LIMIT; ++i) {
    if (isAbundant(i)) abundantNumbers.push(i);
  }

  for (let i = 0; i < abundantNumbers.length; ++i) {
    for (let j = i; j < abundantNumbers.length; ++j) {
      const sum = abundantNumbers[i] + abundantNumbers[j];

      if (sum > LIMIT) {
        break;
      } else {
        sumsOfTwoAbundantNumbers.add(sum);
      }
    }
  }

  for (let i = 1; i < LIMIT; ++i) {
    if (!sumsOfTwoAbundantNumbers.has(i) && i <= n) {
      int += i;
    }
  }

  return int;
}

function isAbundant(n: number) {
  let sumOfDivisors = 1;

  for (let i = 2; i <= n / 2; ++i) {
    if (n % i === 0) sumOfDivisors += i;
  }

  return sumOfDivisors > n;
}
