import fs from 'fs';
import path from 'path';

// const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

const getAboveScore = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  let score = 0;

  if (row === 0) return score;

  for (let i = row - 1; i >= 0; i--) {
    if (lines[i][col] >= targetTreeHeight) {
      score++;
      break;
    } else {
      score++;
    }
  }
  return score;
};

const getLeftScore = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  let score = 0;

  if (col === 0) return score;

  for (let i = col - 1; i >= 0; i--) {
    if (lines[row][i] >= targetTreeHeight) {
      score++;
      break;
    } else {
      score++;
    }
  }
  return score;
};

const getBelowScore = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  let score = 0;

  if (row === lines.length - 1) return score;
  for (let i = row + 1; i < lines.length; i++) {
    if (lines[i][col] >= targetTreeHeight) {
      score++;
      break;
    } else {
      score++;
    }
  }
  return score;
};

const getRightScore = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  let score = 0;

  if (col === lines[row].length - 1) return score;
  for (let i = col + 1; i < lines.length; i++) {
    if (lines[row][i] >= targetTreeHeight) {
      score++;
      break;
    } else {
      score++;
    }
  }
  return score;
};

const iterateOverInterior = () => {
  let highestScore = 0;

  for (let row = 1; row < lines.length - 1; row++) {
    for (let col = 1; col < lines[row].length - 1; col++) {
      let aboveScore = getAboveScore(row, col);
      let belowScore = getBelowScore(row, col);
      let leftScore = getLeftScore(row, col);
      let rightScore = getRightScore(row, col);

      const totalScore = aboveScore * belowScore * leftScore * rightScore;
      if (totalScore > highestScore) {
        highestScore = totalScore;
      }
    }
  }

  return highestScore;
};

let scenicScore = iterateOverInterior();
console.log(scenicScore);
