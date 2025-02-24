// Problem 70: Totient permutation
// Euler's Totient export function, ϕ(n) (sometimes called the phi function),
// Is used to determine the number of positive numbers less than or equal to n which are relatively prime to n.
// For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, ϕ(9)=6
// The number 1 is considered to be relatively prime to every positive number, so ϕ(1)=1

// Interestingly, ϕ(87109)=79180
// And it can be seen that 87109 is a permutation of 79180.

// Find the value of n, 1 < n < limit, for which ϕ(n)
// Is a permutation of n and the ratio n/ϕ(n) produces a minimum.
function totientPermutation(limit: number) {
  const primes = sieve(limit);
  let minimumRatio = 999;
  let nValue = 0;

  for (let i = 0; i < primes.length; ++i) {
    for (let j = i; j < primes.length; ++j) {
      const n = primes[i] * primes[j];

      if (n > limit) break;

      const totient = phi(n);
      const phiIsPermutationOfN = isPermutation(n, totient);
      const currentRatio = n / totient;

      if (phiIsPermutationOfN && currentRatio < minimumRatio) {
        nValue = n;
        minimumRatio = currentRatio;
      }
    }
  }

  return nValue;
}

function isPermutation(original: number, permutation: number) {
  if (!original || !permutation) console.error("Enter all arguments");

  const str1 = original.toString();
  const str2 = permutation.toString();

  if (str1.length !== str2.length) return false;

  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

