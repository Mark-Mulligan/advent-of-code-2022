import fs from 'fs';
import path from 'path';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

// const lines = ['noop', 'addx 3', 'addx -5'];

let x = 1;
let cycle = 0;
let total = 0;

lines.forEach((line) => {
  if (line === 'noop') {
    cycle += 1;

    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      total += cycle * x;
    }
  } else if (line.includes('addx')) {
    const numToAdd = Number(line.split(' ')[1]);

    cycle += 1;
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      total += cycle * x;
    }

    cycle += 1;
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      total += cycle * x;
    }

    x += numToAdd;
  }
});

if (cycle === 20 || (cycle - 20) % 40 === 0) {
  total += cycle * x;
}

console.log(total);
