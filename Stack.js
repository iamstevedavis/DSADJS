class StackNode {
  constructor(data) {
    this.data = data || null;
    this.next = null;
  }
}

class StackException {
  constructor(message) {
    this.message = message;
    this.name = 'StackException';
  }
}

class MyStack {
  constructor() {
    this.top = null;
  }

  pop() {
    if (this.top == null) {
      throw new StackException('Empty Stack!');
    }

    var item = this.top.data;
    this.top = this.top.next;
    return item;
  }

  push(item) {
    let t = new StackNode(item);
    t.next = this.top;
    this.top = t;
  }

  peek() {
    if (this.top == null) {
      throw new StackException('Empty Stack!');
    }
    return this.top.data;
  }
}
