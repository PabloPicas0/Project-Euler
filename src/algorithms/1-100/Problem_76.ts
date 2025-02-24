// Problem 76: Counting summations
// It is possible to write five as a sum in exactly six different ways:

// 4 + 1
// 3 + 2
// 3 + 1 + 1
// 2 + 2 + 1
// 2 + 1 + 1 + 1
// 1 + 1 + 1 + 1 + 1

// How many different ways can n be written as a sum of at least two positive integers?
export function countingSummations(n: number) {
  const ways: number[] = new Array(n + 1).fill(0);

  ways[0] = 1;

  const numbers: number[] = [];

  for (let i = 1; i < n; ++i) {
    numbers.push(i);
  }

  for (let i = 0; i < numbers.length; ++i) {
    const number = numbers[i];

    for (let j = 0; j < ways.length; ++j) {
      if (number <= j) {
        ways[j] = ways[j - number] + ways[j];
      }
    }
  }

  return ways[n];
}

