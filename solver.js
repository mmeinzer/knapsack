const fs = require("fs");

if (!process.argv[2]) {
  throw new Error("Expected input data");
}
const data = parseInputData(process.argv[2]);

theoreticalMaxValue(data);

const algos = [valueDensityGreedy];
algos.forEach(algo => {
  const { value, solution } = algo(data);
  const string = stringifyAnswer(value, solution);
  fs.writeFileSync("./answer", string);
});

function addItemDetails(item, indexToSave) {
  return {
    ...item,
    originalIndex: indexToSave,
    valueDensity: item.value / item.weight
  };
}

function valueDensityGreedy(data) {
  const { capacity, items } = data;
  const sortedItems = items
    .map(addItemDetails)
    .sort((a, b) => b.valueDensity - a.valueDensity);

  let remainingCapacity = capacity;
  let value = 0;
  const solution = sortedItems
    .map(item => {
      const itemCopy = { ...item };
      if (itemCopy.weight <= remainingCapacity) {
        value += itemCopy.value;
        remainingCapacity -= itemCopy.weight;
        itemCopy.used = 1;
      } else {
        itemCopy.used = 0;
      }
      return itemCopy;
    })
    .sort((a, b) => a.originalIndex - b.originalIndex);
  return { solution, value };
}

function theoreticalMaxValue(data) {
  const { capacity, items } = data;
  // Determines a theoretical maximum for the knapsack problem using linear relaxation
  // i.e. partial items are allowed
  const sortedItems = items
    .map(addItemDetails)
    .sort((a, b) => b.valueDensity - a.valueDensity);
  let remainingCapacity = capacity;
  let maxValue = 0;
  sortedItems.some((item, i) => {
    // Array.prototype.some will continue execution as long as false is returned
    // ...but short circuit on true
    if (item.weight < remainingCapacity) {
      maxValue += item.value;
      remainingCapacity -= item.weight;
      return false;
    } else {
      const fractionOfItem = remainingCapacity / item.weight;
      maxValue += fractionOfItem * item.value;
      remainingCapacity -= fractionOfItem * item.weight;
      return true;
    }
  });
  return maxValue;
}

function parseInputData(inputString) {
  const lines = inputString.split("\n").filter(str => str !== "");
  const [numberOfItems, capacity] = lines[0]
    .split(" ")
    .map(str => parseInt(str, 10));
  const items = lines.slice(1).map(itemString => {
    const [value, weight] = itemString.split(" ").map(str => parseInt(str, 10));
    return { value, weight };
  });
  return { numberOfItems, capacity, items };
}

function stringifyAnswer(value, solution, confidence = 0) {
  const lineOne = `${value} ${confidence}\n`;
  const lineTwo = solution.map(item => item.used).join(" ");
  return lineOne + lineTwo;
}
