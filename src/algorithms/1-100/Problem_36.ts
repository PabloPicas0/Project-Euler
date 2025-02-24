// Problem 36: Double-base palindromes
// The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

// Find the sum of all numbers, less than n, whereas 1000 ≤ n ≤ 1000000, which are palindromic in base 10 and base 2.

// (Please note that the palindromic number, in either base, may not include leading zeros.)
export function doubleBasePalindromes(n: number) {
  let sum = 0;

  for (let i = 1; i < n; ++i) {
    const reverseI = parseFloat(String(i).split("").reverse().join(""));
    const binary = Number(i).toString(2);
    const reverseBinary = Number(i).toString(2).split("").reverse().join("");

    if (i == reverseI && binary === reverseBinary) {
      sum += i;
    }
  }

  return sum;
}

