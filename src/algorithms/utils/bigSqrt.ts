import { bigIntPower } from "./bigIntPower.ts";

// Input: a positive integer, the number of precise digits after the decimal point
// Output: a string representing the long float square root
export function bigSqrt(number: number, numDigits: number) {
  let a = 5n * BigInt(number);
  let b = 5n;
  const precision_digits = bigIntPower(10, numDigits + 1);

  while (b < precision_digits) {
    if (a >= b) {
      a = a - b;
      b = b + 10n;
    } else {
      a = a * 100n;
      b = (b / 10n) * 100n + 5n;
    }
  }

  let decimal_pos = Math.floor(Math.log10(number));

  if (decimal_pos == 0) decimal_pos = 1;

  let result = (b / 100n).toString();

  result = result.slice(0, decimal_pos) + "." + result.slice(decimal_pos);

  return result;
}
