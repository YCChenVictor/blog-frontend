function maxDepth(node) {
  if(node == null) {
    return 0
  }

  lDepth = maxDepth(node.left)
  rDepth = maxDepth(node.right)

  if(lDepth > rDepth) {
    return lDepth + 1
  } else {
    return rDepth + 1
  }
}

module.exports = maxDepth
