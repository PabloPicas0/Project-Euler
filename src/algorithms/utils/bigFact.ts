export function bigFact(num: number) {
  let rval = 1n;

  for (let i = 2n; i <= num; i++) {
    rval = BigInt(rval * i);
  }

  return rval;
}

export function fact(num: number) {
  let rval = 1;

  for (let i = 2; i <= num; i++) {
    rval = rval * i;
  }

  return rval;
}