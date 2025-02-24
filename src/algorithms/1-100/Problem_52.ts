// Problem 52: Permuted multiples
// It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.

// Find the smallest positive integer, such that multiplied by integers  {2,3,…,n}
//  , contain the same digits.
export function permutedMultiples(n: number) {
  const digits: number[] = [];
  let x = 2;

  for (let i = 2; i <= n; ++i) {
    digits.push(i);
  }

  while (true) {
    let bitMap: boolean[] = new Array(digits.length).fill(true);

    for (let i = 0; i < digits.length; ++i) {
      let c = x * digits[i];

      if (!hasSameDigits(x, c)) {
        bitMap[i] = false;
        break;
      }
    }

    if (!bitMap.includes(false)) return x;
    ++x;
  }
}

function hasSameDigits(x: number, y: number) {
  const z = x
    .toString()
    .split("")
    .sort((a: any, b: any) => a - b)
    .join("");
  const j = y
    .toString()
    .split("")
    .sort((a: any, b: any) => a - b)
    .join("");

  if (z.length < j.length) return false;

  return z == j;
}

