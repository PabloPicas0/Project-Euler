// Problem 33: Digit cancelling fractions
// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

// There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
export function digitCancellingFractions() {
  const fractions = [];

  for (let i = 11; i < 100; ++i) {
    for (let j = i + 1; j < 100; ++j) {
      const s = String([i, j]).split(",").join("").split("");

      if (s.includes("0") || s[1] !== s[2]) continue;

      const a = Number(s[0]);
      const b = Number(s[3]);

      const fraction = i / j;
      const lowerTermFraction = a / b;

      if (fraction !== lowerTermFraction) continue;

      fractions.push(lowerTermFraction);
    }
  }

  const product = Number(fractions.reduce((acc, number) => acc * number).toPrecision(1));

  return 1 / product;
}

