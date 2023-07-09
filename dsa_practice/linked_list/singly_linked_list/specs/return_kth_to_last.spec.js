const { returnKthToLast } = require('../examples/return_kth_to_last.js');
const LinkedList = require('../examples/singly_linked_list.js');
  
describe('returnKthToLast', () => {
  let testLinkedList = new LinkedList;
  beforeEach(() => {
    const values = [1, 2, 3, 4, 449, 12];
    for(let i = 0; i < values.length; i++){
      testLinkedList.prepand(values[i]);
    }
  });

  test('#', () => {
    const result = returnKthToLast(testLinkedList, 2)
    expect(result.value).toEqual(449);
  });
})
