import fs from 'fs';
import path from 'path';
import { runInThisContext } from 'vm';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData2.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);
// const lines = ['R 5', 'U 8', 'L 8'];

class Head {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveHead(direction: string) {
    if (direction === 'R') this.x = this.x + 1;
    if (direction === 'L') this.x = this.x - 1;
    if (direction === 'U') this.y = this.y + 1;
    if (direction === 'D') this.y = this.y - 1;
  }
}

class Tail {
  x: number;
  y: number;
  moveHistory: Set<string>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.moveHistory = new Set<string>().add(`${x},${y}`);
  }

  moveTail(head: Head | Tail) {
    if (Math.abs(head.x - this.x) === 2 && Math.abs(head.y - this.y) === 2) {
      this.x = this.x + (head.x - this.x) / 2;
      this.y = this.y + (head.y - this.y) / 2;
    } else if (head.x === this.x && Math.abs(head.y - this.y) > 1) {
      this.y = this.y + (head.y - this.y) / 2;
    } else if (head.y === this.y && Math.abs(head.x - this.x) > 1) {
      this.x = this.x + (head.x - this.x) / 2;
    } else if (Math.abs(head.y - this.y) > 1) {
      this.y = this.y + (head.y - this.y) / 2;
      this.x = this.x + Math.ceil(head.x - this.x);
    } else if (Math.abs(head.x - this.x) > 1) {
      this.y = this.y + Math.ceil(head.y - this.y);
      this.x = this.x + (head.x - this.x) / 2;
    }

    this.moveHistory.add(`${this.x},${this.y}`);

    // if (Math.abs(head.x - this.x) > 1 || Math.abs(head.y - this.y) > 1) {
    //   const xMove = Math.ceil((head.x - this.x) / 2);
    //   const yMove = Math.ceil((head.y - this.y) / 2);

    //   this.x = this.x + xMove;
    //   this.y = this.y + yMove;
    //   this.moveHistory.add(`${this.x},${this.y}`);
    // }
  }
}

const createGrid = () => {
  const result: string[][] = [];
  for (let i = 0; i < 28; i++) {
    result.push(Array(28).fill('+'));
  }

  return result;
};

const addGridPoint = (grid: string[][], x: number, y: number, point: string) => {
  const xCord = x + 14;
  const yCord = y + 14;

  if (grid[yCord][xCord] === '+') {
    grid[yCord][xCord] = point;
  }

  return grid;
};

const printGrid = (grid: string[][]) => {
  let result = '';

  for (let i = 0; i < grid.length; i++) {
    result += `${grid[i].join('')}\n`;
  }

  console.log(result);
};

const grid = createGrid();
addGridPoint(grid, 0, 0, 'H');
console.log(printGrid(grid));

const head = new Head(0, 0);
const tail1 = new Tail(0, 0);
const tail2 = new Tail(0, 0);
const tail3 = new Tail(0, 0);
const tail4 = new Tail(0, 0);
const tail5 = new Tail(0, 0);
const tail6 = new Tail(0, 0);
const tail7 = new Tail(0, 0);
const tail8 = new Tail(0, 0);
const tail9 = new Tail(0, 0);

lines.forEach((line: string) => {
  const direction = line.split(' ')[0];
  const distance = Number(line.split(' ')[1]);

  for (let i = 0; i < distance; i++) {
    head.moveHead(direction);
    tail1.moveTail(head);
    tail2.moveTail(tail1);
    tail3.moveTail(tail2);
    tail4.moveTail(tail3);
    tail5.moveTail(tail4);
    tail6.moveTail(tail5);
    tail7.moveTail(tail6);
    tail8.moveTail(tail7);
    tail9.moveTail(tail8);
  }
});

// correct answer: 2427

console.log(tail9.moveHistory.size);
