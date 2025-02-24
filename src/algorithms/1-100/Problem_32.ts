// Problem 32: Pandigital products
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.

// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

// Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through n pandigital.

// Hint: Some products can be obtained in more than one way so be sure to only include it once in your sum.
export function pandigitalProducts(n: number) {
  const products: number[] = [];

  for (let i = 1; i <= Math.ceil(9999 / 2); ++i) {
    for (let j = 1; j <= Math.floor(9999 / i); ++j) {
      let isPandigital = true;
      const product = i * j;

      const s = String([i, j, product]).split(",").join("").split("");

      if (s.length !== n || s.includes("0")) continue;

      for (let k = 1; k <= n; ++k) {
        if (!s.includes(`${k}`)) {
          isPandigital = false;
          break;
        }
      }

      if (isPandigital) {
        products.push(product);
        break;
      }
    }
  }

  return Array.from(new Set(products)).reduce((acc, number) => acc + number, 0);
}

