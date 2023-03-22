const ThreeStackInOneArray = require('../examples/three_stacks_in_one_array.js');

describe('ThreeStackInOneArray', () => { // create one really fast and then check edge case
  describe('with item', () => {
    let testStack;
    let totalLength = 17;
    let data = [
      [1, 74],
      [888, 62, 33],
      [83, 44],
    ]
    beforeEach(() => { // create the stack example I need
      testStack = new ThreeStackInOneArray(totalLength);
      for(let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j ++) {
          testStack.push(i, data[i][j]);
        }
      }
    });

    test('#init', () => {
      expect(testStack.elements).toEqual([
        1, 74, null, null, null, null,
        888, 62, 33, null, null, null,
        83, 44, null, null, null,
      ])
      expect(testStack.starts).toEqual([2, 9, 14])
      expect(testStack.ends).toEqual([5, 11, 16])
    })

    test('#push', () => {
      testStack.push(0, 4);
      expect(testStack.elements).toEqual([
        1, 74, 4, null, null, null,
        888, 62, 33, null, null, null,
        83, 44, null, null, null,
      ]);
      expect(testStack.starts).toEqual([3, 9, 14])
    });

    test('#pop', () => {
      testStack.pop(1);
      expect(testStack.elements).toEqual([
        1, 74, null, null, null, null,
        888, 62, null, null, null, null,
        83, 44, null, null, null,
      ]);
      expect(testStack.starts).toEqual([2, 8, 14])
    })
  })

  describe('no item', () => {
  })
});
