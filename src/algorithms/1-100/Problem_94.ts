// Problem 94: Almost equilateral triangles
// It is easily proved that no equilateral triangle exists with integral length sides and integral area.
// However, the almost equilateral triangle 5-5-6 has an area of 12 square units.

// We shall define an almost equilateral triangle to be a triangle for which two sides are equal and the third differs by no more than one unit.

// Find the sum of the perimeters of all almost equilateral triangles with integral side lengths and area and whose perimeters do not exceed limit.

// First brute force attempt worked for 4 / 5 test cases
// Here is usefull resource on how to think about this problem
// https://stackoverflow.com/questions/64933639/how-do-i-solve-this-billion-iteration-sum-project-euler-problem-94-python
// More to this i learned something new about JS and yield keyword
export function almostEquilateralTriangles(limit: number) {
  let sum = 0;
  const lim = Math.floor(limit / 3 + 2);
  const triples = getTriples(lim);
  let next = triples.next().value;

  while (next) {
    const [a, b, c] = next;

    if (Math.abs(2 * a - c) === 1) {
      sum += 2 * a + 2 * c;
    }

    if (Math.abs(2 * b - c) === 1) {
      sum += 2 * b + 2 * c;
    }

    next = triples.next().value;
  }

  return sum;
}

function* getTriples(k: number) {
  let n = 1;
  let m = 2;
  while (m * m + 1 < k) {
    if (n >= m) {
      n = m % 2;
      m = m + 1;
    }
    let c = m * m + n * n;

    if (c >= k) {
      n = m;
      continue;
    }

    if (egcd(n, m) == 1) {
      yield [m * m - n * n, 2 * m * n, c];
    }

    n += 2;
  }
}

