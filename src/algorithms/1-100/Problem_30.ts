// Problem 30: Digit n powers
// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

// 1634 = 14 + 64 + 34 + 44
// 8208 = 84 + 24 + 04 + 84
// 9474 = 94 + 44 + 74 + 44
// As 1 = 14 is not a sum it is not included.

// The sum of these numbers is 1634 + 8208 + 9474 = 19316.

// Find the sum of all the numbers that can be written as the sum of n powers of their digits.
export function digitnPowers(n: number) {
  if (n < 3) return 0;

  const numbers: number[] = [];
  const isDivisible = n % 2 === 0;

  for (let i = 10; isDivisible ? numbers.length < n - 1 : numbers.length <= n; ++i) {
    const digits = String(i)
      .split("")
      .reduce((acc, digit) => acc + Number(digit) ** n, 0);

    if (i === digits) numbers.push(i);
  }

  return numbers.reduce((acc, number) => acc + number);
}

