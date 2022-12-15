import fs from 'fs';
import path from 'path';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

// const lines = ['L 2', 'D 2', 'R 2', 'U 1', 'L 1'];

const moveHead = () => {
  let currentHeadPoint: [number, number] = [0, 0];
  let currentTailPoint: [number, number] = [0, 0];
  const headTraveled: number[][] = [];
  const tailTraveled: number[][] = [currentTailPoint];

  lines.forEach((line) => {
    const direction = line.split(' ')[0];
    const distance = Number(line.split(' ')[1]);

    for (let i = 1; i <= distance; i++) {
      const [row, col] = currentHeadPoint;

      if (direction === 'R') currentHeadPoint = [row, col + 1];
      if (direction === 'L') currentHeadPoint = [row, col - 1];
      if (direction === 'U') currentHeadPoint = [row + 1, col];
      if (direction === 'D') currentHeadPoint = [row - 1, col];

      headTraveled.push(currentHeadPoint);
      let previousTailPoint = currentTailPoint;
      currentTailPoint = moveTail(currentHeadPoint, currentTailPoint);

      if (previousTailPoint[0] !== currentTailPoint[0] || previousTailPoint[1] !== currentTailPoint[1]) {
        tailTraveled.push(currentTailPoint);
      }
    }
  });

  return { headTraveled, tailTraveled };
};

const moveTail = (headPoint: [number, number], tailPoint: [number, number]): [number, number] => {
  const [headRow, headCol] = headPoint;
  const [tailRow, tailCol] = tailPoint;

  if (headCol === tailCol && Math.abs(headRow - tailRow) > 1) {
    const rowDifference = (headRow - tailRow) / 2;
    return [tailRow + rowDifference, tailCol];
  }

  if (headRow === tailRow && Math.abs(headCol - tailCol) > 1) {
    const colDifference = (headCol - tailCol) / 2;
    return [tailRow, tailCol + colDifference];
  }

  if (headRow === tailRow + 2 && headCol === tailCol + 1) {
    return [tailRow + 1, tailCol + 1];
  }

  if (headRow === tailRow + 2 && headCol === tailCol - 1) {
    return [tailRow + 1, tailCol - 1];
  }

  if (headRow === tailRow - 2 && headCol === tailCol + 1) {
    return [tailRow - 1, tailCol + 1];
  }

  if (headRow === tailRow - 2 && headCol === tailCol - 1) {
    return [tailRow - 1, tailCol - 1];
  }

  if (headRow === tailRow + 1 && headCol === tailCol + 2) {
    return [tailRow + 1, tailCol + 1];
  }

  if (headRow === tailRow + 1 && headCol === tailCol - 2) {
    return [tailRow + 1, tailCol - 1];
  }

  if (headRow === tailRow - 1 && headCol === tailCol + 2) {
    return [tailRow - 1, tailCol + 1];
  }

  if (headRow === tailRow - 1 && headCol === tailCol - 2) {
    return [tailRow - 1, tailCol - 1];
  }

  return [tailRow, tailCol];
};

const removeDuplicates = (inputArray: number[][]) => {
  const result: string[] = [];
  for (let i = 0; i < inputArray.length; i++) {
    const stringifiedCords = `${inputArray[i][0]}-${inputArray[i][1]}`;

    if (!result.includes(stringifiedCords)) {
      result.push(stringifiedCords);
    }
  }

  return result;
};

const { headTraveled, tailTraveled } = moveHead();
const cords = removeDuplicates(tailTraveled);
console.log(headTraveled);
console.log(tailTraveled);
console.log(cords.length);
