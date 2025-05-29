// Problem 122: Efficient exponentiation
// The most naive way of computing n^15 requires fourteen multiplications:

// n×n×…×n=n^15

// But using a "binary" method you can compute it in six multiplications:

// n×n=n^2
// n^2×n^2=n^4
// n^4×n^4=n^8
// n^8×n^4=n^12
// n^12×n^2=n^14
// n^14×n=n^15

// However it is yet possible to compute it in only five multiplications:

// n×n=n^2
// n^2×n=n^3
// n^3×n^3=n^6
// n^6×n^6=n^12
// n^12×n^3=n^15

// We shall define m(k) to be the minimum number of multiplications to compute n^k;
// for example m(15)=5.

// For  1≤k≤200, find ∑m(k).

function efficientExponentiation() {
  let k = 2;
  let sum = 0;

  while (k <= 200) {
    const min = findNumOfMultiplications(k);

    sum += min;
    ++k;
  }
  return sum;
}

function findNumOfMultiplications(k: number) {
  let depth = 1;

  while (depth < 15) {
    const chain = [1];
    const isFound = search(chain, k, depth);

    if (isFound) {
      return chain.length;
    }

    ++depth;
  }

  return [].length;
}

function search(chain: number[], exponent: number, depth: number) {
  if (chain.length > depth) {
    return false;
  } else {
    const last = chain.length - 1;
    const current = chain[last];

    for (let i = 0; i < chain.length; ++i) {
      const sum = chain[i] + current;

      if (sum === exponent) return true;

      chain.push(sum);

      if (search(chain, exponent, depth)) return true;

      chain.pop();
    }
  }

  return false;
}
