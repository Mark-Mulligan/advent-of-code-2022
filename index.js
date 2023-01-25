const perimeterSum = (grid) => {
  // Add Code Below
  let sum = 0;
  console.log(grid[0].length);
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      console.log(grid[row].length - 1);
      if (row === 0 || row === grid.length - 1 || column === 0 || column === grid[row].length - 1) {
        sum += grid[row][column];
      }
    }
  }
  return sum;

  // Add Code Above
};

console.log(
  perimeterSum([
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ]),
);
