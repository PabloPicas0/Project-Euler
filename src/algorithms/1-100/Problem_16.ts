// Problem 16: Power digit sum
// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2exponent?
export function powerDigitSum(exponent: number) {
  const pow = BigInt(2 ** exponent);
  const digits = String(pow).split("");
  const sumOfExponentDigits = digits.reduce((acc, digit) => acc + Number(digit), 0);

  return sumOfExponentDigits;
}

