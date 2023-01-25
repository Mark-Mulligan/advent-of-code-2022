import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

const formatInputData = () => {
  const operationChunks: string[] = [];
  let currentChunk = '';

  lines.forEach((line) => {
    currentChunk += line;

    if (line === '') {
      operationChunks.push(currentChunk);
      currentChunk = '';
    }
  });

  operationChunks.push(currentChunk);

  return operationChunks;
};

const createMonkey = (input: string) => {
  let result = input.split('  ');
  let monkeyName = result[0].slice(0, result[0].length - 1);
  let monkeyInfo: any = { inspectionCount: 0 };

  result.forEach((line) => {
    if (line.includes('Starting items')) {
      const items = line.split(':')[1];
      let formattedItems = items.trim().split(',');
      monkeyInfo.startingItems = formattedItems.map((item) => Number(item.trim()));
    } else if (line.includes('Operation')) {
      const operation = line.split(':')[1];
      monkeyInfo.operation = operation.trim();
    } else if (line.includes('Test')) {
      const test = line.split(':')[1];
      monkeyInfo.test = test.trim();
    } else if (line.includes('If true')) {
      const ifTrue = line.split(':')[1];
      monkeyInfo.ifTrue = ifTrue.trim();
    } else if (line.includes('If false')) {
      const ifFalse = line.split(':')[1];
      monkeyInfo.ifFalse = ifFalse.trim();
    }
  });

  return { monkeyInfo, monkeyName };
};

let inputData = formatInputData();
const monkeyCollection: any = {};

inputData.forEach((data) => {
  const { monkeyInfo, monkeyName } = createMonkey(data);
  monkeyCollection[monkeyName] = monkeyInfo;
});

const doOperation = (oldValue: number, operation: string) => {
  let rightHandSide = operation.split('=')[1].trim();
  let stringOperation = rightHandSide.replaceAll('old', oldValue.toString());
  let [num1, op, num2] = stringOperation.split(' ');

  if (op === '+') return Number(num1) + Number(num2);
  else if (op === '*') return Number(num1) * Number(num2);
  return Number(num1) + Number(num2);
};

const doTest = (worryLevel: number, test: string) => {
  let divider = Number(test.split(' ')[2]);
  return worryLevel % divider === 0;
};

const getMonkeyToThrow = (statement: string) => {
  let monkeyNum = statement.split(' ')[3];
  return `Monkey ${monkeyNum}`;
};

const round = () => {
  Object.keys(monkeyCollection).forEach((monkey) => {
    const { startingItems, operation, test, ifTrue, ifFalse } = monkeyCollection[monkey];

    while (startingItems.length > 0) {
      let currentItem = startingItems.shift();
      monkeyCollection[monkey].inspectionCount += 1;
      let value = doOperation(currentItem, operation);
      let worryLevel = Math.floor(value / 3);
      let testResult = doTest(worryLevel, test);
      let targetMonkey = getMonkeyToThrow(testResult ? ifTrue : ifFalse);
      monkeyCollection[targetMonkey].startingItems.push(worryLevel);
    }
  });
};

for (let i = 0; i < 20; i++) {
  round();
}

const inspectionCounts = Object.keys(monkeyCollection)
  .map((monkey) => {
    return monkeyCollection[monkey].inspectionCount;
  })
  .sort((a, b) => a - b)
  .reverse();

console.log(inspectionCounts[0] * inspectionCounts[1]);

// console.log(sortedMonkeyCollection);
