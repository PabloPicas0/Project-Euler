export function bigFact(num: number) {
  let rval = 1n;

  for (let i = 2n; i <= num; i++) {
    rval = BigInt(rval * i);
  }

  return rval;
}