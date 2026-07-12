/* binary_search_tree.js */
import { merge_sort } from "./merge_sort_recursion.js";

/* class definition for a node point for this project */
class Node {
  constructor(val = null, leftNode = null, rightNode = null) {
    this.val = val;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  constructor(rootNode = null) {
    this.rootNode = rootNode;
  }

  prettyPrint(node = this.rootNode, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(
      node.rightNode,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    this.prettyPrint(
      node.leftNode,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }

  // my own function, to check on the binary tree constructed
  returnRoot() {
    return this.rootNode;
  }

  buildTree(array) {
    // From the argument array, it will be sorted and filtered to have only
    //   unique values
    this.rootNode = this.binarySearchTree(
      Array.from(new Set(merge_sort(array))),
    );
  }

  buildTreeAlt(array) {
    this.rootNode = this.binarySearchTree(array);
  }

  binarySearchTree(array) {
    if (array.length == 0) {
      return null;
    }
    let mpnt = Math.floor(array.length / 2);
    let rootNode = new Node(array[mpnt]);
    rootNode.leftNode = this.binarySearchTree(array.slice(0, mpnt));
    rootNode.rightNode = this.binarySearchTree(
      array.slice(mpnt + 1, array.length),
    );
    return rootNode;
  }

  // experimental function to traverse the binary tree
  traverseTree(node = this.rootNode, level = 0) {
    let printout;
    if (node != null) {
      printout = `The value of node: ${node.val} `;
    }

    if (node == null) {
      console.log("null node");
      return;
    }

    console.log(printout + ", left side, level: " + level);
    this.traverseTree(node.leftNode, level + 1);

    console.log(printout + ", right side, level: " + level);
    this.traverseTree(node.rightNode, level + 1);
  }

  // function that returns an array with depth first traversal
  depthFirst(node = this.rootNode) {
    if (node === null) return [];
    return [
      node.val,
      ...this.depthFirst(node.leftNode),
      ...this.depthFirst(node.rightNode),
    ];
  }

  // function to return an array of values using breadth first technique
  breadthFirst(queue = [this.rootNode], result = []) {
    if (queue.length === 0) return result;
    let node = queue.shift();
    result.push(node.val);

    if (node.leftNode != null) queue.push(node.leftNode);
    if (node.rightNode != null) queue.push(node.rightNode);

    return this.breadthFirst(queue, result);
  }

  insert(value, node = this.rootNode) {
    if (node === null) {
      this.rootNode = new Node(value);
      return;
    }
    if (value < node.val && node.leftNode == null) {
      node.leftNode = new Node(value);
      return;
    }
    if (value > node.val && node.rightNode == null) {
      node.rightNode = new Node(value);
      return;
    }
    if (value < node.val) {
      if (this.insert(value, node.leftNode) == false) return false;
    }
    if (value > node.val) {
      if (this.insert(value, node.rightNode) == false) return false;
    }
  }

  // find min value of a tree
  minValue(node = this.rootNode) {
    return node.leftNode === null ? node : this.minValue(node.leftNode);
  }

  // find the maximum value
  maxValue(node = this.rootNode) {
    return node.rightNode === null ? node : this.maxValue(node.rightNode);
  }

  // function that returns true or false on whether a value is
  // on the tree
  includes(value) {
    let tmpNode = this.rootNode;
    if (this.searchNode(tmpNode, value)) {
      console.log("Value exist on the tree");
    } else {
      console.log("Value does not exist on the tree");
    }
  }

  clear() {
    this.rootNode = null;
  }

  // returns the number of child for a node
  childBranch(node) {
    let count = 0;
    if (node.leftNode != null) count++;
    if (node.rightNode != null) count++;
    return count;
  }

  // returns the node 'parent' to the node that holds the value
  //  that we are searching for
  parentOf(value, node = this.rootNode) {
    if (node === null) return;

    if (node.leftNode != null && node.leftNode.val === value) {
      return node;
    }
    if (node.rightNode != null && node.rightNode.val === value) {
      return node;
    }

    let tmpRes = this.parentOf(value, node.leftNode);
    if (tmpRes == undefined) {
      tmpRes = this.parentOf(value, node.rightNode);
    }
    return tmpRes;
  }

  leaf(node) {
    if (node === null) return undefined;
    if (this.childBranch(node) == 2) return false;
    if (this.childBranch(node) == 0) return true;
    return false;
  }

  leftLeaf(node) {
    if (node.leftNode === null) return undefined;
    if (this.leaf(node.leftNode) == true) return true;
    return false;
  }

  rightLeaf(node) {
    if (node.rightNode === null) return undefined;
    if (this.leaf(node.rightNode) == true) return true;
    return false;
  }

  // This is the same as 'searchNode' and 'searchAndReturnNode'
  // NOTE:  remove the other 2 functions, this one works
  find(value, node = this.rootNode) {
    if (node === null) return;

    if (node.val === value) return node;
    let tmpRes = this.find(value, node.leftNode);
    if (tmpRes == undefined) {
      tmpRes = this.find(value, node.rightNode);
    }
    return tmpRes;
  }

  // findAlt() for knightTravails
  findAlt(value, key, node = this.rootNode) {
    if (node === null) return;

    // if (node.val.head().val === value) {
    if (node.val[key] === value) {
      return node;
    }
    let tmpRes = this.findAlt(value, key, node.leftNode);
    if (tmpRes == undefined) {
      tmpRes = this.findAlt(value, key, node.rightNode);
    }
    return tmpRes;
  }

  // function to delete node that matches the value passed in the arg
  deleteItem(value) {
    if (this.rootNode === null) {
      return undefined;
    }
    // checks if the value exist on the tree, if it's not found then
    //  do nothing
    let parentNode = this.parentOf(value, this.rootNode);
    // NOTE:
    // The conditions for parentNode === undefined could come from:
    //  1. none existant value
    //  2. value is rootNode
    // This block is to handle exclusively none existant value
    if (parentNode === undefined) {
      if (this.rootNode.val != value) {
        return false;
      }
      if (this.rootNode.val === value) {
        if (this.childBranch(this.rootNode) == 0) {
          this.rootNode = null;
          return true;
        }
      }
    }

    // if 'parentNode' that doesn't have any value/undefined
    let targetNode = this.find(value);

    // This covers 'parentNode' that has a value
    // This will assign 'value' to the handle 'targetNode'
    if (parentNode != undefined) {
      targetNode =
        parentNode.leftNode.val === value
          ? parentNode.leftNode
          : parentNode.rightNode;
    }

    // Deleting a node when it is a 'leaf'
    if (this.leaf(targetNode)) {
      if (parentNode.leftNode.val == value) {
        parentNode.leftNode = null;
      } else {
        parentNode.rightNode = null;
      }
      return true;
    }

    // Deleting a node when it has 1 child
    if (this.childBranch(targetNode) == 1) {
      // condition where targetNode == rootNode
      if (this.rootNode.val === value && targetNode.val == value) {
        // console.log("Operating on root node");
        let tmpNode =
          targetNode.leftNode === null
            ? targetNode.rightNode
            : targetNode.leftNode;
        // delete all reference from the node to be removed
        this.rootNode.leftNode = this.rootNode.rightNode = null;
        this.rootNode = tmpNode;
      }
      let replacement =
        targetNode.leftNode != null
          ? targetNode.leftNode
          : targetNode.rightNode;
      if (parentNode != undefined) {
        if (parentNode.leftNode != null) {
          if (parentNode.leftNode.val == value) {
            parentNode.leftNode = replacement;
          }
        }
        if (parentNode.rightNode != null) {
          if (parentNode.rightNode.val == value) {
            parentNode.rightNode = replacement;
          }
        }
      }
      return true;
    }

    // Deleting a node when it has 2 child
    if (this.childBranch(targetNode) == 2) {
      let repNode = this.minValue(targetNode.rightNode);
      let parentRepNode = this.parentOf(repNode.val);
      if (targetNode.val === parentRepNode.val) {
      }

      // if we're deleting the rootNode
      if (parentNode === undefined) {
        // condition to cover for the instance where there's only
        //  2 levels/depth to the tree, L0 and L1
        if (
          parentRepNode.val == targetNode.val &&
          targetNode.val === this.rootNode.val
        ) {
          repNode.leftNode = targetNode.leftNode;
          repNode.rightNode = null;
          this.rootNode = repNode;
          return true;
        }
        parentRepNode.leftNode = null;
        repNode.leftNode = targetNode.leftNode;
        repNode.rightNode = targetNode.rightNode;
        this.rootNode = repNode;
        return true;
      }

      if (parentNode.leftNode.val === value) {
        parentNode.leftNode = repNode;
      } else {
        parentNode.rightNode = repNode;
      }
      // NOTE:
      // When deleting value that has 2 children but the
      // children are 'leaf', this program crashes
      //  example case: deleteItem(23)
      // This happens when the depth between the node to replace
      //  and the replacement node is 1 or adjacent to each other.
      //   This will result in circular reference, which will
      //    crash prettyPrint()

      repNode.leftNode =
        targetNode.leftNode.val == repNode.val ? null : targetNode.leftNode;
      repNode.rightNode =
        targetNode.rightNode.val == repNode.val ? null : targetNode.rightNode;
      parentRepNode.leftNode = null;

      return true;
    }

    // When all else fails return a 'false' result
    return false;
  }

  // function to return an array of values using breadth first technique
  //  cbFunc is the handle for the callback function
  levelOrderForEach(cbFunc = () => {}, queue = [this.rootNode], result = []) {
    if (typeof cbFunc !== "function") {
      throw new Error("Callback function required");
      return;
    }
    if (queue.length === 0) return result;
    let node = queue.shift();
    result.push(cbFunc(node.val));

    if (node.leftNode != null) queue.push(node.leftNode);
    if (node.rightNode != null) queue.push(node.rightNode);

    return this.levelOrderForEach(cbFunc, queue, result);
  }

  // Using the depthFirst traversal method, I will create a
  // in-order travesal method
  inOrderForEach(cbFunc = () => {}, node = this.rootNode) {
    if (node === null) return [];
    if (typeof cbFunc !== "function") {
      throw new Error("Callback function required");
      return;
    }

    return [
      ...this.inOrderForEach(cbFunc, node.leftNode),
      cbFunc(node.val),
      ...this.inOrderForEach(cbFunc, node.rightNode),
    ];
  }

  preOrderForEach(cbFunc = () => {}, node = this.rootNode) {
    if (node === null) return [];
    if (typeof cbFunc !== "function") {
      throw new Error("Callback function required");
      return;
    }

    return [
      cbFunc(node.val),
      ...this.preOrderForEach(cbFunc, node.leftNode),
      ...this.preOrderForEach(cbFunc, node.rightNode),
    ];
  }

  postOrderForEach(cbFunc = () => {}, node = this.rootNode) {
    if (node === null) return [];
    if (typeof cbFunc !== "function") {
      throw new Error("Callback function required");
      return;
    }

    return [
      ...this.postOrderForEach(cbFunc, node.leftNode),
      ...this.postOrderForEach(cbFunc, node.rightNode),
      cbFunc(node.val),
    ];
  }

  // This will return the overall height of a bst
  heightOverall(node) {
    if (node === undefined) return undefined;
    if (node === null) return -1;

    return (
      Math.max(
        this.heightOverall(node.leftNode),
        this.heightOverall(node.rightNode),
      ) + 1
    );
  }

  // function to return the height of the node in the bst
  height(value) {
    return this.heightOverall(this.find(value));
  }

  depthOverall(node) {
    if (node === undefined) return undefined;
    if (node === null) return 0;
    return (
      Math.max(
        this.depthOverall(node.leftNode),
        this.depthOverall(node.rightNode),
      ) + 1
    );
  }

  // Function to return the overall depth of the tree
  depth(value, node = this.rootNode, count = 0) {
    if (node === null) return undefined;
    if (node.val === value) return count;
    // NOTE:
    // This block (including the return statement) together with the
    //  base case will terminate the recursion.
    let tmpRes = this.depth(value, node.leftNode, count + 1);
    if (tmpRes == undefined) {
      tmpRes = this.depth(value, node.rightNode, count + 1);
    }
    return tmpRes;
  }

  isBalance(node = this.rootNode) {
    if (node === null) return true;
    if (
      Math.abs(
        this.depthOverall(node.leftNode) - this.depthOverall(node.rightNode),
      ) > 1
    ) {
      return false;
    }
    return this.isBalance(node.leftNode) && this.isBalance(node.rightNode);
  }

  rebalance() {
    if (this.rootNode === null) return;
    if (this.isBalance()) {
      console.log("Tree is balanced.");
      return;
    }
    let tmpArray = this.inOrderForEach((x) => x);
    this.buildTree(tmpArray);
  }
}

export { Node, Tree };
