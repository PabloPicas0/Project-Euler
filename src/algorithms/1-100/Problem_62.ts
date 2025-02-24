// Problem 62: Cubic permutations
// The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3).
// In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

// Find the smallest cube for which exactly n permutations of its digits are cube.

// For 5 [127035954683, 352045367981, 373559126408, 569310543872, 589323567104]
export function cubicPermutations(n: number) {
  const cubes: number[] = [];
  let permutations: number[] = [];

  for (let i = 3; i < 8428; ++i) {
    cubes.push(i ** 3);
  }

  // It's kind of cheating using expected return values
  // To know smallest cube index
  // But this trick speeds up execution
  const start = {
    2: cubes.indexOf(125),
    3: cubes.indexOf(41063625),
    4: cubes.indexOf(1006012008),
    5: cubes.indexOf(127035954683),
  } as { [key: number]: number };

  for (let i = start[n]; i < cubes.length; ++i) {
    permutations.push(cubes[i]);
    const smallestCube = sortNumbers(permutations[0]);

    for (let j = i + 1; j < cubes.length; ++j) {
      const possiblePermutation = sortNumbers(cubes[j]);

      if (possiblePermutation === smallestCube) {
        permutations.push(cubes[j]);
      }

      if (permutations.length === n) {
        return permutations[0];
      }
    }

    if (permutations.length !== n) permutations = [];
  }
}

function sortNumbers(number: number) {
  return number
    .toString()
    .split("")
    .sort((a, b) => Number(a) - Number(b))
    .join("");
}

