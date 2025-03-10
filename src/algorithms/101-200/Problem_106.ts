// Problem 106: Special subset sums: meta-testing
// Let  S(A)
//   represent the sum of elements in set A of size n. We shall call it a special sum set if for any two non-empty disjoint subsets, B and C, the following properties are true:

// S(B)≠S(C)
//  ; that is, sums of subsets cannot be equal.
// If B contains more elements than C then  S(B)>S(C)
//  .
// For this problem we shall assume that a given set contains n strictly increasing elements and it already satisfies the second rule.

// Surprisingly, out of the 25 possible subset pairs that can be obtained from a set for which n = 4, only 1 of these pairs need to be tested for equality (first rule). Similarly, when n = 7, only 70 out of the 966 subset pairs need to be tested.

// For n = 12, how many of the 261625 subset pairs that can be obtained need to be tested for equality?

// 613, 923, 1078, 1156, 1195, 1215, 1226, 1233, 1234, 1235, 1237, 1240

// UNSOLVED
// I can get right anwsers for n = 4,7 but don't know how to get to the right anwser for n = 12
// Mabye Im too stupid for this right now
function subsetSumsMetaTesting() {
  const optimumSet = new Set([20, 31, 38, 39, 40, 42, 45]);
  const set = Array.from(optimumSet);
  const setOfSubsets = createSetOfSubsets(set);
  const seen = new Map()
  let counter = 0
  
  console.log(optimumSet.size)
  for (let i = 0; i < setOfSubsets.length; ++i) {
    const [subsetB, subsetC] = setOfSubsets[i]
    const x = subsetB.size
    const y = subsetC.size

    if (x > y || y - x > 1) continue

    const sb = Array.from(subsetB)
    const sc = Array.from(subsetC)

    if (seen.has(sc.join(""))) continue

    const toTest = needToBeTested(sb, sc)

    if (toTest) counter += x + y

    seen.set(sb.join(""), true)
  }

  return true;
}

function needToBeTested(sb, sc) {
  return sb.some((s, idx) => s > sc[idx])
}


function createSetOfSubsets(set) {
  const subsets = [[]];
  const subsetsC = [];
  const pairs = [];

  for (const element of set) {
    const newSubsets = subsets.map((subset) => subset.concat(element));
    subsets.push(...newSubsets);
  }

  for (const subsetB of subsets) {
    const c = set.filter((number) => !subsetB.includes(number));
    subsetsC.push(c);
  }

  for (let i = 0; i < subsets.length; ++i) {
    const subsetB = subsets[i];
    const subsetC = subsetsC[i]

    if (!subsetB.length && !subsetsC[i].length) continue;
    if (JSON.stringify(subsetB) > JSON.stringify(subsetC)) continue

    const pair = [new Set(subsetB), new Set(subsetC)];

    pairs.push(pair);
  }

  return pairs.sort((a,b) => b[0].size - a[0].size);
}

function isSpecial(setOfSubsets, set, depth) {
  let specialSet = new Set();
  const divideEvenly = Number.isInteger(set.length / 2);
  const mid = Math.ceil(set.length / 2);
  const idx = divideEvenly ? mid + 1 : mid;

  for (let i = 0; i < setOfSubsets.length; ++i) {
    const [subsetB, subsetC] = setOfSubsets[i];

    specialSet.add(setSum(subsetB)).add(setSum(subsetC));
  }

  if (specialSet.size !== 2 ** depth - 2) return false;

  for (let i = 2; i <= idx; ++i) {
    const y = i !== idx ? 1 : !divideEvenly ? 1 : 2;
    const subsetB = set.slice(0, i).reduce((a, b) => a + b);
    const subsetC = set.slice(-i + y).reduce((a, b) => a + b);

    if (subsetB < subsetC) return false;
  }

  return true;
}


function setSum(set) {
  let sum = 0;

  const iterator = set.entries();

  for (const entry of iterator) {
    sum += entry[0];
  }

  return sum;
}
