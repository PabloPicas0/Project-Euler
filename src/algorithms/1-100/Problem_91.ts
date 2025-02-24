// Problem 91: Right triangles with integer coordinates
// The points  P(x1,y1) and  Q(x2,y2)
// Are plotted at integer coordinates and are joined to the origin,  O(0,0) to form  ΔOPQ

// A graph plotting points P (x_1, y_1) and Q(x_2, y_2) at integer coordinates that are joined to the origin O (0, 0)
// There are exactly fourteen triangles containing a right angle that can be formed when each coordinate lies between 0 and 2 inclusive; that is,  0≤x1,y1,x2,y2≤2

// a diagram showing the 14 triangles containing a right angle that can be formed when each coordinate is between 0 and 2
// Given that  0≤x1,y1,x2,y2≤limit
// How many right triangles can be formed?

// For better problem understanding see:
// www.freecodecamp.org/learn/project-euler/project-euler-problems-1-to-100/problem-91-right-triangles-with-integer-coordinates
export function rightTrianglesIntCoords(limit: number) {
  let ans = 0;

  for (let y2 = 0; y2 <= limit; ++y2) {
    for (let x2 = 1; x2 <= limit; ++x2) {
      for (let y1 = 1; y1 <= limit; ++y1) {
        for (let x1 = 0; x1 <= x2; ++x1) {
          const OP = Math.sqrt((x1 - 0) ** 2 + (y1 - 0) ** 2);
          const OQ = Math.sqrt((x2 - 0) ** 2 + (y2 - 0) ** 2);
          const PQ = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

          if (PQ === 0) continue;

          const [a, b, c] = [OP, OQ, PQ].sort((a, b) => a - b);
          const isRigthTriangle = testPythagoras(a, b, c);

          if (isRigthTriangle) ans += 1;
        }
      }
    }
  }

  return ans;
}

function testPythagoras(a: number, b: number, c: number) {
  return Math.round(c ** 2) === Math.round(a ** 2 + b ** 2);
}

