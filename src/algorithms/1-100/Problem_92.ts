// Problem 92: Square digit chains
// A number chain is created by continuously adding the square of the digits in a number to form a new number until it has been seen before.

// For example,
// 44→32→13→10→1→1
// 44→32→13→10→1→185→89→145→42→20→4→16→37→58→89

// Therefore any chain that arrives at 1 or 89 will become stuck in an endless loop. What is most amazing is that EVERY starting number will eventually arrive at 1 or 89.

// How many starting numbers below limit will arrive at 89?
// NOTE: seen variable is not needed
// But i left it here for visualization purpose
export function squareDigitChains(limit: number) {
  const squares = {
    "0": 0 ** 2,
    "1": 1 ** 2,
    "2": 2 ** 2,
    "3": 3 ** 2,
    "4": 4 ** 2,
    "5": 5 ** 2,
    "6": 6 ** 2,
    "7": 7 ** 2,
    "8": 8 ** 2,
    "9": 9 ** 2,
  };
  let nums = 0;

  for (let i = 2; i < limit; ++i) {
    let next = getNextChain(i, squares);
    const seen = [i, next];

    while (true) {
      next = getNextChain(next, squares);

      if (next === 1) {
        seen.push(next);
        break;
      }

      if (next === 89) {
        seen.push(next);
        nums += 1;
        break;
      }

      seen.push(next);
    }
  }

  return nums;
}

function getNextChain(i: number, square: { [key: string]: number }) {
  return i
    .toString()
    .split("")
    .map((n) => square[n])
    .reduce((acc, val) => acc + val);
}

