function newTree(rootNode) {
  return {
    rootNode
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
