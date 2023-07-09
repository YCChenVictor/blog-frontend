class BinaryTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  addNode(value) { // will use recursive
    if (this.root === null) {
      this.root = new BinaryTreeNode(value)
    } else {
      this.insertNode(this.root, new BinaryTreeNode(value))
    }
  }

  inorderTraversal() { // L > V > R
    // traverse(5) -> [traverse(3), push(5), traverse(8)] -> [traverse(2), push(3), traverse(4)], push(5), [traverse(7), push(8), traverse(9)] -> [2, 3, 4, 5, 7, 8, 9]
    const result = [];

    function traverse(node) {
      if (node) {
        traverse(node.left);
        result.push(node.value);
        traverse(node.right);
      }
    }

    traverse(this.root);
    return result;
  }

  preorderTraversal() { // V > L > R
    // traverse(5) -> [push(5), traverse(3), traverse(8)] -> [push(5), push(3), traverse(2), traverse(4), push(8), traverse(7), traverse(9)]
    const result = [];

    function traverse(node) {
      if (node) {
        result.push(node.value)
        traverse(node.left);
        traverse(node.right);
      }
    }

    traverse(this.root);
    return result
  }

  postorderTraversal() { // L > R > V
    const result = [];

    function traverse(node) {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.value)
      }
    }

    traverse(this.root);
    return result
  }
  
  levelorderTraversal() { // [5, 3, 8, 2, 4, 7, 9]
    const queue = [this.root]
    const result = []

    if (!this.root) {
      return
    }

    while (queue.length > 0) {
      const node = queue.shift()
      result.push(node.value)

      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }

    return result
  }

  insertNode(parentNode, newNode) {
    // there is no specific insertion method for binary tree
  }
}

module.exports = BinaryTree
