// Problem 119: Digit power sum
// The number 512 is interesting because it is equal to the sum of its digits raised to some power:  5+1+2=8 and  8^3=512
// Another example of a number with this property is  614656=28^4

// We shall define  a_n to be the  n−th term of this sequence and insist that a number must contain at least two digits to have a sum.

// You are given that  a_2=512 and  a_10=614656

// Find  a_30

function digitPowerSum() {
  let exponent = 2;
  let found: number[] = [];

  while (exponent < 9) {
    for (let base = 2; base < 100; ++base) {
      const current = base ** exponent;
      const digitsSum = current
        .toString()
        .split("")
        .reduce((acc, val) => acc + Number(val), 0);

      if (digitsSum < base || digitsSum > base) continue;


      found.push(current);
    }

    ++exponent;
  }

  const last = found.length - 1;
  return found[last];
}
