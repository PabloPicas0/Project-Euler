// Problem 43: Sub-string divisibility
// The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.

// Let  d1
//   be the  1st
//   digit,  d2
//   be the  2nd
//   digit, and so on. In this way, we note the following:

// d2d3d4=406
//   is divisible by 2
// d3d4d5=063
//   is divisible by 3
// d4d5d6=635
//   is divisible by 5
// d5d6d7=357
//   is divisible by 7
// d6d7d8=572
//   is divisible by 11
// d7d8d9=728
//   is divisible by 13
// d8d9d10=289
//   is divisible by 17
// Find the sum of all 0 to n pandigital numbers with sub-strings fulfilling n - 2 of these divisibility properties.

// Note: Pandigital numbers starting with 0 are to be considered in the result.
export function substringDivisibility(n: number) {
  let sum = 0;
  let nPandigital = "";
  const divisibles = [2, 3, 5, 7, 11, 13, 17];

  for (let i = 0; i <= n; ++i) {
    nPandigital += i;
  }

  function permute(str: string, y = str.length, strArr = str.split("")) {
    if (y === 1) {
      const s = strArr.join("");
      let isDivisible = true;

      for (let j = 1; j <= s.length; ++j) {
        let subS = "";

        for (let x = j; x < j + 3 && j + 3 <= s.length; ++x) {
          subS += s[x];
        }

        if (subS === "") break;

        const subStringNumber = Number(subS);
        const currentDivisor = divisibles[j - 1];

        if (subStringNumber % currentDivisor !== 0) {
          isDivisible = false;
          break;
        }
      }

      if (isDivisible) {
        sum += Number(s);
      }
    } else {
      for (let i = 0; i < y; i++) {
        permute(str, y - 1, strArr);
        if (y % 2 === 0) {
          swap(strArr, i, y - 1);
        } else {
          swap(strArr, 0, y - 1);
        }
      }
    }
  }

  permute(nPandigital);

  return sum;
}

function swap(strArr: string[], i: number, j: number) {
  const temp = strArr[i];
  strArr[i] = strArr[j];
  strArr[j] = temp;
}

