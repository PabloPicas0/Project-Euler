// Problem 40: Champernowne's constant
// An irrational decimal fraction is created by concatenating the positive integers:

// 0.123456789101112131415161718192021...

// It can be seen that the 12th digit of the fractional part is 1.

// If dn represents the nth digit of the fractional part, find the value of the following expression.

// d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
export function champernownesConstant(n: number) {
  let fraction = ".";
  let product = 1;

  for (let i = 1; i <= n; ++i) {
    fraction += i;
  }

  for (let i = 10; i <= n; i *= 10) {
    product *= Number(fraction[i]);
  }

  return product;
}

