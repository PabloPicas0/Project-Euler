// Problem 28: Number spiral diagonals
// Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

// 21 22 23 24 25
// 20  7  8  9 10
// 19  6  1  2 11
// 18  5  4  3 12
// 17 16 15 14 13
// It can be verified that the sum of the numbers on the diagonals is 101.

// What is the sum of the numbers on the diagonals in an n by n spiral formed in the same way?
export function spiralDiagonals(n: number) {
  const spiral: number[][] = [];

  const dir = ["left", "down", "right", "up"];
  let idx = 0;

  let counter = n * n;

  for (let i = 0; i < n; ++i) {
    spiral.push([]);

    for (let j = 0; j < n; ++j) {
      spiral[i].push(0);
    }
  }

  let left = 0;
  let down = 0;
  let right = spiral.length - 1;
  let up = spiral.length - 1;

  while (counter > 0) {
    if (idx >= dir.length) idx = 0;

    const direction = dir[idx];

    switch (direction) {
      case "left":
        for (let i = left; i < spiral.length; ++i) {
          for (let j = spiral[i].length - 1; j >= 0; --j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
          }
          break;
        }
        ++left;
        ++idx;
        break;

      case "down":
        for (let i = down; i < spiral.length; ++i) {
          for (let j = 0; j < spiral[i].length; ++j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
              break;
            }
          }
        }
        ++down;
        ++idx;
        break;

      case "right":
        for (let i = right; i > 0; --i) {
          for (let j = 0; j < spiral[i].length; ++j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
          }
          break;
        }
        --right;
        ++idx;
        break;

      case "up":
        for (let i = up; i > 0; --i) {
          for (let j = up; j > 0; --j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
            break;
          }
        }
        --up;
        ++idx;
        break;
    }
  }

  return countSpiral(spiral);
}

function countSpiral(spiral: number[][]) {
  const mid = Math.floor(spiral.length / 2);
  const sum = [1];

  // check diagonal Up
  for (let i = mid - 1, m = 1; i >= 0; --i, ++m) {
    for (let j = mid - m, k = mid + m; j >= mid - m && k <= mid + m; --j, ++k) {
      sum.push(spiral[i][j], spiral[i][k]);
    }
  }

  // check diagonal down
  for (let i = mid + 1, m = 1; i < spiral.length; ++i, ++m) {
    for (let j = mid - m, k = mid + m; j >= mid - m && k <= mid + m; --j, ++k) {
      sum.push(spiral[i][j], spiral[i][k]);
    }
  }

  return sum.reduce((acc, number) => acc + number);
}

