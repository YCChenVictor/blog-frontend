const StackMin = require('../examples/stack_min.js');

describe('StackMin', () => {
  let testStack = new StackMin();
  beforeEach(() => {
    const values = [74, 3, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testStack.push(values[i]);
    }
  });

  test('#min', () => {
    expect(testStack.returnMin()).toEqual(3);
  });
});
