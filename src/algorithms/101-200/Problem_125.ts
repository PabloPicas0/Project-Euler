// Problem 125: Palindromic sums

// The palindromic number 595 is interesting because it can be written as the sum of consecutive squares: 6^2+7^2+8^2+9^2+10^2+11^2+12^2

// There are exactly eleven palindromes below one-thousand that can be written as consecutive square sums, and the sum of these palindromes is 4164. 
// Note that 1=0^2+1^2 has not been included as this problem is concerned with the squares of positive integers.

// Find the sum of all the numbers less than the limit that are both palindromic and can be written as the sum of consecutive squares.

function palindromicSums(limit: number) {
  const ans: number[] = [];

  let j = 2;

  while (true) {
    let first = f(j);
    let isSum = true;

    if (isPalindrome(first)) ans.push(first);

    for (let k = 1; j - k > 1; ++k) {
      let second = f(k);
      const isLastIteration = j - k === 2;
      const diff = first - second;

      if (diff > limit && isLastIteration) {
        isSum = false;
        break;
      }

      if (isPalindrome(diff) && diff < limit) ans.push(diff);
    }

    if (!isSum) break;

    ++j;
  }

  const sum = [...new Set(ans)].reduce((acc, num) => acc + num);

  return sum;
}

function f(n: number) {
  return (n * (n + 1) * (2 * n + 1)) / 6;
}

function isPalindrome(n: number) {
  const str = n.toString();
  const len = str.length;

  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (str[i] !== str[len - 1 - i]) return false;
  }

  return true;
}

// First try

function palindromicSums(limit) {
  const polindromes = [];
  const squares = createSquaresTable(10000);
  const sums = new Map();
  const ans = [];

  for (let i = 2; i < limit; ++i) {
    if (isPolindrome(i)) polindromes.push(i);
  }

  createSquareSums(sums, squares, 640);

  for (let i = 0; i < polindromes.length; ++i) {
    const polindrome = polindromes[i];

    if (sums.has(polindrome)) ans.push(polindrome);
  }

  const sum = ans.reduce((acc, val) => acc + val);
  console.log(sum);
  console.log(ans);
  return sum;
}

function createSquareSums(sums, squares, depth) {
  if (depth === 1) return;

  for (let i = 0; i < squares.length - 1 && i + depth <= squares.length; ++i) {
    let sum = 0;

    for (let j = i; j < i + depth; ++j) {
      sum += squares[j];
    }

    sums.set(sum, true);
  }

  return createSquareSums(sums, squares, depth - 1);
}

function createSquaresTable(n) {
  const table = [];

  for (let i = 1; i <= n; ++i) {
    table.push(i ** 2);
  }

  return table;
}

function isPolindrome(n) {
  const str = n.toString();
  const len = str.length;

  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (str[i] !== str[len - 1 - i]) return false;
  }

  return true;
}
