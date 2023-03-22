const Queue = require('../examples/queue.js');

describe('Queue', () => {
  let testQueue;
  beforeEach(() => {
    testQueue = new Queue();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testQueue.enqueue(values[i]);
    }
  });

  test('#init', () => {
    expect(testQueue.print()).toEqual([1, 74, 888, 62, 33])
  })

  test('#enqueue', () => {
    testQueue.enqueue(0);
    expect(testQueue.print()).toEqual([1, 74, 888, 62, 33, 0]);
  });

  test('#peek', () => {
    expect(testQueue.peek()).toEqual(1);
  });

  // more test to be continued
});