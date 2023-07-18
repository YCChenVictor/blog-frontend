const MinimalTree = require('../examples/minimal_tree.js')

describe('minimal tree', () => {
  test('6 elements', () => {
    let testTree = new MinimalTree()
    values = [1, 2, 3, 4, 5, 6]
    values.forEach((value) => {
      testTree.addNode(value);
    })
    console.log(testTree)

    expect(testTree.height()).toEqual(3)
  })
})
