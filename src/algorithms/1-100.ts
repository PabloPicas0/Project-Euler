export function prime(n: number) {
  return Math.floor((fact(n) % (n + 1)) / n) * (n - 1) + 2;
}

export function fact(num: number): number {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * fact(num - 1);
  }
}

export function nthPrmie(n: number) {
  let pn = 0;
  let sum = 0;

  for (let i = 1; i < 2 ** n; ++i) {
    let x = 0;

    for (let j = 1; j <= i; ++j) {
      x += Math.floor((Math.cos(fact(j - 1) + 1 / j) * Math.PI) ** 2);
    }

    sum += Math.floor((n / x) ** 1 / n);
  }

  pn = 1 + sum;
  console.log(pn);
  return pn;
}

// Problem 9: Special Pythagorean triplet
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// c^2 = a^2 + b^2
// For example, 5^2 = 3^2 + 4^2 = 9 + 16 = 25.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.
export function specialPythagoreanTriplet(n: number) {
  let sumOfabc = n;
  let a = 0;
  let b = 0;
  let c = Math.sqrt(a ** 2 + b ** 2);
  let product = 0;

  for (let i = 1; i < n; ++i) {
    b = i;

    for (let j = 1; j < i; ++j) {
      a = j;
      c = Math.sqrt(a ** 2 + b ** 2);
      sumOfabc = a + b + c;

      if (sumOfabc === n) {
        product = a * b * c;
        break;
      }
    }
    if (product !== 0) break;
  }

  return product;
}

// Problem 10: Summation of primes
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below n.
export function primeSummation(n: number) {
  const primes = sieve(n);

  return primes.reduce((acc, prime) => acc + prime);
}

function sieve(n: number) {
  const numbers: boolean[] = new Array(n).fill(true);
  const primes: number[] = [];

  for (let i = 2; i < Math.sqrt(n); ++i) {
    if (numbers[i]) {
      for (let j = i * i; j < n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = 2; i < n; ++i) {
    if (numbers[i]) {
      primes.push(i);
    }
  }

  return primes;
}

// Problem 11: Largest product in a grid
// In the 20×20 grid below, four numbers along a diagonal line have been marked in red.

// 08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
// 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
// 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
// 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
// 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
// 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
// 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
// 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
// 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
// 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
// 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
// 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
// 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
// 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
// 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
// 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
// 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
// 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
// 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
// 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48

// The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
// What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in a given arr grid?

function largestGridProduct(arr: number[][]) {
  let product = 0;

  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[i].length; ++j) {
      const right: number[] = [];
      const left: number[] = [];
      const down: number[] = [];
      const up: number[] = [];

      const diagonalUpRight: number[] = [];
      const diagonalUpLeft: number[] = [];
      const diagonalDownRight: number[] = [];
      const diagonalDownLeft: number[] = [];

      // check right direction
      for (let k = j, m = i; k < j + 4 && m > i - 4; ++k, --m) {
        if (arr[i][k] !== undefined) {
          right.push(arr[i][k]);
        }

        if (arr[m] !== undefined && arr[m][k] !== undefined) {
          diagonalUpRight.push(arr[m][k]);
        }
      }

      // check left direction
      for (let k = j, m = i; k > j - 4 && m < i + 4; --k, ++m) {
        if (arr[i][k] !== undefined) {
          left.push(arr[i][k]);
        }

        if (arr[m] !== undefined && arr[m][k] !== undefined) {
          diagonalDownLeft.push(arr[m][k]);
        }
      }

      // check down direction
      for (let k = i, m = j; k < i + 4 && m < j + 4; ++k, ++m) {
        if (arr[k] !== undefined) {
          down.push(arr[k][j]);
        }

        if (arr[k] !== undefined && arr[k][m] !== undefined) {
          diagonalDownRight.push(arr[k][m]);
        }
      }

      // check up direction
      for (let k = i, m = j; k > i - 4 && m > j - 4; --k, --m) {
        if (arr[k] !== undefined) {
          up.push(arr[k][j]);
        }

        if (arr[k] !== undefined && arr[k][m] !== undefined) {
          diagonalUpLeft.push(arr[k][m]);
        }
      }

      product = Math.max(
        product,
        getProduct(right),
        getProduct(left),
        getProduct(down),
        getProduct(diagonalUpRight),
        getProduct(diagonalUpLeft),
        getProduct(diagonalDownRight),
        getProduct(diagonalDownLeft)
      );
    }
  }

  return product;
}

function getProduct(arr: number[]) {
  return arr.reduce((acc, number) => acc * number);
}

// Problem 12: Highly divisible triangular number
// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
// Let us list the factors of the first seven triangle numbers:

// 1: 1
// 3: 1, 3
// 6: 1, 2, 3, 6
// 10: 1, 2, 5, 10
// 15: 1, 3, 5, 15
// 21: 1, 3, 7, 21
// 28: 1, 2, 4, 7, 14, 28
// We can see that 28 is the first triangle number to have over five divisors.

// What is the value of the first triangle number to have over n divisors?
function divisibleTriangleNumber(n) {
  let triangularNumber = 1;
  let devisors = 0;
  let k = 2;

  while (devisors < n) {
    triangularNumber += k;

    for (let i = 1; i <= triangularNumber; ++i) {
      if (triangularNumber % i === 0) {
        ++devisors;
      }
    }
    console.log(triangularNumber, devisors);

    if (devisors > n) break;

    devisors = 0;
    ++k;
  }
  // console.log(triangularNumber, devisors)
  return triangularNumber;
}
