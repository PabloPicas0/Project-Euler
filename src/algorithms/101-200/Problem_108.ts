// Problem 108: Diophantine Reciprocals I
// In the following equation x, y, and n are positive integers.

// 1x+1y=1n

// For n = 4 there are exactly three distinct solutions:

// 15+120=1416+112=1418+18=14

// What is the least value of n for which the number of distinct solutions exceeds one-thousand?
function diophantineOne() {
  const limit = 200000;
  const primes = sieve(limit);
  const sqrtTable = createSqrtTable(limit);
  let n = 4;

  while (n < limit) {
    const n2 = sqrtTable[n];
    const factors = primeFactors(n2, primes);

    if (!factors.length) {
      n += 1;
      continue;
    }

    const possiblePowers = getPossiblePowers(factors);
    const devisors = [];

    getDevisors(possiblePowers, 0, [], devisors);

    const pairs = findPairs(n2, devisors);

    if (pairs.length > 1000) break;

    n += 1;
  }

  return n;
}

function findPairs(n, devisors) {
  const pairs = [];

  for (let i = 0; i < devisors.length; ++i) {
    const d = devisors[i];
    const x = Math.floor(n / d);

    if (d <= x) pairs.push([d, x]);
  }

  return pairs;
}

function getDevisors(devisors, depth, combination, product) {
  if (devisors.length === depth) {
    const p = combination.reduce((acc, val) => acc * val);
    // console.log(combination)
    product.push(p);
  } else {
    for (let i = 0; i < devisors[depth].length; ++i) {
      const devisor = devisors[depth][i];
      getDevisors(devisors, depth + 1, [...combination, devisor], product);
    }
  }
}

function getPossiblePowers(factors) {
  const exponents = primeFactorExponents(factors);
  const powers = [];

  for (const [prime, exponent] of Object.entries(exponents)) {
    const possibleExponents = [];
    const p = Number(prime);

    for (let i = 0; i <= exponent; ++i) {
      possibleExponents.push(p ** i);
    }

    powers.push(possibleExponents);
  }

  return powers;
}

function primeFactorExponents(primeFactors) {
  return primeFactors.reduce((acc, factor) => {
    acc[factor] = acc[factor] + 1 || 1;

    return acc;
  }, {});
}

function primeFactors(n, primes) {
  const factors = [];
  let i = 0;

  while (n > 1) {
    const prime = primes[i];

    if (prime >= 100) return [];

    while(Number.isInteger(n / prime)) {
      factors.push(prime)
      n = n / prime
    }

    i += 1;
  }

  return factors;
}

function createSqrtTable(n) {
  const table = {};

  for (let i = 1; i <= n; ++i) {
    table[i] = i * i;
  }

  return table;
}