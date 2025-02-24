import { bigIntPower } from "../utils/bigIntPower.ts";
// Problem 56: Powerful digit sum
// A googol (10^100) is a massive number: one followed by one-hundred zeros;
// 100^100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.


// Considering natural numbers of the form,  a^b, where a, b < n, what is the maximum digital sum?

// NOTE: This passes the problem but fcc don't like it
export function powerfulDigitSum(n: number) {
  let maxSum = 0;

  for (let a = 1; a < n; ++a) {
    for (let b = 1; b < n; ++b) {
      const pow = bigIntPower(a, b).toString();
      const sum = pow.split("").reduce((acc, num) => acc + Number(num), 0);

      maxSum = Math.max(maxSum, sum);
    }
  }

  return maxSum;
}

