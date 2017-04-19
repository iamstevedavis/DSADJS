class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class QueueException {
  constructor(message) {
    this.message = message;
    this.name = 'QueueException';
  }
}

class MyQueue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  add(item) {
    let myQueueNode = new QueueNode(item);
    if (this.last != null) {
      this.last.next = myQueueNode;
    }
    this.last = myQueueNode;
    if (this.first == null) {
      this.first = this.last;
    }
  }

  remove() {
    if (this.first == null) {
      throw new QueueException('Empty Queue!');
    }
    let data = this.first.data;
    this.first = this.first.next;
    if (this.first == null) {
      this.last = null;
    }
    return data;
  }

  peek() {
    if (this.first == null) {
      throw new QueueException('Empty Queue!');
    }
    return this.first.data;
  }

  isEmpty() {
    return this.first == null;
  }
}


let testQueue = new MyQueue();

console.log(testQueue.isEmpty());

testQueue.peek();
