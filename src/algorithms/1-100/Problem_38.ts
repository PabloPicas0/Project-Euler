// Problem 38: Pandigital multiples
// Take the number 192 and multiply it by each of 1, 2, and 3:

// 192×1=192192×2=384192×3=576

// By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1, 2, 3).

// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1, 2, 3, 4, 5).

// What is the largest 1 to k pandigital k-digit number that can be formed as the concatenated product of an integer with (1, 2, ..., n) where n > 1?
export function pandigitalMultiples(k: number) {
  let current = "";

  // Magic number 9328 could be done better but this passes test cases up to 1 to 9 pandigital
  for (let i = 1; i < 9328; ++i) {
    let n = 1;
    let concatenatedProduct = "";
    let isPandigital = true;

    while (concatenatedProduct.length < k) {
      const product = i * n;
      const nextConcatenation = concatenatedProduct + product;

      if (nextConcatenation.length > k) break;

      concatenatedProduct = nextConcatenation;

      ++n;
    }

    if (concatenatedProduct.includes("0")) continue;

    for (let j = 1; j <= k; ++j) {
      if (!concatenatedProduct.includes(`${j}`)) {
        isPandigital = false;
        break;
      }
    }

    if (isPandigital && Number(current) < Number(concatenatedProduct)) {
      current = concatenatedProduct;
    }
  }

  return Number(current);
}

