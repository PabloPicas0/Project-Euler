import { powmod } from "./powmod.ts";

// Trial devision
export function isPrime(num: number) {
  if (num <= 1) return false; // negatives
  if (num % 2 == 0 && num > 2) return false; // even numbers

  for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

// Optimized Miller-Rabin prime test
// See:
// https://euler.stephan-brumme.com/toolbox/#primetest-millerrabin
// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Miller%E2%80%93Rabin_test
export function millerIsPrimeTest(num: number) {
  const bitmaskPrimes2to31 = 0x208a28ac;

  if (num < 31) return (bitmaskPrimes2to31 & (1 << num)) !== 0;
  if (num % 2 == 0 || num % 3 == 0 || num % 5 == 0 || num % 7 == 0 || num % 11 == 0 || num % 13 == 0 || num % 17 == 0)
    return false;
  if (num < 17 * 19) return true;

  const STOP = 0;

  const test1 = [377687, STOP];
  const test2 = [31, 73, STOP];
  const test3 = [2, 7, 61, STOP];

  const test4 = [2, 13, 23, 1662803, STOP];
  const test7 = [2, 325, 9375, 28178, 450775, 9780504, 1795265022, STOP];

  let doTest = test7;

  if (num < 5329) {
    doTest = test1;
  } else if (num < 9080191) {
    doTest = test2;
  } else if (num < 4759123141) {
    doTest = test3;
  } else if (num < 1122004669633) {
    doTest = test4;
  }

  let d = num - 1;
  let s = 0;

  d >>= 1;

  while ((d & 1) === 0) {
    ++s;
    d >>= 1;
  }

  let i = 0;

  while (doTest[i] !== STOP) {
    let x = powmod(doTest[i++], d, num);

    if (x === 1 || x === num - 1) continue;

    let candidate = false;

    for (let j = 0; j < s; ++j) {
      x = (x * x) % num;

      if (x === 1) return false;
      if (x === num - 1) {
        candidate = true;
        break;
      }
    }

    if (!candidate) return false;
  }

  return true;
}
