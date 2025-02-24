// Problem 57: Square root convergents
// It is possible to show that the square root of two can be expressed as an infinite continued fraction.

// 2–√=1+12+12+12+…

// By expanding this for the first four iterations, we get:

// 1+12=3/2=1.5

// 1+12+12=7/5=1.4

// 1+12+12+12=17/12=1.41666…

// 1+12+12+12+12=41/29=1.41379…

// The next three expansions are  99/70,  239/169, and  577/408,
// but the eighth expansion,  1393/985, is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.

// In the first n expansions, how many fractions contain a numerator with more digits than denominator?

// Formula to get next numerator and denominator is: ni * 2 + ni-1(previous n)
// Where n is either numerator value or denominator value
// Formula to get only next denominator in sequence is: numerator + denominator
export function squareRootConvergents(n: number) {
  const series = [
    [3n, 2n],
    [7n, 5n],
  ];
  let times = 0;
  let i = 1;

  while (n - 1 > 0) {
    const [num, den] = series[i];
    const [prevNum, prevDen] = series[i - 1];

    const nextNumerator = num * 2n + prevNum;
    const nextDenominator = den * 2n + prevDen;

    if (nextNumerator.toString().length > nextDenominator.toString().length) {
      times += 1;
    }

    series.push([nextNumerator, nextDenominator]);

    ++i;
    --n;
  }

  return times;
}

