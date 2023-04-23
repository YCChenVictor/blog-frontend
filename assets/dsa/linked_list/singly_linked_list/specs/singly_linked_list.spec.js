const LinkedList = require('../examples/singly_linked_list.js');

describe('LinkedList', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new LinkedList();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testLinkedList.prepand(values[i]);
    }
  });

  test('#prepand', () => {
    testLinkedList.prepand(0);
    expect(testLinkedList.printList()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
  });

  test('#append', () => {
    testLinkedList.append(0);
    expect(testLinkedList.printList()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
  });

  test('#insert', () => {
    testLinkedList.insert(2, 1000);
    expect(testLinkedList.printList()).toEqual([ 33, 62, 1000, 888, 74, 1 ]);
  });
  
  test('#update', () => {
    // TODO
  })
  
  test('#delete', () => {
    // TODO
  })
});