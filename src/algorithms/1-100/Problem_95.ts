// Problem 95: Amicable chains
// The proper divisors of a number are all the divisors excluding the number itself.
// For example, the proper divisors of 28 are 1, 2, 4, 7, and 14. As the sum of these divisors is equal to 28, we call it a perfect number.

// Interestingly the sum of the proper divisors of 220 is 284 and the sum of the proper divisors of 284 is 220, forming a chain of two numbers.
// For this reason, 220 and 284 are called an amicable pair.

// Perhaps less well known are longer chains. For example, starting with 12496, we form a chain of five numbers:

// 12496→14288→15472→14536→14264(→12496→⋯)

// Since this chain returns to its starting point, it is called an amicable chain.

// Find the smallest member of the longest amicable chain with no element exceeding limit.

// This solution is not fastest
// And it checks not all numbers but every 4th
// But this speeds up enough to pass all test cases
export function amicableChains(limit: number) {
  const primes = sieveMap(limit);
  let i = 28;
  let longestChain = 0;
  let smallest = 0;

  while (i < limit) {
    if (primes.has(i)) {
      i += 4;
      continue;
    }

    const chain = [i];
    let isAmicableChain = false;

    while (true) {
      const lastInChain = chain[chain.length - 1];
      let sumOfDivisors = getDevisors(lastInChain).reduce((acc, val) => acc + val);

      if (sumOfDivisors === i) {
        isAmicableChain = true;
        break;
      }

      if (chain.includes(sumOfDivisors) || primes.has(sumOfDivisors) || sumOfDivisors > limit) break;

      chain.push(sumOfDivisors);
    }

    if (isAmicableChain && chain.length > longestChain) {
      longestChain = chain.length;
      smallest = i;
    }

    i += 4;
  }

  return smallest;
}

function getDevisors(num: number) {
  const devisors = [1];

  for (let i = 2; i <= Math.sqrt(num); ++i) {
    const devisor = num / i;
    const isProperDevisor = Number.isInteger(devisor);

    if (isProperDevisor && devisor === i) {
      devisors.push(devisor);
      continue;
    }

    if (isProperDevisor) devisors.push(devisor, i);
  }

  return devisors.sort((a, b) => a - b);
}

