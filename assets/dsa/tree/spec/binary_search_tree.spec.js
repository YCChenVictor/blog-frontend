const BinaryTree = require('../examples/binary_search_tree.js');

describe('BinaryTree', () => {
//     10
//    /  \
//   5    15
//  / \   / \
// 3   7 12  17
  let testTree;
  beforeEach(() => {
    testTree = new BinaryTree();
    testTree.addNode(10);
    testTree.addNode(5);
    testTree.addNode(15);
    testTree.addNode(3);
    testTree.addNode(7);
    testTree.addNode(12);
    testTree.addNode(17);
  });

  test('#init', () => {
    expect(testTree.root.value).toBe(10)
    expect(testTree.root.left.value).toBe(5)
    expect(testTree.root.left.left.value).toBe(3)
    expect(testTree.root.left.right.value).toBe(7)
    expect(testTree.root.right.value).toBe(15)
    expect(testTree.root.right.left.value).toBe(12)
    expect(testTree.root.right.right.value).toBe(17)
  })

  test('#search', () => {
    expect(testTree.search(10)).toEqual({
      value: 10,
      left: {
        value: 5,
        left: {
          value: 3,
          left: null,
          right: null
        },
        right: {
          value: 7,
          left: null,
          right: null
        }
      },
      right: {
        value: 15,
        left: {
          value: 12,
          left: null,
          right: null
        },
        right: {
          value: 17,
          left: null,
          right: null
        }
      }
    })
  })

  test('#inorderTraversal', () => { // L > V > R
    expect(testTree.inorderTraversal()).toEqual([3, 5, 7, 10, 12, 15, 17])
  })

  test('#preorderTraversal', () => { // V > L > R
    expect(testTree.preorderTraversal()).toEqual([10, 5, 3, 7, 15, 12, 17])
  })

  test('#postorderTraversal', () => { // L > R > V
    expect(testTree.postorderTraversal()).toEqual([3, 7, 5, 12, 17, 15, 10])
  })

  test('#levelorderTraversal', () => {
    expect(testTree.levelorderTraversal()).toEqual([10, 5, 15, 3, 7, 12, 17])
  })
});
