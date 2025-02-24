// Problem 89: Roman numerals
// For a number written in Roman numerals to be considered valid there are basic rules which must be followed.
// Even though the rules allow some numbers to be expressed in more than one way there is always a best way of writing a particular number.

// Numerals must be arranged in descending order of size.
// M, C, and X cannot be equaled or exceeded by smaller denominations.
// D, L, and V can each only appear once.
// In addition to the three rules given above, if subtractive combinations are used then the following four rules must be followed.

// Only one I, X, and C can be used as the leading numeral in part of a subtractive pair.
// I can only be placed before V and X.
// X can only be placed before L and C.
// C can only be placed before D and M.
// For example, it would appear that there are at least six ways of writing the number sixteen:

// IIIIIIIIIIIIIIII
// VIIIIIIIIIII
// VVIIIIII
// XIIIIII
// VVVI
// XVI

// However, according to the rules only XIIIIII and XVI are valid, and the last example is considered to be the most efficient, as it uses the least number of numerals.

// The array, roman, will contain numbers written with valid, but not necessarily minimal, Roman numerals.

// Find the number of characters saved by writing each of these in their minimal form.

// Note: You can assume that all the Roman numerals in the array contain no more than four consecutive identical units.
export function romanNumerals(roman: string[]) {
  const romanNums = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const reducedForms = {
    4: "IV",
    6: "IVII", // Special Case
    9: "IX",
    40: "XL",
    90: "XC",
    400: "CD",
    900: "CM",
  };

  let charsSaved = 0;

  for (let i = 0; i < roman.length; ++i) {
    const rNumeral = roman[i].split("");
    const c = splitApart(rNumeral);
    const charCount = c.map((char) => [char[0], char.length]) as [string, number][];
    const minimal = getMinimalNumeral(charCount, romanNums, reducedForms);
    const oldLength = rNumeral.length;
    const newLength = minimal.length;

    charsSaved += oldLength - newLength;
  }

  return charsSaved;
}

function getMinimalNumeral(
  arr: [string, number][],
  romanNums: { [key: string]: number },
  reducedForms: { [key: number]: string }
) {
  let minimal = "";

  for (let i = 0; i < arr.length; ++i) {
    const [key, count] = arr[i];
    const num = romanNums[key];
    const reduced = num * count;
    const isReducable = reducedForms[reduced];

    if (isReducable) {
      minimal += isReducable;
      continue;
    }

    minimal += key.repeat(count);
  }

  const n = minimal
    .replace("VIV", reducedForms[9])
    .replace("LXL", reducedForms[90])
    .replace("DCD", reducedForms[900]);

  return n;
}

function splitApart(arr: string[]) {
  let begin = 0;
  let end = 1;
  let prevChar = arr[0];
  const parts = [];

  for (let i = 1; i < arr.length; ++i) {
    const currChar = arr[i];

    if (prevChar !== currChar) {
      const part = arr.slice(begin, end);
      parts.push(part);

      prevChar = arr[i];
      begin = i;
    }

    end += 1;
  }

  parts.push(arr.slice(begin));

  return parts;
}

