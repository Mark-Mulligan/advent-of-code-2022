import fs from 'fs';

const result = fs.readFileSync('day5/data.text', { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

        [H]     [W] [B]            
    [D] [B]     [L] [G] [N]        
[P] [J] [T]     [M] [R] [D]        
[V] [F] [V]     [F] [Z] [B]     [C]
[Z] [V] [S]     [G] [H] [C] [Q] [R]
[W] [W] [L] [J] [B] [V] [P] [B] [Z]
[D] [S] [M] [S] [Z] [W] [J] [T] [G]
[T] [L] [Z] [R] [C] [Q] [V] [P] [H]
 1   2   3   4   5   6   7   8   9 

*/
// const crates = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
const crates = [
  ['T', 'D', 'W', 'Z', 'V', 'P'],
  ['L', 'S', 'W', 'V', 'F', 'J', 'D'],
  ['Z', 'M', 'L', 'S', 'V', 'T', 'B', 'H'],
  ['R', 'S', 'J'],
  ['C', 'Z', 'B', 'G', 'F', 'M', 'L', 'W'],
  ['Q', 'W', 'V', 'H', 'Z', 'R', 'G', 'B'],
  ['V', 'J', 'P', 'C', 'B', 'D', 'N'],
  ['P', 'T', 'B', 'Q'],
  ['H', 'G', 'Z', 'R', 'C'],
];

// const instructions = ['move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2'];

const moveCrates = (currentCrates: any, instruction: string) => {
  const instructionArr = instruction.split(' ');
  const numToMove = Number(instructionArr[1]);
  const from = Number(instructionArr[3]) - 1;
  const to = Number(instructionArr[5]) - 1;

  let crateStackToRemove: string[] = currentCrates[from];
  let removedCrates = crateStackToRemove.splice(crateStackToRemove.length - numToMove, numToMove);

  removedCrates.forEach((crate) => {
    currentCrates[to].push(crate);
  });

  // For part 1
  // for (let i = 0; i < numToMove; i++) {
  //   let removedCrate = crateStackToRemove.pop();

  //   if (removedCrate) {
  //     currentCrates[to].push(removedCrate);
  //   }
  // }
};

const getLastCrateInEachColumn = (currentCrates: string[][]) => {
  let result: string[] = [];

  currentCrates.forEach((stack) => {
    let lastIndex = stack.length - 1;
    result.push(stack[lastIndex]);
  });

  return result.join('');
};

console.log(crates);
lines.forEach((instruction) => {
  moveCrates(crates, instruction);
});

console.log(crates);
console.log(getLastCrateInEachColumn(crates));
