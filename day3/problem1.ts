import fs from 'fs';

const result = fs.readFileSync('day3/data.text', { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

const testInput = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

const findSimilarLetter = (string1: string, string2: string) => {
  let foundLetter = '';
  for (let i = 0; i < string1.length; i++) {
    if (string2.includes(string1[i])) {
      foundLetter = string1[i];
    }
  }

  return foundLetter;
};

const priorityList = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const foundLetters: string[] = [];

lines.forEach((item) => {
  const firstHalf = item.slice(0, item.length / 2);
  const secondHalf = item.slice(item.length / 2);

  foundLetters.push(findSimilarLetter(firstHalf, secondHalf));
});

const priorities: number[] = [];

foundLetters.forEach((letter) => {
  priorities.push(priorityList.indexOf(letter));
});

const total = priorities.reduce((a, b) => a + b);

console.log(foundLetters);
console.log(priorities);
console.log(total);
