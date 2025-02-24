// Problem 99: Largest exponential
// Comparing two numbers written in index form like 2^11 and  3^7
// is not difficult, as any calculator would confirm that  2^11=2048 < 3^7=2187

// However, confirming that  632382518061<519432525806
// would be much more difficult, as both numbers contain over three million digits.

// Using the 2D baseExp array of base/exponent pairs, determine pair with the greatest numerical value and return it.

// https://www.quora.com/How-do-I-calculate-numbers-with-high-exponents-in-the-fastest-way
export function largestExponential(baseExp: number[][]) {
  const nums = [];

  for (let i = 0; i < baseExp.length; ++i) {
    const [base, exp] = baseExp[i];
    const num = Math.log(base) * exp;

    nums.push(num);
  }

  nums.shift();

  const max = Math.max(...nums);
  const index = nums.indexOf(max) + 1;

  return baseExp[index];
}

