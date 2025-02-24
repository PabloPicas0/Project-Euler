// Problem 17: Number letter counts
// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

// If all the numbers from 1 to given limit inclusive were written out in words, how many letters would be used?

// Note: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
const numbersToWords = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
} as { [key: number]: string };

export function numberLetterCounts(limit: number) {
  const numbersAsWords: string[] = [];

  for (let i = 1; i <= limit; ++i) {
    if (i < 20) {
      numbersAsWords.push(numbersToWords[i]);
    }

    if (i >= 20 && i < 100) {
      const digits = String(i).split("");
      const firstDigit = Number(digits[0] + 0);
      const secondDigit = Number(digits[1]);

      numbersAsWords.push(`${numbersToWords[firstDigit]} ${secondDigit ? numbersToWords[secondDigit] : ""}`);
    }

    if (i >= 100 && i < 1000) {
      let word = "";
      const digits = String(i).split("");
      const firstDigit = Number(digits[0]);
      const secondDigit = Number(digits[1]);
      const thirdDigit = Number(digits[2]);
      const isLessThanTwenty = 20 > Number(digits[1] + digits[2]) ? Number(digits[1] + digits[2]) : false;

      word += numbersToWords[firstDigit] + " hundred";

      if (!secondDigit && thirdDigit) word += ` and ${numbersToWords[thirdDigit]}`;

      if (secondDigit && isLessThanTwenty) word += ` and ${numbersToWords[isLessThanTwenty]}`;

      if (secondDigit && !isLessThanTwenty) {
        const combined = Number(digits[1] + 0);

        word += ` and ${numbersToWords[combined]} ${thirdDigit ? numbersToWords[thirdDigit] : ""}`;
      }
      numbersAsWords.push(word);
    }

    if (i >= 1000) numbersAsWords.push("one thousand");
  }

  const letterCount = numbersAsWords.reduce((acc, number) => {
    const count = number.replace(/\s/g, "").length;

    return acc + count;
  }, 0);

  return letterCount;
}

