if (!process.argv[2]) {
  throw new Error("Expected input data");
}
const data = parseInputData(process.argv[2]);

const algos = [valueDensityGreedy];
algos.forEach(algo => {
  const { solution, value } = algo(data);
  const string = stringifyAnswer(value, solution);
  console.log(string);
});

function valueDensityGreedy(data) {
  const { numberOfItems, capacity, items } = data;
  const sortedItems = items
    .map((item, i) => {
      item.valueDensity = item.value / item.weight;
      item.originalIndex = i;
      return item;
    })
    .sort((a, b) => b.valueDensity - a.valueDensity);

  let remainingCapacity = capacity;
  let value = 0;
  const solution = sortedItems
    .map(item => {
      if (item.weight <= remainingCapacity) {
        value += item.value;
        remainingCapacity -= item.weight;
        item.used = 1;
      } else {
        item.used = 0;
      }
      return item;
    })
    .sort((a, b) => a.originalIndex - b.originalIndex);
  return { solution, value, remainingCapacity };
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
