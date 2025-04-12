// Problem 111: Primes with runs
// Considering 4-digit primes containing repeated digits it is clear that they cannot all be the same: 1111 is divisible by 11, 2222 is divisible by 22, and so on.
// But there are nine 4-digit primes containing three ones:

// 1117,1151,1171,1181,1511,1811,2111,4111,8111

// We shall say that  M(n,d)
//   represents the maximum number of repeated digits for an n-digit prime where d is the repeated digit,  N(n,d)
//   represents the number of such primes, and  S(n,d)
//   represents the sum of these primes.

// So  M(4,1)=3
//   is the maximum number of repeated digits for a 4-digit prime where one is the repeated digit, there are  N(4,1)=9
//   such primes, and the sum of these primes is  S(4,1)=22275
//  It turns out that for d = 0, it is only possible to have  M(4,0)=2
//   repeated digits, but there are  N(4,0)=13
//   such cases.

// In the same way we obtain the following results for 4-digit primes.

// Digit, d	 M(4,d)
//  	 N(4,d)
//  	 S(4,d)

// 0	2	13	67061
// 1	3	9	22275
// 2	3	1	2221
// 3	3	12	46214
// 4	3	2	8888
// 5	3	1	5557
// 6	3	1	6661
// 7	3	9	57863
// 8	3	1	8887
// 9	3	7	48073

// For d = 0 to 9, the sum of all  S(4,d) is 273700. Find the sum of all  S(10,d).

import { isPrime } from "../utils/isPrime.ts";
import { swap } from "../utils/swap.ts";

function primesWithRuns() {
  const primes: number[] = [];
  const n = 10;
  const suffix = "d";
  const positions = getPositions(n, suffix, 2);

  // Special 0 case
  primes.push(...getPossiblePrimes(positions[0], suffix));
  positions.shift();

  const digits = getDifferentDigits(positions);

  for (let i = 0; i < digits.length; ++i) {
    let digit = digits[i];

    for (let j = 0; j < digit.length; ++j) {
      const prime = getPossiblePrimes(digit[j], suffix);

      if (!prime.length) continue;

      primes.push(...prime);
      break;
    }
  }

  const sum = primes.reduce((acc, val) => acc + val);

  return sum;
}

function getDifferentDigits(positions: Set<string>[]) {
  const digits = [positions];
  const digitsToReplace = new RegExp("1", "g");

  for (let i = 2; i <= 9; ++i) {
    const digit: Set<string>[] = [];

    for (let j = 0; j < positions.length; ++j) {
      const iterator = positions[j].values();
      const newDigits = new Set<string>();

      for (const value of iterator) {
        newDigits.add(value.replace(digitsToReplace, i.toString()));
      }

      digit.push(newDigits);
    }

    digits.push(digit);
  }

  return digits;
}

function getPositions(n: number, suffix: string, placeholderAmmount: number) {
  const positions: Set<string>[] = [];
  let r = 1;
  let d = 0;

  while (r <= placeholderAmmount) {
    const position = new Set<string>();
    let max = n - r;

    if (d === 0) {
      const p = `${d}`.repeat(max - 1) + suffix.repeat(2);

      permute(p, position);
      positions.push(position);

      d += 1;
      continue;
    }

    const p = `${d}`.repeat(max) + suffix.repeat(r);
    permute(p, position);
    positions.push(position);

    ++r;
  }

  return positions;
}

function getPossiblePrimes(positions: Set<string>, d: string) {
  const postionsIterator = positions.values();
  const primes: number[] = [];

  for (let i = 0; i < positions.size; ++i) {
    const position: string = postionsIterator.next().value;
    const placeholderPositions = position.split("").reduce((acc, num, idx) => {
      if (num == d) acc.push(idx);

      return acc;
    }, [] as number[]);

    insertDifferentDigits(position, 0, placeholderPositions, [position], primes);
  }

  return primes;
}

function insertDifferentDigits(str: string, depth: number, placeholderPositions: number[], newStr: string[], primes: number[]) {
  if (depth === placeholderPositions.length) {
    const possiblePrime = Number(newStr.pop());

    if (!isPrime(possiblePrime)) return;

    const digitsAreNotSameLength = possiblePrime.toString().length !== str.length;

    if (digitsAreNotSameLength) return;

    primes.push(possiblePrime);
  } else {
    const strToInsert = newStr.pop()?.split("");
    
    if (!strToInsert) return

    const position = placeholderPositions[depth];

    for (let i = 0; i <= 9; ++i) {
      strToInsert[position] = i.toString();
      newStr.push(strToInsert.join(""));
      insertDifferentDigits(str, depth + 1, placeholderPositions, newStr, primes);
    }
  }
}

function permute(str: string, positions: Set<string>, y = str.length, strArr = str.split("")) {
  if (y === 1) {
    if (strArr[0] == "0") return;

    positions.add(strArr.join(""));
  } else {
    for (let i = 0; i < y; i++) {
      permute(str, positions, y - 1, strArr);

      if (y % 2 === 0) {
        swap(strArr, i, y - 1);
      } else {
        swap(strArr, 0, y - 1);
      }
    }
  }
}