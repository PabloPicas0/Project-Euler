// Problem 112: Bouncy numbers
// Working from left-to-right if no digit is exceeded by the digit to its left it is called an increasing number; for example, 134468.

// Similarly if no digit is exceeded by the digit to its right it is called a decreasing number; for example, 66420.

// We shall call a positive integer that is neither increasing nor decreasing a "bouncy" number; for example, 155349.

// Clearly there cannot be any bouncy numbers below one-hundred, but just over half of the numbers below one-thousand (525) are bouncy.
// In fact, the least number for which the proportion of bouncy numbers first reaches 50% is 538.

// Surprisingly, bouncy numbers become more and more common and by the time we reach 21780 the proportion of bouncy numbers is equal to 90%.

// Find the least number for which the proportion of bouncy numbers is exactly 99%.

function bouncyNumbers() {
  let bouncyNumberCount = 0;
  const max = 2000000;

  for (let i = 100; i < max; ++i) {
    const numAsStr = i.toString();
    const isBouncy = !isIncreasing(numAsStr) && !isDecreasing(numAsStr);

    if (!isBouncy) continue;

    bouncyNumberCount += 1;

    const proportion = bouncyNumberCount / i;

    if (proportion === 0.99) return i;
    // console.log(bouncyNumberCount / i, i, bouncyNumberCount)
  }

  return true;
}

function isIncreasing(str: string) {
  for (let i = str.length - 1; i >= 0; --i) {
    for (let j = i - 1; j >= 0; --j) {
      if (str[i] < str[j]) return false;
    }
  }

  return true;
}

function isDecreasing(str: string) {
  for (let i = 0; i < str.length; ++i) {
    for (let j = i + 1; j < str.length; ++j) {
      if (str[i] < str[j]) return false;
    }
  }

  return true;
}
