import { fact } from "../utils/fact.ts";
// Problem 34: Digit factorials
// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.


// Find the numbers and the sum of the numbers which are equal to the sum of the factorial of their digits.

// Note: as 1! = 1 and 2! = 2 are not sums they are not included.
export function digitFactorial() {
  let sum = 0;
  let numbers = [];

  for (let i = 100; i <= 450585; ++i) {
    const s = String(i)
      .split("")
      .map((digit) => {
        const toFactorial = fact(Number(digit));

        return toFactorial;
      })
      .reduce((acc, number) => acc + number);

    if (s === i) {
      numbers.push(i);
      sum += i;
    }
  }

  return { sum, numbers };
}

