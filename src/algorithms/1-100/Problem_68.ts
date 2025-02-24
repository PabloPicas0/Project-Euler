// Problem 68: Magic 5-gon ring
// For better problem description see link below.
// https://www.freecodecamp.org/learn/project-euler/project-euler-problems-1-to-100/problem-68-magic-5-gon-ring
// Also for better problem understanding see this post.
// https://stackoverflow.com/questions/13052165/project-euler-68
// There is also alot of unused vars
// But for better problem understanding I suggest uncommenting console.logs

export function magic5GonRing() {
  const n = 5;
  const nums = 2 * n;
  const lowerBonds = Math.ceil((5 * n + 3) / 2); // maximum n-digit string is created by lowest sum of the numbers on the 3 vertices
  const upperBonds = Math.floor((7 * n + 3) / 2);

  const lis = (n * (n + 1)) / 2;
  const uils = (n * (3 * n + 1)) / 2;
  const ls = n * (2 * n + 1) + (n * (n + 1)) / 2;
  const us = n * (2 * n + 1) + (n * (3 * n + 1)) / 2;
  const k = ls - sum(nums);
  const innerVerticesNumbers = getInnerVerticesNumber(k);
  const ivnl = innerVerticesNumbers.length - 1;
  const outerVerticesNumber = getOuterViericesNumber(innerVerticesNumbers[ivnl] + 1, 2 * n);
  const solutionSet: number[][] = [];

  // console.log(
  // "sum of the numbers on the vertices of the inner N-gon is between",
  // lis, uils)
  // console.log("sum of the numbers on the 3 vertices is between:", lowerBonds, upperBonds)
  // console.log("sum of the sums of all groups is between:", ls, us)
  // console.log("numbers on the inner vertices are:", k, "=" , innerVerticesNumbers)
  // console.log("numbers on the outer vertices are:", outerVerticesNumber)

  for (let i = 0; i < outerVerticesNumber.length; ++i) {
    for (let j = 0; j < innerVerticesNumbers.length; ++j) {
      for (let z = 0; z < innerVerticesNumbers.length; ++z) {
        const outerVertices = outerVerticesNumber[i];
        const innerVeritces = innerVerticesNumbers[j];
        const nextInnerVeritces = innerVerticesNumbers[z];

        // There are no inner nodes with same number
        if (nextInnerVeritces === innerVeritces) continue;

        const innerVeritcesSum = innerVeritces + nextInnerVeritces;
        const veritcesSum = innerVeritcesSum + outerVertices;

        if (veritcesSum === lowerBonds && !solutionSet.length) {
          solutionSet.push([outerVertices, nextInnerVeritces, innerVeritces]);
        }

        const setLength = solutionSet.length - 1;

        if (
          veritcesSum === lowerBonds &&
          solutionSet.length &&
          solutionSet[setLength][0] !== outerVertices &&
          solutionSet[setLength][2] === nextInnerVeritces
        ) {
          solutionSet.push([outerVertices, nextInnerVeritces, innerVeritces]);
        }
      }
    }
  }

  return parseInt(solutionSet.reduce((acc, set) => acc + set.join(""), ""));
}

function getOuterViericesNumber(start: number, end: number) {
  const numbers = [];

  for (let i = start; i <= end; ++i) {
    numbers.push(i);
  }

  // Problem states that we work clockwise
  // Starting with lowest external node
  // But to obtain biggest number rest of the external nodes nodes must be in descending order
  const reversed = numbers.splice(1).reverse();
  return numbers.concat(reversed);
}

function getInnerVerticesNumber(x: number) {
  const numbers: number[] = [];
  let sum = numbers.reduce((acc, val) => acc + val, 0);
  let y = 1;

  while (sum < x) {
    sum = numbers.reduce((acc, val) => acc + val, 0);

    if (sum === x) return numbers;

    numbers.push(y);
    ++y;
  }

  return numbers;
}

function sum(k: number) {
  let sum = 0;

  for (let i = 1; i <= k; ++i) {
    sum = sum + i;
  }

  return sum;
}

