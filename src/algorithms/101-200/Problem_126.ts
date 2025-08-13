// Problem 126: Cuboid layers
// The minimum number of cubes to cover every visible face on a cuboid measuring 3 x 2 x 1 is twenty-two.

// 3x2x1 cuboid covered by twenty-two 1x1x1 cubes
// If we add a second layer to this solid it would require forty-six cubes to cover every visible face, 
// the third layer would require seventy-eight cubes, and the fourth layer would require one-hundred and eighteen cubes to cover every visible face.

// However, the first layer on a cuboid measuring 5 x 1 x 1 also requires twenty-two cubes; similarly, 
// the first layer on cuboids measuring 5 x 3 x 1, 7 x 2 x 1, and 11 x 1 x 1 all contain forty-six cubes.

// We shall define C(n) to represent the number of cuboids that contain n cubes in one of its layers. 
// So  C(22)=2
//     C(46)=4
//     C(78)=5
// and C(118)=8

// It turns out that 154 is the least value of n for which C(n)=10.

// Find the least value of n for which C(n)=1000.

// NOTE: Problem left unsolved

function cuboidLayers() {
  let n = 78;
  
  return true;
}

function countFirst(x, y, z) {
  return 2 * (x * y + x * z + y * z);
}

function c(n) {
  let cuboids = new Set();
  let x = 1;

  while (true) {
    let y = 1;
    let isMax = false;

    while (true) {
      let z = 1;

      while (true) {
        const firstLayer = countFirst(x, y, z);
        const secondLayer = countFirst(x, y, z + 2) + 4;
        const thirdLayer = countFirst(x, y, z + 4) + 16;
        const fourthLayer = countFirst(x, y, z + 6) + 36;

        if (firstLayer > n && y === 1) {
          isMax = true;
          break;
        }

        if (firstLayer > n) break;

        if (firstLayer === n || secondLayer === n || thirdLayer === n || fourthLayer === n) {
          cuboids.add([x, y, z].sort((a, b) => a - b).join(""));
        }

        ++z;
      }

      ++y;
    }

    if (isMax) break;

    ++x;
  }

  return cuboids;
}
