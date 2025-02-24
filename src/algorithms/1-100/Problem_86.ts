// Problem 86: Cuboid route
// A spider, S, sits in one corner of a cuboid room, measuring 6 by 5 by 3, and a fly, F, sits in the opposite corner.
// By travelling on the surfaces of the room the shortest "straight line" distance from S to F is 10 and the path is shown on the diagram.

// A diagram of a spider and fly's path from one corner of a cuboid room to the opposite corner
// However, there are up to three "shortest" path candidates for any given cuboid and the shortest route doesn't always have integer length.

// It can be shown that there are exactly 2060 distinct cuboids, ignoring rotations, with integer dimensions, up to a maximum size of M by M by M,
// for which the shortest route has integer length when M = 100.
// This is the least value of M for which the number of solutions first exceeds two thousand; the number of solutions when M = 99 is 1975.

// Find the least value of M such that the number of solutions first exceeds n.
export function cuboidRoute(n: number) {
  let m = 1;
  let solutions = 0;

  while (true) {
    solutions += countSolutions(m);

    if (solutions > n) break;

    ++m;
  }

  return m;
}

function countSolutions(m: number) {
  let solutions = 0;

  for (let j = 1; j <= m; ++j) {
    for (let k = j; k <= m; ++k) {
      const r = [
        Math.sqrt(m ** 2 + (k + j) ** 2),
        Math.sqrt((m + j) ** 2 + k ** 2),
        Math.sqrt((j + m) ** 2 + k ** 2),
      ];

      const shortestPath = Math.min(...r);
      const shortestPathIsInteger = Number.isInteger(shortestPath);

      if (shortestPathIsInteger) {
        solutions += 1;
      }
    }
  }

  return solutions;
}

