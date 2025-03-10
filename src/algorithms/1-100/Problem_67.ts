// Problem 67: Maximum path sum II
// By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

// 3
// 7 4
// 2 4 6
// 8 5 9 3

// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom in numTriangle, a 2D array defined in the background containing a triangle with one-hundred rows.

// Note: This is a much more difficult version of Problem 18.
// It is not possible to try every route to solve this problem, as there are 299 altogether!
// If you could check one trillion (1012) routes every second it would take over twenty billion years to check them all.
// There is an efficient algorithm to solve it. ;o)

export function maximumPathSumII(triangle: number[][]) {
  while (triangle.length > 1) {
    const lastLine = triangle.pop();
    const aboveLine = triangle.pop();

    if (!lastLine || !aboveLine) continue;

    for (let i = 0; i < aboveLine.length; ++i) {
      aboveLine[i] = Math.max(aboveLine[i] + lastLine[i], aboveLine[i] + lastLine[i + 1]);
    }

    triangle.push(aboveLine);
  }

  return triangle[0][0];
}

