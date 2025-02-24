// Problem 93: Arithmetic expressions
// By using each of the digits from the set, {1, 2, 3, 4}, exactly once, and making use of the four arithmetic operations (+, −, *, /) and brackets/parentheses,
// it is possible to form different positive integer targets.

// For example,

// 8 = (4 * (1 + 3)) / 2
// 14 = 4 * (3 + 1 / 2)
// 19 = 4 * (2 + 3) − 1
// 36 = 3 * 4 * (2 + 1)
// Note that concatenations of the digits, like 12 + 34, are not allowed.

// Using the set, {1, 2, 3, 4}, it is possible to obtain thirty-one different target numbers of which 36 is the maximum,
// and each of the numbers 1 to 28 can be obtained before encountering the first non-expressible number.

// Find the set of four distinct digits, a < b < c < d,
// for which the longest set of consecutive positive integers, 1 to n, can be obtained, giving your answer as a string: abcd.
export function arithmeticExpressions() {
  let longestSet = "";
  let last = 0;
  const operators = ["+", "-", "*", "/"];
  const opCombinations = getCombinations(operators);
  const digits = getAllDigits();
  let digit = digits.next().value;

  while (digit) {
    let current = 0;
    const strDigit = digit.join("");
    const currentSet: number[] = [];

    permuteDigits(strDigit, currentSet, opCombinations);

    currentSet.sort((a, b) => a - b);

    for (let i = 1; i < currentSet.length; ++i) {
      if (currentSet[i] !== currentSet[i - 1] + 1) break;

      current += 1;
    }

    if (current > last) {
      last = current;
      longestSet = strDigit;
    }

    digit = digits.next().value;
  }

  return Number(longestSet);
}

function evl(a: number, b: number, operator: string) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
}

function permuteDigits(
  str: string,
  currentSet: number[],
  op: string[][],
  y = str.length,
  strArr = str.split("")
) {
  if (y === 1) {
    const [a, b, c, d] = strArr.map(Number);
    let intDigits: number[] = [];

    // ((a b) c) d , (a b) (c d) , (a (b c)) d , a ((b c) d) , a (b (c d))
    for (let i = 0; i < op.length; ++i) {
      const [o1, o2, o3] = op[i];

      // This magic here is representation of ordering this comment above
      // For all possible 3 operators combinations
      const res1 = evl(evl(evl(a, b, o1), c, o2), d, o3);
      const res2 = evl(evl(a, b, o1), evl(c, d, o2), o3);
      const res3 = evl(evl(a, evl(b, c, o2), o1), d, o3);
      const res4 = evl(a, evl(evl(b, c, o2), d, o3), o1);
      const res5 = evl(a, evl(b, evl(c, d, o2), o2), o1);

      const digits = Array.from(new Set([res1, res2, res3, res4, res5])).filter(
        (n) => Number.isInteger(n) && n > 0
      );

      intDigits = intDigits.concat(digits);
    }

    intDigits.forEach((digit) => {
      if (!currentSet.includes(digit)) currentSet.push(digit);
    });
  } else {
    for (let i = 0; i < y; i++) {
      permuteDigits(str, currentSet, op, y - 1, strArr);
      if (y % 2 === 0) {
        swap(strArr, i, y - 1);
      } else {
        swap(strArr, 0, y - 1);
      }
    }
  }
}

function* getAllDigits() {
  for (let d = 4; d <= 9; ++d) {
    for (let c = 3; c < d; ++c) {
      for (let b = 2; b < c; ++b) {
        for (let a = 1; a < b; ++a) {
          yield [a, b, c, d];
        }
      }
    }
  }
}

function getCombinations(operators: string[]) {
  const combo = [];

  for (let op1 of operators) {
    for (let op2 of operators) {
      for (let op3 of operators) {
        combo.push([op1, op2, op3]);
      }
    }
  }

  return combo;
}

