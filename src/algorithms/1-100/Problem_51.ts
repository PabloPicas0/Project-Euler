// Problem 51: Prime digit replacements
// By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

// By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.

// Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an n prime value family.

// Combinations for 2-digit vals [10]
// Combinations for 3-digit vals [10, 100, 110]
// Combinations for 4-digit vals [10, 100, 110, 1000, 1010, 1100, 1110]
// Combinations for 5-digit vals [10, 100, 110, 1000, 1010, 1100, 1110, 10000, 10010, 10100, 11000, 10110 ,11010, 11100, 11110]
// Combinations for 6-digit vals [10, 100, 110, 1000, 1010, 1100, 1110, 10000, 10010, 10100, 11000, 10110, 11010, 11100, 11110 ,100000, 100010, 100100, 101000, 110000, 100110, 101010, 110010, 110100, 111000, 101110, 110110, 111010, 111100, 111110]
export function primeDigitReplacements(n: number) {
  const primes = sieveMap(929394);
  let p = n >= 7 ? 56003 : 13;

  while (true) {
    if (!primes.has(p)) {
      p += 10;
      continue;
    }

    let m = p;

    const possibleReplacement = getReplacement(p);

    if (possibleReplacement === -1) {
      p += 10;
      continue;
    }

    const { replacement, isZero } = possibleReplacement;

    const r = Number(replacement);
    const i = isZero ? 9 : 8;

    const pFamily = [p];

    for (let j = 0; j < i; ++j) {
      m += r;

      if (primes.has(m)) {
        pFamily.push(m);
      }
    }

    if (pFamily.length === n) {
      return pFamily[0];
    }

    p += 10;
  }
}

function getReplacement(p: number) {
  let replacement = "";
  const m = p.toString();

  for (let i = 0; i < m.length; ++i) {
    if (m[i] === "0") {
      replacement += 1;
    } else {
      replacement += 0;
    }
  }

  if (replacement.indexOf("1") === -1) {
    replacement = "";
  } else {
    return { replacement, isZero: true };
  }

  for (let i = 0; i < m.length; ++i) {
    if (m[i] === "1") {
      replacement += 1;
    } else {
      replacement += 0;
    }
  }

  return replacement.indexOf("1") === -1 ? -1 : { replacement, isZero: false };
}

