BinaryTree = require('./binary_tree.js')
Node = require('./binary_tree_node.js')

class BinarySearchTree extends BinaryTree {
  constructor(root) {
    super(root);
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

module.exports = BinarySearchTree
