function fib(n) {
  if (n <= 1) return BigInt(n);

  const F = [
    [BigInt(1), BigInt(1)],
    [BigInt(1), BigInt(0)],
  ];

  const result = matrixPower(F, n - 1);
  return result[0][0];
}

function matrixPower(matrix, n) {
  let result = [
    [BigInt(1), BigInt(0)],
    [BigInt(0), BigInt(1)],
  ];
  let base = matrix;

  while (n > 0) {
    if (n % 2 === 1) {
      result = multiplyMatrices(result, base);
    }

    base = multiplyMatrices(base, base);
    n = Math.floor(n / 2);
  }
  return result;
}

function multiplyMatrices(a, b) {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}
