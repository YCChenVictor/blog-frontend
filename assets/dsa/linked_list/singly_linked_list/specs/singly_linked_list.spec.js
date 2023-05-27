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

  // create
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

  // read
  test('#traverse', () => {
    expect(testLinkedList.traverseTo(2).value).toEqual(888);
  })

  test('#printList', () => {
    expect(testLinkedList.printList()).toEqual([33, 62, 888, 74, 1]);
  })
  
  test('#update', () => {
    testLinkedList.update(3, 4)
    expect(testLinkedList.printList()).toEqual([33, 62, 4, 74, 1]);
  })
  
  test('#remove', () => {
    testLinkedList.remove(3)
    expect(testLinkedList.printList()).toEqual([33, 62, 74, 1]);
  })
});