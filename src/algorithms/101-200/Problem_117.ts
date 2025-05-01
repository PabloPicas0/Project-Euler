// Problem 117: Red, green, and blue tiles
// Using a combination of black square tiles and oblong tiles chosen from:
// red tiles measuring two units,
// green tiles measuring three units, and blue tiles measuring four units,
// it is possible to tile a row measuring five units in length in exactly fifteen different ways.

// Possible ways of placing red, green and blue oblongs on a row with length of five units
// How many ways can a row measuring fifty units in length be tiled?

// Note: This is related to Problem 116.

// Numbers in this problem are Tetranacci numbers
// They can be found here:
// https://oeis.org/A000078
// https://oeis.org/A000078/b000078.txt

 function redGreenBlueTilesTwo() {
  let n = 53;
  const arr = [0, 0, 0, 1];

  for (let i = 3; i < n; ++i) {
    const next = arr[i] + arr[i - 1] + arr[i - 2] + arr[i - 3];

    arr.push(next);
  }

  const last = arr.length - 1;

  return arr[last];
}