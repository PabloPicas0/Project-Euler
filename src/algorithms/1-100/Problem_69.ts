// Problem 69: Totient maximum
// Euler's Totient export function, ϕ(n) (sometimes called the phi function),
// Is used to determine the number of numbers less than n which are relatively prime to n.
// For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, ϕ(9)=6 .

// n    Relatively Prime    ϕ(n)    n/ϕ(n)
// 2	  1	                  1	      2
// 3	  1,2	                2	      1.5
// 4	  1,3	                2	      2
// 5	  1,2,3,4	            4	      1.25
// 6	  1,5	                2	      3
// 7	  1,2,3,4,5,6	        6	      1.1666...
// 8	  1,3,5,7	            4	      2
// 9	  1,2,4,5,7,8	        6	      1.5
// 10	  1,3,7,9	            4	      2.5

// It can be seen that n = 6 produces a maximum n/ϕ(n) for n ≤ 10.

// Find the value of n ≤ limit for which n/ϕ(n) is a maximum.
function totientMaximum(limit: number) {
  let maxKnown = 0;
  let maxN = 0;

  for (let n = 2; n <= limit; ++n) {
    const current = n / phi(n);

    if (current > maxKnown) {
      maxKnown = current;
      maxN = n;
    }
  }

  return maxN;
}

// Euler's formula time complexity O(Φn*log n)
// Euler's formula auxiliary space O(1)
function phi(n: number) {
  let result = n;

  for (let i = 2; i * i <= n; ++i) {
    if (n % i === 0) {
      while (n % i === 0) {
        n /= i;
      }

      result *= 1 - 1 / i;
    }
  }

  if (n > 1) result -= result / n;

  return parseInt(result.toString());
}

