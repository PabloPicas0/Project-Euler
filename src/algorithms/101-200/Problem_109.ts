// Problem 109: Darts
// In the game of darts a player throws three darts at a target board which is split into twenty equal sized sections numbered one to twenty.

// Darts board
// The score of a dart is determined by the number of the region that the dart lands in.
// A dart landing outside the red/green outer ring scores zero.
// The black and cream regions inside this ring represent single scores.
// However, the red/green outer ring and middle ring score double and treble scores respectively.

// At the center of the board are two concentric circles called the bull region, or bulls-eye.
// The outer bull is worth 25 points and the inner bull is a double, worth 50 points.

// There are many variations of rules but in the most popular game the players will begin with a score of 301 or 501
// and the first player to reduce their running total to zero is a winner.
// However, it is normal to play a "doubles out" system,
// which means that the player must land a double (including the double bulls-eye at the center of the board) on their final dart to win;
// any other dart that would reduce their running total to one or lower means the score for that set of three darts is "bust".

// When a player is able to finish on their current score it is called a "checkout"
// and the highest checkout is 170: T20 T20 D25 (two treble 20s and double bull).
// There are exactly eleven distinct ways to checkout on a score of 6:

// D3D1S2D2S4S1S1S1D1D1S2D2D2D1D1S1T1S3D1S2S2D2D1D1D1D1D1

// Note that D1 D2 is considered different from D2 D1 as they finish on different doubles.
// However, the combination S1 T1 D1 is considered the same as T1 S1 D1.
// In addition, we shall not include misses in considering combinations;
//  for example, D3 is the same as 0 D3 and 0 0 D3.
// Incredibly there are 42336 distinct ways of checking out in total. How many distinct ways can a player checkout with a score less than 100?

// S = single
// D = duble
// T = treble

function darts() {
  const scores = createDartScores();
  let sum = 0;

  for (let i = 2; i < 100; ++i) {
    const ways = [];
    findWays(scores, 0, [], ways, i);

    sum += ways.length;
  }

  return sum;
}

function findWays(scores, depth, currentWay, ways, targetScore) {
  if (depth === 3) {
    const currentScore = currentWay[0][1] + currentWay[1][1] + currentWay[2][1];

    if (currentScore === targetScore) {
      const currScore = [currentWay[0][0], currentWay[1][0], currentWay[2][0]];

      if (!isValid(ways, currScore, depth)) return;

      ways.push(currScore);
      return;
    }
  } else {
    for (let i = 0; i < scores.length; ++i) {
      const currentScore = scores[i];

      if (depth === 1 && currentWay[0][1] === targetScore) {
        const currScore = [currentWay[0][0]];

        if (!isValid(ways, currScore, depth)) return;

        ways.push(currScore);
        return;
      }

      if (depth === 2 && currentWay[0][1] + currentWay[1][1] === targetScore) {
        const currScore = [currentWay[0][0], currentWay[1][0]];

        if (!isValid(ways, currScore, depth)) return;

        ways.push(currScore);
        return;
      }

      findWays(scores, depth + 1, [...currentWay, currentScore], ways, targetScore);
    }
  }
}

function isValid(ways, currentWay, depth) {
  const isLastDuble = currentWay[depth - 1].includes("D");

  if (!isLastDuble) return false;
  if (depth < 3) return true;

  const end = depth - 1;
  const currWay = currentWay.slice(0, end).sort().join("");

  // This have to be negation if true
  // So I can negate this on call
  const isDuplicate = !ways.some(
    (way) => way[end] === currentWay[end] && way.slice(0, end).sort().join("") === currWay
  );

  return isDuplicate;
}

function createDartScores() {
  const scores = [];

  for (let i = 1; i <= 20; ++i) {
    scores.push([`S${i}`, i], [`D${i}`, i * 2], [`T${i}`, i * 3]);
  }

  scores.push(["S25", 25], ["D25", 25 * 2]);

  return scores;
}
