// Problem 9: Special Pythagorean triplet
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// c^2 = a^2 + b^2
// For example, 5^2 = 3^2 + 4^2 = 9 + 16 = 25.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.
export function specialPythagoreanTriplet(n: number) {
  let sumOfabc = n;
  let a = 0;
  let b = 0;
  let c = Math.sqrt(a ** 2 + b ** 2);
  let product = 0;

  for (let i = 1; i < n; ++i) {
    b = i;

    for (let j = 1; j < i; ++j) {
      a = j;
      c = Math.sqrt(a ** 2 + b ** 2);
      sumOfabc = a + b + c;

      if (sumOfabc === n) {
        product = a * b * c;
        break;
      }
    }
    if (product !== 0) break;
  }

  return product;
}

