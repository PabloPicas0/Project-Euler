// Problem 14: Longest Collatz sequence
// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)
// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under the given limit, produces the longest chain?

// Note: Once the chain starts the terms are allowed to go above limit.
export function longestCollatzSequence(limit: number) {
  let longestChain = 0;
  let longestSequence = 0;

  for (let i = 1; i < limit; ++i) {
    const currentSequence = collatzSequence(i);

    if (longestSequence < currentSequence) {
      longestSequence = currentSequence;
      longestChain = i;
    }
  }

  return longestChain;
}

function collatzSequence(number: number) {
  let currentNumber = number;
  let collatzChain = 1;

  while (currentNumber > 1) {
    if (currentNumber % 2 === 0) {
      currentNumber /= 2;
      collatzChain++;
    } else {
      currentNumber = 3 * currentNumber + 1;
      collatzChain++;
    }
  }

  return collatzChain;
}

