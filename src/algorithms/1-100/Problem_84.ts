// Problem 84: Monopoly odds
// In the game, Monopoly, the standard board is set up in the following way:

// GO	A1	CC1	A2	T1	R1	B1	CH1	B2	B3	JAIL
// H2	 	C1
// T2	 	U1
// H1	 	C2
// CH3	 	C3
// R4	 	R2
// G3	 	D1
// CC3	 	CC2
// G2	 	D2
// G1	 	D3
// G2J	F3	U2	F2	F1	R3	E3	E2	CH2	E1	FP

// A player starts on the GO square and adds the scores on two 6-sided dice to determine the number of squares they advance in a clockwise direction. Without any further rules we would expect to visit each square with equal probability: 2.5%. However, landing on G2J (Go To Jail), CC (community chest), and CH (chance) changes this distribution.

// In addition to G2J, and one card from each of CC and CH, that orders the player to go directly to jail, if a player rolls three consecutive doubles, they do not advance the result of their 3rd roll. Instead they proceed directly to jail.

// At the beginning of the game, the CC and CH cards are shuffled. When a player lands on CC or CH they take a card from the top of the respective pile and, after following the instructions, it is returned to the bottom of the pile. There are sixteen cards in each pile, but for the purpose of this problem we are only concerned with cards that order a movement; any instruction not concerned with movement will be ignored and the player will remain on the CC/CH square.

// Community Chest (2/16 cards):
// Advance to GO
// Go to JAIL
// Chance (10/16 cards):
// Advance to GO
// Go to JAIL
// Go to C1
// Go to E3
// Go to H2
// Go to R1
// Go to next R (railway company)
// Go to next R
// Go to next U (utility company)
// Go back 3 squares.
// The heart of this problem concerns the likelihood of visiting a particular square. That is, the probability of finishing at that square after a roll. For this reason it should be clear that, with the exception of G2J for which the probability of finishing on it is zero, the CH squares will have the lowest probabilities, as 5/8 request a movement to another square, and it is the final square that the player finishes at on each roll that we are interested in. We shall make no distinction between "Just Visiting" and being sent to JAIL, and we shall also ignore the rule about requiring a double to "get out of jail", assuming that they pay to get out on their next turn.

// By starting at GO and numbering the squares sequentially from 00 to 39 we can concatenate these two-digit numbers to produce strings that correspond with sets of squares.

// Statistically it can be shown that the three most popular squares, in order, are JAIL (6.24%) = Square 10, E3 (3.18%) = Square 24, and GO (3.09%) = Square 00. So these three most popular squares can be listed with the six-digit modal string 102400.

// If, instead of using two 6-sided dice, two n-sided dice are used, find the six-digit modal string.
type MonopolySquare = {
  name: string;
  id: string;
  visited: number;
  ratio: number;
};

export function monopolyOdds(n: number) {
  const squaresNames = [
    "GO",
    "A1",
    "CC1",
    "A2",
    "T1",
    "R1",
    "B1",
    "CH1",
    "B2",
    "B3",
    "JAIL",
    "C1",
    "U1",
    "C2",
    "C3",
    "R2",
    "D1",
    "CC2",
    "D2",
    "D3",
    "FP",
    "E1",
    "CH2",
    "E2",
    "E3",
    "R3",
    "F1",
    "F2",
    "U2",
    "F3",
    "G2J",
    "G1",
    "G2",
    "CC3",
    "G3",
    "R4",
    "CH3",
    "H1",
    "T2",
    "H2",
  ];
  const ccCards = shuffle(["GO", "JAIL", ...new Array(14)]);
  const chCards = shuffle([
    "GO",
    "JAIL",
    "C1",
    "E3",
    "H2",
    "R1",
    "NEXT R",
    "NEXT R",
    "NEXT U",
    "NEXT 3",
    ...new Array(6),
  ]);

  const rollsNumber = 500000;
  const squaresNum = squaresNames.length;
  const squares: MonopolySquare[] = [];
  let dublesRolls: number[] = [];
  let lastVisit = 0;

  for (let i = 0; i < squaresNames.length; ++i) {
    const id = i < 10 ? "0" + i : i.toString();
    const squareParams = {
      name: squaresNames[i],
      id: id,
      visited: 0,
      ratio: 0,
    };

    squares.push(squareParams);
  }

  for (let i = 0; i < rollsNumber; ++i) {
    const roll1 = roll(n);
    const roll2 = roll(n);
    const rollVal = roll1 + roll2;
    const isDuble = roll1 === roll2;
    const nextVisit = lastVisit + rollVal;

    if (isDuble) {
      dublesRolls.push(rollVal);
    } else {
      dublesRolls = [];
    }

    if (dublesRolls.length === 3) {
      lastVisit = findSquareIndex(squares, "JAIL");

      squares[lastVisit].visited += 1;

      dublesRolls = [];

      continue;
    }

    if (nextVisit >= squaresNum) {
      lastVisit = nextVisit - squaresNum;
    } else {
      lastVisit = nextVisit;
    }

    let visiting = squares[lastVisit];

    if (visiting.name === "G2J") {
      lastVisit = findSquareIndex(squares, "JAIL");

      squares[lastVisit].visited += 1;

      continue;
    }

    const isCommunityChest = visiting.name.replace(/\d/g, "") === "CC";
    const isChance = visiting.name.replace(/\d/g, "") === "CH";

    if (isCommunityChest) {
      const pickedCard = ccCards.pop();

      if (pickedCard) {
        lastVisit = findSquareIndex(squares, pickedCard);

        squares[lastVisit].visited += 1;

        ccCards.unshift(pickedCard);

        continue;
      }

      visiting.visited += 1;

      ccCards.unshift(pickedCard);

      continue;
    }

    if (isChance) {
      const pickedCard = chCards.pop();
      const hasNext = pickedCard?.split(" ")[0] === "NEXT";

      if (pickedCard && !hasNext) {
        lastVisit = findSquareIndex(squares, pickedCard);

        squares[lastVisit].visited += 1;

        chCards.unshift(pickedCard);

        continue;
      }

      if (pickedCard && hasNext) {
        const cardSymbol = pickedCard.split(" ")[1];
        const isNumber = /\d/g.test(cardSymbol);

        if (isNumber) {
          const goBack = lastVisit - 3;

          if (goBack < 0) {
            lastVisit = 40 - goBack;
          } else {
            lastVisit = goBack;
          }

          squares[lastVisit].visited += 1;

          chCards.unshift(pickedCard);

          continue;
        }

        lastVisit = findNextCompany(squares, lastVisit, cardSymbol);

        squares[lastVisit].visited += 1;

        chCards.unshift(pickedCard);

        continue;
      }

      chCards.unshift(pickedCard);
    }

    visiting.visited += 1;
  }

  squares.forEach((square) => {
    const { visited } = square;

    square.ratio = visited > 0 ? visited / rollsNumber : 0;
  });

  squares.sort((a, b) => a.ratio - b.ratio);

  // Convert float to percentage
  // squares.forEach((square) => {
  //   const { ratio } = square;

  //   square.ratio = ratio.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 });
  // });

  const modal = squares
    .slice(squaresNum - 3)
    .map((square) => square.id)
    .reverse()
    .join("");

  return modal;
}

function roll(n: number) {
  const possibleValue = getPossibleRolls(n);
  const idx = Math.floor(Math.random() * possibleValue.length);
  return possibleValue[idx];
}

function findNextCompany(squares: MonopolySquare[], currentSquare: number, companySymbol: string) {
  let i = currentSquare + 1;

  while (true) {
    const hasSymbol = squares[i].name.includes(companySymbol);

    if (hasSymbol) {
      return i;
    }

    if (i === 39) {
      i = 5;

      continue;
    }

    ++i;
  }
}

function findSquareIndex(squares: MonopolySquare[], name: string) {
  return squares.findIndex((square) => square.name === name);
}

function getPossibleRolls(n: number) {
  const rolls = [];

  for (let i = 1; i <= n; ++i) {
    rolls.push(i);
  }

  return rolls;
}

// Source:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: (string | undefined)[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

