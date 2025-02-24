// Problem 98: Anagramic squares
// By replacing each of the letters in the word CARE with 1, 2, 9, and 6 respectively, we form a square number: 1296=36^2
// What is remarkable is that, by using the same digital substitutions, the anagram, RACE, also forms a square number:  9216=96^2
// We shall call CARE (and RACE) a square anagram word pair and specify further that leading zeroes are not permitted,
// neither may a different letter have the same digital value as another letter.

// Using the words array, find all the square anagram word pairs (a palindromic word is NOT considered to be an anagram of itself).

// What is the largest square number formed by any member of such a pair?

// Note: All anagrams formed must be contained in the given words array.
export function anagramicSquares(words: string[]) {
  let longest = 0;
  const anagrams = getAnagrams(words);
  const squareTableLength = getLongestAnagram(anagrams);
  const squaresTable = createAnagramiceSquareTable(squareTableLength);

  for (let i = 0; i < anagrams.length; ++i) {
    const [anagramA, anagramB] = anagrams[i];
    const length = anagramA.length;
    const squares = squaresTable[length];

    for (const square of squares) {
      const squareDigits = square.toString().split("");

      const mapAnagramAToNumbers = anagramA.split("").reduce((acc, letter, idx) => {
        acc[letter] = squareDigits[idx];

        return acc;
      }, {} as {[key: string]: string});
      const mapAnagramBToNumbers = Number(
        anagramB
          .split("")
          .map((letter) => mapAnagramAToNumbers[letter])
          .join("")
      );
      const isAnagramicSquare = squares.has(mapAnagramBToNumbers);

      if (isAnagramicSquare && longest < mapAnagramBToNumbers) {
        longest = mapAnagramBToNumbers;
      }
    }
  }

  return longest;
}

function getLongestAnagram(anagrams: string[][]) {
  let longest = 0;

  for (let i = 0; i < anagrams.length; ++i) {
    const [a] = anagrams[i];
    if (longest < a.length) longest = a.length;
  }

  return longest;
}

function getAnagrams(words: string[]) {
  const anagrams: string[][] = [];

  for (let i = 0; i < words.length; ++i) {
    const firstWord = words[i].split("").sort().join("");

    for (let j = i + 1; j < words.length; ++j) {
      const nextWord = words[j].split("").sort().join("");

      if (nextWord !== firstWord) continue;

      anagrams.push([words[i], words[j]]);
    }
  }

  return anagrams;
}

function createAnagramiceSquareTable(limit: number) {
  const squareTable = {} as { [key: number]: number[] };
  let i = 4;

  while (true) {
    const square = i * i;
    const squareLength = square.toString().length;
    const squareDigits = square.toString().split("");
    const hasRepeats = new Set(squareDigits).size !== squareLength;
    const hasZero = squareDigits.includes("0");

    if (squareLength > limit) break;
    if (hasRepeats || hasZero) {
      ++i;
      continue;
    }

    if (!squareTable[squareLength]) {
      squareTable[squareLength] = [];
      squareTable[squareLength].push(square);
    } else {
      squareTable[squareLength].push(square);
    }

    ++i;
  }

  const tableKeys = Object.keys(squareTable).map(Number);
  const anagramicTable = {} as {[key: number]: Set<number>};

  for (const key of tableKeys) {
    const currSquares = squareTable[key];

    if (!anagramicTable[key]) anagramicTable[key] = new Set();

    for (let i = 0; i < currSquares.length; ++i) {
      const firstNum = currSquares[i]
        .toString()
        .split("")
        .map(Number)
        .sort((a, b) => a - b)
        .join("");
      for (let j = i + 1; j < currSquares.length; ++j) {
        const secondNum = currSquares[j]
          .toString()
          .split("")
          .map(Number)
          .sort((a, b) => a - b)
          .join("");

        if (firstNum === secondNum) {
          anagramicTable[key].add(currSquares[i]).add(currSquares[j]);
        }
      }
    }
  }

  return anagramicTable;
}

