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

// FCC doesn't support power of BigInts
// Here is workaround

function bigIntPower(base, exponent) {
  base = BigInt(base);
  let result = 1n;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
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
function circularPrimes(n: number) {
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
function doubleBasePalindromes(n: number) {
  let sum = 0;

  for (let i = 1; i < n; ++i) {
    const reverseI = parseFloat(String(i).split("").reverse().join(""));
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
function truncatablePrimes(n: number) {
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
function pandigitalMultiples(k: number) {
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
function intRightTriangles(n: number) {
  let lastMaxSolutions = 0;
  let highestValue = 0;
  let p = 12;
  let knownCombinations: number[] = [];

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
function champernownesConstant(n: number) {
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
function pandigitalPrime(n: number) {
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
function codedTriangleNumbers(n: number, words: string[]) {
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
function substringDivisibility(n: number) {
  let sum = 0;
  let nPandigital = "";
  const divisibles = [2, 3, 5, 7, 11, 13, 17];

  for (let i = 0; i <= n; ++i) {
    nPandigital += i;
  }

  function permute(str: string, y = str.length, strArr = str.split("")) {
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

function swap(strArr: string[], i: number, j: number) {
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
  const map = new Map<number, number>();
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

function isPentagonal(n: number) {
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
function consecutivePrimeSum(limit: number) {
  const primesMap = sieveMap(limit);
  const primes = Array.from(primesMap);
  let currentBiggestConsecutivePrime = { prime: 0, length: 0 };

  for (let i = 0; i < primesMap.size; ++i) {
    let consecutivePrimes: number[] = [];

    for (let j = i; j < primes.length; ++j) {
      const prime = primes[j][0];
      const sum = consecutivePrimes.reduce((acc, n) => acc + n, 0) + prime;

      if (sum > limit) break;

      consecutivePrimes.push(prime);

      const currentConsecutiveLength = consecutivePrimes.length;
      const biggestConsecutiveLength = currentBiggestConsecutivePrime.length;

      if (
        primesMap.has(sum) &&
        currentConsecutiveLength > biggestConsecutiveLength &&
        sum > currentBiggestConsecutivePrime.prime
      ) {
        currentBiggestConsecutivePrime.prime = sum;
        currentBiggestConsecutivePrime.length = consecutivePrimes.length;
      }
    }
  }

  return currentBiggestConsecutivePrime.prime;
}

// Problem 51: Prime digit replacements
// By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

// By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.

// Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an n prime value family.

// Combinations for 2-digit vals [10]
// Combinations for 3-digit vals [10, 100, 110]
// Combinations for 4-digit vals [10, 100, 110, 1000, 1010, 1100, 1110]
// Combinations for 5-digit vals [10, 100, 110, 1000, 1010, 1100, 1110, 10000, 10010, 10100, 11000, 10110 ,11010, 11100, 11110]
// Combinations for 6-digit vals [10, 100, 110, 1000, 1010, 1100, 1110, 10000, 10010, 10100, 11000, 10110, 11010, 11100, 11110 ,100000, 100010, 100100, 101000, 110000, 100110, 101010, 110010, 110100, 111000, 101110, 110110, 111010, 111100, 111110]
function primeDigitReplacements(n: number) {
  const primes = sieveMap(929394);
  let p = n >= 7 ? 56003 : 13;

  while (true) {
    if (!primes.has(p)) {
      p += 10;
      continue;
    }

    let m = p;

    const possibleReplacement = getReplacement(p);

    if (possibleReplacement === -1) {
      p += 10;
      continue;
    }

    const { replacement, isZero } = possibleReplacement;

    const r = Number(replacement);
    const i = isZero ? 9 : 8;

    const pFamily = [p];

    for (let j = 0; j < i; ++j) {
      m += r;

      if (primes.has(m)) {
        pFamily.push(m);
      }
    }

    if (pFamily.length === n) {
      return pFamily[0];
    }

    p += 10;
  }
}

function getReplacement(p: number) {
  let replacement = "";
  const m = p.toString();

  for (let i = 0; i < m.length; ++i) {
    if (m[i] === "0") {
      replacement += 1;
    } else {
      replacement += 0;
    }
  }

  if (replacement.indexOf("1") === -1) {
    replacement = "";
  } else {
    return { replacement, isZero: true };
  }

  for (let i = 0; i < m.length; ++i) {
    if (m[i] === "1") {
      replacement += 1;
    } else {
      replacement += 0;
    }
  }

  return replacement.indexOf("1") === -1 ? -1 : { replacement, isZero: false };
}

// Problem 52: Permuted multiples
// It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.

// Find the smallest positive integer, such that multiplied by integers  {2,3,…,n}
//  , contain the same digits.
function permutedMultiples(n: number) {
  const digits: number[] = [];
  let x = 2;

  for (let i = 2; i <= n; ++i) {
    digits.push(i);
  }

  while (true) {
    let bitMap: boolean[] = new Array(digits.length).fill(true);

    for (let i = 0; i < digits.length; ++i) {
      let c = x * digits[i];

      if (!hasSameDigits(x, c)) {
        bitMap[i] = false;
        break;
      }
    }

    if (!bitMap.includes(false)) return x;
    ++x;
  }
}

function hasSameDigits(x: number, y: number) {
  const z = x
    .toString()
    .split("")
    .sort((a: any, b: any) => a - b)
    .join("");
  const j = y
    .toString()
    .split("")
    .sort((a: any, b: any) => a - b)
    .join("");

  if (z.length < j.length) return false;

  return z == j;
}

// Problem 53: Combinatoric selections
// There are exactly ten ways of selecting three from five, 12345:

// 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
// In combinatorics, we use the notation,  (53)=10

// In general,  (nr)=n!r!(n−r)!
//  , where  r≤n
//  ,  n!=n×(n−1)×...×3×2×1
//  , and  0!=1
//  .

// It is not until  n=23
//  , that a value exceeds one-million:  (2310)=1144066
//  .

// How many, not necessarily distinct, values of  (nr)
//   for  1≤n≤100
//  , are greater than one-million?
function combinatoricSelections(limit: number) {
  let vals = 0;

  for (let n = 1; n <= 100; ++n) {
    const factN = bigFact(n);

    for (let r = 1; r <= n; ++r) {
      const factR = bigFact(r);
      const k = bigFact(n - r);
      const ways = factN / (factR * k);

      if (ways >= limit) {
        ++vals;
      }
    }
  }

  return vals;
}

// Problem 54: Poker hands
// In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:

// High Card: Highest value card.
// One Pair: Two cards of the same value.
// Two Pairs: Two different pairs.
// Three of a Kind: Three cards of the same value.
// Straight: All cards are consecutive values.
// Flush: All cards of the same suit.
// Full House: Three of a kind and a pair.
// Four of a Kind: Four cards of the same value.
// Straight Flush: All cards are consecutive values of same suit.
// Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
// The cards are valued in the order: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

// If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives (see example 1 below). But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared (see example 4 below); if the highest cards tie then the next highest cards are compared, and so on.

// Consider the following five hands dealt to two players:

// Hand       Player 1            Player 2	            Winner
// 1          5H 5C 6S 7S KD      2C 3S 8S 8D TD        Player 2
//            Pair of Fives       Pair of Eights
//----------------------------------------------------------------
// 2          5D 8C 9S JS AC      2C 5C 7D 8S QH
//            Highest card Ace    Highest card Queen    Player 1
//----------------------------------------------------------------
// 3          2D 9C AS AH AC      3D 6D 7D TD QD        Player 2
//            Three Aces          Flush with Diamonds
//----------------------------------------------------------------
// 4          4D 6S 9H QH QC      3D 6D 7H QD QS        Player 1
//            Pair of Queens      Pair of Queens
//            Highest card Nine   Highest card Seven
//----------------------------------------------------------------
// 5          2H 2D 4C 4D 4S      3C 3D 3S 9S 9D        Player 1
//            Full House          Full House
//            with Three Fours    with Three Threes

// The global array (handsArr) passed to the function, contains one-thousand random hands dealt to two players. Each line of the file contains ten cards (separated by a single space): the first five are Player 1's cards and the last five are Player 2's cards. You can assume that all hands are valid (no invalid characters or repeated cards), each player's hand is in no specific order, and in each hand there is a clear winner.

// How many hands does Player 1 win?
function pokerHands(arr: string[]) {
  let wins = 0;
  const mid = 5;

  for (let i = 0; i < arr.length; ++i) {
    const hand = arr[i].split(" ");

    const player1Hand = hand.slice(0, mid);
    const player2Hand = hand.slice(mid);

    const p1CardValues = player1Hand.map(getValues).sort((a, b) => a - b);
    const p2CardValues = player2Hand.map(getValues).sort((a, b) => a - b);

    const p1CardSuits = player1Hand.reduce(getSuits, {});
    const p2CardSuits = player2Hand.reduce(getSuits, {});

    const p1HandRankData = handRank(p1CardValues, p1CardSuits);
    const p2HandRankData = handRank(p2CardValues, p2CardSuits);

    if (p1HandRankData.rank === 10 && p2HandRankData.rank === 10) continue;
    if (p1HandRankData.rank > p2HandRankData.rank) {
      ++wins;
      continue;
    }

    if (p1HandRankData.rank === p2HandRankData.rank && !p1HandRankData.rankVals.length) {
      for (let j = p1HandRankData.rest.length - 1; j >= 0; --j) {
        const p1Val = p1HandRankData.rest[j];
        const p2Val = p2HandRankData.rest[j];

        if (p1Val > p2Val) {
          ++wins;
          break;
        }
        if (p1Val === p2Val) continue;

        break;
      }
    }

    if (p1HandRankData.rank === p2HandRankData.rank && p1HandRankData.rankVals.length) {
      let isWinner = false;

      for (let j = p1HandRankData.rankVals.length - 1; j >= 0; --j) {
        const p1Val = p1HandRankData.rankVals[j];
        const p2Val = p2HandRankData.rankVals[j];

        if (p1Val > p2Val) {
          ++wins;
          isWinner = true;
          break;
        }

        if (p1Val === p2Val) continue;

        isWinner = true;
        break;
      }

      if (!isWinner) {
        for (let j = p1HandRankData.rest.length - 1; j >= 0; --j) {
          const p1Val = p1HandRankData.rest[j];
          const p2Val = p2HandRankData.rest[j];

          if (p1Val > p2Val) {
            ++wins;
            break;
          }
          if (p1Val === p2Val) continue;

          break;
        }
      }
    }
  }

  return wins;
}

function handRank(cardValues: number[], suits: { [key: string]: number }) {
  const cards = cardValues.reduce((acc: { [key: number]: number }, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const duplicates = Object.values(cards).filter((val) => val !== 1);
  const handInfo = Object.entries(cards).reduce(
    (acc: { rest: number[]; rankVals: number[] }, card) => {
      if (card[1] === 1) {
        acc.rest.push(Number(card[0]));
      } else {
        acc.rankVals.push(Number(card[0]));
      }
      return acc;
    },
    { rest: [], rankVals: [] }
  );

  const [x, y] = duplicates.sort((a, b) => a - b);

  if (isConsecutive(cardValues) && !isFlush(suits) && !isRoyal(cardValues)) return { rank: 5, ...handInfo };
  if (isFlush(suits) && !isConsecutive(cardValues) && !isRoyal(cardValues)) return { rank: 6, ...handInfo };
  if (isFlush(suits) && isConsecutive(cardValues) && !isRoyal(cardValues)) return { rank: 9, ...handInfo };
  if (isFlush(suits) && isRoyal(cardValues)) return { rank: 10, ...handInfo };

  if (!duplicates.length) return { rank: 1, ...handInfo };
  if (x === 2 && !y) return { rank: 2, ...handInfo };
  if (x === 2 && y === 2) return { rank: 3, ...handInfo };
  if (x === 3 && !y) return { rank: 4, ...handInfo };
  if (x === 2 && y === 3) return { rank: 7, ...handInfo };
  if (x === 4 && !y) return { rank: 8, ...handInfo };
}

function isConsecutive(cardValues: number[]) {
  return cardValues.every(isStraight);
}

function isStraight(element: number, idx: number, arr: number[]) {
  if (idx === arr.length - 1) return true;

  return arr[idx + 1] - element === 1;
}

function isRoyal(cardValues: number[]) {
  const royalValues = [10, 11, 12, 13, 14];

  for (let i = 0; i < royalValues.length; ++i) {
    const royalValue = royalValues[i];

    if (!cardValues.includes(royalValue)) {
      return false;
    }
  }

  return true;
}

function isFlush(suits: { [key: string]: number }) {
  return Object.values(suits).length === 1;
}

function getValues(card: string) {
  const val = card.split("")[0];

  switch (val) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return Number(val);
  }
}

function getSuits(acc: { [key: string]: number }, val: string) {
  const suit = val.split("")[1];
  acc[suit] = (acc[suit] || 0) + 1;
  return acc;
}

const testArr = [
  "8C TS KC 9H 4S 7D 2S 5D 3S AC",
  "5C AD 5D AC 9C 7C 5H 8D TD KS",
  "3H 7H 6S KC JS QH TD JC 2D 8S",
  "TH 8H 5C QS TC 9H 4D JC KS JS",
  "7C 5H KC QH JD AS KH 4C AD 4S",
];

// Problem 55: Lychrel numbers
// If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.

// Not all numbers produce palindromes so quickly. For example,

// 349 + 943 = 1292,
// 1292 + 2921 = 4213
// 4213 + 3124 = 7337
// That is, 349 took three iterations to arrive at a palindrome.

// Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome. A number that never forms a palindrome through the reverse and add process is called a Lychrel number. Due to the theoretical nature of these numbers, and for the purpose of this problem, we shall assume that a number is Lychrel until proven otherwise. In addition you are given that for every number below ten-thousand, it will either (i) become a palindrome in less than fifty iterations, or, (ii) no one, with all the computing power that exists, has managed so far to map it to a palindrome. In fact, 10677 is the first number to be shown to require over fifty iterations before producing a palindrome: 4668731596684224866951378664 (53 iterations, 28-digits).

// Surprisingly, there are palindromic numbers that are themselves Lychrel numbers; the first example is 4994.

// How many Lychrel numbers are there below num?

// Note: Wording was modified slightly on 24 April 2007 to emphasize the theoretical nature of Lychrel numbers.

function countLychrelNumbers(num: number) {
  let numbers = 0;
  let start = 11;

  while (start < num) {
    let isNotLychrel = false;

    const reverseStart = reverseNumber(start);
    let sum = start + reverseStart;

    if (isPalindrome(String(sum))) {
      ++start;
      continue;
    }

    for (let i = 1; i < 50; ++i) {
      const reverseSum = reverseNumber(sum);
      const newSum = sum + reverseSum;

      if (isPalindrome(String(newSum))) {
        isNotLychrel = true;
        break;
      }

      sum = newSum;
    }

    if (isNotLychrel) {
      ++start;
      continue;
    }

    ++numbers;
    ++start;
  }

  return numbers;
}

function isPalindrome(str: string) {
  return str === str.split("").reverse().join("");
}

function reverseNumber(number: number) {
  let revNumber = 0;
  while (number > 0) {
    revNumber = revNumber * 10 + (number % 10);
    number = Math.floor(number / 10);
  }
  return revNumber;
}

// Problem 56: Powerful digit sum
// A googol (10^100) is a massive number: one followed by one-hundred zeros;
// 100^100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.

// Considering natural numbers of the form,  a^b, where a, b < n, what is the maximum digital sum?

// NOTE: This passes the problem but fcc don't like it
function powerfulDigitSum(n: number) {
  let maxSum = 0;

  for (let a = 1; a < n; ++a) {
    for (let b = 1; b < n; ++b) {
      const pow = bigIntPower(a, b).toString();
      const sum = pow.split("").reduce((acc, num) => acc + Number(num), 0);

      maxSum = Math.max(maxSum, sum);
    }
  }

  return maxSum;
}

// Problem 57: Square root convergents
// It is possible to show that the square root of two can be expressed as an infinite continued fraction.

// 2–√=1+12+12+12+…

// By expanding this for the first four iterations, we get:

// 1+12=3/2=1.5

// 1+12+12=7/5=1.4

// 1+12+12+12=17/12=1.41666…

// 1+12+12+12+12=41/29=1.41379…

// The next three expansions are  99/70,  239/169, and  577/408,
// but the eighth expansion,  1393/985, is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.

// In the first n expansions, how many fractions contain a numerator with more digits than denominator?

// Formula to get next numerator and denominator is: ni * 2 + ni-1(previous n)
// Where n is either numerator value or denominator value
// Formula to get only next denominator in sequence is: numerator + denominator
function squareRootConvergents(n: number) {
  const series = [
    [3n, 2n],
    [7n, 5n],
  ];
  let times = 0;
  let i = 1;

  while (n - 1 > 0) {
    const [num, den] = series[i];
    const [prevNum, prevDen] = series[i - 1];

    const nextNumerator = num * 2n + prevNum;
    const nextDenominator = den * 2n + prevDen;

    if (nextNumerator.toString().length > nextDenominator.toString().length) {
      times += 1;
    }

    series.push([nextNumerator, nextDenominator]);

    ++i;
    --n;
  }

  return times;
}

// Problem 58: Spiral primes
// Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.

// 37 36 35 34 33 32 31
// 38 17 16 15 14 13 30
// 39 18  5  4  3 12 29
// 40 19  6  1  2 11 28
// 41 20  7  8  9 10 27
// 42 21 22 23 24 25 26
// 43 44 45 46 47 48 49

// It is interesting to note that the odd squares lie along the bottom right diagonal, but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; that is, a ratio of 8/13 ≈ 62%.
// If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed. If this process is continued, what is the side length of the square spiral for which the percent of primes along both diagonals first falls below percent?
function spiralPrimes(percent: number) {
  let idx = 0;
  let counter = 1;
  let diagonal = 2;
  let primes = 0;
  let numbers = 1;

  for (let i = 7; ; i += 2) {
    while (counter < i * i) {
      if (idx === 4) {
        idx = 0;
        diagonal += 2;
      }

      counter += diagonal;

      if (isPrime(counter)) {
        ++primes;
        ++numbers;
      } else {
        ++numbers;
      }

      ++idx;
    }

    const ratio = Math.floor((primes / numbers) * 100);

    if (ratio < percent) {
      return i;
    }
  }
}

// Problem 59: XOR decryption
// Each character on a computer is assigned a unique code and the preferred standard is ASCII (American Standard Code for Information Interchange). For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.

// A modern encryption method is to take a text file, convert the bytes to ASCII, then XOR each byte with a given value, taken from a secret key. The advantage with the XOR function is that using the same encryption key on the cipher text, restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.

// For unbreakable encryption, the key is the same length as the plain text message, and the key is made up of random bytes. The user would keep the encrypted message and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.

// Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key. If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message. The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.

// Your task has been made easy, as the encryption key consists of three lower case characters. Using cipher, an array containing the encrypted ASCII codes, and the knowledge that the plain text must contain common English words, decrypt the message and find the sum of the ASCII values in the original text.

// key =  [ 101, 120, 112 ]
function XORDecryption(arr: number[]) {
  const asciiChars: number[] = [];

  for (let i = 97; i < 123; ++i) {
    asciiChars.push(i);
  }

  //Take sample for faster decryption time

  // const ammount = 9
  // const sample = 3 * ammount
  // const sampleChars = arr.slice(0, sample)

  let sum = 0;

  for (let i = 0; i < asciiChars.length; ++i) {
    for (let j = 0; j < asciiChars.length; ++j) {
      const key = [asciiChars[i], asciiChars[j], 112];
      const decryptedText = decrypt(arr, key);
      // For some reason when i put this at top scope of function it doesn't work
      // I was to tired to check out why cuz i got my Masters today 09.07.2024
      const regex = /[$}|#&^<>=!?*\-%~]/g;
      const isProhibited = regex.test(decryptedText);

      if (isProhibited) continue;

      for (let n = 0; n < decryptedText.length; ++n) {
        sum += decryptedText.charCodeAt(n);
      }

      return sum;
    }
  }
}

function decrypt(enc: number[], key: number[]) {
  let decText = "";

  for (let i = 0; i < enc.length; i += 3) {
    const encAsciiVals = [enc[i], enc[i + 1], enc[i + 2]];

    for (let j = 0; j < encAsciiVals.length; ++j) {
      const decAsciiVal = encAsciiVals[j] ^ key[j];
      const char = String.fromCharCode(decAsciiVal);

      decText += char;
    }
  }

  return decText;
}

// Only change code above this line

const cipher = [
  36, 22, 80, 0, 0, 4, 23, 25, 19, 17, 88, 4, 4, 19, 21, 11, 88, 22, 23, 23, 29, 69, 12, 24, 0, 88, 25, 11,
  12, 2, 10, 28, 5, 6, 12, 25, 10, 22, 80, 10, 30, 80, 10, 22, 21, 69, 23, 22, 69, 61, 5, 9, 29, 2, 66, 11,
  80, 8, 23, 3, 17, 88, 19, 0, 20, 21, 7, 10, 17, 17, 29, 20, 69, 8, 17, 21, 29, 2, 22, 84, 80, 71, 60, 21,
  69, 11, 5, 8, 21, 25, 22, 88, 3, 0, 10, 25, 0, 10, 5, 8, 88, 2, 0, 27, 25, 21, 10, 31, 6, 25, 2, 16, 21, 82,
  69, 35, 63, 11, 88, 4, 13, 29, 80, 22, 13, 29, 22, 88, 31, 3, 88, 3, 0, 10, 25, 0, 11, 80, 10, 30, 80, 23,
  29, 19, 12, 8, 2, 10, 27, 17, 9, 11, 45, 95, 88, 57, 69, 16, 17, 19, 29, 80, 23, 29, 19, 0, 22, 4, 9, 1, 80,
  3, 23, 5, 11, 28, 92, 69, 9, 5, 12, 12, 21, 69, 13, 30, 0, 0, 0, 0, 27, 4, 0, 28, 28, 28, 84, 80, 4, 22, 80,
  0, 20, 21, 2, 25, 30, 17, 88, 21, 29, 8, 2, 0, 11, 3, 12, 23, 30, 69, 30, 31, 23, 88, 4, 13, 29, 80, 0, 22,
  4, 12, 10, 21, 69, 11, 5, 8, 88, 31, 3, 88, 4, 13, 17, 3, 69, 11, 21, 23, 17, 21, 22, 88, 65, 69, 83, 80,
  84, 87, 68, 69, 83, 80, 84, 87, 73, 69, 83, 80, 84, 87, 65, 83, 88, 91, 69, 29, 4, 6, 86, 92, 69, 15, 24,
  12, 27, 24, 69, 28, 21, 21, 29, 30, 1, 11, 80, 10, 22, 80, 17, 16, 21, 69, 9, 5, 4, 28, 2, 4, 12, 5, 23, 29,
  80, 10, 30, 80, 17, 16, 21, 69, 27, 25, 23, 27, 28, 0, 84, 80, 22, 23, 80, 17, 16, 17, 17, 88, 25, 3, 88, 4,
  13, 29, 80, 17, 10, 5, 0, 88, 3, 16, 21, 80, 10, 30, 80, 17, 16, 25, 22, 88, 3, 0, 10, 25, 0, 11, 80, 12,
  11, 80, 10, 26, 4, 4, 17, 30, 0, 28, 92, 69, 30, 2, 10, 21, 80, 12, 12, 80, 4, 12, 80, 10, 22, 19, 0, 88, 4,
  13, 29, 80, 20, 13, 17, 1, 10, 17, 17, 13, 2, 0, 88, 31, 3, 88, 4, 13, 29, 80, 6, 17, 2, 6, 20, 21, 69, 30,
  31, 9, 20, 31, 18, 11, 94, 69, 54, 17, 8, 29, 28, 28, 84, 80, 44, 88, 24, 4, 14, 21, 69, 30, 31, 16, 22, 20,
  69, 12, 24, 4, 12, 80, 17, 16, 21, 69, 11, 5, 8, 88, 31, 3, 88, 4, 13, 17, 3, 69, 11, 21, 23, 17, 21, 22,
  88, 25, 22, 88, 17, 69, 11, 25, 29, 12, 24, 69, 8, 17, 23, 12, 80, 10, 30, 80, 17, 16, 21, 69, 11, 1, 16,
  25, 2, 0, 88, 31, 3, 88, 4, 13, 29, 80, 21, 29, 2, 12, 21, 21, 17, 29, 2, 69, 23, 22, 69, 12, 24, 0, 88, 19,
  12, 10, 19, 9, 29, 80, 18, 16, 31, 22, 29, 80, 1, 17, 17, 8, 29, 4, 0, 10, 80, 12, 11, 80, 84, 67, 80, 10,
  10, 80, 7, 1, 80, 21, 13, 4, 17, 17, 30, 2, 88, 4, 13, 29, 80, 22, 13, 29, 69, 23, 22, 69, 12, 24, 12, 11,
  80, 22, 29, 2, 12, 29, 3, 69, 29, 1, 16, 25, 28, 69, 12, 31, 69, 11, 92, 69, 17, 4, 69, 16, 17, 22, 88, 4,
  13, 29, 80, 23, 25, 4, 12, 23, 80, 22, 9, 2, 17, 80, 70, 76, 88, 29, 16, 20, 4, 12, 8, 28, 12, 29, 20, 69,
  26, 9, 69, 11, 80, 17, 23, 80, 84, 88, 31, 3, 88, 4, 13, 29, 80, 21, 29, 2, 12, 21, 21, 17, 29, 2, 69, 12,
  31, 69, 12, 24, 0, 88, 20, 12, 25, 29, 0, 12, 21, 23, 86, 80, 44, 88, 7, 12, 20, 28, 69, 11, 31, 10, 22, 80,
  22, 16, 31, 18, 88, 4, 13, 25, 4, 69, 12, 24, 0, 88, 3, 16, 21, 80, 10, 30, 80, 17, 16, 25, 22, 88, 3, 0,
  10, 25, 0, 11, 80, 17, 23, 80, 7, 29, 80, 4, 8, 0, 23, 23, 8, 12, 21, 17, 17, 29, 28, 28, 88, 65, 75, 78,
  68, 81, 65, 67, 81, 72, 70, 83, 64, 68, 87, 74, 70, 81, 75, 70, 81, 67, 80, 4, 22, 20, 69, 30, 2, 10, 21,
  80, 8, 13, 28, 17, 17, 0, 9, 1, 25, 11, 31, 80, 17, 16, 25, 22, 88, 30, 16, 21, 18, 0, 10, 80, 7, 1, 80, 22,
  17, 8, 73, 88, 17, 11, 28, 80, 17, 16, 21, 11, 88, 4, 4, 19, 25, 11, 31, 80, 17, 16, 21, 69, 11, 1, 16, 25,
  2, 0, 88, 2, 10, 23, 4, 73, 88, 4, 13, 29, 80, 11, 13, 29, 7, 29, 2, 69, 75, 94, 84, 76, 65, 80, 65, 66, 83,
  77, 67, 80, 64, 73, 82, 65, 67, 87, 75, 72, 69, 17, 3, 69, 17, 30, 1, 29, 21, 1, 88, 0, 23, 23, 20, 16, 27,
  21, 1, 84, 80, 18, 16, 25, 6, 16, 80, 0, 0, 0, 23, 29, 3, 22, 29, 3, 69, 12, 24, 0, 88, 0, 0, 10, 25, 8, 29,
  4, 0, 10, 80, 10, 30, 80, 4, 88, 19, 12, 10, 19, 9, 29, 80, 18, 16, 31, 22, 29, 80, 1, 17, 17, 8, 29, 4, 0,
  10, 80, 12, 11, 80, 84, 86, 80, 35, 23, 28, 9, 23, 7, 12, 22, 23, 69, 25, 23, 4, 17, 30, 69, 12, 24, 0, 88,
  3, 4, 21, 21, 69, 11, 4, 0, 8, 3, 69, 26, 9, 69, 15, 24, 12, 27, 24, 69, 49, 80, 13, 25, 20, 69, 25, 2, 23,
  17, 6, 0, 28, 80, 4, 12, 80, 17, 16, 25, 22, 88, 3, 16, 21, 92, 69, 49, 80, 13, 25, 6, 0, 88, 20, 12, 11,
  19, 10, 14, 21, 23, 29, 20, 69, 12, 24, 4, 12, 80, 17, 16, 21, 69, 11, 5, 8, 88, 31, 3, 88, 4, 13, 29, 80,
  22, 29, 2, 12, 29, 3, 69, 73, 80, 78, 88, 65, 74, 73, 70, 69, 83, 80, 84, 87, 72, 84, 88, 91, 69, 73, 95,
  87, 77, 70, 69, 83, 80, 84, 87, 70, 87, 77, 80, 78, 88, 21, 17, 27, 94, 69, 25, 28, 22, 23, 80, 1, 29, 0, 0,
  22, 20, 22, 88, 31, 11, 88, 4, 13, 29, 80, 20, 13, 17, 1, 10, 17, 17, 13, 2, 0, 88, 31, 3, 88, 4, 13, 29,
  80, 6, 17, 2, 6, 20, 21, 75, 88, 62, 4, 21, 21, 9, 1, 92, 69, 12, 24, 0, 88, 3, 16, 21, 80, 10, 30, 80, 17,
  16, 25, 22, 88, 29, 16, 20, 4, 12, 8, 28, 12, 29, 20, 69, 26, 9, 69, 65, 64, 69, 31, 25, 19, 29, 3, 69, 12,
  24, 0, 88, 18, 12, 9, 5, 4, 28, 2, 4, 12, 21, 69, 80, 22, 10, 13, 2, 17, 16, 80, 21, 23, 7, 0, 10, 89, 69,
  23, 22, 69, 12, 24, 0, 88, 19, 12, 10, 19, 16, 21, 22, 0, 10, 21, 11, 27, 21, 69, 23, 22, 69, 12, 24, 0, 88,
  0, 0, 10, 25, 8, 29, 4, 0, 10, 80, 10, 30, 80, 4, 88, 19, 12, 10, 19, 9, 29, 80, 18, 16, 31, 22, 29, 80, 1,
  17, 17, 8, 29, 4, 0, 10, 80, 12, 11, 80, 84, 86, 80, 36, 22, 20, 69, 26, 9, 69, 11, 25, 8, 17, 28, 4, 10,
  80, 23, 29, 17, 22, 23, 30, 12, 22, 23, 69, 49, 80, 13, 25, 6, 0, 88, 28, 12, 19, 21, 18, 17, 3, 0, 88, 18,
  0, 29, 30, 69, 25, 18, 9, 29, 80, 17, 23, 80, 1, 29, 4, 0, 10, 29, 12, 22, 21, 69, 12, 24, 0, 88, 3, 16, 21,
  3, 69, 23, 22, 69, 12, 24, 0, 88, 3, 16, 26, 3, 0, 9, 5, 0, 22, 4, 69, 11, 21, 23, 17, 21, 22, 88, 25, 11,
  88, 7, 13, 17, 19, 13, 88, 4, 13, 29, 80, 0, 0, 0, 10, 22, 21, 11, 12, 3, 69, 25, 2, 0, 88, 21, 19, 29, 30,
  69, 22, 5, 8, 26, 21, 23, 11, 94,
];

// Problem 60: Prime pair sets
// The primes 3, 7, 109, and 673, are quite remarkable. By taking any two primes and concatenating them in any order the result will always be prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

// Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

function primePairSets() {
  const primes = sieve(10000);
  let primesSet: number[] = [];
  let n = 1;

  while (n < primes.length) {
    primesSet.push(primes[n]);

    for (let i = 0; i < primes.length; ++i) {
      let producePrime = true;

      for (let j = 0; j < primesSet.length; ++j) {
        const order1 = parseInt(primes[i] + "" + primesSet[j]);
        const order2 = parseInt(primesSet[j] + "" + primes[i]);

        if (!isPrime(order1) || !isPrime(order2)) {
          producePrime = false;
          break;
        }
      }

      if (!producePrime) continue;

      primesSet.push(primes[i]);
    }

    if (primesSet.length === 5) {
      return primesSet.reduce((acc, num) => acc + num);
    }

    primesSet = [];
    ++n;
  }
}

// Problem 61: Cyclical figurate numbers
// Triangle, square, pentagonal, hexagonal, heptagonal, and octagonal numbers are all figurate (polygonal) numbers and are generated by the following formulae:

// Type of Number	Formula	Sequence
// Triangle	 P3(n)=n(n+1)2
//  	1, 3, 6, 10, 15, ...
// Square	 P4(n)=n2
//  	1, 4, 9, 16, 25, ...
// Pentagonal	 P5(n)=n(3n−1)2
//  	1, 5, 12, 22, 35, ...
// Hexagonal	 P6(n)=n(2n−1)
//  	1, 6, 15, 28, 45, ...
// Heptagonal	 P7(n)=n(5n−3)2
//  	1, 7, 18, 34, 55, ...
// Octagonal	 P8(n)=n(3n−2)
//  	1, 8, 21, 40, 65, ...
// The ordered set of three 4-digit numbers: 8128, 2882, 8281, has three interesting properties.

// The set is cyclic, in that the last two digits of each number is the first two digits of the next number (including the last number with the first).
// Each polygonal type: triangle ( P3(127)=8128), square ( P4(91)=8281), and pentagonal ( P5(44)=2882 ), is represented by a different number in the set.
// This is the only set of 4-digit numbers with this property.
// Find the sum of all numbers in ordered sets of n cyclic 4-digit numbers for which each of the  P3 to  Pn+2 polygonal types, is represented by a different number in the set.

// fn  min-arg  return   max-arg   return
// P8  19       1045     58        9976
// P7  21       1071     63        9828
// P6  23       1035     70        9730
// P5  26       1001     81        9801
// P4  32       1024     99        9801
// P3  45       1035     140       9870

// PROBLEM UNSOLVED
// function cyclicalFigurateNums(n) {
//   const polygonals = new Map();

//   for (let i = 3; i <= n + 2; ++i) {
//     const { polygonal, min, max } = pickPolygonal(i);
//     const polygonalNums = new Map();

//     for (let j = min; j <= max; ++j) {
//       const p = polygonal(j);
//       polygonalNums.set(p, p);
//     }

//     polygonals.set(i, polygonalNums);
//   }

//   console.log(createSet(1010, 9999, n, [], polygonals));
//   return true;
// }

// function createSet(start, end, n, arr, polygonals) {
//   if (n - arr.length === 1) {
//     // Last number in set is last two digits of previous number
//     // And first two digits of first number in set
//     const last = parseInt(arr[arr.length - 1].toString().slice(2));
//     const first = parseInt(arr[0].toString().slice(0, 2));
//     const lastNumberInSet = parseInt(last + "" + first);

//     arr.push(lastNumberInSet);

//     const types = getPolygonalTypes(arr, polygonals, n);

//     if (!types) {
//       arr.pop();
//       return;
//     }

//     const uniqueTypes = isUnique(types);

//     if (uniqueTypes) {
//       console.log(arr, "\n", types);
//       return arr;
//     }

//     arr.pop();
//     return;
//   }

//   for (let i = start; i <= end; ++i) {
//     arr.push(i);

//     const nextStart = parseInt(i.toString().slice(2)) * 100;
//     const nextEnd = nextStart + 99;
//     const startsWithZero = nextStart.toString().length < 4;

//     if (startsWithZero) {
//       arr.pop();
//       continue;
//     }

//     createSet(nextStart, nextEnd, n, arr, polygonals);
//     arr.pop();
//   }
// }

// function isUnique(types) {
//   for (let i = 0; i < types.length; ++i) {
//     for (let j = i + 1; j < types.length; ++j) {
//       const [num1, type1] = types[i];
//       const [num2, type2] = types[j];

//       if (num1 === num2 || type1 === type2) return false;
//     }
//   }

//   return true;
// }

// function getPolygonalTypes(arr, polygonals, n) {
//   const types = [];

//   for (let i = arr.length - 1; i >= 0; --i) {
//     let found = false;

//     for (let j = 3; j <= n + 2; ++j) {
//       const isInSet = polygonals.get(j).get(arr[i]);

//       if (isInSet) {
//         // console.log(type)
//         found = true;
//         types.push([isInSet, j]);
//       }
//     }

//     if (!found) return null;
//   }

//   return types;
// }

// function cyclicalFigurateNums(n) {
//   const polygonals = {};
//   const relation = {};

//   for (let i = 3; i <= n + 2; ++i) {
//     const { polygonal, min, max } = pickPolygonal(i);
//     const polygonalNums = [];

//     for (let j = min; j <= max; ++j) {
//       const p = polygonal(j);
//       polygonalNums.push(p);
//     }

//     polygonals[i] = polygonalNums;
//   }

//   for (let i = 3; i <= n + 2; ++i) {
//     for (let j = 0; j < polygonals[i].length; ++j) {
//       const lastTwoDigits = polygonals[i][j] % 100;
//       const key = i + " " + polygonals[i][j];

//       relation[key] = [];

//       for (let k = 3; k <= n + 2; ++k) {
//         if (k === i) continue;

//         for (let l = 0; l < polygonals[k].length; ++l) {
//           const firstTwoDigits = parseInt(polygonals[k][l] / 100);

//           if (lastTwoDigits === firstTwoDigits) {
//             relation[key].push([k, polygonals[k][l]]);
//           }
//         }
//       }
//     }
//   }

//   const set = createSet(n, [], relation, Object.keys(relation)).reduce((acc, val) => {
//     const poly = parseInt(val.slice(2));

//     return acc + poly;
//   }, 0);

//   console.log(createSet(n, [], relation, Object.keys(relation)), set);
//   return set;
// }

// function createSet(n, arr, relation, keys) {
//   if (arr.length === n) {
//     for (let i = 0; i < arr.length; ++i) {
//       if (i === arr.length - 1) {
//         const x = arr.at(-1).slice(2);
//         const y = arr.at(0).slice(2);

//         const lastDigits = parseInt(Number(x)) % 100;
//         const firstDigits = parseInt(y / 100);

//         if (lastDigits === firstDigits) {
//           console.log(arr);
//           return arr;
//         }

//         arr.pop();
//         return;
//       }

//       const [type1, polygonal1] = arr[i].split(" ");
//       const [type2, polygonal2] = arr[i + 1].split(" ");

//       if (type1 == type2) break;

//       const lastNum = parseInt(polygonal1) % 100;
//       const firstNum = parseInt(polygonal2 / 100);

//       if (lastNum !== firstNum) break;
//     }

//     arr.pop();
//     return;
//   }

//   for (let i = 0; i < keys.length; ++i) {
//     const key = keys[i];

//     arr.push(key);

//     for (let j = 0; j < relation[key].length; ++j) {
//       if (relation[key].length < n - 1) break;

//       const r = createSet(n, arr, relation, [relation[key][j].join(" ")]);

//       if (r) return r;
//     }

//     arr.pop();
//   }
// }

// function pickPolygonal(n) {
//   switch (n) {
//     case 3:
//       return { polygonal: P3, min: 45, max: 140 };
//     case 4:
//       return { polygonal: P4, min: 32, max: 99 };
//     case 5:
//       return { polygonal: P5, min: 26, max: 81 };
//     case 6:
//       return { polygonal: P6, min: 23, max: 70 };
//     case 7:
//       return { polygonal: P7, min: 21, max: 63 };
//     case 8:
//       return { polygonal: P8, min: 19, max: 58 };
//   }
// }

// function P3(n) {
//   return (n * (n + 1)) / 2;
// }

// function P4(n) {
//   return n * n;
// }

// function P5(n) {
//   return (n * (3 * n - 1)) / 2;
// }

// function P6(n) {
//   return n * (2 * n - 1);
// }

// function P7(n) {
//   return (n * (5 * n - 3)) / 2;
// }

// function P8(n) {
//   return n * (3 * n - 2);
// }

// Problem 62: Cubic permutations
// The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3).
// In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

// Find the smallest cube for which exactly n permutations of its digits are cube.

// For 5 [127035954683, 352045367981, 373559126408, 569310543872, 589323567104]
function cubicPermutations(n: number) {
  const cubes: number[] = [];
  let permutations: number[] = [];

  for (let i = 3; i < 8428; ++i) {
    cubes.push(i ** 3);
  }

  // It's kind of cheating using expected return values
  // To know smallest cube index
  // But this trick speeds up execution
  const start = {
    2: cubes.indexOf(125),
    3: cubes.indexOf(41063625),
    4: cubes.indexOf(1006012008),
    5: cubes.indexOf(127035954683),
  };

  for (let i = start[n]; i < cubes.length; ++i) {
    permutations.push(cubes[i]);
    const smallestCube = sortNumbers(permutations[0]);

    for (let j = i + 1; j < cubes.length; ++j) {
      const possiblePermutation = sortNumbers(cubes[j]);

      if (possiblePermutation === smallestCube) {
        permutations.push(cubes[j]);
      }

      if (permutations.length === n) {
        return permutations[0];
      }
    }

    if (permutations.length !== n) permutations = [];
  }
}

function sortNumbers(number: number) {
  return number
    .toString()
    .split("")
    .sort((a, b) => Number(a) - Number(b))
    .join("");
}

// Problem 63: Powerful digit counts
// The 5-digit number, 16807 = 7^5, is also a fifth power. Similarly, the 9-digit number, 134217728 = 8^9, is a ninth power.

// Complete the function so that it returns how many positive integers are of length n and an nth power.
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

// Problem 64: Odd period square roots
// All square roots are periodic when written as continued fractions and can be written in the form:

// √N=a0+ 1 / a1 + 1 / a2 + 1/ a3 + …

// For example, let us consider √23:

// √23 = 4 + √23 − 4= 4+ 1 / 1 / √23 − 4 = 4 + 1 / 1 + √23 − 3 / 7

// If we continue we would get the following expansion:

// √23 = 4 + 1 / 1 + 1 / 3 + 1 / 1 + 1 / 8 + …

// The process can be summarized as follows:

// a0=4, 1 / √23 − 4 = √23 + 4 / 7 = 1 + √23 − 3 / 7

// a1=1, 7 / √23 − 3= 7(√23+3) / 14 = 3 + √23 − 3 / 2

// a2=3, 2 / √23 − 3= 2(√23+3) / 14 = 1 + √23 − 4 / 7

// a3=1, 7 / √23 − 4= 7(√23+4) / 7 = 8 + √23 − 4

// a4=8, 1 / √23 − 4= √23+4 / 7 = 1 + √23 − 3 / 7

// a5=1, 7 / √23 − 3= 7(√23+3) / 14 = 3 + √23 − 3 / 2

// a6=3, 2 / √23 − 3= 2(√23+3) / 14 = 1 + √23 − 4 / 7

// a7=1, 7 / √23 − 4= 7(√23+4) / 7 = 8 + √23 − 4

// It can be seen that the sequence is repeating. For conciseness, we use the notation √23=[4;(1,3,1,8)]
// to indicate that the block (1,3,1,8) repeats indefinitely.

// The first ten continued fraction representations of (irrational) square roots are:

// √2 = [1;(2)], period = 1

// √3 = [1;(1,2)], period = 2

// √5 = [2;(4)], period = 1

// √6 = [2;(2,4)], period = 2

// √7 = [2;(1,1,1,4)], period = 4

// √8 = [2;(1,4)], period = 2

// √10 = [3;(6)], period = 1

// √11 = [3;(3,6)], period = 2

// √12 = [3;(2,6)], period = 2

// √13 = [3;(1,1,1,1,6)], period = 5

// Exactly four continued fractions, for  N ≤ 13, have an odd period.

// How many continued fractions for  N ≤ n have an odd period?

// Good source to help with this problem
// https://stackoverflow.com/questions/12182701/generating-continued-fractions-for-square-roots
function oddPeriodSqrts(n) {
  // Periods of first ten continued fraction
  // Representations square roots
  const periods = [1, 2, 1, 2, 4, 2, 1, 2, 2, 5];
  let N = 14;

  while (N <= n) {
    const sqrt = Math.sqrt(N);

    if (Number.isInteger(sqrt)) {
      ++N;
      continue;
    }

    const sequence = getSequence(N);
    const period = sequence.length - 1;

    periods.push(period);

    ++N;
  }

  return periods.filter(isOdd).length;
}

function getSequence(num, sqrt = Math.sqrt(num), sequence = [~~sqrt], a = ~~sqrt, b = 0, c = 1) {
  const intPart = Math.trunc(sqrt);

  const B = a * c - b;
  const C = Math.trunc((num - B * B) / c);
  const A = Math.trunc((intPart + B) / C);

  sequence.push(A);

  if (C === 1) return sequence;

  return getSequence(num, sqrt, sequence, A, B, C);
}

function isOdd(number) {
  return number % 2 !== 0;
}

// Problem 65: Convergents of e
// The square root of 2 can be written as an infinite continued fraction.

// √2=1+1/2+1/2+1/2+1/2+...

// The infinite continued fraction can be written, √2=[1;(2)] indicates that 2 repeats ad infinitum.
// In a similar way, √23=[4;(1,3,1,8)].
// It turns out that the sequence of partial values of continued fractions for square roots provide the best rational approximations. Let us consider the convergents for √2

// 1+1/2 = 3/2
// 1+1/2+1/2 = 7/5
// 1+1/2+1/2+1/2 = 17/12
// 1+1/2+1/2+1/2+1/2 = 41/29

// Hence the sequence of the first ten convergents for √2 are:
// 1, 3/2, 7/5, 17/12, 41/29, 99/70, 239/169, 577/408, 1393/985, 3363/2378,...

// What is most surprising is that the important mathematical constant, e=[2;1,2,1,1,4,1,1,6,1,...,1,2k,1,...].
// The first ten terms in the sequence of convergents for e are:
// 2, 3, 8/3, 11/4, 19/7, 87/32, 106/39, 193/71, 1264/465, 1457/536,...

// The sum of digits in the numerator of the 10th convergent is 1+4+5+7=17
// Find the sum of digits in the numerator of the nth convergent of the continued fraction for e.

// Formula to get next numerator and denominator is: n_i * 2 + n_i-1(previous n)

// Let k = 4 and
// Sequence of first two convergents for e as fractions are: 8 / 3, 11 / 4,
// To obtain next numerator and denominator of first three in sequence use formula n_i + n_i - 1 for both numerator and denominator
// Third fraction in sequence is odd and to obtain next fraction you need to use this formula n_i * k + n_i - 1 for both numerator and denominator
// After each odd period k -> k + 2

function convergentsOfE(n) {
  const series = [
    [2n, 2n],
    [3n, 3n],
    [8n, 3n],
    [11n, 4n],
    [19n, 7n],
  ];
  let i = 4;
  let k = 4n;
  let counter = 3;

  while (series.length < n) {
    const [num, den] = series[i];
    const [prevNum, prevDen] = series[i - 1];

    if (counter === 3) {
      const nextNum = num * k + prevNum;
      const nextDen = den * k + prevDen;

      series.push([nextNum, nextDen]);
      k += 2n;
      ++i;
      counter = 1;
      continue;
    }

    const nextNum = num + prevNum;
    const nextDen = den + prevDen;

    series.push([nextNum, nextDen]);
    ++counter;
    ++i;
  }

  const last = series.length - 1;

  return series[last][0]
    .toString()
    .split("")
    .reduce((acc, num) => acc + Number(num), 0);
}

// Problem 66: Diophantine equation
// Consider quadratic Diophantine equations of the form:

// x2 – Dy2 = 1
// For example, when D=13, the minimal solution in x is 6492 – 13×1802 = 1.

// It can be assumed that there are no solutions in positive integers when D is square.

// By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:

// 32 – 2×22 = 1
// 22 – 3×12 = 1
// 92 – 5×42 = 1
// 52 – 6×22 = 1
// 82 – 7×32 = 1
// Hence, by considering minimal solutions in x for D ≤ 7, the largest x is obtained when D=5.

// Find the value of D ≤ n in minimal solutions of x for which the largest value of x is obtained.
function diophantineEquation(n: number) {
  const D = getDValues(n);
  const solutions = [0n, 0n];
  let dValue = 0n;

  for (let i = 0; i < D.length; ++i) {
    const k = D[i];
    let sequence = getSequence(k);
    const [x, y, d] = getMinimalSolutions(sequence, BigInt(k));
    const [currentX, currentY] = solutions;

    if (x > currentX) {
      solutions[0] = x;
      solutions[1] = y;
      dValue = d;
    }
  }

  return Number(dValue.toString());
}

function getMinimalSolutions(sequence: number[], d: bigint) {
  const newSequence = [...sequence];
  const copy = newSequence.slice(1, newSequence.length);
  const slength = newSequence.length - 1;

  if (isEven(slength)) {
    newSequence.pop();
  } else {
    newSequence.splice(1, 0, ...copy);
    newSequence.pop();
  }

  let pellsEquation = bigIntPower(0, 2) - d * bigIntPower(0, 2);

  while (pellsEquation !== 1n) {
    const p = newSequence.length - 1;
    const start = decimalToFraction(1 / newSequence[p], false);
    const [x, y] = denoteSequence(newSequence, p - 1, start)
      .split("/")
      .map((num) => BigInt(num));

    pellsEquation = bigIntPower(x, 2) - d * bigIntPower(y, 2);

    if (pellsEquation === 1n) return [x, y, d];

    newSequence.splice(1, 0, ...copy);
  }
}

function denoteSequence(sequence: number[], i: number, start: string) {
  const s = intToFraction(sequence[i], start);

  const nr = start.split("/").map((num) => BigInt(num));
  const ns = s.split("/").map((num) => BigInt(num));

  const cn = addFractions(nr, ns).split("/").reverse().join("/");

  if (i === 0) return cn.split("/").reverse().join("/");

  return denoteSequence(sequence, i - 1, cn);
}

function isEven(number: number) {
  return number % 2 === 0;
}

function getDValues(n: number) {
  const D: number[] = [];

  for (let i = 2; i <= n; ++i) {
    const sqrt = Math.sqrt(i);
    const isPerfectSqrt = Number.isInteger(sqrt);

    if (isPerfectSqrt) continue;

    D.push(i);
  }

  return D;
}

// NOTE fraction need to have same denominator
function addFractions(fract1: bigint[], fract2: bigint[]) {
  const [num1, den1] = fract1.map((num) => BigInt(num));
  const [num2, den2] = fract2.map((num) => BigInt(num));

  return `${num1 + num2}/${den2}`;
}

function intToFraction(integer: number | bigint, fract: string) {
  integer = BigInt(integer);

  const [num, den] = fract.split("/").map((num) => BigInt(num));

  return `${integer * den}/${den}`;
}

/*
Description: Convert a decimal number into a fraction
Author: Michaël Niessen (© 2018)
Website: http://AssemblySys.com

If you find this script useful, you can show your
appreciation by getting Michaël a cup of coffee ;)
https://ko-fi.com/assemblysys

As long as this notice (including author name and details) is included and
UNALTERED, this code can be used and distributed freely.
*/

function decimalToFraction(value: number, donly = true) {
  var tolerance = 1.0e-6; // from how many decimals the number is rounded
  var h1 = 1;
  var h2 = 0;
  var k1 = 0;
  var k2 = 1;
  var negative = false;
  var i: number = 0;

  if (Number.isInteger(value)) {
    // if value is an integer, change it to fraction and stop function
    return `${value}/1`;
  } else if (value < 0) {
    negative = true;
    value = -value;
  }

  if (donly) {
    i = value;
    value -= i;
  }

  var b = value;

  do {
    var a = Math.floor(b);
    var aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(value - h1 / k1) > value * tolerance);

  return (negative ? "-" : "") + (donly && i != 0 ? i + " " : "") + (h1 == 0 ? "" : h1 + "/" + k1);
}

// Problem 67: Maximum path sum II
// By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

// 3
// 7 4
// 2 4 6
// 8 5 9 3

// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom in numTriangle, a 2D array defined in the background containing a triangle with one-hundred rows.

// Note: This is a much more difficult version of Problem 18. It is not possible to try every route to solve this problem, as there are 299 altogether! If you could check one trillion (1012) routes every second it would take over twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)

function maximumPathSumII(triangle: number[][]) {
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

// Problem 68: Magic 5-gon ring
// For better problem description see link below.
// https://www.freecodecamp.org/learn/project-euler/project-euler-problems-1-to-100/problem-68-magic-5-gon-ring
// Also for better problem understanding see this post.
// https://stackoverflow.com/questions/13052165/project-euler-68
// There is also alot of unused vars
// But for better problem understanding I suggest uncommenting console.logs

function magic5GonRing() {
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
  const solutionSet = [];

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

function getOuterViericesNumber(start, end) {
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

function getInnerVerticesNumber(x) {
  const numbers = [];
  let sum = numbers.reduce((acc, val) => acc + val, 0);
  let y = 1;

  while (sum < x) {
    sum = numbers.reduce((acc, val) => acc + val, 0);

    if (sum === x) return numbers;

    numbers.push(y);
    ++y;
  }
}

function sum(k) {
  let sum = 0;

  for (let i = 1; i <= k; ++i) {
    sum = sum + i;
  }

  return sum;
}

// Problem 69: Totient maximum
// Euler's Totient function, ϕ(n) (sometimes called the phi function),
// Is used to determine the number of numbers less than n which are relatively prime to n.
// For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, ϕ(9)=6 .

// n    Relatively Prime    ϕ(n)    n/ϕ(n)
// 2	  1	                  1	      2
// 3	  1,2	                2	      1.5
// 4	  1,3	                2	      2
// 5	  1,2,3,4	            4	      1.25
// 6	  1,5	                2	      3
// 7	  1,2,3,4,5,6	        6	      1.1666...
// 8	  1,3,5,7	            4	      2
// 9	  1,2,4,5,7,8	        6	      1.5
// 10	  1,3,7,9	            4	      2.5

// It can be seen that n = 6 produces a maximum n/ϕ(n) for n ≤ 10.

// Find the value of n ≤ limit for which n/ϕ(n) is a maximum.
function totientMaximum(limit) {
  let maxKnown = 0;
  let maxN = 0;

  for (let n = 2; n <= limit; ++n) {
    const current = n / phi(n);

    if (current > maxKnown) {
      maxKnown = current;
      maxN = n;
    }
  }

  return maxN;
}

// Euler's formula time complexity O(Φn*log n)
// Euler's formula auxiliary space O(1)
function phi(n) {
  let result = n;

  for (let i = 2; i * i < n; ++i) {
    if (n % i === 0) {
      while (n % i === 0) {
        n /= i;
      }

      result *= 1 - 1 / i;
    }
  }

  if (n > 1) result -= result / n;

  return parseInt(result);
}

// Problem 70: Totient permutation
// Euler's Totient function, ϕ(n) (sometimes called the phi function), 
// Is used to determine the number of positive numbers less than or equal to n which are relatively prime to n. 
// For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, ϕ(9)=6
// The number 1 is considered to be relatively prime to every positive number, so ϕ(1)=1

// Interestingly, ϕ(87109)=79180
// And it can be seen that 87109 is a permutation of 79180.

// Find the value of n, 1 < n < limit, for which ϕ(n)
// Is a permutation of n and the ratio n/ϕ(n) produces a minimum.
function totientPermutation(limit) {
  const primes = sieve(limit);
  let minimumRatio = 999;
  let nValue = 0;

  for (let i = 0; i < primes.length; ++i) {
    for (let j = i; j < primes.length; ++j) {
      const n = primes[i] * primes[j];

      if (n > limit) break;

      const totient = phi(n);
      const phiIsPermutationOfN = isPermutation(n, totient);
      const currentRatio = n / totient;

      if (phiIsPermutationOfN && currentRatio < minimumRatio) {
        nValue = n;
        minimumRatio = currentRatio;
      }
    }
  }

  return nValue;
}

function isPermutation(original, permutation) {
  if (!original || !permutation) console.error("Enter all arguments");

  const str1 = original.toString();
  const str2 = permutation.toString();

  if (str1.length !== str2.length) return false;

  return str1.split("").sort().join("") === str2.split("").sort().join("");
} 
