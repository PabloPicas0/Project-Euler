export function binomial(n: number, k: number) {
  let coof = 1;

  for (let i = 1; i <= k; ++i) {
    coof *= (n + 1 - i) / i;
  }

  return coof;
}
