// Problem 25: 1000-digit Fibonacci number
// The Fibonacci sequence is defined by the recurrence relation:

// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be:

// F1 = 1
// F2 = 1
// F3 = 2
// F4 = 3
// F5 = 5
// F6 = 8
// F7 = 13
// F8 = 21
// F9 = 34
// F10 = 55
// F11 = 89
// F12 = 144
// The 12th term, F12, is the first term to contain three digits.

// What is the index of the first term in the Fibonacci sequence to contain n digits?
export function digitFibonacci(n: number) {
  const fib = [1, 1];
  let i = 2;

  while (true) {
    const nextInSequence = fib[i - 1] + fib[i - 2];
    fib.push(nextInSequence);

    if (String(fib[i - 1] + fib[i - 2]).split("").length === n) break;

    ++i;
  }

  return fib.length;
}

