// Problem 31: Coin sums
// In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

// 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
// It is possible to make £2 in the following way:

// 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
// How many different ways can n pence be made using any number of coins?
export function coinSums(n: number) {
  const ways = new Array(n + 1).fill(0);

  ways[0] = 1;

  const coins = [1, 2, 5, 10, 20, 50, 100, 200];

  for (let i = 0; i < coins.length; ++i) {
    const coin = coins[i];

    for (let j = 0; j < ways.length; ++j) {
      if (coin <= j) {
        ways[j] = ways[j - coin] + ways[j];
      }
    }
  }

  return ways[n];
}

