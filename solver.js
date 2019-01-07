if (!process.argv[2]) {
  throw new Error("Expected input data");
}
const { numberOfItems, size, items } = parseInputData(process.argv[2]);

console.log({ numberOfItems, size });

function parseInputData(inputString) {
  const lines = inputString.split("\n").filter(str => str !== "");
  const [numberOfItems, size] = lines[0]
    .split(" ")
    .map(str => parseInt(str, 10));
  const items = lines.slice(1).map(itemString => {
    const [value, weight] = itemString.split(" ").map(str => parseInt(str, 10));
    return { value, weight };
  });
  return { numberOfItems, size, items };
}
