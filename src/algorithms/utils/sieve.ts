export function sieve(n: number) {
  const numbers: boolean[] = new Array(n).fill(true);
  const primes: number[] = [];

  for (let i = 2; i < Math.sqrt(n); ++i) {
    if (numbers[i]) {
      for (let j = i * i; j < n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = 2; i < n; ++i) {
    if (numbers[i]) {
      primes.push(i);
    }
  }

  return primes;
}

export function sieveMap(n: number) {
  const numbers: boolean[] = new Array(n).fill(true);
  const primes = new Map<number, number>();

  for (let i = 2; i < Math.sqrt(n); ++i) {
    if (numbers[i]) {
      for (let j = i * i; j < n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = 2; i < n; ++i) {
    if (numbers[i]) {
      primes.set(i, i);
    }
  }

  return primes;
}
