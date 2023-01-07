import { Node } from "./Node";

export class BalancedBST {
  array: number[];
  root: Node | null;

  constructor(array: number[]) {
    this.array = array.sort();
    this.root = this.buildTree(this.array);
  }
  buildTree(array: number[] = this.array): Node {
    let sizeArray = array.length;
    let middle = Math.floor((sizeArray - 1) / 2);
    let leftArray = array.slice(0, middle);
    let rightArray = array.slice(middle + 1);

    let currentRoot = new Node(array[middle]);
    if (leftArray.length > 0) {
      currentRoot.left = this.buildTree(leftArray);
    }
    if (rightArray.length > 0) {
      currentRoot.right = this.buildTree(rightArray);
    }
    return currentRoot;
  }
  insert(element: number) {
    let current: Node | null = this.root;
    while (current?.left || current?.right) {
      if (element > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    if (element > current!.value) {
      current!.right = new Node(element);
    } else {
      current!.left = new Node(element);
    }
  }
  prettyPrint = (node: Node | null = this.root, prefix = "", isLeft = true) => {
    if (node?.right !== null) {
      this.prettyPrint(
        node!.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node?.value}`);
    if (node?.left !== null) {
      this.prettyPrint(
        node!.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };
  remove(element: number, current: Node | null = this.root) {
    if (current!.value > element) {
      current!.left = this.remove(element, current?.left);

      return current;
    } else if (current!.value < element) {
      current!.right = this.remove(element, current?.right);
      return current;
    } else {
      if (!current?.left) {
        return current!.right;
      } else if (!current.right) {
        return current!.left;
      }
    }
    current.value = this.minValue(current.right);

    current.right = this.remove(current.value, current.right);
    return current;
  }

  minValue(root: Node) {
    let minv = root?.value;
    while (root?.left != null) {
      minv = root!.left.value;
      root = root!.left;
    }
    return minv;
  }

  find(value: number): Node | null {
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }

  levelOrderTraversal(callback: Function | null = null) {
    if (this.root === null) return;
    const returnArray = [];
    this.prettyPrint();
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback ? callback(node?.value) : returnArray.push(node?.value);
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    return returnArray;
  }

  inOrder(
    callback: Function | null = null,
    node: Node | null = this.root,
    returnArray: number[] = []
  ) {
    if (node == null) return;

    this.inOrder(callback, node.left, returnArray);
    callback
      ? returnArray.push(callback(node.value))
      : returnArray.push(node.value);
    this.inOrder(callback, node.right, returnArray);

    return returnArray;
  }
  preOrder(
    callback: Function | null = null,
    node: Node | null = this.root,
    returnArray: number[] = []
  ) {
    if (node == null) return;
    callback
      ? returnArray.push(callback(node.value))
      : returnArray.push(node.value);
    this.preOrder(callback, node.left, returnArray);

    this.preOrder(callback, node.right, returnArray);

    return returnArray;
  }
  postOrder(
    callback: Function | null = null,
    node: Node | null = this.root,
    returnArray: number[] = []
  ) {
    if (node == null) return;

    this.postOrder(callback, node.left, returnArray);

    this.postOrder(callback, node.right, returnArray);
    callback
      ? returnArray.push(callback(node.value))
      : returnArray.push(node.value);
    return returnArray;
  }

  height(node: Node | null = this.root): number {
    if (node === null) {
      return -1;
    }

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  depth(
    value: number,
    node: Node | null = this.root,
    edgeCount = 0
  ): number | undefined {
    if (node === null) return;
    if (node.value < value) {
      return this.depth(value, node.right, edgeCount + 1);
    } else if (node.value > value) {
      return this.depth(value, node.left, edgeCount + 1);
    } else {
      return edgeCount;
    }
  }

  isBalanced(node: Node | null = this.root): Boolean {
    return Math.abs(this.height(node!.left) - this.height(node!.right)) < 2
      ? true
      : false;
  }

  reBalance(node: Node | null = this.root): void {
    if (!this.isBalanced()) {
      const newArray = this.inOrder()?.sort();
      this.root = this.buildTree(newArray);
    }
  }
}
