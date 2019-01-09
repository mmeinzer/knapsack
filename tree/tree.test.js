const { newTree, newNode } = require("./index");

test("newTree is a function that returns an object", () => {
  expect(typeof newTree()).toBe("object");
});

test("newNode is a function that returns an object", () => {
  expect(typeof newNode()).toBe("object");
});

test("newNode.isLeaf correctly identifies a leaf node", () => {
  const leafNode = newNode(1, null, null);
  expect(leafNode.isLeaf()).toBe(true);
});

test("newNode.isLeaf correctly identifies a non-leaf node", () => {
  const node = newNode(1, newNode(1, null, null), null);
  const res = node.isLeaf();
  expect(res).toBe(false);
});
