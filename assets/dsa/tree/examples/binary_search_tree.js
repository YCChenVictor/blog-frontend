Node = require('./binary_tree_node.js')

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  addNode(value) { // will use recursive
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      this.insertNode(this.root, new Node(value))
    }
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  inorderTraversal() { // L > V > R
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

  levelorderTraversal() {
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
    if(newNode.value < parentNode.value){
      if(parentNode.left === null) {
        parentNode.left = newNode;
      } else {
        this.insertNode(parentNode.left, newNode);
      }
    } else {
      if(parentNode.right === null) {
        parentNode.right = newNode;
      } else {
        this.insertNode(parentNode.right, newNode);
      };
    };
  }

  searchNode(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return node;
    }
  }
}

module.exports = BinaryTree
