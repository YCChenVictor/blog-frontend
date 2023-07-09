const Node = require('../examples/binary_tree_node.js')
const maxDepth = require('../examples/max_depth.js')

describe('MaxDepth', () => {
  let tree

  describe('example 1', () => {
    // Input:
    //    1
    //   /  \
    //  2    3
    // Output: 2
    beforeEach(async () => {
      tree = new Node(1)
      tree.left = new Node(2)
      tree.right = new Node(3)
    })
  
    test('#', () => {  
      expect(maxDepth(tree)).toEqual(2)
    })
  })
  
  describe('example 2', () => {
    // Input:
    //   2
    //    \
    //     1
    //    /
    //  3
    // Output: 3
    beforeEach(async () => {
      tree = new Node(2)
      tree.right = new Node(1)
      tree.right.left = new Node(3)
    })

    test('#', () => {
      expect(maxDepth(tree)).toEqual(3)
    })
  })
})
