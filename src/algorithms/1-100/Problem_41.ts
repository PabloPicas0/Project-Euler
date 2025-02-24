// Problem 41: Pandigital prime
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.

// What is the largest n-length digit pandigital prime that exists?
export function pandigitalPrime(n: number) {
  let pandigitalPrime = 0;
  let minLength = "";
  let maxLength = "";

  for (let i = n, j = 1; i > 0; --i, ++j) {
    maxLength += i;
    minLength += j;
  }

  for (let i = Number(minLength); i < Number(maxLength); ++i) {
    if (isPrime(i)) {
      const s = String(i).split("");
      let isPandigital = true;

      for (let j = 1; j <= n; ++j) {
        if (!s.includes(`${j}`)) {
          isPandigital = false;
          break;
        }
      }

      if (isPandigital) {
        pandigitalPrime = i;
      }
    }
  }

  return pandigitalPrime;
}

