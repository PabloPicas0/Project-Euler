// Problem 90: Cube digit pairs
// Each of the six faces on a cube has a different digit (0 to 9) written on it; the same is done to a second cube.
// By placing the two cubes side-by-side in different positions we can form a variety of 2-digit numbers.

// For example, the square number 64 could be formed.

// two cubes, one with the number 6 and the other with number 4
// In fact, by carefully choosing the digits on both cubes it is possible to display all of the square numbers below one-hundred:
// 01, 04, 09, 16, 25, 36, 49, 64, and 81.

// For example, one way this can be achieved is by placing {0, 5, 6, 7, 8, 9} on one cube and {1, 2, 3, 4, 8, 9} on the other cube.

// However, for this problem we shall allow the 6 or 9 to be turned upside-down so that an arrangement like {0, 5, 6, 7, 8, 9}
// And {1, 2, 3, 4, 6, 7} allows for all nine square numbers to be displayed; otherwise it would be impossible to obtain 09.

// In determining a distinct arrangement we are interested in the digits on each cube, not the order.

// {1, 2, 3, 4, 5, 6} is equivalent to {3, 6, 4, 1, 2, 5}
// {1, 2, 3, 4, 5, 6} is distinct from {1, 2, 3, 4, 5, 9}
// But because we are allowing 6 and 9 to be reversed,
// The two distinct sets in the last example both represent the extended set {1, 2, 3, 4, 5, 6, 9} for the purpose of forming 2-digit numbers.

// How many distinct arrangements of the two cubes allow for all of the square numbers to be displayed?
export function cubeDigitPairs() {
  let ans = 0;
  const squares = [
    [0, 1],
    [0, 4],
    [0, 9],
    [1, 6],
    [2, 5],
    [3, 6],
    [4, 9],
    [6, 4],
    [8, 1],
  ];

  const set = createSet();

  for (let i = 0; i < set.length; ++i) {
    for (let j = i + 1; j < set.length; ++j) {
      let hasAllSquareNums = true;
      const cube1 = set[i];
      const cube2 = set[j];

      for (let k = 0; k < squares.length; ++k) {
        const [a, b] = squares[k];
        const squareCanBeFormed = findSquareDigits(cube1, cube2, a, b);

        if (!squareCanBeFormed) {
          hasAllSquareNums = false;
          break;
        }
      }

      if (hasAllSquareNums) {
        ans += 1;
      }
    }
  }

  return ans;
}

function findSquareDigits(cube1: Map<number, boolean>, cube2: Map<number, boolean>, a: number, b: number) {
  const hasDigits = (cube1.has(a) && cube2.has(b)) || (cube2.has(a) && cube1.has(b));

  if (hasDigits) return true;

  if (!hasDigits && a === 6) return (cube1.has(9) && cube2.has(b)) || (cube2.has(9) && cube1.has(b));

  if (!hasDigits && a === 9) return (cube1.has(6) && cube2.has(b)) || (cube2.has(6) && cube1.has(b));

  if (!hasDigits && b === 6) return (cube1.has(a) && cube2.has(9)) || (cube2.has(a) && cube1.has(9));

  if (!hasDigits && b === 9) return (cube1.has(a) && cube2.has(6)) || (cube2.has(a) && cube1.has(6));

  return false;
}

function createSet() {
  const set: Map<number, boolean>[] = [];

  function generateSet(start: number, depth: number, digits: number[]) {
    if (depth === 0) {
      const map = new Map<number, boolean>();
      digits.forEach((digit) => map.set(digit, true));
      set.push(map);
      return;
    }

    for (let i = start; i < 10; ++i) {
      generateSet(i + 1, depth - 1, [...digits, i]);
    }
  }

  generateSet(0, 6, []);

  return set;
}

