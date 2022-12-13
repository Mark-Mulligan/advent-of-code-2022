import fs from 'fs';
import path from 'path';

// const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

const countPerimeterTrees = () => {
  let count = 0;
  lines.forEach((line, index) => {
    if (index === 0 || index === lines.length - 1) {
      count += line.length;
    } else {
      count += 2;
    }
  });
  return count;
};

const checkTreeVisibleAbove = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];

  for (let i = row - 1; i >= 0; i--) {
    if (lines[i][col] >= targetTreeHeight) {
      return false;
    }
  }
  return true;
};

const checkTreeVisibleLeft = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];

  for (let i = col - 1; i >= 0; i--) {
    if (lines[row][i] >= targetTreeHeight) {
      return false;
    }
  }
  return true;
};

const checkTreeVisibleBelow = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  for (let i = row + 1; i < lines.length; i++) {
    if (lines[i][col] >= targetTreeHeight) {
      return false;
    }
  }
  return true;
};

const checkTreeVisibleRight = (row: number, col: number) => {
  let targetTreeHeight = lines[row][col];
  for (let i = col + 1; i < lines.length; i++) {
    if (lines[row][i] >= targetTreeHeight) {
      return false;
    }
  }
  return true;
};

const iterateOverInterior = (count: number) => {
  for (let row = 1; row < lines.length - 1; row++) {
    for (let col = 1; col < lines[row].length - 1; col++) {
      let visibleAbove = checkTreeVisibleAbove(row, col);

      if (visibleAbove) {
        count++;
        continue;
      }

      let visibleBelow = checkTreeVisibleBelow(row, col);

      if (visibleBelow) {
        count++;
        continue;
      }

      let visibleLeft = checkTreeVisibleLeft(row, col);

      if (visibleLeft) {
        count++;
        continue;
      }

      let visibleRight = checkTreeVisibleRight(row, col);

      if (visibleRight) {
        count++;
        continue;
      }
    }
  }

  return count;
};

let trees = countPerimeterTrees();
trees = iterateOverInterior(trees);
console.log(trees);
