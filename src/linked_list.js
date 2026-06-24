/* linked_list.js */

/* class definition for a node point */
class Node {
  constructor(val = null, nextNode = null) {
    // Initial conditions of a node point
    this.val = val;
    this.nextNode = null;
  }
}

/* class definition for a linked list */
class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
    this.totalNodes = 0;
  }

  size() {
    return this.totalNodes;
  }

  head() {
    if (this.totalNodes === 0) {
      return undefined;
    }
    return this.headNode;
  }

  tail() {
    if (this.totalNodes === 0) {
      return undefined;
    }
    return this.tailNode;
  }

  at(index) {
    if (index == 0 || index > this.totalNodes) {
      return undefined;
    }
    let tmpNode = this.headNode;
    for (let i = 1; i < index; i++) {
      tmpNode = tmpNode.nextNode;
    }
    return tmpNode;
  }

  valueAt(index) {
    if (index == 0 || index > this.totalNodes) {
      return undefined;
    }
    let tmpNode = this.headNode;
    for (let i = 1; i < index; i++) {
      tmpNode = tmpNode.nextNode;
    }
    return tmpNode.val;
  }

  changeValueAt(index, value) {
    if (index == 0 || index > this.totalNodes) {
      return undefined;
    }
    let tmpNode = this.headNode;
    for (let i = 1; i < index; i++) {
      tmpNode = tmpNode.nextNode;
    }
    tmpNode.val = value;
  }

  pop() {
    if (this.totalNodes === 0) {
      return undefined;
    }
    let tmpNode = this.headNode;
    this.headNode = tmpNode.nextNode;
    tmpNode.nextNode = null;
    this.totalNodes -= 1;
    return tmpNode;
  }

  contains(value) {
    let retVal = false;
    let tmpNode = this.headNode;
    for (let i = 0; i < this.totalNodes; i++) {
      if (tmpNode.val === value) {
        retVal = true;
        break;
      }
      tmpNode = tmpNode.nextNode;
    }
    return retVal;
  }

  findIndex(value) {
    let index = -1;
    let tmpNode = this.headNode;
    for (let i = 1; i <= this.totalNodes; i++) {
      if (tmpNode.val === value) {
        index = i;
        break;
      }
      tmpNode = tmpNode.nextNode;
    }
    return index;
  }

  toString() {
    if (this.totalNodes === 0) return null;
    let tmpNode = this.headNode;
    let tmpStr = "(" + tmpNode.val + ") -> ";
    for (let i = 1; i < this.totalNodes; i++) {
      tmpNode = tmpNode.nextNode;
      tmpStr += "(" + tmpNode.val + ") -> ";
    }
    return tmpStr + "null";
  }

  append(value) {
    const newNode = new Node(value);
    this.totalNodes++
      ? (this.tailNode.nextNode = newNode)
      : (this.headNode = newNode);
    this.tailNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    this.totalNodes++
      ? (newNode.nextNode = this.headNode)
      : (this.tailNode = newNode);
    this.headNode = newNode;
  }

  insertAt(index, ...values) {
    if (this.totalNodes < index || index < 1) {
      if (!(this.totalNodes == 0 && index == 1)) {
        if (!(this.totalNodes + 1 == index)) {
          throw RangeError("Index out of range");
        }
      }
    }
    let newLength = values.length;
    if (
      (this.totalNodes === 1 && index == 1) ||
      (this.totalNodes === 0 && index == 1) ||
      index === 1
    ) {
      while (values.length != 0) {
        this.prepend(values.pop());
      }
      return;
    }
    if (index === this.totalNodes + 1) {
      while (values.length != 0) {
        this.append(values.reverse().pop());
      }
      return;
    }
    let tmpNode = this.headNode;
    let prevNode;
    for (let i = 1; i < index; i++) {
      prevNode = tmpNode;
      tmpNode = tmpNode.nextNode;
    }
    values.forEach((x) => {
      prevNode.nextNode = new Node(x);
      prevNode = prevNode.nextNode;
    });
    prevNode.nextNode = tmpNode;
    this.totalNodes += newLength;
  }

  removeAt(index) {
    if (this.totalNodes < index || index < 1) {
      throw RangeError("Index out of range");
    }
    let prevNode = null;
    let tmpNode = this.headNode;
    for (let i = 1; i < index; i++) {
      prevNode = tmpNode;
      tmpNode = tmpNode.nextNode;
    }
    if (prevNode == null) {
      return this.pop();
    }
    if (prevNode !== null && prevNode !== undefined)
      prevNode.nextNode = tmpNode.nextNode;
    tmpNode.nextNode = null;
    this.totalNodes -= 1;
    return tmpNode;
  }
}

export { Node, LinkedList };
