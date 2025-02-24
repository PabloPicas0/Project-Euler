// Problem 85: Counting rectangles
// By counting carefully it can be seen that a rectangular grid measuring 3 by 2 contains eighteen rectangles:

// Although there may not exists a rectangular grid that contains exactly n rectangles, find the area of the grid with the nearest solution.

// NOTE: For better problem understanding check:
// https://www.freecodecamp.org/learn/project-euler/project-euler-problems-1-to-100/problem-85-counting-rectangles

// NOTE: Props for this blog for giving tips how to solve this problem
// https://euler.stephan-brumme.com/85/
// https://en.wikipedia.org/wiki/Triangular_number
export function countingRectangles(n: number) {
  const limit = Math.floor(Math.sqrt(n)) + 1;
  let rects = 0;
  let res = 0;

  for (let i = 1; i <= limit; ++i) {
    let j = i;
    let currentRects = 0;

    while (currentRects < n) {
      currentRects = A(i, j);

      if (Math.abs(currentRects - n) < Math.abs(rects - n)) {
        rects = currentRects;
        res = i * j;
      }

      ++j;
    }
  }

  return res;
}

function A(x: number, y: number) {
  return T(x) * T(y);
}

function T(x: number) {
  return (x * (x + 1)) / 2;
}

