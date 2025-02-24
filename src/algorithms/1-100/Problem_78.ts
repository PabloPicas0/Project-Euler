// Problem 78: Coin partitions
// Let ${p}(n)$ represent the number of different ways in which n coins can be separated into piles.
// For example, five coins can be separated into piles in exactly seven different ways, so ${p}(5) = 7$.

// Coin piles
// OOOOO
// OOOO   O
// OOO   OO
// OOO   O   O
// OO   OO   O
// OO   O   O   O
// O   O   O   O   O

// Find the least value of n for which ${p}(n)$ is divisible by divisor.

// See:
// https://en.wikipedia.org/wiki/Partition_export function_(number_theory)#Recurrence_relations
function coinPartitions(divisor: number) {
  const coinPartitions = countPartitions(55374);

  for (let i = 0; i < coinPartitions.length; ++i) {
    const coinPilePossibilities = coinPartitions[i];

    if (coinPilePossibilities % BigInt(divisor) === 0n) {
      return i;
    }
  }
}

function countPartitions(n: number) {
  const partitions = [1n];

  for (let i = 1; i < n + 1; ++i) {
    let sum = 0n;
    let k = 1;

    while (true) {
      const f1 = i - pentagonalNumber(k);

      if (f1 < 0) break;

      if (k % 2) {
        sum += partitions[f1];
      } else {
        sum -= partitions[f1];
      }

      const f2 = i - pentagonalNumber(-k);

      if (f2 < 0) break;

      if (k % 2) {
        sum += partitions[f2];
      } else {
        sum -= partitions[f2];
      }

      k += 1;
    }

    partitions.push(sum);
  }

  return partitions;
}

function pentagonalNumber(k: number) {
  return Math.floor((k * (3 * k - 1)) / 2);
}

