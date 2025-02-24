// Problem 79: Passcode derivation
// A common security method used for online banking is to ask the user for three random characters from a passcode.
// For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

// The arrays, keylog1, keylog2, and keylog3, contains fifty successful login attempts.

// Given that the three characters are always asked for in order, analyze the array so as to determine the shortest possible secret passcode of unknown length.

// TODO: Get keylog 2 and 1 for test cases
const keylog3 = [
  319, 680, 180, 690, 129, 620, 762, 689, 762, 318, 368, 710, 720, 710, 629, 168, 160, 689, 716, 731, 736,
  729, 316, 729, 729, 710, 769, 290, 719, 680, 318, 389, 162, 289, 162, 718, 729, 319, 790, 680, 890, 362,
  319, 760, 316, 729, 380, 319, 728, 716,
];

export function passcodeDerivation(arr: number[]) {
  const digits = getPassCodesDigits(arr);
  const passOrder = createPassOrder(digits);
  const pass = [];

  for (let i = 0; i < arr.length; ++i) {
    const [a, b, c] = arr[i].toString().split("");

    passOrder[`${a} is before`].push(b, c);
    passOrder[`${b} is before`].push(c);
  }

  for (let i = 0; i < digits.length; ++i) {
    const digit = digits[i];
    const cleanDigitSequence = Array.from(new Set(passOrder[`${digit} is before`])).sort();

    passOrder[`${digit} is before`] = cleanDigitSequence;
  }

  for (let i = 0; i < digits.length; ++i) {
    const d = digits[i];
    const passLength = passOrder[`${d} is before`].length;

    pass.push([d, passLength]);
  }

  pass.sort((a, b) => (a[1] > b[1] ? -1 : 0));

  const decryptedPassword = pass.map((pas) => pas[0]).join("");

  return Number(decryptedPassword);
}

function createPassOrder(digits: string[]) {
  const passOrder: { [key: string]: string[] } = {};

  for (let i = 0; i < digits.length; ++i) {
    const digit = digits[i];

    passOrder[`${digit} is before`] = [];
  }

  return passOrder;
}

function getPassCodesDigits(arr: number[]) {
  let digits = [];

  for (let i = 0; i < arr.length; ++i) {
    const dig = arr[i].toString().split("");

    for (let j = 0; j < dig.length; ++j) {
      digits.push(dig[j]);
    }
  }

  return Array.from(new Set(digits)).sort();
}

