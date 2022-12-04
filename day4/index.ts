import fs from 'fs';

const result = fs.readFileSync('day4/data.text', { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

const testInput = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8', '3-7,2-8'];

const extractRange = (range: string) => {
  const [start, end] = range.split('-');
  return [Number(start), Number(end)];
};

let totalOverlappingGroups = 0;

lines.forEach((elfRanges) => {
  const [elfRange1, elfRange2] = elfRanges.split(',');

  const [firstGroupMin, firstGroupMax] = extractRange(elfRange1);
  const [secondGroupMin, secondGroupMax] = extractRange(elfRange2);

  if (secondGroupMin >= firstGroupMin && secondGroupMin <= firstGroupMax) {
    totalOverlappingGroups++;
  } else if (secondGroupMax <= firstGroupMax && secondGroupMax >= firstGroupMin) {
    totalOverlappingGroups++;
  } else if (firstGroupMin >= secondGroupMin && firstGroupMin <= secondGroupMax) {
    totalOverlappingGroups++;
  } else if (firstGroupMax <= secondGroupMax && firstGroupMax >= secondGroupMin) {
    totalOverlappingGroups++;
  }
});

console.log(totalOverlappingGroups);
