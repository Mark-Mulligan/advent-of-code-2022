import fs from 'fs';

const result = fs.readFileSync('day2/data.text', { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

// A = Rock, B = paper, C = scissors
// x = rock, Y = paper, z = scissors
// x = lose, y = draw, z = win

/* 
 Scores
 Rock = 1, Paper = 2, Scissors = 3
 lost = 0, draw = 3, win = 6
*/

const sampleInput = ['A Y', 'B X', 'C Z'];

const getTicTacToeResult = (opponent: string, result: string) => {
  const converter: any = { A: 'rock', B: 'paper', C: 'scissors' };
  const winningHands: any = { rock: 'paper', paper: 'scissors', scissors: 'rock' };
  const losingHands: any = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  const handScore: any = { rock: 1, paper: 2, scissors: 3 };
  const opponentHand = converter[opponent];
  let playerHand = '';
  let matchScore = 0;

  // lose
  if (result === 'X') {
    matchScore = 0;
    playerHand = losingHands[opponentHand];
    // win
  } else if (result === 'Z') {
    matchScore = 6;
    playerHand = winningHands[opponentHand];
    // tie
  } else {
    matchScore = 3;
    playerHand = opponentHand;
  }

  return matchScore + handScore[playerHand];
};

let total = 0;
lines.forEach((input) => {
  let [opponent, player] = input.split(' ');
  total += getTicTacToeResult(opponent, player);
});

console.log(total);
