// Problem 39: Integer right triangles
// If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

// {20,48,52}, {24,45,51}, {30,40,50}

// For which value of p ≤ n, is the number of solutions maximized?
export function intRightTriangles(n: number) {
  let lastMaxSolutions = 0;
  let highestValue = 0;
  let p = 12;
  let knownCombinations: number[] = [];

  while (p <= n) {
    let solutions = 0;

    for (let i = 1; i <= Math.floor(p / 2); ++i) {
      for (let j = 1; j <= Math.floor(p / 2); ++j) {
        const k = Math.sqrt(i ** 2 + j ** 2);
        const possibleSolution = i + j + k;

        if (possibleSolution > p) break;

        if (possibleSolution === p && !knownCombinations.includes(k)) {
          knownCombinations.push(k);
          ++solutions;
        }
      }
    }

    if (solutions > lastMaxSolutions) {
      lastMaxSolutions = solutions;
      highestValue = p;
    }

    knownCombinations = [];
    ++p;
  }
  return highestValue;
}

