// Problem 63: Powerful digit counts
// The 5-digit number, 16807 = 7^5, is also a fifth power. Similarly, the 9-digit number, 134217728 = 8^9, is a ninth power.

// Complete the export function so that it returns how many positive integers are of length n and an nth power.
function powerfulDigitCounts(n: number) {
  let count = 0;
  let x = 1;

  while (true) {
    const number = BigInt(x ** n);
    const length = number.toString().length;

    if (length === n) {
      count += 1;
    }

    if (length > n) break;

    ++x;
  }

  return count;
}

