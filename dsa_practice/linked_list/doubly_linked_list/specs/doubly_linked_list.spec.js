const DoublyLinkedList = require('../examples/doubly_linked_list.js');

describe('DoublyLinkedList', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new DoublyLinkedList();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){ // 33 <- 62 <- 888 <- 74 <- 1
      testLinkedList.prepend(values[i]);
    }
  });

  test('#prepend', () => { // 0 <- 33 <- 62 <- 888 <- 74 <- 1
    testLinkedList.prepend(0);
    expect(testLinkedList.values()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
    expect(testLinkedList.reverseValues()).toEqual([ 1, 74, 888, 62, 33, 0 ]);
  });

  test('#append', () => { // 33 <- 62 <- 888 <- 74 <- 1 <- 0
    testLinkedList.append(0);
    expect(testLinkedList.values()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
    expect(testLinkedList.reverseValues()).toEqual([ 0, 1, 74, 888, 62, 33 ]);
  });

  test('#insert', () => { // 33 <- 1000 <- 62 <- 888 <- 74 <- 1
    testLinkedList.insert(2, 1000);
    expect(testLinkedList.values()).toEqual([ 33, 1000, 62, 888, 74, 1 ]);
  });
  
  test('#update', () => {
    testLinkedList.update(2, 1000);
    expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
  })

  test('#delete', () => {
    testLinkedList.update(2, 1000);
    expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
  })
});
