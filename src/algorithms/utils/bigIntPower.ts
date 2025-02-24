// FCC doesn't support power of BigInts
// Here is workaround

export function bigIntPower(base: number | bigint, exponent: number) {
  const newBase = BigInt(base);
  let result = 1n;
  for (let count = 0; count < exponent; count++) {
    result *= newBase;
  }
  return result;
}
