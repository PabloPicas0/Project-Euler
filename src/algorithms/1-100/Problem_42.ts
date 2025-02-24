// Problem 42: Coded triangle numbers
// The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
// By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. If the word value is a triangle number then we shall call the word a triangle word.

// Using words array of n-length, how many are triangle words?
export function codedTriangleNumbers(n: number, words: string[]) {
  let triangleWords = 0;
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  const wordValue = words.map((word) => {
    const letterToValue = word
      .split("")
      .map((letter) => alphabet.indexOf(letter) + 1)
      .reduce((acc, value) => acc + value, 0);

    return letterToValue;
  });

  for (let i = 1; i <= n; ++i) {
    const tn = (1 / 2) * i * (i + 1);

    for (let j = 0; j < n; ++j) {
      if (tn === wordValue[j]) {
        ++triangleWords;
      }
    }
  }

  return triangleWords;
}

