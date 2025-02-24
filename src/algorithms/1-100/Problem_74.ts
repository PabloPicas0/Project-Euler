// Problem 74: Digit factorial chains
// The number 145 is well known for the property that the sum of the factorial of its digits is equal to 145:

// 1!+4!+5!=1+24+120=145

// Perhaps less well known is 169, in that it produces the longest chain of numbers that link back to 169; it turns out that there are only three such loops that exist:

// 169→363601→1454→169
// 871→45361→871
// 872→45362→872

// It is not difficult to prove that EVERY starting number will eventually get stuck in a loop. For example,

// 69→363600→1454→169→363601 (→1454)
// 78→45360→871→45361 (→871)
// 540→145 (→145)

// Starting with 69 produces a chain of five non-repeating terms, but the longest non-repeating chain with a starting number below one million is sixty terms.

// How many chains, with a starting number below n, contain exactly sixty non-repeating terms?

// Repeating digits in every number that have 60 non-repeating terms are
// 4,7,9
// It can be easily seen while brute forcing solution
export function digitFactorialChains(n: number) {
  let chainsNumber = 0;
  // factorial of digits from 1 to 9
  let fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

  // Checks if all three repeating numbers are present
  const regex = /(?=.*4)(?=.*7)(?=.*9)/g;

  for (let i = 10n; i < n; ++i) {
    const hasRepeatingTerms = regex.test(i.toString());

    if (!hasRepeatingTerms) continue;

    const terms = [i];

    while (terms.length < 60) {
      const lastTerm = terms.length - 1;
      const nextTerm = BigInt(
        terms[lastTerm]
          .toString()
          .split("")
          // Each digit is string so initial acc value is needed
          .reduce((acc, num) => acc + fact[Number(num)], 0)
      );

      if (terms.includes(nextTerm)) break;

      terms.push(nextTerm);
    }

    if (terms.length === 60) {
      chainsNumber += 1;
    }
  }

  return chainsNumber;
}

