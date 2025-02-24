// Problem 48: Self powers
// The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

// Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

// Huge note this is correct but freeCodeCamp has a bug and throws error
// https://github.com/freeCodeCamp/freeCodeCamp/issues/39352
export function selfPowers(power: number, lastDigits: number) {
  let sum = 0n;
  let sumAsString: string[] = [];
  const lastNDigits: string[] = [];

  for (let i = 1n; i < BigInt(power); ++i) {
    sum += i ** i;
  }

  sumAsString = String(sum).replace("n", "").split("");

  for (let i = lastDigits; i > 0; --i) {
    const digit = sumAsString.at(-i);

    if (digit) {
      lastNDigits.push(digit);
    }
  }

  return Number(lastNDigits.join(""));
}

