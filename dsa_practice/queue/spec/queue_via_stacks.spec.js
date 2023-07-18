const QueueViaStacks = require('../examples/queue_via_stacks.js');

describe('QueueViaStacks', () => {
  let testQueueViaStacks;
  beforeEach(() => {
    testQueueViaStacks = new QueueViaStacks();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testQueueViaStacks.enqueue(values[i]);
    }
  });

  test('#FIFO', () => {
    expect(testQueueViaStacks.dequeue()).toEqual(1)
  })
});
