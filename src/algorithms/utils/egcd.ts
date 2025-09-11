export function egcd(a: number, b: number, x?: number, y?: number) {
  // Base Case
  if (a == 0) {
    x = 0;
    y = 1;
    return b;
  }

  // To store results
  // of recursive call
  let gcd: number = egcd(b % a, a, x, y);

  // Update x and y using
  // results of recursive
  // call
  x = y - (b / a) * x;
  y = x;

  return gcd;
}

// The extended Euclidean algorithm updates the results of gcd(a, b) using the results calculated by the recursive call gcd(b%a, a).
// Let values of x and y calculated by the recursive call be x1 and y1. x and y are updated using the below expressions.

// x = [1]
// y = [2]

export function egcd2(a: number, b: number, x: number[], y: number[]) {
  // Base Case
  if (a == 0) {
    x[0] = 0;
    y[0] = 1;
    return b;
  }

  let x1 = [0];
  let y1 = [0];
  // To store results
  // of recursive call
  let gcd: number = egcd(b % a, a, x1, y1);

  // Update x and y using
  // results of recursive
  // call
  x[0] = y1[0] - Math.floor(b / a) * x1[0];
  y[0] = x1[0];

  return gcd;
}
