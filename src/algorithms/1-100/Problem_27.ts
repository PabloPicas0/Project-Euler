// Problem 27: Quadratic primes
// Euler discovered the remarkable quadratic formula:

// n2+n+41

// It turns out that the formula will produce 40 primes for the consecutive integer values  0≤n≤39
//  . However, when  n=40,402+40+41=40(40+1)+41
//   is divisible by 41, and certainly when  n=41,412+41+41
//   is clearly divisible by 41.

// The incredible formula  n2−79n+1601
//   was discovered, which produces 80 primes for the consecutive values  0≤n≤79
//  . The product of the coefficients, −79 and 1601, is −126479.

// Considering quadratics of the form:

// n2+an+b
//  , where  |a|<range
//   and  |b|≤range

// where  |n|
//   is the modulus/absolute value of  n

// e.g.  |11|=11
//   and  |−4|=4

// Find the product of the coefficients,  a
//   and  b
//  , for the quadratic expression that produces the maximum number of primes for consecutive values of  n
//  , starting with  n=0
//  .

export function quadraticPrimes(range: number) {
  let longestConsecutivePrimes = 0;
  let coefficient_a = 0;
  let coefficient_b = 0;

  for (let i = -range - 1; i <= range; ++i) {
    for (let j = -range; j <= range; ++j) {
      let n = 0;

      while (isPrime(n ** 2 + i * n + j)) {
        ++n;
      }

      if (longestConsecutivePrimes < n) {
        longestConsecutivePrimes = n;
        coefficient_a = i;
        coefficient_b = j;
      }
    }
  }

  return coefficient_a * coefficient_b;
}

function isPrime(num: number) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

