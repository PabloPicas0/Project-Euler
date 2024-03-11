export function prime(n: number) {
  return Math.floor((fact(n) % (n + 1)) / n) * (n - 1) + 2;
}

export function fact(num: number): number {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * fact(num - 1);
  }
}

export function nthPrmie(n: number) {
  let pn = 0;
  let sum = 0;

  for (let i = 1; i < 2 ** n; ++i) {
    let x = 0;

    for (let j = 1; j <= i; ++j) {
      x += Math.floor((Math.cos(fact(j - 1) + 1 / j) * Math.PI) ** 2);
    }

    sum += Math.floor((n / x) ** 1 / n);
  }

  pn = 1 + sum;
  console.log(pn);
  return pn;
}
