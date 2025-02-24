// Problem 97: Large non-Mersenne prime
// The first known prime found to exceed one million digits was discovered in 1999, and is a Mersenne prime of the form  26972593−1
// it contains exactly 2,098,960 digits. Subsequently other Mersenne primes, of the form  2p−1
// have been found which contain more digits.

// However, in 2004 there was found a massive non-Mersenne prime which contains 2,357,207 digits:  28433×27830457+1

// Find the last ten digits of that non-Mersenne prime in the form  multiplier×2power+1
export function largeNonMersennePrime(multiplier: number, power: number) {
  const m = BigInt(multiplier);
  const p = BigInt(power);

  return (m * fasterBigIntPow(2n, p) + 1n).toString().slice(-10);
}

function fasterBigIntPow(base: bigint, exp: bigint): bigint {
  if (exp === 0n) {
    return 1n;
  } else if (exp == 1n) {
    return base;
  } else if ((exp & 1n) != 0n) {
    return base * fasterBigIntPow(base * base, exp / 2n);
  } else {
    return fasterBigIntPow(base * base, exp / 2n);
  }
}

