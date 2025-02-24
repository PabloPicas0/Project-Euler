// Problem 96: Su Doku
// Su Doku (Japanese meaning number place) is the name given to a popular puzzle concept.
// Its origin is unclear, but credit must be attributed to Leonhard Euler who invented a similar, and much more difficult, puzzle idea called Latin Squares.
// The objective of Su Doku puzzles, however, is to replace the blanks (or zeros) in a 9 by 9 grid in such that each row, column, and 3 by 3 box contains each of the digits 1 to 9.
// Below is an example of a typical starting puzzle grid and its solution grid.

// 0 0 3
// 9 0 0
// 0 0 1	0 2 0
// 3 0 5
// 8 0 6	6 0 0
// 0 0 1
// 4 0 0
// 0 0 8
// 7 0 0
// 0 0 6	1 0 2
// 0 0 0
// 7 0 8	9 0 0
// 0 0 8
// 2 0 0
// 0 0 2
// 8 0 0
// 0 0 5	6 0 9
// 2 0 3
// 0 1 0	5 0 0
// 0 0 9
// 3 0 0

// 4 8 3
// 9 6 7
// 2 5 1	9 2 1
// 3 4 5
// 8 7 6	6 5 7
// 8 2 1
// 4 9 3
// 5 4 8
// 7 2 9
// 1 3 6	1 3 2
// 5 6 4
// 7 9 8	9 7 6
// 1 3 8
// 2 4 5
// 3 7 2
// 8 1 4
// 6 9 5	6 8 9
// 2 5 3
// 4 1 7	5 1 4
// 7 6 9
// 3 8 2
// A well constructed Su Doku puzzle has a unique solution and can be solved by logic,
// although it may be necessary to employ "guess and test" methods in order to eliminate options (there is much contested opinion over this).
// The complexity of the search determines the difficulty of the puzzle; the example above is considered easy because it can be solved by straight forward direct deduction.

// The puzzlesArr array contains different Su Doku puzzle strings ranging in difficulty, but all with unique solutions.

// By solving all puzzles in puzzlesArr, find the sum of the 3-digit numbers found in the top left corner of each solution grid; for example,
// 483 is the 3-digit number found in the top left corner of the solution grid above.

// Passess only one test case from two !
const testPuzzles1 = [
  "003020600900305001001806400008102900700000008006708200002609500800203009005010300",
  "200080300060070084030500209000105408000000000402706000301007040720040060004010003",
  "000000907000420180000705026100904000050000040000507009920108000034059000507000000",
];

export function suDoku(puzzlesArr: string[]) {
  let sum = 0;

  for (let i = 0; i < puzzlesArr.length; ++i) {
    const puzzle = puzzlesArr[i];
    const box = [
      createBox(puzzle, 0),
      createBox(puzzle, 3),
      createBox(puzzle, 6),

      createBox(puzzle, 27),
      createBox(puzzle, 27 + 3),
      createBox(puzzle, 27 + 6),

      createBox(puzzle, 27 * 2),
      createBox(puzzle, 27 * 2 + 3),
      createBox(puzzle, 27 * 2 + 6),
    ];

    const initialTry = solve(box);

    const stillNotSolved = isBlank(initialTry, -1);

    if (stillNotSolved) {
      const find = guessAndTest(initialTry, 0, []);
      sum += Number(find[0][0]);
    } else {
      sum += Number(initialTry[0][0]);
    }
  }

  console.log(sum);
  return sum;
}

function solve(boxClone: string[][]) {
  const prevProgress: number[][] = [];
  const isProgressMade: boolean[] = [];
  let depth = 0;

  while (true) {
    const numbersToInsert = getNumbersToInsert(boxClone, depth);
    const currentProgress = numbersToInsert.map((number) => number.length);
    const currentBox = boxClone[depth];
    const hasBlanks = isBlank(boxClone, depth);

    if (!prevProgress[depth]) {
      prevProgress[depth] = currentProgress;
      isProgressMade[depth] = true;
    } else {
      const isDifference = currentProgress.some((progress, idx) => progress !== prevProgress[depth][idx]);

      isProgressMade[depth] = isDifference;
      prevProgress[depth] = currentProgress;

      const progressIsDead = isProgressMade.every((progress) => progress === false);

      if (progressIsDead) {
        depth = 0;
        break;
      }
    }

    if (hasBlanks) {
      const combination = getUniqePossibility(currentBox, numbersToInsert);
      boxClone[depth] = combination;
    }

    if (depth === 8) {
      depth = 0;
      continue;
    }

    ++depth;
  }

  return boxClone;
}

function guessAndTest(box: string[][], depth: number, digits: string[][]): string[][] {
  if (depth === 9) {
    const solved = solve(digits);
    const stillNotSolved = isBlank(solved, -1);

    if (!stillNotSolved) return solved;

    return [];
  } else {
    const numbersToInsert = getNumbersToInsert(box, depth);
    const mostFrequent = getMostFrequentNum(numbersToInsert);
    const mostFrequentIndexes = numbersToInsert.reduce((acc, combination, idx) => {
      const frequentNumberExists = combination.includes(mostFrequent);

      if (frequentNumberExists) acc.push(idx);

      return acc;
    }, []);
    const currentBox = box[depth];

    if (!mostFrequentIndexes.length) {
      const solveCombination = guessAndTest(box, depth + 1, [...digits, currentBox]);

      if (solveCombination.length) return solveCombination;
    }

    for (let i = 0; i < mostFrequentIndexes.length; ++i) {
      const blanks = currentBox
        .map((number) => number.replace(/[1-9]/g, ""))
        .join("")
        .split("");
      const idx = mostFrequentIndexes[i];
      blanks[idx] = mostFrequent.toString();
      const newBox = merge(currentBox, blanks);

      const solveCombination = guessAndTest(box, depth + 1, [...digits, newBox]);

      if (solveCombination.length) return solveCombination;
    }

    return [];
  }
}

function getMostFrequentNum(arr: number[][]) {
  let m = {} as { [key: number]: number };
  let maxCount = 0;
  let res = 0;

  for (let x of arr) {
    for (let y of x) {
      m[y] = (m[y] || 0) + 1;

      if (m[y] > maxCount) {
        maxCount = m[y];
        res = y;
      }
    }
  }

  return res;
}

function getUniqePossibility(numbersInBox: string[], numbersToInsert: number[][]) {
  const numbersUsed: number[] = [];
  const visited = [];
  let blanks = numbersInBox
    .map((number) => number.replace(/[1-9]/g, ""))
    .join("")
    .split("");

  function usedNumber(combination: number) {
    return !numbersUsed.includes(combination);
  }

  // Search for combinations with only one possibility
  // Search for combinations where one number is uniqe
  for (let i = 0; i < numbersToInsert.length; ++i) {
    const currentNumber = numbersToInsert[i].filter(usedNumber);
    let unique = new Set(numbersToInsert[i]);

    if (currentNumber.length === 1) {
      blanks[i] = currentNumber[0].toString();
      visited.push(i);
      numbersUsed.push(currentNumber[0]);
      continue;
    }

    for (let j = 0; j < numbersToInsert.length; ++j) {
      if (j === i) continue;

      unique = unique.difference(new Set(numbersToInsert[j]));
    }

    if (unique.size === 1) {
      const num = unique.values().next().value;
      blanks[i] = num;
      visited.push(i);
      numbersUsed.push(num);
    }
  }

  return merge(numbersInBox, blanks);
}

function merge(numbersInBox: string[], blanks: string[]) {
  const newBox = [];
  const numbers = numbersInBox.join("").split("");
  let current = 0;

  for (let i = 0; i < numbers.length; ++i) {
    if (numbers[i] == "0") {
      numbers[i] = blanks[current] + "";
      ++current;
    }

    if (i % 3 === 2) {
      const start = i - 2;
      const end = i + 1;
      const row = numbers.slice(start, end).join("");
      newBox.push(row);
    }
  }

  return newBox;
}

function getNumbersToInsert(box: string[][], k: number) {
  const nums = [];
  let start = 0;

  if (k === 3 || k === 4 || k === 5) start = 3;
  if (k === 6 || k === 7 || k === 8) start = 6;

  const end = start + 3;

  for (let i = 0; i < box[k].length; ++i) {
    for (let j = 0; j < box[k][i].length; ++j) {
      if (box[k][i][j] !== "0") continue;
      const numbersInBox = getNumbersInBox(box[k]);
      const numbersInNeighbourRow = getNumbersInNeighbourRow(box.slice(start, end), i);
      const numbersInNeighbourCol = getNumbersInNeighbourCol(box, k, j);
      const numsToExclude = new Set(
        [...numbersInBox, ...numbersInNeighbourRow, ...numbersInNeighbourCol].map(Number)
      );
      const numbersLeftToInsert = Array.from(
        new Set([...Array(9).keys()].map((_, i) => i + 1)).symmetricDifference(numsToExclude)
      );

      nums.push(numbersLeftToInsert);
    }
  }

  return nums;
}

function createBox(puzzle: string, start: number) {
  const row1 = puzzle.slice(start, start + 3);
  const row2 = puzzle.slice(start + 9, start + 12);
  const row3 = puzzle.slice(start + 18, start + 21);

  return [row1, row2, row3];
}

function isBlank(box: string[][], depth: number) {
  const blank = /0/;

  if (depth >= 0) {
    const currentBox = box[depth];
    let blanks = currentBox.map((number) => number.replace(/[1-9]/g, "")).join("");

    const hasBlanks = blank.test(blanks);

    return hasBlanks;
  } else {
    for (let i = 0; i < box.length; ++i) {
      const currentBox = box[i];
      let blanks = currentBox.map((number) => number.replace(/[1-9]/g, "")).join("");

      const hasBlanks = blank.test(blanks);

      if (hasBlanks) return hasBlanks;
    }

    return false;
  }
}

function getNumbersInBox(box: string[]) {
  return box.map((number) => number.replace(/0/g, "").split("")).flat();
}

function getNumbersInNeighbourRow(box: string[][], rowNumber: number) {
  return getNumbersInBox(box.map((nums) => nums[rowNumber]));
}

function getNumbersInNeighbourCol(box: string[][], cellNumber: number, colNumber: number) {
  let cols = [];

  switch (cellNumber) {
    case 1:
    case 4:
    case 7:
      cols = box.reduce((acc, nums, idx) => {
        if (idx === 1 || idx === 4 || idx === 7) {
          acc.push(nums.map((num) => num[colNumber]).join(""));
        }

        return acc;
      }, [] as string[]);
      break;
    case 2:
    case 5:
    case 8:
      cols = box.reduce((acc, nums, idx) => {
        if (idx === 2 || idx === 5 || idx === 8) {
          acc.push(nums.map((num) => num[colNumber]).join(""));
        }

        return acc;
      }, []);
      break;
    default:
      cols = box.reduce((acc, nums, idx) => {
        if (idx % 3 === 0) {
          acc.push(nums.map((num) => num[colNumber]).join(""));
        }

        return acc;
      }, []);
  }

  const numbersInNeigbourCol = getNumbersInBox(cols);

  return numbersInNeigbourCol;
}

