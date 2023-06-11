Node = require('./binary_tree_node.js')

class MinimalTree {
  constructor() {
    this.root = null;
  }
  
  addNode(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    
    let queue = [this.root];
    
    while (queue.length > 0) {
      let currentNode = queue.shift();
    
      if (currentNode.left === null) {
        currentNode.left = new Node(value);
        return;
      } else if (currentNode.right === null) {
        currentNode.right = new Node(value);
        return;
      }
    
      queue.push(currentNode.left);
      queue.push(currentNode.right);
    }
  }

  height() {
    let result = 0
    let currentNode = this.root
    while(currentNode) {
      result += 1
      currentNode = currentNode.left
    }
    return result
  }
}
  
module.exports = MinimalTree
