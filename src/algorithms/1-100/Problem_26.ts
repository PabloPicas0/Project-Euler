// Problem 26: Reciprocal cycles
// A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

// 1/2 = 0.5
// 1/3 = 0.(3)
// 1/4 = 0.25
// 1/5 = 0.2
// 1/6 = 0.1(6)
// 1/7 = 0.(142857)
// 1/8 = 0.125
// 1/9 = 0.(1)
// 1/10 = 0.1
// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

// Find the value of d < n for which 1/d contains the longest recurring cycle in its decimal fraction part.
export function reciprocalCycles(n: number) {
  let d = 0;
  let longestDecimal = 0;

  for (let i = 2; i < n; ++i) {
    const currentDecimal = fractionToDecimal(1, i).replace("0.", "").length;

    if (longestDecimal < currentDecimal) {
      longestDecimal = currentDecimal;
      d = i;
    }
  }

  return d;
}

function fractionToDecimal(a: number, b: number) {
  let dec = "0.";
  const map = new Map();

  let reminder = a % b;

  while (reminder !== 0 && !map.has(reminder)) {
    map.set(reminder, dec.length);

    reminder *= 10;

    dec += Math.floor(reminder / b);

    reminder = reminder % b;
  }

  return dec;
}

