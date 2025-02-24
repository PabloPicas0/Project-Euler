import { bigIntPower } from "../utils/bigIntPower.ts";
// Problem 66: Diophantine equation
// Consider quadratic Diophantine equations of the form:


// x2 – Dy2 = 1
// For example, when D=13, the minimal solution in x is 6492 – 13×1802 = 1.

// It can be assumed that there are no solutions in positive integers when D is square.

// By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:

// 32 – 2×22 = 1
// 22 – 3×12 = 1
// 92 – 5×42 = 1
// 52 – 6×22 = 1
// 82 – 7×32 = 1
// Hence, by considering minimal solutions in x for D ≤ 7, the largest x is obtained when D=5.

// Find the value of D ≤ n in minimal solutions of x for which the largest value of x is obtained.
export function diophantineEquation(n: number) {
  const D = getDValues(n);
  const solutions = [0n, 0n];
  let dValue = 0n;

  for (let i = 0; i < D.length; ++i) {
    const k = D[i];
    let sequence = getSequence(k);
    const [x, y, d] = getMinimalSolutions(sequence, BigInt(k));
    const [currentX, currentY] = solutions;

    if (x > currentX) {
      solutions[0] = x;
      solutions[1] = y;
      dValue = d;
    }
  }

  return Number(dValue.toString());
}

function getMinimalSolutions(sequence: number[], d: bigint) {
  const newSequence = [...sequence];
  const copy = newSequence.slice(1, newSequence.length);
  const slength = newSequence.length - 1;

  if (isEven(slength)) {
    newSequence.pop();
  } else {
    newSequence.splice(1, 0, ...copy);
    newSequence.pop();
  }

  let pellsEquation = bigIntPower(0, 2) - d * bigIntPower(0, 2);

  while (pellsEquation !== 1n) {
    const p = newSequence.length - 1;
    const start = decimalToFraction(1 / newSequence[p], false);
    const [x, y] = denoteSequence(newSequence, p - 1, start)
      .split("/")
      .map((num) => BigInt(num));

    pellsEquation = bigIntPower(x, 2) - d * bigIntPower(y, 2);

    if (pellsEquation === 1n) return [x, y, d];

    newSequence.splice(1, 0, ...copy);
  }

  return [0n, 0n, 0n];
}

function denoteSequence(sequence: number[], i: number, start: string) {
  const s = intToFraction(sequence[i], start);

  const nr = start.split("/").map((num) => BigInt(num));
  const ns = s.split("/").map((num) => BigInt(num));

  const cn = addFractions(nr, ns).split("/").reverse().join("/");

  if (i === 0) return cn.split("/").reverse().join("/");

  return denoteSequence(sequence, i - 1, cn);
}

function isEven(number: number) {
  return number % 2 === 0;
}

function getDValues(n: number) {
  const D: number[] = [];

  for (let i = 2; i <= n; ++i) {
    const sqrt = Math.sqrt(i);
    const isPerfectSqrt = Number.isInteger(sqrt);

    if (isPerfectSqrt) continue;

    D.push(i);
  }

  return D;
}

// NOTE fraction need to have same denominator
function addFractions(fract1: bigint[], fract2: bigint[]) {
  const [num1, den1] = fract1.map((num) => BigInt(num));
  const [num2, den2] = fract2.map((num) => BigInt(num));

  return `${num1 + num2}/${den2}`;
}

function intToFraction(integer: number | bigint, fract: string) {
  integer = BigInt(integer);

  const [num, den] = fract.split("/").map((num) => BigInt(num));

  return `${integer * den}/${den}`;
}

/*
Description: Convert a decimal number into a fraction
Author: Michaël Niessen (© 2018)
Website: http://AssemblySys.com

If you find this script useful, you can show your
appreciation by getting Michaël a cup of coffee ;)
https://ko-fi.com/assemblysys

As long as this notice (including author name and details) is included and
UNALTERED, this code can be used and distributed freely.
*/

function decimalToFraction(value: number, donly = true) {
  var tolerance = 1.0e-6; // from how many decimals the number is rounded
  var h1 = 1;
  var h2 = 0;
  var k1 = 0;
  var k2 = 1;
  var negative = false;
  var i: number = 0;

  if (Number.isInteger(value)) {
    // if value is an integer, change it to fraction and stop function
    return `${value}/1`;
  } else if (value < 0) {
    negative = true;
    value = -value;
  }

  if (donly) {
    i = value;
    value -= i;
  }

  var b = value;

  do {
    var a = Math.floor(b);
    var aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(value - h1 / k1) > value * tolerance);

  return (negative ? "-" : "") + (donly && i != 0 ? i + " " : "") + (h1 == 0 ? "" : h1 + "/" + k1);
}

function getSequence(num: number, sqrt = Math.sqrt(num), sequence = [~~sqrt], a = ~~sqrt, b = 0, c = 1) {
  const intPart = Math.trunc(sqrt);

  const B = a * c - b;
  const C = Math.trunc((num - B * B) / c);
  const A = Math.trunc((intPart + B) / C);

  sequence.push(A);

  if (C === 1) return sequence;

  return getSequence(num, sqrt, sequence, A, B, C);
}

