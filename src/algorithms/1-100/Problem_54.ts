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

// The global array (handsArr) passed to the export function, contains one-thousand random hands dealt to two players. Each line of the file contains ten cards (separated by a single space): the first five are Player 1's cards and the last five are Player 2's cards. You can assume that all hands are valid (no invalid characters or repeated cards), each player's hand is in no specific order, and in each hand there is a clear winner.

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

  return { rank: 8, ...handInfo };
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

