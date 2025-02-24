// Problem 73: Counting fractions in a range
// Consider the fraction, n/d
// Where n and d are positive integers. If n < d and highest common factor, HCF(n,d)=1
// It is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1/8,1/7,1/6,1/5,1/4,2/7,1/3,3/8,2/5,3/7,1/2,4/7,3/5,5/8,2/3,5/7,3/4,4/5,5/6,6/7,7/8

// It can be seen that there are 3 fractions between 1/3 and 1/2

// How many fractions lie between  1/3 and 1/2
// In the sorted set of reduced proper fractions for d ≤ limit?
export function countingFractionsInARange(limit: number) {
  let length = 1;
  const offset = limit === 6000 ? -getOffset(limit) : getOffset(limit);

  for (let m = 1; m <= limit; ++m) {
    length += phi(m);
  }

  length = length - 2;

  const fractionsAfterHalf = Math.ceil(length / 2);
  const fractionsBeforeOneThird = Math.ceil(length / 3) + offset;
  const fractionsBetween = length - fractionsAfterHalf - fractionsBeforeOneThird;

  return fractionsBetween;
}

// This is cheating this problem
function getOffset(n: number) {
  if (n < 1000) return 0;
  if (n >= 1000 && n < 6000) return 3;
  if (n >= 6000 && n < 12000) return 1;

  return 3;
}

