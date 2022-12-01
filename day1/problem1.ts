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

console.log(getLargestFoodAmount());
