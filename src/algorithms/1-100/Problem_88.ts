// Problem 88: Product-sum numbers
// A natural number, N, that can be written as the sum and product of a given set of at least two natural numbers, $\{a_1, a_2, \ldots , a_k\}$
// is called a product-sum number: $N = a_1 + a_2 + \cdots + a_k = a_1 × a_2 × \cdots × a_k$.

// For example, 6 = 1 + 2 + 3 = 1 × 2 × 3.

// For a given set of size, k, we shall call the smallest N with this property a minimal product-sum number.
// The minimal product-sum numbers for sets of size, k = 2, 3, 4, 5, and 6 are as follows.

// k=2: 4 = 2 × 2 = 2 + 2
// k=3: 6 = 1 × 2 × 3 = 1 + 2 + 3
// k=4: 8 = 1 × 1 × 2 × 4 = 1 + 1 + 2 + 4
// k=5: 8 = 1 × 1 × 2 × 2 × 2 = 1 + 1 + 2 + 2 + 2
// k=6: 12 = 1 × 1 × 1 × 1 × 2 × 6 = 1 + 1 + 1 + 1 + 2 + 6

// Hence for 2 ≤ k ≤ 6, the sum of all the minimal product-sum numbers is 4 + 6 + 8 + 12 = 30; note that 8 is only counted once in the sum.

// In fact, as the complete set of minimal product-sum numbers for 2 ≤ k ≤ 12 is $\{4, 6, 8, 12, 15, 16\}$, the sum is 61.

// What is the sum of all the minimal product-sum numbers for 2 ≤ k ≤ limit?

// Another problem where I had almost 0 understanding whats going on
// Huge thanks for this resources
// https://euler.stephan-brumme.com/88/
// https://www.hackerrank.com/contests/projecteuler/challenges/euler088/forum
// They helped me a bit to clarify whats the core of the problem
// But I think that pure alone it was to hard for me this time
export function productSumNumbers(limit: number) {
  const minK: number[] = new Array(limit + 1).fill(99999);

  let n = 4;
  let sum = 0;
  let i = limit - 1;

  while (i > 0) {
    const found = getMinK(n, n, n, minK);

    if (found > 0) {
      i -= found;
      sum += n;
    }

    n += 1;
  }

  return sum;
}

function isValid(n: number, k: number, minK: number[]) {
  if (k >= minK.length) {
    return 0;
  }

  if (minK[k] > n) {
    minK[k] = n;
    return 1;
  }

  return 0;
}

function getMinK(n: number, product: number, sum: number, minK: number[], depth = 1, minFactor = 2) {
  if (product === 1) return isValid(n, depth + sum - 1, minK);

  let result = 0;

  if (depth > 1) {
    if (sum === product) return isValid(n, depth, minK);

    if (isValid(n, depth + sum - product, minK)) result += 1;
  }

  for (let i = minFactor; i * i <= product; ++i) {
    if (product % i === 0) {
      result += getMinK(n, Math.floor(product / i), sum - i, minK, depth + 1, i);
    }
  }

  return result;
}

