const ThreeStackInOneArray = require('../examples/three_stacks_in_one_array.js');

describe('ThreeStackInOneArray', () => {
  let testStack;
  let totalLength = 17;
  let data = [
    [1, 74],
    [888, 62, 33],
    [83, 44],
  ]
  beforeEach(() => {
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
    expect(testStack.addAts).toEqual([2, 9, 14])
    expect(testStack.ends).toEqual([5, 11, 16])
  })

  test('#push', () => {
    testStack.push(0, 4);
    expect(testStack.elements).toEqual([
      1, 74, 4, null, null, null,
      888, 62, 33, null, null, null,
      83, 44, null, null, null,
    ]);
    expect(testStack.addAts).toEqual([3, 9, 14])
  });

  test('#pop', () => {
    testStack.pop(1);
    expect(testStack.elements).toEqual([
      1, 74, null, null, null, null,
      888, 62, null, null, null, null,
      83, 44, null, null, null,
    ]);
    expect(testStack.addAts).toEqual([2, 8, 14])
  })

  test('#peek', () => {
    expect(testStack.peek(1)).toEqual(74)
    expect(testStack.peek(2)).toEqual(33)
    expect(testStack.peek(3)).toEqual(44)
  })

  test('#size', () => {
    expect(testStack.size(1)).toEqual(2)
    expect(testStack.size(2)).toEqual(3)
    expect(testStack.size(3)).toEqual(2)
  })

  test('#print', () => {
    expect(testStack.print(1)).toEqual([1, 74, null, null, null, null])
    expect(testStack.print(2)).toEqual([888, 62, 33, null, null, null])
    expect(testStack.print(3)).toEqual([83, 44, null, null, null])
  })

  describe('with empty sub stack', () => {
    let testStack;
    let totalLength = 17;
    let data = [
      [1, 74],
      [888, 62, 33],
      [],
    ]
    beforeEach(() => {
      testStack = new ThreeStackInOneArray(totalLength);
      for(let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j ++) {
          testStack.push(i, data[i][j]);
        }
      }
    });

    test('#isEmpty', () => {
      expect(testStack.isEmpty(1)).toEqual(false)
      expect(testStack.isEmpty(2)).toEqual(false)
      expect(testStack.isEmpty(3)).toEqual(true)
    })
  })
});
