// Problem 71: Ordered fractions
// Consider the fraction, n/d
// Where n and d are positive integers. If n < d and highest common factor, HCF(n,d)=1
// It is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8

// It can be seen that 2/5 is the fraction immediately to the left of  3/7

// By listing the set of reduced proper fractions for d ≤ limit in ascending order of size,
// Find the numerator of the fraction immediately to the left of 3/7

// In this problem I had really weak understanding how to solve it
// Even solution didin't help to much in clarifying
export function orderedFractions(limit: number) {
  const ceiling = limit;

  for (let i = ceiling; i >= 1; --i) {
    let numerator = 3 * i;
    let denominator = 7 * i;

    numerator -= 1;

    const [num, den] = baseFraction(numerator, denominator);

    if (den <= ceiling) return num;
  }

  return true;
}

function baseFraction(num: number, den: number) {
  const gcd = egcd(num, den, 0, 0);

  const newNum = Math.floor(num / gcd);
  const newDen = Math.floor(den / gcd);

  return [newNum, newDen];
}

function egcd(a: number, b: number, x?: number, y?: number) {
  // Base Case
  if (a == 0) {
    x = 0;
    y = 1;
    return b;
  }

  // To store results
  // of recursive call
  let gcd: number = egcd(b % a, a, x, y);

  // Update x and y using
  // results of recursive
  // call
  x = y - (b / a) * x;
  y = x;

  return gcd;
}

