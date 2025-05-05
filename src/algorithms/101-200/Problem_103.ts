// Problem 103: Special subset sums: optimum
// Let S(A) represent the sum of elements in set A of size n. 
// We shall call it a special sum set if for any two non-empty disjoint subsets, B and C, the following properties are true:

// S(B) ≠ S(C)
// that is, sums of subsets cannot be equal.
// If B contains more elements than C then S(B) > S(C)
// If S(A) is minimised for a given n, we shall call it an optimum special sum set. The first five optimum special sum sets are given below.

// n=1:{1}
// n=2:{1,2}
// n=3:{2,3,4}
// n=4:{3,5,6,7}
// n=5:{6,9,11,12,13}

// It seems that for a given optimum set, A={a1,a2,…,a_n}
// the next optimum set is of the form B={b,a1+b,a2+b,…,a_n+b}
// where b is the "middle" element on the previous row.

// By applying this "rule" we would expect the optimum set for n=6
// to be A={11,17,20,22,23,24} with S(A)=117
// However, this is not the optimum set, as we have merely applied an algorithm to provide a near optimum set. 
// The optimum set for n=6 is A={11,18,19,20,22,25} with S(A)=115 and corresponding set string: 111819202225.

// Given that A is an optimum special sum set for n=7 find its set string.

// Note: This problem is related to Problem 105 and Problem 106.

// This problem was very hard especially because I missed the part about "if for ANY two non-empty disjoint subsets"
// Code solution is 100% mine I wasn't intrested in code from link below even if it was provided
// In detail explanation on how to think about the problem is more than enough
// Here it is a really in detail resource that helped me understand the thought process for this problem and complete it:
// https://bartriordan.wordpress.com/2014/04/16/project-euler-problem-103-solution/
// Special THANKS for so good thought insight
// To check if the algorithm works just use special set from n = 5 to see if n = 6 near perfect set was corrected
// Fun fact: "rule" described in the problem produces optimum special sum set for n = 7

function optimumSpecialSumSet() {
  const optimumSet = new Set([11, 18, 19, 20, 22, 25]);
  const nextPossibleOptimumSet = createNextNearPerfectSet(optimumSet);
  const newOptimum = search(nextPossibleOptimumSet, 0, setSum(nextPossibleOptimumSet));

  if (!newOptimum.length) return [...nextPossibleOptimumSet].toString().replace(/,/g, "");

  return newOptimum.toString().replace(/,/g, "");
}

function search(optimumSet: Set<number>, depth: number, nearOptimumSum: number): number[] {
  if (depth === optimumSet.size) {
    if (setSum(optimumSet) >= nearOptimumSum) return [];

    const set = Array.from(optimumSet);
    const setOfSubsets = createSetOfSubsets(set);
    let specialSet = isSpecial(setOfSubsets, set, depth);

    if (!specialSet) return [];

    return set;
  } else {
    const set = Array.from(optimumSet);
    let currentValue = set[depth];

    for (let i = -2; i <= 2; ++i) {
      const possibleValue = currentValue + i;
      const possibleOptimalSet = [...set];

      possibleOptimalSet.splice(depth, 1, possibleValue);

      const nextSet = new Set(possibleOptimalSet);

      if (nextSet.size < set.length) continue;

      const found = search(new Set(possibleOptimalSet), depth + 1, nearOptimumSum);

      if (found.length) return found;
    }

    return [];
  }
}

function createSetOfSubsets(set: number[]) {
  const subsets: number[][] = [[]];
  const subsetsC: number[][] = [];
  const pairs: Set<number>[][] = [];

  for (const element of set) {
    const newSubsets = subsets.map((subset) => subset.concat(element));
    subsets.push(...newSubsets);
  }

  for (const subsetB of subsets) {
    const c = set.filter((number) => !subsetB.includes(number));
    subsetsC.push(c);
  }

  for (let i = 0; i < subsets.length; ++i) {
    const subsetsB = subsets[i];

    if (!subsetsB.length || !subsetsC[i].length) continue;

    const pair = [new Set(subsetsB), new Set(subsetsC[i])];

    pairs.push(pair);
  }

  return pairs;
}

function isSpecial(setOfSubsets: Set<number>[][], set: number[], depth: number) {
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

function setSum(set: Set<number>) {
  let sum = 0;

  const iterator = set.entries();

  for (const entry of iterator) {
    sum += entry[0];
  }

  return sum;
}

function createNextNearPerfectSet(prevSet: Set<number>) {
  const next = new Set<number>();
  const prev = Array.from(prevSet);
  const mid = Math.ceil((prev.length - 1) / 2);
  const midVal = prev[mid];

  next.add(midVal);

  for (let i = 0; i < prev.length; ++i) {
    const nextVal = prev[i] + midVal;
    next.add(nextVal);
  }

  return next;
}
