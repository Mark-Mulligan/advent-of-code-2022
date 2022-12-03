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

const groups: string[][] = [];

for (let i = 0; i < lines.length; i += 3) {
  let tempArr: string[] = [];
  for (let j = 0; j < 3; j++) {
    tempArr.push(lines[i + j]);
  }

  groups.push(tempArr);
}

const badges: string[] = [];

groups.forEach((group) => {
  let firstElf = group[0];

  for (let i = 0; i < firstElf.length; i++) {
    let currentBadge = firstElf[i];

    if (group[1].includes(currentBadge) && group[2].includes(currentBadge)) {
      badges.push(currentBadge);
      break;
    }
  }
});

const priorityList = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const priorities: number[] = [];

badges.forEach((badge) => {
  priorities.push(priorityList.indexOf(badge));
});

const total = priorities.reduce((a, b) => a + b);

console.log(groups);
console.log(badges);
console.log(total);
