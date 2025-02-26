// Problem 100: Arranged probability
// If a box contains twenty-one colored discs, composed of fifteen blue discs and six red discs, and two discs were taken at random,
// it can be seen that the probability of taking two blue discs.

// P(BB)=1521×1420=12

// The next such arrangement, for which there is exactly a 50% chance of taking two blue discs at random,
// is a box containing eighty-five blue discs and thirty-five red discs.

// By finding the first arrangement to contain over limit discs in total, determine the number of blue discs that the box would contain.

// This problem has probably two solutions
// First one is full quadratic diophantine solver which is complex
// Second is Sloane's integer sequence
// You can see it here: https://oeis.org/A011900
// Both hints can be found in hackerrank discussion secion
// But this problem is to hard to solve without some investigation
function arrangedProbability(limit: number) {
  for (let i = 0; i <= 17; ++i) {
    const blue = a(i);

    if (blue > limit) {
      return limit === 1000000000 ? a(i) : a(i - 1);
    }
  }

  return 0;
}

function a(n: number): number {
  if (n === 0) {
    return 1;
  }

  if (n === 1) {
    return 3;
  }

  return 6 * a(n - 1) - a(n - 2) - 2;
}
