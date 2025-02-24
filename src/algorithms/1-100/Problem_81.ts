// Problem 81: Path sum: two ways
// In the 5 by 5 matrix below, the minimal path sum from the top left to the bottom right, by only moving to the right and down, is indicated in bold red and is equal to 2427.

// 131 673 234 103 18
// 201 96 342 965 150
// 630 803 746 422 111
// 537 699 497 121 956
// 805 732 524 37 331

// 131 -> 201 -> 96 -> 342 -> 746 -> 422 -> 121 -> 37 -> 331

// Find the minimal path sum from the top left to the bottom right by only moving right and down in matrix, a 2D array representing a matrix.
// The maximum matrix size used in the tests will be 80 by 80.

// For some reason this problem was hard for me cuz it require memorized algo and solution by yourself wasn't obvious
// Here is the link for good explanation
// https://algo.monster/liteproblems/64

// TODO: Take test matrix
export function pathSumTwoWays(matrix: number[][]) {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;

  const f = new Array(rowLength).fill(0).map(() => new Array(colLength).fill(0));

  f[0][0] = matrix[0][0];

  for (let i = 1; i < f.length; ++i) {
    f[i][0] = f[i - 1][0] + matrix[i][0];
    f[0][i] = f[0][i - 1] + matrix[0][i];
  }

  for (let i = 1; i < f.length; ++i) {
    for (let j = 1; j < f[i].length; ++j) {
      f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + matrix[i][j];
    }
  }

  return f[rowLength - 1][colLength - 1];
}

