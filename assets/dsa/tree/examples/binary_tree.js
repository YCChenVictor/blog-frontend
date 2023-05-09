class BinaryTree {
  constructor() {
    this.root = null;
  }
    
  addNode(value) {
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      this.insertNode(this.root, new Node(value))
    }
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
    // there is no specific insertion method
  }
}

module.exports=BinaryTree
