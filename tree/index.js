function newTree(dataArr = []) {
  const rootNode = newNode(dataArr[0]);
  const nodeCount = 1;
  return {
    rootNode,
    nodeCount
  };
}

function newNode(data, leftNode = null, rightNode = null) {
  return {
    data,
    leftNode,
    rightNode,
    isLeaf
  };
}

function isLeaf() {
  return this.leftNode == null && this.rightNode == null;
}

module.exports = { newTree, newNode };
