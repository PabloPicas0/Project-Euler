// Problem 114: Counting block combinations I
// A row measuring seven units in length has red blocks with a minimum length of three units placed on it,
// such that any two red blocks (which are allowed to be different lengths) are separated by at least one black square.
// There are exactly seventeen ways of doing this.
// See: https://projecteuler.net/problem=114

// Possible ways of placing block with a minimum length of three units, on a row with length of seven units
// How many ways can a row measuring fifty units in length be filled?

// Note: Although the example above does not lend itself to the possibility, in general it is permitted to mix block sizes.
// For example, on a row measuring eight units in length you could use red (3), black (1), and red (4).

// Solution is based on count recurrence relation
// It can be found here
// https://codereview.stackexchange.com/questions/227624/counting-block-combinations-i-project-euler-114#mjx-eqn-f4
// Also it is not optimized for space efficiency

function countingBlockOne() {
  let n = 50;
  const arr = [1, 1, 1, 2];

  for (let i = 3; i < n; ++i) {
    const next = 2 * arr[i] - arr[i - 1] + arr[i - 3];

    arr.push(next);
  }

  const last = arr.length - 1;

  return arr[last];
}

function count(n: number, m: number) {
  if (n < m) return 1;
  if (n === m) return 2;

  return 2 * count(n - 1, m) - count(n - 2, m) + count(n - m - 1, m);
}
