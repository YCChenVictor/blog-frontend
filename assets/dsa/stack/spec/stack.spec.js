const Stack = require('../examples/stack.js');

describe('Stack', () => {
  describe('with item', () => {
    let testStack;
    beforeEach(() => {
      testStack = new Stack();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){
          testStack.push(values[i]);
      }
    });

    test('#push', () => {
      testStack.push(0);
      expect(testStack.print()).toEqual([ 1, 74, 888, 62, 33, 0 ]);
    });

    test('#pop', () => {
      expect(testStack.pop()).toEqual(33);
      expect(testStack.print()).toEqual([ 1, 74, 888, 62 ]);
    })

    test('#peek', () => {
      expect(testStack.peek()).toEqual(33);
    })

    test('#isEmpty', () => {
      expect(testStack.isEmpty()).toEqual(false);
    })

    test('#size', () => {
      expect(testStack.size()).toEqual(testStack.items.length);
    })
  })

  describe('no item', () => {
    let testStack = new Stack();
    test('#pop', () => {
      expect(testStack.pop()).toEqual("Underflow");
    })

    test('#isEmpty', () => {
      expect(testStack.isEmpty()).toEqual(true);
    })
  })
});
