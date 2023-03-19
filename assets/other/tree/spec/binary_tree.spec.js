const BinaryTree = require('../examples/binary_tree.js');

describe('Tree', () => {
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

  // test('#addNode', () => {
  //   testTree.addNode(7);
  //   expect(testTree.root.left.left.left.value).toBe(7)
  // })

  // test('#inorderTraversal', () => {

  // })
});
