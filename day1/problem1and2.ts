import fs from "fs";

const getLargestFoodAmount = () => {
  const result = fs.readFileSync("day1/problem1Input.text", { encoding: "utf8", flag: "r" });
  const lines = result.split(/\r?\n/);

  let largestFoodAmount = 0;
  let largestElfNum = 1;
  let currentElfFood = 0;
  let elfNum = 1;

  lines.forEach((line) => {
    if (!line) {
      if (currentElfFood > largestFoodAmount) {
        largestFoodAmount = currentElfFood;
        largestElfNum = elfNum;
      }
      currentElfFood = 0;
      elfNum++;
    } else {
      currentElfFood += Number(line);
    }
  });

  return largestFoodAmount;
};

function bisectLeft(arr: number[], value: number, lo = 0, hi = arr.length) {
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

const getThreeLargestFoodTotal = () => {
  const result = fs.readFileSync("day1/problem1Input.text", { encoding: "utf8", flag: "r" });
  const lines = result.split(/\r?\n/);

  let sortedElfFoods: number[] = [];
  let currentElfFood = 0;
  let elfNum = 0;

  lines.forEach((line) => {
    if (!line) {
      const insertIndex = bisectLeft(sortedElfFoods, currentElfFood);
      sortedElfFoods.splice(insertIndex, 0, currentElfFood);
      currentElfFood = 0;
      elfNum++;
    } else {
      currentElfFood += Number(line);
    }
  });

  return sortedElfFoods[elfNum - 1] + sortedElfFoods[elfNum - 2] + sortedElfFoods[elfNum - 3];
};

console.log(getThreeLargestFoodTotal());
