// Problem 116: Red, green or blue tiles
// A row of five black square tiles is to have a number of its tiles replaced with coloured oblong tiles chosen from
// red (length two), green (length three), or blue (length four).

// If red tiles are chosen there are exactly seven ways this can be done.

// Possible ways to placing red oblong on a row with length of five units
// If green tiles are chosen there are three ways.

// Possible ways of placing green oblong on a row with length of five units
// And if blue tiles are chosen there are two ways.

// Possible ways of placing blue oblong on a row with length of five units
// Assuming that colors cannot be mixed there are 7 + 3 + 2 = 12 ways of replacing the black tiles in a row measuring five units in length.
// How many different ways can the black tiles in a row measuring fifty units in length be replaced if colors cannot be mixed and at least one colored tile must be used?

// Note: This is related to Problem 117.

function redGreenBlueOne() {
  return F(50, 2) + F(50, 3) + F(50, 4);
}

function count(n, m) {
  if (n < m) return 0;
  if (n === m) return 1;

  return count(n - 1, m) + count(n - m, m) + 1;
}

function F(n, m) {
  const size = m + 1;
  const arr = new Array(size).fill(0);

  let p = 0;
  let l = arr.length - 1;
  let k = arr.length - m;

  arr[p] = 1;

  for (let i = m; i < n + 1; ++i) {
    const next = arr[l] + arr[k] + 1;
    arr[p] = next;

    p = (p + 1) % size;
    l = (l + 1) % size;
    k = (k + 1) % size;
  }

  arr.sort((a, b) => a - b);

  const last = arr.length - 1;

  return arr[last];
}
