// Problem 77: Prime summations
// It is possible to write ten as the sum of primes in exactly five different ways:

// 7 + 3
// 5 + 5
// 5 + 3 + 2
// 3 + 3 + 2 + 2
// 2 + 2 + 2 + 2 + 2

// What is the first value which can be written as the sum of primes in over n ways?
export function primeSummations(n: number) {
  let value = 0;

  while (true) {
    const ways = countWays(value);

    if (ways > n) return value;

    ++value;
  }
}

function countWays(n: number) {
  const ways = new Array(n + 1).fill(0);

  ways[0] = 1;

  const primes = sieve(n + 1);

  for (let i = 0; i < primes.length; ++i) {
    const prime = primes[i];

    for (let j = 0; j < ways.length; ++j) {
      if (prime <= j) {
        ways[j] = ways[j - prime] + ways[j];
      }
    }
  }

  return ways[n];
}

