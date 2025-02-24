// Problem 22: Names scores
// Using names, an array defined in the background containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

// For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

// What is the total of all the name scores in the array?
const letterAsValue: { [key: string]: number } = {};
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

for (let i = 0; i < letters.length; ++i) {
  const letter = letters[i];

  letterAsValue[letter] = i + 1;
}

export function namesScores(arr: string[]) {
  arr.sort();

  const scores = arr
    .map((name, idx) => {
      const nameValue = name
        .toLowerCase()
        .split("")
        .map((letter) => letterAsValue[letter])
        .reduce((acc, number) => acc + number, 0);

      const score = nameValue * (idx + 1);

      return score;
    })
    .reduce((acc, score) => acc + score);

  return scores;
}

