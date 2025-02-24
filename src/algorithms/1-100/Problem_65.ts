// Problem 65: Convergents of e
// The square root of 2 can be written as an infinite continued fraction.

// √2=1+1/2+1/2+1/2+1/2+...

// The infinite continued fraction can be written, √2=[1;(2)] indicates that 2 repeats ad infinitum.
// In a similar way, √23=[4;(1,3,1,8)].
// It turns out that the sequence of partial values of continued fractions for square roots provide the best rational approximations. Let us consider the convergents for √2

// 1+1/2 = 3/2
// 1+1/2+1/2 = 7/5
// 1+1/2+1/2+1/2 = 17/12
// 1+1/2+1/2+1/2+1/2 = 41/29

// Hence the sequence of the first ten convergents for √2 are:
// 1, 3/2, 7/5, 17/12, 41/29, 99/70, 239/169, 577/408, 1393/985, 3363/2378,...

// What is most surprising is that the important mathematical constant, e=[2;1,2,1,1,4,1,1,6,1,...,1,2k,1,...].
// The first ten terms in the sequence of convergents for e are:
// 2, 3, 8/3, 11/4, 19/7, 87/32, 106/39, 193/71, 1264/465, 1457/536,...

// The sum of digits in the numerator of the 10th convergent is 1+4+5+7=17
// Find the sum of digits in the numerator of the nth convergent of the continued fraction for e.

// Formula to get next numerator and denominator is: n_i * 2 + n_i-1(previous n)

// Let k = 4 and
// Sequence of first two convergents for e as fractions are: 8 / 3, 11 / 4,
// To obtain next numerator and denominator of first three in sequence use formula n_i + n_i - 1 for both numerator and denominator
// Third fraction in sequence is odd and to obtain next fraction you need to use this formula n_i * k + n_i - 1 for both numerator and denominator
// After each odd period k -> k + 2

export function convergentsOfE(n: number) {
  const series = [
    [2n, 2n],
    [3n, 3n],
    [8n, 3n],
    [11n, 4n],
    [19n, 7n],
  ];
  let i = 4;
  let k = 4n;
  let counter = 3;

  while (series.length < n) {
    const [num, den] = series[i];
    const [prevNum, prevDen] = series[i - 1];

    if (counter === 3) {
      const nextNum = num * k + prevNum;
      const nextDen = den * k + prevDen;

      series.push([nextNum, nextDen]);
      k += 2n;
      ++i;
      counter = 1;
      continue;
    }

    const nextNum = num + prevNum;
    const nextDen = den + prevDen;

    series.push([nextNum, nextDen]);
    ++counter;
    ++i;
  }

  const last = series.length - 1;

  return series[last][0]
    .toString()
    .split("")
    .reduce((acc, num) => acc + Number(num), 0);
}

