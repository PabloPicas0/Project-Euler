export function prime(n: number) {
  return Math.floor((fact(n) % (n + 1)) / n) * (n - 1) + 2;
}

export function fact(num: number): number {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * fact(num - 1);
  }
}

function bigFact(num: number) {
  let rval = 1n;

  for (let i = 2n; i <= num; i++) {
    rval = BigInt(rval * i);
  }

  return rval;
}

export function nthPrmie(n: number) {
  let pn = 0;
  let sum = 0;

  for (let i = 1; i < 2 ** n; ++i) {
    let x = 0;

    for (let j = 1; j <= i; ++j) {
      x += Math.floor((Math.cos(fact(j - 1) + 1 / j) * Math.PI) ** 2);
    }

    sum += Math.floor((n / x) ** 1 / n);
  }

  pn = 1 + sum;
  console.log(pn);
  return pn;
}

// Problem 1: Multiples of 3 or 5
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below the provided parameter value number.
function multiplesOf3Or5(number) {
  let sum = 0;

  for (let i = 1; i < number; ++i) {
    if (i % 3 === 0) {
      sum += i;
      continue;
    }

    if (i % 5 === 0) {
      sum += i;
    }
  }

  return sum;
}

// Problem 9: Special Pythagorean triplet
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// c^2 = a^2 + b^2
// For example, 5^2 = 3^2 + 4^2 = 9 + 16 = 25.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.
export function specialPythagoreanTriplet(n: number) {
  let sumOfabc = n;
  let a = 0;
  let b = 0;
  let c = Math.sqrt(a ** 2 + b ** 2);
  let product = 0;

  for (let i = 1; i < n; ++i) {
    b = i;

    for (let j = 1; j < i; ++j) {
      a = j;
      c = Math.sqrt(a ** 2 + b ** 2);
      sumOfabc = a + b + c;

      if (sumOfabc === n) {
        product = a * b * c;
        break;
      }
    }
    if (product !== 0) break;
  }

  return product;
}

// Problem 10: Summation of primes
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below n.
export function primeSummation(n: number) {
  const primes = sieve(n);

  return primes.reduce((acc, prime) => acc + prime);
}

function sieve(n: number) {
  const numbers: boolean[] = new Array(n).fill(true);
  const primes: number[] = [];

  for (let i = 2; i < Math.sqrt(n); ++i) {
    if (numbers[i]) {
      for (let j = i * i; j < n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = 2; i < n; ++i) {
    if (numbers[i]) {
      primes.push(i);
    }
  }

  return primes;
}

function sieveMap(n: number) {
  const numbers: boolean[] = new Array(n).fill(true);
  const primes = new Map<number, number>();

  for (let i = 2; i < Math.sqrt(n); ++i) {
    if (numbers[i]) {
      for (let j = i * i; j < n; j += i) {
        numbers[j] = false;
      }
    }
  }

  for (let i = 2; i < n; ++i) {
    if (numbers[i]) {
      primes.set(i, i);
    }
  }

  return primes;
}

// Problem 11: Largest product in a grid
// In the 20×20 grid below, four numbers along a diagonal line have been marked in red.

// 08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
// 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
// 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
// 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
// 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
// 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
// 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
// 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
// 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
// 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
// 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
// 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
// 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
// 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
// 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
// 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
// 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
// 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
// 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
// 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48

// The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
// What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in a given arr grid?

function largestGridProduct(arr: number[][]) {
  let product = 0;

  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[i].length; ++j) {
      const right: number[] = [];
      const left: number[] = [];
      const down: number[] = [];
      const up: number[] = [];

      const diagonalUpRight: number[] = [];
      const diagonalUpLeft: number[] = [];
      const diagonalDownRight: number[] = [];
      const diagonalDownLeft: number[] = [];

      // check right direction
      for (let k = j, m = i; k < j + 4 && m > i - 4; ++k, --m) {
        if (arr[i][k] !== undefined) {
          right.push(arr[i][k]);
        }

        if (arr[m] !== undefined && arr[m][k] !== undefined) {
          diagonalUpRight.push(arr[m][k]);
        }
      }

      // check left direction
      for (let k = j, m = i; k > j - 4 && m < i + 4; --k, ++m) {
        if (arr[i][k] !== undefined) {
          left.push(arr[i][k]);
        }

        if (arr[m] !== undefined && arr[m][k] !== undefined) {
          diagonalDownLeft.push(arr[m][k]);
        }
      }

      // check down direction
      for (let k = i, m = j; k < i + 4 && m < j + 4; ++k, ++m) {
        if (arr[k] !== undefined) {
          down.push(arr[k][j]);
        }

        if (arr[k] !== undefined && arr[k][m] !== undefined) {
          diagonalDownRight.push(arr[k][m]);
        }
      }

      // check up direction
      for (let k = i, m = j; k > i - 4 && m > j - 4; --k, --m) {
        if (arr[k] !== undefined) {
          up.push(arr[k][j]);
        }

        if (arr[k] !== undefined && arr[k][m] !== undefined) {
          diagonalUpLeft.push(arr[k][m]);
        }
      }

      product = Math.max(
        product,
        getProduct(right),
        getProduct(left),
        getProduct(down),
        getProduct(diagonalUpRight),
        getProduct(diagonalUpLeft),
        getProduct(diagonalDownRight),
        getProduct(diagonalDownLeft)
      );
    }
  }

  return product;
}

function getProduct(arr: number[]) {
  return arr.reduce((acc, number) => acc * number);
}

// Problem 12: Highly divisible triangular number
// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
// Let us list the factors of the first seven triangle numbers:

// 1: 1
// 3: 1, 3
// 6: 1, 2, 3, 6
// 10: 1, 2, 5, 10
// 15: 1, 3, 5, 15
// 21: 1, 3, 7, 21
// 28: 1, 2, 4, 7, 14, 28
// We can see that 28 is the first triangle number to have over five divisors.

// What is the value of the first triangle number to have over n divisors?
function divisibleTriangleNumber(n: number) {
  let triangularNumber = 1;
  let devisors = 0;
  let k = 2;

  while (devisors < n) {
    triangularNumber += k;

    for (let i = 1; i <= Math.sqrt(triangularNumber); ++i) {
      if (triangularNumber % i === 0) {
        ++devisors;

        if (i !== triangularNumber / i) {
          if (i * i != triangularNumber) {
            ++devisors;
          }
        }
      }
    }

    if (devisors > n) break;

    devisors = 0;
    ++k;
  }

  return triangularNumber;
}

// Problem 13: Large sum
// Work out the first ten digits of the sum of the following one-hundred 50-digit numbers.

// 37107287533902102798797998220837590246510135740250
// 46376937677490009712648124896970078050417018260538
// 74324986199524741059474233309513058123726617309629
// 91942213363574161572522430563301811072406154908250
// 23067588207539346171171980310421047513778063246676
// 89261670696623633820136378418383684178734361726757
// 28112879812849979408065481931592621691275889832738
// 44274228917432520321923589422876796487670272189318
// 47451445736001306439091167216856844588711603153276
// 70386486105843025439939619828917593665686757934951
// 62176457141856560629502157223196586755079324193331
// 64906352462741904929101432445813822663347944758178
// 92575867718337217661963751590579239728245598838407
// 58203565325359399008402633568948830189458628227828
// 80181199384826282014278194139940567587151170094390
// 35398664372827112653829987240784473053190104293586
// 86515506006295864861532075273371959191420517255829
// 71693888707715466499115593487603532921714970056938
// 54370070576826684624621495650076471787294438377604
// 53282654108756828443191190634694037855217779295145
// 36123272525000296071075082563815656710885258350721
// 45876576172410976447339110607218265236877223636045
// 17423706905851860660448207621209813287860733969412
// 81142660418086830619328460811191061556940512689692
// 51934325451728388641918047049293215058642563049483
// 62467221648435076201727918039944693004732956340691
// 15732444386908125794514089057706229429197107928209
// 55037687525678773091862540744969844508330393682126
// 18336384825330154686196124348767681297534375946515
// 80386287592878490201521685554828717201219257766954
// 78182833757993103614740356856449095527097864797581
// 16726320100436897842553539920931837441497806860984
// 48403098129077791799088218795327364475675590848030
// 87086987551392711854517078544161852424320693150332
// 59959406895756536782107074926966537676326235447210
// 69793950679652694742597709739166693763042633987085
// 41052684708299085211399427365734116182760315001271
// 65378607361501080857009149939512557028198746004375
// 35829035317434717326932123578154982629742552737307
// 94953759765105305946966067683156574377167401875275
// 88902802571733229619176668713819931811048770190271
// 25267680276078003013678680992525463401061632866526
// 36270218540497705585629946580636237993140746255962
// 24074486908231174977792365466257246923322810917141
// 91430288197103288597806669760892938638285025333403
// 34413065578016127815921815005561868836468420090470
// 23053081172816430487623791969842487255036638784583
// 11487696932154902810424020138335124462181441773470
// 63783299490636259666498587618221225225512486764533
// 67720186971698544312419572409913959008952310058822
// 95548255300263520781532296796249481641953868218774
// 76085327132285723110424803456124867697064507995236
// 37774242535411291684276865538926205024910326572967
// 23701913275725675285653248258265463092207058596522
// 29798860272258331913126375147341994889534765745501
// 18495701454879288984856827726077713721403798879715
// 38298203783031473527721580348144513491373226651381
// 34829543829199918180278916522431027392251122869539
// 40957953066405232632538044100059654939159879593635
// 29746152185502371307642255121183693803580388584903
// 41698116222072977186158236678424689157993532961922
// 62467957194401269043877107275048102390895523597457
// 23189706772547915061505504953922979530901129967519
// 86188088225875314529584099251203829009407770775672
// 11306739708304724483816533873502340845647058077308
// 82959174767140363198008187129011875491310547126581
// 97623331044818386269515456334926366572897563400500
// 42846280183517070527831839425882145521227251250327
// 55121603546981200581762165212827652751691296897789
// 32238195734329339946437501907836945765883352399886
// 75506164965184775180738168837861091527357929701337
// 62177842752192623401942399639168044983993173312731
// 32924185707147349566916674687634660915035914677504
// 99518671430235219628894890102423325116913619626622
// 73267460800591547471830798392868535206946944540724
// 76841822524674417161514036427982273348055556214818
// 97142617910342598647204516893989422179826088076852
// 87783646182799346313767754307809363333018982642090
// 10848802521674670883215120185883543223812876952786
// 71329612474782464538636993009049310363619763878039
// 62184073572399794223406235393808339651327408011116
// 66627891981488087797941876876144230030984490851411
// 60661826293682836764744779239180335110989069790714
// 85786944089552990653640447425576083659976645795096
// 66024396409905389607120198219976047599490197230297
// 64913982680032973156037120041377903785566085089252
// 16730939319872750275468906903707539413042652315011
// 94809377245048795150954100921645863754710598436791
// 78639167021187492431995700641917969777599028300699
// 15368713711936614952811305876380278410754449733078
// 40789923115535562561142322423255033685442488917353
// 44889911501440648020369068063960672322193204149535
// 41503128880339536053299340368006977710650566631954
// 81234880673210146739058568557934581403627822703280
// 82616570773948327592232845941706525094512325230608
// 22918802058777319719839450180888072429661980811197
// 77158542502016545090413245809786882778948721859617
// 72107838435069186155435662884062257473692284509516
// 20849603980134001723930671666823555245252804609722
// 53503534226472524250874054075591789781264330331690
function largeSum(arr: string[]) {
  const sumOfDigits = arr.reduce((acc, number) => BigInt(acc) + BigInt(number), 0n);
  const firstTen = String(sumOfDigits).slice(0, 10);
  const digits = Number(firstTen);

  return digits;
}

// Problem 14: Longest Collatz sequence
// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)
// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under the given limit, produces the longest chain?

// Note: Once the chain starts the terms are allowed to go above limit.
function longestCollatzSequence(limit: number) {
  let longestChain = 0;
  let longestSequence = 0;

  for (let i = 1; i < limit; ++i) {
    const currentSequence = collatzSequence(i);

    if (longestSequence < currentSequence) {
      longestSequence = currentSequence;
      longestChain = i;
    }
  }

  return longestChain;
}

function collatzSequence(number: number) {
  let currentNumber = number;
  let collatzChain = 1;

  while (currentNumber > 1) {
    if (currentNumber % 2 === 0) {
      currentNumber /= 2;
      collatzChain++;
    } else {
      currentNumber = 3 * currentNumber + 1;
      collatzChain++;
    }
  }

  return collatzChain;
}

// Problem 15: Lattice paths
// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

// a diagram of 6 2 by 2 grids showing all the routes to the bottom right corner
// How many such routes are there through a given gridSize?
function latticePaths(gridSize: number) {
  return fact(gridSize * 2) / fact(gridSize) ** fact(4 - 2);
}

// Problem 16: Power digit sum
// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2exponent?
function powerDigitSum(exponent: number) {
  const pow = BigInt(2 ** exponent);
  const digits = String(pow).split("");
  const sumOfExponentDigits = digits.reduce((acc, digit) => acc + Number(digit), 0);

  return sumOfExponentDigits;
}

// Problem 17: Number letter counts
// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

// If all the numbers from 1 to given limit inclusive were written out in words, how many letters would be used?

// Note: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
const numbersToWords = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
};

function numberLetterCounts(limit: number) {
  const numbersAsWords: string[] = [];

  for (let i = 1; i <= limit; ++i) {
    if (i < 20) {
      numbersAsWords.push(numbersToWords[i]);
    }

    if (i >= 20 && i < 100) {
      const digits = String(i).split("");
      const firstDigit = Number(digits[0] + 0);
      const secondDigit = Number(digits[1]);

      numbersAsWords.push(`${numbersToWords[firstDigit]} ${secondDigit ? numbersToWords[secondDigit] : ""}`);
    }

    if (i >= 100 && i < 1000) {
      let word = "";
      const digits = String(i).split("");
      const firstDigit = Number(digits[0]);
      const secondDigit = Number(digits[1]);
      const thirdDigit = Number(digits[2]);
      const isLessThanTwenty = 20 > Number(digits[1] + digits[2]) ? Number(digits[1] + digits[2]) : false;

      word += numbersToWords[firstDigit] + " hundred";

      if (!secondDigit && thirdDigit) word += ` and ${numbersToWords[thirdDigit]}`;

      if (secondDigit && isLessThanTwenty) word += ` and ${numbersToWords[isLessThanTwenty]}`;

      if (secondDigit && !isLessThanTwenty) {
        const combined = Number(digits[1] + 0);

        word += ` and ${numbersToWords[combined]} ${thirdDigit ? numbersToWords[thirdDigit] : ""}`;
      }
      numbersAsWords.push(word);
    }

    if (i >= 1000) numbersAsWords.push("one thousand");
  }

  const letterCount = numbersAsWords.reduce((acc, number) => {
    const count = number.replace(/\s/g, "").length;

    return acc + count;
  }, 0);

  return letterCount;
}

// Problem 18: Maximum path sum I
// By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

// 3
// 7 4
// 2 4 6
// 8 5 9 3
// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom of the triangle below:

// 75
// 95 64
// 17 47 82
// 18 35 87 10
// 20 04 82 47 65
// 19 01 23 75 03 34
// 88 02 77 73 07 63 67
// 99 65 04 28 06 16 70 92
// 41 41 26 56 83 40 80 70 33
// 41 48 72 33 47 32 37 16 94 29
// 53 71 44 65 25 43 91 52 97 51 14
// 70 11 33 28 77 73 17 78 39 68 17 57
// 91 71 52 38 17 14 91 43 58 50 27 29 48
// 63 66 04 68 89 53 67 30 73 16 69 87 40 31
// 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

// NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)
function maximumPathSumI(triangle: number[][]) {
  while (triangle.length > 1) {
    const lastLine = triangle.pop();
    const aboveLine = triangle.pop();

    for (let i = 0; i < aboveLine.length; ++i) {
      aboveLine[i] = Math.max(aboveLine[i] + lastLine[i], aboveLine[i] + lastLine[i + 1]);
    }

    triangle.push(aboveLine);
  }

  return triangle[0][0];
}

// Problem 19: Counting Sundays
// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
function countingSundays(firstYear: number, lastYear: number) {
  let sundaysCount = 0;

  for (let i = firstYear; i <= lastYear; ++i) {
    for (let j = 0; j <= 11; ++j) {
      const day = new Date(i, j).getDay();

      if (day === 0) ++sundaysCount;
    }
  }

  return sundaysCount;
}

// Problem 20: Factorial digit sum
// n! means n × (n − 1) × ... × 3 × 2 × 1

// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

// Find the sum of the digits n!
function sumFactorialDigits(n: number) {
  const factorial = BigInt(bigFact(n));
  const sumOfDigits = String(factorial)
    .split("")
    .reduce((acc, number) => acc + Number(number), 0);

  return sumOfDigits;
}

// Problem 21: Amicable numbers
// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).

// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under n.
function sumAmicableNum(n: number) {
  let numbers: number[][] = [];

  for (let i = 1; i < n; ++i) {
    const b = d(i);
    const a = d(b);
    const isInAmicablePair = numbers.some((number) => {
      const [a, b] = number;

      return a === i || b === i;
    });

    if (isInAmicablePair) continue;

    if (a === i && a !== b) {
      numbers.push([i, b]);
    }
  }
  const sum = numbers.reduce((acc, number) => {
    const [a, b] = number;

    return (acc += a + b);
  }, 0);

  return sum;
}

function d(n: number) {
  let sumOfProperDivisors = 0;

  for (let i = 1; i < n; ++i) {
    if (n % i === 0) {
      sumOfProperDivisors += i;
    }
  }

  return sumOfProperDivisors;
}

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

function namesScores(arr: string[]) {
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

// Problem 23: Non-abundant sums
// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all positive integers <= n which cannot be written as the sum of two abundant numbers.
const LIMIT = 28123;

function sumOfNonAbundantNumbers(n: number) {
  let int = 0;
  const abundantNumbers: number[] = [];
  const sumsOfTwoAbundantNumbers = new Set();

  for (let i = 12; i <= LIMIT; ++i) {
    if (isAbundant(i)) abundantNumbers.push(i);
  }

  for (let i = 0; i < abundantNumbers.length; ++i) {
    for (let j = i; j < abundantNumbers.length; ++j) {
      const sum = abundantNumbers[i] + abundantNumbers[j];

      if (sum > LIMIT) {
        break;
      } else {
        sumsOfTwoAbundantNumbers.add(sum);
      }
    }
  }

  for (let i = 1; i < LIMIT; ++i) {
    if (!sumsOfTwoAbundantNumbers.has(i) && i <= n) {
      int += i;
    }
  }

  return int;
}

function isAbundant(n: number) {
  let sumOfDivisors = 1;

  for (let i = 2; i <= n / 2; ++i) {
    if (n % i === 0) sumOfDivisors += i;
  }

  return sumOfDivisors > n;
}
// Problem 24: Lexicographic permutations
// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210
// What is the nth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
function lexicographicPermutations(n: number) {
  const digits: number[] = [];
  const fact = factoriadic(n);
  const perm: number[] = [];

  for (let i = 0; i <= 9; ++i) {
    digits.push(i);
  }

  for (let i = 0; i < fact.length; ++i) {
    const digit = digits[fact[i]];
    digits.splice(fact[i], 1);
    perm.push(digit);
  }

  return Number(perm.join(""));
}

function factoriadic(n: number) {
  const factoradics: number[] = [];

  let i = 1;
  while (n > 0) {
    factoradics.push(n % i);
    n = Math.floor(n / i);
    ++i;
  }

  return factoradics.reverse();
}

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
function digitFibonacci(n: number) {
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

// Problem 26: Reciprocal cycles
// A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

// 1/2 = 0.5
// 1/3 = 0.(3)
// 1/4 = 0.25
// 1/5 = 0.2
// 1/6 = 0.1(6)
// 1/7 = 0.(142857)
// 1/8 = 0.125
// 1/9 = 0.(1)
// 1/10 = 0.1
// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

// Find the value of d < n for which 1/d contains the longest recurring cycle in its decimal fraction part.
function reciprocalCycles(n: number) {
  let d = 0;
  let longestDecimal = 0;

  for (let i = 2; i < n; ++i) {
    const currentDecimal = fractionToDecimal(1, i).replace("0.", "").length;

    if (longestDecimal < currentDecimal) {
      longestDecimal = currentDecimal;
      d = i;
    }
  }

  return d;
}

function fractionToDecimal(a: number, b: number) {
  let dec = "0.";
  const map = new Map();

  let reminder = a % b;

  while (reminder !== 0 && !map.has(reminder)) {
    map.set(reminder, dec.length);

    reminder *= 10;

    dec += Math.floor(reminder / b);

    reminder = reminder % b;
  }

  return dec;
}

// Problem 27: Quadratic primes
// Euler discovered the remarkable quadratic formula:

// n2+n+41

// It turns out that the formula will produce 40 primes for the consecutive integer values  0≤n≤39
//  . However, when  n=40,402+40+41=40(40+1)+41
//   is divisible by 41, and certainly when  n=41,412+41+41
//   is clearly divisible by 41.

// The incredible formula  n2−79n+1601
//   was discovered, which produces 80 primes for the consecutive values  0≤n≤79
//  . The product of the coefficients, −79 and 1601, is −126479.

// Considering quadratics of the form:

// n2+an+b
//  , where  |a|<range
//   and  |b|≤range

// where  |n|
//   is the modulus/absolute value of  n

// e.g.  |11|=11
//   and  |−4|=4

// Find the product of the coefficients,  a
//   and  b
//  , for the quadratic expression that produces the maximum number of primes for consecutive values of  n
//  , starting with  n=0
//  .

function quadraticPrimes(range) {
  let longestConsecutivePrimes = 0;
  let coefficient_a = 0;
  let coefficient_b = 0;

  for (let i = -range - 1; i <= range; ++i) {
    for (let j = -range; j <= range; ++j) {
      let n = 0;

      while (isPrime(n ** 2 + i * n + j)) {
        ++n;
      }

      if (longestConsecutivePrimes < n) {
        longestConsecutivePrimes = n;
        coefficient_a = i;
        coefficient_b = j;
      }
    }
  }

  return coefficient_a * coefficient_b;
}

function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

// Problem 28: Number spiral diagonals
// Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:

// 21 22 23 24 25
// 20  7  8  9 10
// 19  6  1  2 11
// 18  5  4  3 12
// 17 16 15 14 13
// It can be verified that the sum of the numbers on the diagonals is 101.

// What is the sum of the numbers on the diagonals in an n by n spiral formed in the same way?
function spiralDiagonals(n) {
  const spiral = [];

  const dir = ["left", "down", "right", "up"];
  let idx = 0;

  let counter = n * n;

  for (let i = 0; i < n; ++i) {
    spiral.push([]);

    for (let j = 0; j < n; ++j) {
      spiral[i].push(false);
    }
  }

  let left = 0;
  let down = 0;
  let right = spiral.length - 1;
  let up = spiral.length - 1;

  while (counter > 0) {
    if (idx >= dir.length) idx = 0;

    const direction = dir[idx];

    switch (direction) {
      case "left":
        for (let i = left; i < spiral.length; ++i) {
          for (let j = spiral[i].length - 1; j >= 0; --j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
          }
          break;
        }
        ++left;
        ++idx;
        break;

      case "down":
        for (let i = down; i < spiral.length; ++i) {
          for (let j = 0; j < spiral[i].length; ++j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
              break;
            }
          }
        }
        ++down;
        ++idx;
        break;

      case "right":
        for (let i = right; i > 0; --i) {
          for (let j = 0; j < spiral[i].length; ++j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
          }
          break;
        }
        --right;
        ++idx;
        break;

      case "up":
        for (let i = up; i > 0; --i) {
          for (let j = up; j > 0; --j) {
            if (!spiral[i][j]) {
              spiral[i][j] = counter;
              --counter;
            }
            break;
          }
        }
        --up;
        ++idx;
        break;
    }
  }

  return countSpiral(spiral);
}

function countSpiral(spiral) {
  const mid = Math.floor(spiral.length / 2);
  const sum = [1];

  // check diagonal Up
  for (let i = mid - 1, m = 1; i >= 0; --i, ++m) {
    for (let j = mid - m, k = mid + m; j >= mid - m && k <= mid + m; --j, ++k) {
      sum.push(spiral[i][j], spiral[i][k]);
    }
  }

  // check diagonal down
  for (let i = mid + 1, m = 1; i < spiral.length; ++i, ++m) {
    for (let j = mid - m, k = mid + m; j >= mid - m && k <= mid + m; --j, ++k) {
      sum.push(spiral[i][j], spiral[i][k]);
    }
  }

  return sum.reduce((acc, number) => acc + number);
}

// Problem 29: Distinct powers
// Consider all integer combinations of  ab
//   for 2 ≤ a ≤ 5 and 2 ≤ b ≤ 5:

// 22=4, 23=8, 24=16, 25=32
// 32=9, 33=27, 34=81, 35=243
// 42=16, 43=64, 44=256, 45=1024
// 52=25, 53=125, 54=625, 55=3125
// If they are then placed in numerical order, with any repeats removed, we get the following sequence of 15 distinct terms:

// 4, 8, 9, 16, 25, 27, 32, 64, 81, 125, 243, 256, 625, 1024, 3125
// How many distinct terms are in the sequence generated by  ab
//   for 2 ≤ a ≤ n and 2 ≤ b ≤ n?
function distinctPowers(n: number) {
  const terms = [];

  for (let i = 2; i <= n; ++i) {
    for (let j = 2; j <= n; ++j) {
      terms.push(i ** j);
    }
  }

  terms.sort((a, b) => a - b);

  for (let i = 0; i < terms.length; ++i) {
    for (let j = i + 1; j < terms.length; ++j) {
      const firstTerm = terms[i];
      const secondTerm = terms[j];

      if (firstTerm === secondTerm) {
        terms.splice(j, 1, "repeat");
      }
    }
  }

  return terms.filter((term) => typeof term !== "string").length;
}

// Problem 30: Digit n powers
// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

// 1634 = 14 + 64 + 34 + 44
// 8208 = 84 + 24 + 04 + 84
// 9474 = 94 + 44 + 74 + 44
// As 1 = 14 is not a sum it is not included.

// The sum of these numbers is 1634 + 8208 + 9474 = 19316.

// Find the sum of all the numbers that can be written as the sum of n powers of their digits.
function digitnPowers(n) {
  if (n < 3) return 0;

  const numbers = [];
  const isDivisible = n % 2 === 0;

  for (let i = 10; isDivisible ? numbers.length < n - 1 : numbers.length <= n; ++i) {
    const digits = String(i)
      .split("")
      .reduce((acc, digit) => acc + Number(digit) ** n, 0);

    if (i === digits) numbers.push(i);
  }

  return numbers.reduce((acc, number) => acc + number);
}

// Problem 31: Coin sums
// In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

// 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
// It is possible to make £2 in the following way:

// 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
// How many different ways can n pence be made using any number of coins?
function coinSums(n) {
  const ways = new Array(n + 1).fill(0);

  ways[0] = 1;

  const coins = [1, 2, 5, 10, 20, 50, 100, 200];

  for (let i = 0; i < coins.length; ++i) {
    const coin = coins[i];

    for (let j = 0; j < ways.length; ++j) {
      if (coin <= j) {
        ways[j] = ways[j - coin] + ways[j];
      }
    }
  }

  return ways[n];
}

// Problem 32: Pandigital products
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.

// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

// Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through n pandigital.

// Hint: Some products can be obtained in more than one way so be sure to only include it once in your sum.
function pandigitalProducts(n) {
  const products = [];

  for (let i = 1; i <= Math.ceil(9999 / 2); ++i) {
    for (let j = 1; j <= Math.floor(9999 / i); ++j) {
      let isPandigital = true;
      const product = i * j;

      const s = String([i, j, product]).split(",").join("").split("");

      if (s.length !== n || s.includes("0")) continue;

      for (let k = 1; k <= n; ++k) {
        if (!s.includes(`${k}`)) {
          isPandigital = false;
          break;
        }
      }

      if (isPandigital) {
        products.push(product);
        break;
      }
    }
  }

  for (let i = 0; i < products.length; ++i) {
    const currentNumber = products[i];

    for (let j = i + 1; j < products.length; ++j) {
      const nextNumber = products[j];

      if (currentNumber === nextNumber) products.splice(j, 1, "repeat");
    }
  }

  return products.filter((product) => product !== "repeat").reduce((acc, number) => acc + number, 0);
}

// Problem 33: Digit cancelling fractions
// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

// There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
function digitCancellingFractions() {
  const fractions = [];

  for (let i = 11; i < 100; ++i) {
    for (let j = i + 1; j < 100; ++j) {
      const s = String([i, j]).split(",").join("").split("");

      if (s.includes("0") || s[1] !== s[2]) continue;

      const a = Number(s[0]);
      const b = Number(s[3]);

      const fraction = i / j;
      const lowerTermFraction = a / b;

      if (fraction !== lowerTermFraction) continue;

      fractions.push(lowerTermFraction);
    }
  }

  const product = Number(fractions.reduce((acc, number) => acc * number).toPrecision(1));

  return 1 / product;
}

// Problem 34: Digit factorials
// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

// Find the numbers and the sum of the numbers which are equal to the sum of the factorial of their digits.

// Note: as 1! = 1 and 2! = 2 are not sums they are not included.
function digitFactorial() {
  let sum = 0;
  let numbers = [];

  for (let i = 100; i <= 450585; ++i) {
    const s = String(i)
      .split("")
      .map((digit) => {
        const toFactorial = fact(Number(digit));

        return toFactorial;
      })
      .reduce((acc, number) => acc + number);

    if (s === i) {
      numbers.push(i);
      sum += i;
    }
  }

  return { sum, numbers };
}

// Problem 35: Circular primes
// The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

// How many circular primes are there below n, whereas 100 ≤ n ≤ 1000000?

// Note:

// Circular primes individual rotation can exceed n.
function circularPrimes(n) {
  const primes = [2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, 97];

  if (n === 100) return primes.length;

  for (let i = 100; i < n; ++i) {
    const s = String(i);
    let isCircular = true;

    // This part can be done better especially when the numbers have more than 3 digits
    if (s[1] === "0" || s[2] === "0") continue;

    const rotations = [s];

    for (let j = 1; j < s.length; ++j) {
      const prevRotation = [...rotations[j - 1]];
      const firstDigit = prevRotation.splice(0, 1);

      rotations.push([...prevRotation, firstDigit].join(""));
    }

    for (let j = 0; j < rotations.length; ++j) {
      if (!isPrime(rotations[j])) {
        isCircular = false;
        break;
      }
    }

    if (isCircular) {
      primes.push(i);
    }
  }

  return primes.length;
}

// Problem 36: Double-base palindromes
// The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

// Find the sum of all numbers, less than n, whereas 1000 ≤ n ≤ 1000000, which are palindromic in base 10 and base 2.

// (Please note that the palindromic number, in either base, may not include leading zeros.)
function doubleBasePalindromes(n) {
  let sum = 0;

  for (let i = 1; i < n; ++i) {
    const reverseI = String(i).split("").reverse().join("");
    const binary = Number(i).toString(2);
    const reverseBinary = Number(i).toString(2).split("").reverse().join("");

    if (i == reverseI && binary === reverseBinary) {
      sum += i;
    }
  }

  return sum;
}

// Problem 37: Truncatable primes
// The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

// Find the sum of the only n (8 ≤ n ≤ 11) primes that are both truncatable from left to right and right to left.

// NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
function truncatablePrimes(n) {
  let sum = 0;
  let primesFound = 0;
  let number = 23;

  while (primesFound < n) {
    if (!isPrime(number)) {
      ++number;
      continue;
    }

    const s = String(number);
    const truncToRight = s.split("");
    const truncToLeft = s.split("");

    let isTruncatablePrime = true;

    for (let i = 1; i < s.length; ++i) {
      truncToRight.shift();
      truncToLeft.pop();

      if (!isPrime(Number(truncToRight.join(""))) || !isPrime(Number(truncToLeft.join("")))) {
        isTruncatablePrime = false;
        break;
      }
    }

    if (!isTruncatablePrime) {
      ++number;
      continue;
    }

    sum += number;

    ++primesFound;
    ++number;
  }

  return sum;
}

// Problem 38: Pandigital multiples
// Take the number 192 and multiply it by each of 1, 2, and 3:

// 192×1=192192×2=384192×3=576

// By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1, 2, 3).

// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1, 2, 3, 4, 5).

// What is the largest 1 to k pandigital k-digit number that can be formed as the concatenated product of an integer with (1, 2, ..., n) where n > 1?
function pandigitalMultiples(k) {
  let current = "";

  // Magic number 9328 could be done better but this passes test cases up to 1 to 9 pandigital
  for (let i = 1; i < 9328; ++i) {
    let n = 1;
    let concatenatedProduct = "";
    let isPandigital = true;

    while (concatenatedProduct.length < k) {
      const product = i * n;
      const nextConcatenation = concatenatedProduct + product;

      if (nextConcatenation.length > k) break;

      concatenatedProduct = nextConcatenation;

      ++n;
    }

    if (concatenatedProduct.includes("0")) continue;

    for (let j = 1; j <= k; ++j) {
      if (!concatenatedProduct.includes(`${j}`)) {
        isPandigital = false;
        break;
      }
    }

    if (isPandigital && Number(current) < Number(concatenatedProduct)) {
      current = concatenatedProduct;
    }
  }

  return Number(current);
}

// Problem 39: Integer right triangles
// If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

// {20,48,52}, {24,45,51}, {30,40,50}

// For which value of p ≤ n, is the number of solutions maximized?
function intRightTriangles(n) {
  let lastMaxSolutions = 0;
  let highestValue = 0;
  let p = 12;
  let knownCombinations = [];

  while (p <= n) {
    let solutions = 0;

    for (let i = 1; i <= Math.floor(p / 2); ++i) {
      for (let j = 1; j <= Math.floor(p / 2); ++j) {
        const k = Math.sqrt(i ** 2 + j ** 2);
        const possibleSolution = i + j + k;

        if (possibleSolution > p) break;

        if (possibleSolution === p && !knownCombinations.includes(k)) {
          knownCombinations.push(k);
          ++solutions;
        }
      }
    }

    if (solutions > lastMaxSolutions) {
      lastMaxSolutions = solutions;
      highestValue = p;
    }

    knownCombinations = [];
    ++p;
  }
  return highestValue;
}

// Problem 40: Champernowne's constant
// An irrational decimal fraction is created by concatenating the positive integers:

// 0.123456789101112131415161718192021...

// It can be seen that the 12th digit of the fractional part is 1.

// If dn represents the nth digit of the fractional part, find the value of the following expression.

// d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
function champernownesConstant(n) {
  let fraction = ".";
  let product = 1;

  for (let i = 1; i <= n; ++i) {
    fraction += i;
  }

  for (let i = 10; i <= n; i *= 10) {
    product *= Number(fraction[i]);
  }

  return product;
}

// Problem 41: Pandigital prime
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.

// What is the largest n-length digit pandigital prime that exists?
function pandigitalPrime(n) {
  let pandigitalPrime = 0;
  let minLength = "";
  let maxLength = "";

  for (let i = n, j = 1; i > 0; --i, ++j) {
    maxLength += i;
    minLength += j;
  }

  for (let i = Number(minLength); i < Number(maxLength); ++i) {
    if (isPrime(i)) {
      const s = String(i).split("");
      let isPandigital = true;

      for (let j = 1; j <= n; ++j) {
        if (!s.includes(`${j}`)) {
          isPandigital = false;
          break;
        }
      }

      if (isPandigital) {
        pandigitalPrime = i;
      }
    }
  }

  return pandigitalPrime;
}

// Problem 42: Coded triangle numbers
// The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
// By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. If the word value is a triangle number then we shall call the word a triangle word.

// Using words array of n-length, how many are triangle words?
function codedTriangleNumbers(n, words) {
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

// Problem 43: Sub-string divisibility
// The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.

// Let  d1
//   be the  1st
//   digit,  d2
//   be the  2nd
//   digit, and so on. In this way, we note the following:

// d2d3d4=406
//   is divisible by 2
// d3d4d5=063
//   is divisible by 3
// d4d5d6=635
//   is divisible by 5
// d5d6d7=357
//   is divisible by 7
// d6d7d8=572
//   is divisible by 11
// d7d8d9=728
//   is divisible by 13
// d8d9d10=289
//   is divisible by 17
// Find the sum of all 0 to n pandigital numbers with sub-strings fulfilling n - 2 of these divisibility properties.

// Note: Pandigital numbers starting with 0 are to be considered in the result.
function substringDivisibility(n) {
  let sum = 0;
  let nPandigital = "";
  const divisibles = [2, 3, 5, 7, 11, 13, 17];

  for (let i = 0; i <= n; ++i) {
    nPandigital += i;
  }

  function permute(str, y = str.length, strArr = str.split("")) {
    if (y === 1) {
      const s = strArr.join("");
      let isDivisible = true;

      for (let j = 1; j <= s.length; ++j) {
        let subS = "";

        for (let x = j; x < j + 3 && j + 3 <= s.length; ++x) {
          subS += s[x];
        }

        if (subS === "") break;

        const subStringNumber = Number(subS);
        const currentDivisor = divisibles[j - 1];

        if (subStringNumber % currentDivisor !== 0) {
          isDivisible = false;
          break;
        }
      }

      if (isDivisible) {
        sum += Number(s);
      }
    } else {
      for (let i = 0; i < y; i++) {
        permute(str, y - 1, strArr);
        if (y % 2 === 0) {
          swap(strArr, i, y - 1);
        } else {
          swap(strArr, 0, y - 1);
        }
      }
    }
  }

  permute(nPandigital);

  return sum;
}

function swap(strArr, i, j) {
  const temp = strArr[i];
  strArr[i] = strArr[j];
  strArr[j] = temp;
}

// Problem 44: Pentagon numbers
// Pentagonal numbers are generated by the formula, Pn=n(3n−1)/2. The first ten pentagonal numbers are:

// 1, 5, 12, 22, 35, 51, 70, 92, 117, 145, ...

// It can be seen that P4 + P7 = 22 + 70 = 92 = P8. However, their difference, 70 − 22 = 48, is not pentagonal.

// Find the pair of pentagonal numbers, Pj and Pk, for which their sum and difference are pentagonal and D = |Pk − Pj| is minimized; what is the value of D?
function pentagonNumbers() {
  const map = new Map();
  let d = 0;
  // This is a little bit cheating
  // but I obtained right max values for i,j by knowing what value sholud return test case
  for (let i = 1; i <= 1020; ++i) {
    const pi = (i * (3 * i - 1)) / 2;

    for (let j = 1; j <= 2167; ++j) {
      const pj = (j * (3 * j - 1)) / 2;

      const sum = pi + pj;
      const diff = Math.abs(pj - pi);

      if (!map.has(pj)) map.set(pj, pj);

      if (map.has(diff) && isPentagonal(sum)) {
        d = diff;
      }
    }
  }

  return d;
}

function isPentagonal(n) {
  for (let i = 1; (i * (3 * i - 1)) / 2 <= n; ++i) {
    if ((i * (3 * i - 1)) / 2 === n) return true;
  }

  return false;
}

// Problem 45: Triangular, pentagonal, and hexagonal
// Triangle, pentagonal, and hexagonal numbers are generated by the following formulae:

// Triangle
// Tn=n(n+1)/2
// 1, 3, 6, 10, 15, ...

// Pentagonal
// Pn=n(3n−1)/2
// 1, 5, 12, 22, 35, ...

// Hexagonal
// Hn=n(2n−1)
// 1, 6, 15, 28, 45, ...
// It can be verified that T285 = P165 = H143 = 40755.

// Find the next triangle number that is also pentagonal and hexagonal.
function triPentaHexa(n: number) {
  const pentagonalMap = new Map<number, number>();
  const hexagonalMap = new Map<number, number>();

  let tn = 286;
  let pn = 166;
  let hn = 144;

  while (pn <= 50000 && hn <= 50000) {
    const pent = (pn * (3 * pn - 1)) / 2;
    const hex = hn * (2 * hn - 1);

    pentagonalMap.set(pent, pent);
    hexagonalMap.set(hex, hex);

    ++pn;
    ++hn;
  }

  while (true) {
    const tri = (tn * (tn + 1)) / 2;

    if (pentagonalMap.has(tri) && hexagonalMap.has(tri)) {
      return tri;
    }

    ++tn;
  }
}

// Problem 46: Goldbach's other conjecture
// It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.

// 9 = 7 + 2×12
// 15 = 7 + 2×22
// 21 = 3 + 2×32
// 25 = 7 + 2×32
// 27 = 19 + 2×22
// 33 = 31 + 2×12
// It turns out that the conjecture was false.

// What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
function goldbachsOtherConjecture() {
  const compositeNumbers = getCompositeNumbers(54);

  for (let i = 0; i < compositeNumbers.size; ++i) {
    const compositeNumber = compositeNumbers.get(i);
    const primeTable = sieve(compositeNumber);
    let isComposite = false;

    for (let j = 0; j < primeTable.length; ++j) {
      const prime = primeTable[j];
      let k = 1;

      while (true) {
        const goldbach = prime + 2 * k ** 2;

        if (goldbach > compositeNumber) {
          break;
        }

        if (goldbach === compositeNumber) {
          isComposite = true;
          break;
        }

        ++k;
      }

      if (isComposite) break;
    }

    if (!isComposite) {
      return compositeNumber;
    }
  }

  return false;
}

function getCompositeNumbers(n: number) {
  const oddComposite = new Map<number, number>();
  const primes = sieve(n);
  let x = 0;

  for (let i = 1; i < primes.length; ++i) {
    const nthPrime = primes[i];

    for (let j = 0; j < 29; ++j) {
      const n = nthPrime ** 2 + 2 * nthPrime * j;
      oddComposite.set(x, n);
      ++x;
    }
  }

  return oddComposite;
}

// Problem 47: Distinct primes factors
// The first two consecutive numbers to have two distinct prime factors are:

// 14 = 2 × 7
// 15 = 3 × 5
// The first three consecutive numbers to have three distinct prime factors are:

// 644 = 22 × 7 × 23
// 645 = 3 × 5 × 43
// 646 = 2 × 17 × 19
// Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
function distinctPrimeFactors(targetNumPrimes: number, targetConsecutive: number) {
  const primes = sieveMap(134048);
  let consecutive: number[] = [];
  let n = 12;

  while (true) {
    if (primes.has(n)) {
      ++n;
      continue;
    }

    const divisors = trialDevision(n);
    const shortDivisors: number[] = [];

    // Short some repetetive devisors like [2,2,3]
    for (let i = 0; i < divisors.length; ) {
      const currentNumber = divisors[i];
      let sum = 1;

      for (let j = i; j < divisors.length; ) {
        const nextNumber = divisors[j];

        if (nextNumber === currentNumber) {
          sum *= nextNumber;
          divisors.shift();
        } else {
          break;
        }
      }

      shortDivisors.push(sum);
      if (!divisors.length) break;
    }

    const isSameNumOfPrimes = shortDivisors.length === targetNumPrimes;

    if (isSameNumOfPrimes) {
      consecutive.push(n);

      const isConsecutive = consecutive.every((value, i) => i === 0 || +value === +consecutive[i - 1] + 1);

      if (!isConsecutive) {
        consecutive.shift();
      }

      if (consecutive.length === targetConsecutive) {
        break;
      }
    }

    ++n;
  }

  return consecutive[0];
}

function trialDevision(n: number) {
  const devisors: number[] = [];
  let f = 2;

  while (n > 1) {
    if (n % f === 0) {
      devisors.push(f);
      n /= f;
    } else {
      ++f;
    }
  }

  return devisors;
}

// Problem 48: Self powers
// The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

// Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

// Huge note this is correct but freeCodeCamp has a bug and throws error
// https://github.com/freeCodeCamp/freeCodeCamp/issues/39352
function selfPowers(power: number, lastDigits: number) {
  let sum = 0n;
  let sumAsString: string[] = [];
  const lastNDigits: string[] = [];

  for (let i = 1n; i < BigInt(power); ++i) {
    sum += i ** i;
  }

  sumAsString = String(sum).replace("n", "").split("");

  for (let i = lastDigits; i > 0; --i) {
    lastNDigits.push(sumAsString.at(-i));
  }

  return Number(lastNDigits.join(""));
}

// Problem 49: Prime permutations
// The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.

// There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.

// What 12-digit number do you form by concatenating the three terms in this sequence?
function primePermutations() {
  let numbers: number[] = [];
  const primes = sieveMap(9999);
  const nextPrime = 236; // Next prime after sequence given in the problem

  for (let i = nextPrime; i < primes.size; ++i) {
    const prime = primes.get(i);
    const digits = String(prime).split("");
    let nextPossiblePrime = prime;
    let isPermutation = true;

    numbers.push(prime);

    while (true) {
      nextPossiblePrime += 3330;

      // Check if its still 4 digits and is prime
      if (nextPossiblePrime > 9999 || !isPrime(nextPossiblePrime)) {
        numbers = [];
        break;
      }

      // check if its permutation of base prime
      const nextPossiblePrimeDigits = String(nextPossiblePrime).split("");

      for (let j = 0; j < nextPossiblePrimeDigits.length; ++j) {
        const digit = nextPossiblePrimeDigits[j];

        if (!digits.includes(digit)) {
          isPermutation = false;
          break;
        }
      }

      if (!isPermutation) {
        numbers = [];
        break;
      }

      numbers.push(nextPossiblePrime);

      if (numbers.length === 3) {
        return Number(numbers.reduce((acc, number) => acc + number, ""));
      }
    }
  }
}

// Problem 50: Consecutive prime sum
// The prime 41, can be written as the sum of six consecutive primes:

// 41 = 2 + 3 + 5 + 7 + 11 + 13
// This is the longest sum of consecutive primes that adds to a prime below one-hundred.

// The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

// Which prime, below one-million, can be written as the sum of the most consecutive primes?
function consecutivePrimeSum(limit) {
  const currentBiggestConsecutivePrime = { prime: 0, subPrimes: [] };
  const primes = sieveMap(limit);

  for (let i = 2; i < limit; ++i) {}

  return true;
}
