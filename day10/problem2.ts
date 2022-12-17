import fs from 'fs';
import path from 'path';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

let x = 1;
let cycle = 0;
let total = 0;
let picture = '';

const drawPicture = (cycle: number, x: number) => {
  if (cycle < 40) {
    return cycle >= x - 1 && cycle <= x + 1 ? '#' : '.';
  } else {
    const newCycle = cycle % 40;
    return newCycle >= x - 1 && newCycle <= x + 1 ? '#' : '.';
  }
};

lines.forEach((line) => {
  if (line === 'noop') {
    picture += drawPicture(cycle, x);
    cycle += 1;
  } else if (line.includes('addx')) {
    const numToAdd = Number(line.split(' ')[1]);

    picture += drawPicture(cycle, x);
    cycle += 1;

    picture += drawPicture(cycle, x);
    cycle += 1;

    x += numToAdd;
  }
});

const pictureArray: string[][] = [];

for (let i = 0; i < 240; i += 40) {
  let tempArr: string[] = [];
  for (let j = 0; j < 40; j++) {
    tempArr.push(picture[j + i]);
  }

  pictureArray.push(tempArr);
}

pictureArray.forEach((line) => {
  console.log(line.join(''));
});
