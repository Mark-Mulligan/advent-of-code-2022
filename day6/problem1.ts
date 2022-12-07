import fs from 'fs';
import path from 'path';

const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });

const input = [
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];
const arrayWithoutDuplicates = (inputArr: string[]) => {
  const inputSet = new Set(inputArr);
  return inputSet.size === inputArr.length;
};

const firstSetOfFourUnique = (input: string) => {
  for (let i = 0; i < input.length - 4; i++) {
    let currentSequence: string[] = [];
    let currentIndex = i;
    for (let j = 0; j < 4; j++) {
      currentSequence.push(input[i + j]);
      currentIndex = i + j;
    }

    if (arrayWithoutDuplicates(currentSequence)) {
      return currentIndex + 1;
    }
  }
};

console.log(firstSetOfFourUnique(result));
