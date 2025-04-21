// Problem 115: Counting block combinations II
// A row measuring n units in length has red blocks with a minimum length of m units placed on it,
// such that any two red blocks (which are allowed to be different lengths) are separated by at least one black square.

// Let the fill-count function,
// F(m,n)
// represent the number of ways that a row can be filled.

// For example,  F(3,29)=673135 and  F(3,30)=1089155

// That is, for m = 3, it can be seen that n = 30 is the smallest value for which the fill-count function first exceeds one million.

// In the same way, for m = 10, it can be verified that  F(10,56)=880711
// and  F(10,57)=1148904
// so n = 57 is the least value for which the fill-count function first exceeds one million.

// For m = 50, find the least value of n for which the fill-count function first exceeds one million.

// Note: This is a more difficult version of Problem 114.

// This problem just uses modified version of algo from previous problem

function countingBlockTwo() {
  const limit = 1000000;
  const m = 50;
  let n = 100;

  while (n < 1000) {
    const count = F(n, m);

    if (count > limit) return n;

    ++n;
  }

  return true;
}

function F(n, m) {
  const size = m + 1;
  const arr = new Array(size).fill(1);

  arr[m] = 2;

  let p = 0;
  let l = arr.length - 1;
  let k = arr.length - 2;

  for (let i = m + 1; i < n + 1; ++i) {
    const next = 2 * arr[l] - arr[k] + arr[p];
    arr[p] = next;

    p = (p + 1) % size;
    l = (l + 1) % size;
    k = (k + 1) % size;
  }

  arr.sort((a, b) => a - b);

  const last = arr.length - 1;

  return arr[last];
}