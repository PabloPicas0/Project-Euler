// Problem 104: Pandigital Fibonacci ends
// The Fibonacci sequence is defined by the recurrence relation:

// F_n=F_n−1+F_n−2 where F_1=1 and F_2=1

// It turns out that F_541 which contains 113 digits, 
// is the first Fibonacci number for which the last nine digits are 1 - 9 pandigital (contain all the digits 1 to 9, but not necessarily in order). 
// And F_2749 which contains 575 digits, is the first Fibonacci number for which the first nine digits are 1 - 9 pandigital.

// Given that F_k is the first Fibonacci number for which the first nine digits AND the last nine digits are 1 - 9 pandigital, find k.

// Problem solved but not 100% by myself
// Sources that helped:
// https://stackoverflow.com/questions/36506605/project-euler-104-need-help-in-understanding-the-solution
// https://en.wikipedia.org/wiki/Golden_ratio#Relationship_to_Fibonacci_and_Lucas_numbers 
function pandigitalFibonacciEnds() {
  const toCompare = "123456789"
  const den = Math.sqrt(5)
  let k = 3
  let a = 1
  let b = 1

  while(true) {
    const next = a + b
    a = b
    b = next % 1000000000

    const lastDigits = b.toString() 

    if (isPandigital(lastDigits, toCompare)) {
      const firstDigits = Math.round(truncPow((1 + den) / 2, k) / den)
      .toString().slice(0,9)

      if (isPandigital(firstDigits, toCompare)) {
        return k
      }
    }

    k += 1
  }
}

function truncPow(x: number, n: number) {
  let res = 1

  for (let i = 0; i < n; ++i) {
    res *= x
    if (res > 1E20) res *= 1E-10
  }

  return res
}

function isPandigital(str: string, toCompare: string) {
  return str.split("").sort().join("") === toCompare
}
