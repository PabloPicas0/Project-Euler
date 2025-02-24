import { bigFact } from "../utils/bigFact.ts";
// Problem 53: Combinatoric selections
// There are exactly ten ways of selecting three from five, 12345:


// 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
// In combinatorics, we use the notation,  (53)=10

// In general,  (nr)=n!r!(n−r)!
//  , where  r≤n
//  ,  n!=n×(n−1)×...×3×2×1
//  , and  0!=1
//  .

// It is not until  n=23
//  , that a value exceeds one-million:  (2310)=1144066
//  .

// How many, not necessarily distinct, values of  (nr)
//   for  1≤n≤100
//  , are greater than one-million?
export function combinatoricSelections(limit: number) {
  let vals = 0;

  for (let n = 1; n <= 100; ++n) {
    const factN = bigFact(n);

    for (let r = 1; r <= n; ++r) {
      const factR = bigFact(r);
      const k = bigFact(n - r);
      const ways = factN / (factR * k);

      if (ways >= limit) {
        ++vals;
      }
    }
  }

  return vals;
}

