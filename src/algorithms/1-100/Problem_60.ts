// Problem 60: Prime pair sets
// The primes 3, 7, 109, and 673, are quite remarkable. By taking any two primes and concatenating them in any order the result will always be prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

// Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

export function primePairSets() {
  const primes = sieve(10000);
  let primesSet: number[] = [];
  let n = 1;

  while (n < primes.length) {
    primesSet.push(primes[n]);

    for (let i = 0; i < primes.length; ++i) {
      let producePrime = true;

      for (let j = 0; j < primesSet.length; ++j) {
        const order1 = parseInt(primes[i] + "" + primesSet[j]);
        const order2 = parseInt(primesSet[j] + "" + primes[i]);

        if (!isPrime(order1) || !isPrime(order2)) {
          producePrime = false;
          break;
        }
      }

      if (!producePrime) continue;

      primesSet.push(primes[i]);
    }

    if (primesSet.length === 5) {
      return primesSet.reduce((acc, num) => acc + num);
    }

    primesSet = [];
    ++n;
  }
}

