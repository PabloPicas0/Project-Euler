// Problem 75: Singular integer right triangles
// It turns out that 12 cm is the smallest length of wire that can be bent to form an integer sided right angle triangle in exactly one way, but there are many more examples.

// 12 cm: (3,4,5)
// 24 cm: (6,8,10)
// 30 cm: (5,12,13)
// 36 cm: (9,12,15)
// 40 cm: (8,15,17)
// 48 cm: (12,16,20)

// In contrast, some lengths of wire, like 20 cm, cannot be bent to form an integer sided right angle triangle,
// And other lengths allow more than one solution to be found; for example, using 120 cm it is possible to form exactly three different integer sided right angle triangles.

// 120 cm: (30,40,50), (20,48,52), (24,45,51)

// Given that L is the length of the wire, for how many values of L ≤ n can exactly one, integer sided right angle, triangle be formed?

// Useful resources:
// For generating triangles use Euclid's formula
// https://en.wikipedia.org/wiki/Pythagorean_triple
// For faster algorithm run
// https://codereview.stackexchange.com/questions/250855/efficiently-find-all-the-pythagorean-triplets-where-all-numbers-less-than-1000/250874#250874
export function singularIntRightTriangles(n: number) {
  let triangleNumbers = [];
  const limit = Math.floor(Math.sqrt(n - 1)) + 1;

  for (let m = 0; m < limit; ++m) {
    for (let j = 1 + (m % 2); j < Math.min(m, Math.floor(Math.sqrt(n - m * m) + 1)); j += 2) {
      const isCoprime = egcd(m, j) === 1;

      if (!isCoprime) continue;

      const a = m ** 2 - j ** 2;
      const b = 2 * m * j;
      const c = m ** 2 + j ** 2;

      for (let k = 1; k <= Math.floor(n / c) + 1; ++k) {
        const an = k * a;
        const bn = k * b;
        const cn = k * c;
        const sum = an + bn + cn;

        if (sum > n) continue;

        triangleNumbers.push(sum);
      }
    }
  }

  return removeDuplicates(triangleNumbers.sort((a, b) => a - b)).length;
}

function removeDuplicates(arr: number[]) {
  const obj: { [key: number]: number } = {};
  const uniqueArray = [];

  arr.forEach((item) => {
    obj[item] = (obj[item] += 1) || 1;
  });

  for (let key in obj) {
    if (obj[key] === 1) {
      uniqueArray.push(Number(key));
    }
  }

  return uniqueArray;
}

