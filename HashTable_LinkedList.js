/**
 * Represents nodes for a linked list
 * @example
 * let myLLNode = new LinkedListNode({...});
 */
class LinkedListNode {
  /**
   * Constructor for LinkedListNode
   * @param {object} data The data the node will hold
   */
  constructor(data) {
    this.data = data || null;
    this.next = null;
  }
}

/**
 * A custom linked list exception implementation
 * @example
 * throw new LinkedListException('This is my exception message!');
 */
class LinkedListException {
  constructor(message) {
    this.message = message;
    this.name = 'LinkedListException';
  }
}

/**
 * An implementation of a linked list
 * @example
 * let myLinkedList = new LinkedList();
 */
class LinkedList {
  /**
   * Constructor for LinkedList
   */
  constructor() {
    this.first = null;
  }

  /**
   * Return the first node in the linked list
   */
  getHead() {
    return this.first;
  }

  /**
   * Add a node to the head of the list
   * @type {object} data  The node object to add to the list
   */
  prependToHead(data) {
    let head = data;
    let n = this.first;


    if (!n  || (n.data == null && n.next == null)) {
      this.first = head;
    } else {
      head.next = this.first;
      this.first = head;
    }
  }

  /**
   * Add a node to the end of the list
   * @type {object} data  The node object to add to the end of the list
   */
  appendToTail(data) {
    let end = data;
    let n = this.first;


    if (!n || (n.data == null && n.next == null)) {
      this.first = end;
    } else {
      while(n.next != null) {
        n = n.next;
      }
      n.next = end;
    }
  }

  /**
   * Print the list to the console
   */
  printList() {
    let n = this.first;

    while(true) {
      console.log(n);
      if (n.next === null) {
        break;
      } else {
        n = n.next;
      }
    }
  }

  /**
   * Remove a duplicate node based on simple comparison of the node data
   */
  findDeleteDuplicate() {
    let n = this.first;
    let i = this.first;
    let prevNode = null;

    while(n.next != null) {
      while(i.next != null) {
        prevNode = i;
        i = i.next;
        if(i.data == n.data) {
          prevNode.next = i.next;
        }
      }
      n = n.next;
      i = n;
    }
  }

  /**
   * Perform a runner weave on the list
   */
  runnerWeave() {
    let p2Slow = this.first;
    let p1Fast = this.first.next;

    while (p1Fast.next != null) {
      p2Slow = p2Slow.next;
      p1Fast = p1Fast.next.next;
    }

    p1Fast = this.first;
    p2Slow = p2Slow.next;

    while (true) {
      let origP1 = p1Fast;
      let origP2 = p2Slow;

      p1Fast = p1Fast.next;
      p2Slow = p2Slow.next;

      origP2.next = origP1.next;
      origP1.next = origP2;

      if (p2Slow.next != null) {
        p1Fast.next.next = p2Slow;
      } else {
        p1Fast.next = p2Slow;
        break;
      }
    }
  }

  /*
   * Fine the kth to last element in the list
   * This works by virtue of that fact that when
   * lead pointer reaches the end, the trailing pointer
   * is k elements behind, or in the k to last place.
   * @type {number} k  The kth to last number you want to find
   */
  findKtoLast(k) {
    let trailingPointer = this.first;
    let leadPointer = this.first;

    for (let j = 0; j < k - 1; ++j) {
      leadPointer = leadPointer.next;
    }

    while (leadPointer.next != null) {
      trailingPointer = trailingPointer.next;
      leadPointer = leadPointer.next;
    }

    return trailingPointer;
  }

  /*
   * Determine if the list is a palindrome
   */
  isPalindrome() {
    let p2Slow = this.first;
    let p1Fast = this.first.next;
    let size = 2;
    let stack = new Array(p2Slow);

    while (p1Fast.next != null) {
      p2Slow = p2Slow.next;
      stack.push(p2Slow);
      p1Fast = p1Fast.next;

      if(p1Fast) {
        if (p1Fast.next != null) {
          size += 2;
          p1Fast = p1Fast.next;
        } else {
          size++;
          break;
        }
      }
    }

    if (size % 2 == 0) {
      p2Slow = p2Slow.next;
    }

    while (p2Slow != null) {
      let stackItem = stack.pop();

      if (p2Slow.data != stackItem.data) {
        return false;
      }
      p2Slow = p2Slow.next;
    }

    if(stack.length) {
      return false;
    }
    return true;
  }
}

/**
 * A custom hash map exception implementation
 * @example
 * throw new HashMapException('This is my exception message!');
 */
class HashMapException {
  constructor(message) {
    this.message = message;
    this.name = 'HashMapException';
  }
}

/**
 * An implementation of a hash map
 * @example
 * let myHashMap = new HashMap();
 */
class HashMap {
  /**
   * Constructor for HashMap
   * @param {object} hashMap An existing hash map
   */
  constructor(hashMap) {
    this.hashMap = hashMap || {};
  }

  /**
   * Return the hashmap
   */
  getHashMap() {
    return this.hashMap;
  }

  /**
   * Insert a linked list into the hash map
   * @param {string} keyString The key for the linked list being inserted
   * @param {LinkedList} linkedList The linked list to be inserted
   */
  insertListIntoMap(keyString, linkedList) {
    let hashCode = this.hash(keyString);
    let bucket = hashCode;

    if (!this.hashMap[bucket]) {
      this.hashMap[bucket] = linkedList;
    } else {
      throw new HashMapException('Bucket has existing linked list.');
    }
  }

  /**
   * Insert a linked list node into the hash map
   * @param {string} keyString The key for the linked list being inserted
   * @param {object} data The data to insert
   */
  insertNodeIntoMap(keyString, data) {
    let hashCode = this.hash(keyString);
    let bucket = hashCode;

    if (!this.hashMap[bucket]) {
      this.hashMap[bucket] = new LinkedList();
      this.hashMap[bucket].appendToTail(new LinkedListNode({
        key: keyString,
        bucket: bucket,
        hashCode: hashCode,
        data: data
      }));
    } else {
      this.hashMap[bucket].appendToTail(new LinkedListNode({
        key: keyString,
        bucket: bucket,
        hashCode: hashCode,
        data: data
      }));
    }
  }

  /**
   * Print the hash map
   */
  printMap() {
    Object.keys(this.hashMap).forEach(function _print(item) {
      console.log(item);
    });
  }

  /**
   * Get the data for bucket at key
   * @param {string} key The key for the bucket you want the data of
   */
  getBucket(key) {
    return this.hashMap[this.hash(key)] || [];
  }

  /**
   * Print the data for bucket at key
   * @param {string} key The key for the bucket you want to print the data of
   */
  printBucket(key) {
    let bucket = this.hashMap[this.hash(key)];
    if (bucket) {
      bucket.printList();
    } else {
      console.log('[]');
    }
  }

  /**
   * Generate a simple hash for a given string
   * @param {string} str The string to generate the hash for
   */
  hash(str) {
    var hashValue = 0;
    if (str.length == 0) return hashValue;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hashValue = ((hashValue<<5)-hashValue)+char;
      hashValue = hashValue & hashValue; // Convert to 32bit integer
    }
    return hashValue;
  }
}

/**
 * Example Usage
 *  let stringArray = ['hello', 'world', 'w', 'e', 'go', 't', 'some big', 'stuff', 'e', 'w'];
 *  let hashMap = new HashMap();
 *  stringArray.forEach(function _storeStrings(string) {
 *    hashMap.insertNodeIntoMap(string, string);
 *  });
 *
 */
