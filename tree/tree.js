function newTree() {
  const newTree = {};
  return newTree;
}

function newNode(data, leftNode = null, rightNode = null) {
  function isLeaf() {
    return this.leftNode == null && this.rightNode == null;
  }

  function setLeftNode(node) {
    this.leftNode = node;
    return this;
  }

  function setRightNode(node) {
    this.rightNode = node;
    return this;
  }

  return {
    data,
    leftNode,
    rightNode,
    setLeftNode,
    setRightNode,
    isLeaf
  };
}

module.exports = { newTree, newNode };
