// Problem 24: Lexicographic permutations
// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210
// What is the nth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
export function lexicographicPermutations(n: number) {
  const digits: number[] = [];
  const fact = factoriadic(n);
  const perm: number[] = [];

  for (let i = 0; i <= 9; ++i) {
    digits.push(i);
  }

  for (let i = 0; i < fact.length; ++i) {
    const digit = digits[fact[i]];
    digits.splice(fact[i], 1);
    perm.push(digit);
  }

  return Number(perm.join(""));
}

function factoriadic(n: number) {
  const factoradics: number[] = [];

  let i = 1;
  while (n > 0) {
    factoradics.push(n % i);
    n = Math.floor(n / i);
    ++i;
  }

  return factoradics.reverse();
}

