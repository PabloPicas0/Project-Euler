// Problem 118: Pandigital prime sets
// Using all of the digits 1 through 9 and concatenating them freely to form decimal integers, different sets can be formed.
// Interestingly with the set  {2,5,47,89,631} all of the elements belonging to it are prime.

// How many distinct sets containing each of the digits one through nine exactly once contain only prime elements?

import { isPrime } from "../utils/isPrime.ts";
import { swap } from "../utils/swap.ts";

function pandigitalPrimeSets() {
  const sets: string[] = [];
  permute("987654321", sets);

  return new Set(sets).size;
}

function createPrimeSets(strArr: string[], set: string[], sets: string[][]): string[][] {
  if (!strArr.length) {
    sets.push([...set]);
    return sets;
  }

  for (let i = 1; i <= strArr.length; i++) {
    const prefix = strArr.slice(0, i).join("");

    if (isPrime(Number(prefix))) {
      set.push(prefix);
      createPrimeSets(strArr.slice(i), set, sets);
      set.pop();
    }
  }

  return sets;
}

function permute(str: string, sets: string[], y = str.length, strArr = str.split("")) {
  if (y === 1) {
    const primeSets = createPrimeSets(strArr, [], []);

    if (!primeSets.length) return;

    const sortedPrimeSet = primeSets.map((s) => s.sort((a, b) => Number(a) - Number(b)).join(","));

    sets.push(...sortedPrimeSet);
  } else {
    for (let i = 0; i < y; i++) {
      permute(str, sets, y - 1, strArr);

      if (y % 2 === 0) {
        swap(strArr, i, y - 1);
      } else {
        swap(strArr, 0, y - 1);
      }
    }
  }
}