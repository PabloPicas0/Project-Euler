// Problem 110: Diophantine Reciprocals II
// In the following equation x, y, and n are positive integers.

// 1/x + 1/y = 1/n

// It can be verified that when n = 1260 there are 113 distinct solutions and this is the least value of n for which the total number of distinct solutions exceeds one hundred.

// What is the least value of n for which the number of distinct solutions exceeds four million?

// Note: This problem is a much more difficult version of Problem 108 and as it is well beyond the limitations of a brute force approach it requires a clever implementation.

// Again thanks for Stephan Brumme for his thought process in this problem
// Without it that was out of my scope, I could only be close
// See: https://euler.stephan-brumme.com/110/
// Also worth to mention that fcc can't pass test becouse of constant sorting and checking that take too long time
// But I confirmed that returned value match this for test case 

import { bigSieve } from "../utils/sieve.ts";

function diophantineTwo() {
  const limit = 4000000;
  const primes = bigSieve(100);
  const exponents: number[] = new Array(12).fill(0)
  const values = [[1n, [...exponents]]] as [bigint, number[]][]

  while (true) {
    const current = values.shift()

    if (!current) break

    let value = current[0]
    const exponents = current[1]
    
    let currentFactors = 1

    for (const e of exponents) currentFactors *= 2 * e + 1

    currentFactors += 1
    currentFactors /= 2

    if (currentFactors > limit) {
      return value
    }

    for (let i = 0; i < exponents.length; ++i) {
      if (exponents[i] === 1 && i > 3) break

      exponents[i] += 1
      value *= primes[i]

      if (!values.some(val => val[0] === value)) {
        values.push([value, [...exponents]])
      }
    }

    values.sort((a, b) => (a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0))
  }
}