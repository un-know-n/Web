/* eslint-disable func-names */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const array = [1, 4, 5, 3, 2, 6, 9, 7, 8, 10, 11];
const hugeArray = [
  20, 64, -46, 56, 59, 16, -37, -11, 40, 28, 2, 42, -31, -20, 19, 26, -35, 99,
  -40, 46, 51, 40, 41, -43, -19, -43, 93, -18, -13, -41, 59, -22, 73, 83, 14,
  58, -12, 87, 16, 72, 87, 99, -39, 6, 18, -44, 63, -22, -30, -46,
];
let counter = 0;

// --------------Search-----------------

// --------Linear search(most inefficient)

const linearSearch = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    counter += 1;
    if (array[i] === item) return i;
  }
  return null;
};

// console.log(linearSearch(array, 11));
// console.log('Counter: ', counter);
// counter = 0;

// -------Binary search(only sorted array!!!)

const binarySearch = (sortedArray, item) => {
  let start = 0;
  let end = sortedArray.length;
  let middle;
  let found = false;
  let position = -1;
  while (found === false && start <= end) {
    counter += 1;
    middle = Math.floor((start + end) / 2);
    if (array[middle] === item) {
      found = true;
      position = middle;
    } else if (array[middle] > item) end = middle - 1;
    else start = middle + 1;
  }
  console.log(sortedArray);
  return position;
};

// console.log(
//   binarySearch(
//     array.sort((a, b) => a - b),
//     8
//   )
// );

// console.log('Counter: ', counter);
// counter = 0;

// ----------------Sort---------------

// -------Selection sort(3-4 times faster than bubble sort)

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j;
        counter += 1;
      }
    }
    const temp = array[i];
    array[i] = array[indexMin];
    array[indexMin] = temp;
  }
  return array;
};

// console.log(selectionSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// -------Bubble sort(most inefficient)

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j + 1] < array[j]) {
        counter += 1;
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};

// console.log(bubbleSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// ---------Shaker sort(the same as bubble sort)

const shakerSort = (array) => {
  let i = 0;
  let j = array.length - 1;
  let s = true;
  let t;
  while (i < j && s) {
    s = false;
    for (let k = i; k < j; k++) {
      if (array[k] > array[k + 1]) {
        counter += 1;
        t = array[k];
        array[k] = array[k + 1];
        array[k + 1] = t;
        s = true;
      }
    }
    j--;
    if (s) {
      s = false;
      for (let k = j; k > i; k--) {
        if (array[k] < array[k - 1]) {
          counter += 1;
          t = array[k];
          array[k] = array[k - 1];
          array[k - 1] = t;
          s = true;
        }
      }
    }
    i++;
  }
  return array;
};

// console.log(shakerSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// -------Comb sort(update version of bubble sort, as efficient as Selection sort)

function combSort(array) {
  const factor = 1.247;
  let step = array.length - 1;

  while (step >= 1) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] > array[i + step]) {
        counter += 1;
        const temp = array[i];
        array[i] = array[i + step];
        array[i + step] = temp;
      }
    }
    step = Math.floor(step / factor);
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      if (array[j + 1] < array[j]) {
        counter += 1;
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

// console.log(combSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// -------Insertion sort(almost same to bubble sort)

const insertionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let index = i - 1;
    const temp = array[i];
    counter += 1;
    while (index >= 0 && array[index] > temp) {
      array[index + 1] = array[index];
      index--;
    }
    array[index + 1] = temp;
  }
  return array;
};

// console.log(insertionSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// -------Merge sort (three times faster than bubble sort)

const merge = (arrFirst, arrSecond) => {
  const arrSort = [];
  let i = 0;
  let j = 0;

  // compare two arrays, pushing the pointers by the way
  while (i < arrFirst.length && j < arrSecond.length) {
    counter += 1;
    arrSort.push(arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++]);
  }

  // process the last element with different length of the arrays and return one sorted array
  return [...arrSort, ...arrFirst.slice(i), ...arrSecond.slice(j)];
};

const mergeSort = (arr) => {
  // Look if the data is correct
  if (!arr || !arr.length) return null;
  // If the array contains one element - just return it
  if (arr.length <= 1) return arr;

  // Looking for the middle of the array and divide it on half, also push it to different arrays
  const middle = Math.floor(arr.length / 2);
  const arrLeft = arr.slice(0, middle);
  const arrRight = arr.slice(middle);

  // For new arrays call the sort and return the whole array again
  return merge(mergeSort(arrLeft), mergeSort(arrRight));
};

// console.log(mergeSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// -------Quick sort(Hoar's sort)

// Recursion template
// const factorial = (n) => {
//   if (n === 1) return n;
//   return n * factorial(n - 1);
// };

// console.log(factorial(5));

// const fibonachi = (n) => {
//   if (n === 1 || n === 2) return n;
//   return fibonachi(n - 1) + fibonachi(n - 2);
// };

// console.log(fibonachi(8));
// End of template

const quickSort = (array) => {
  if (array.length <= 1) return array;
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];
  const less = [];
  const greater = [];
  for (let i = 0; i < array.length; i++) {
    counter += 1;
    if (i === pivotIndex) continue;
    if (array[i] < pivot) less.push(array[i]);
    else greater.push(array[i]);
  }
  return [...quickSort(less), pivot, ...quickSort(greater)];
};

// console.log(quickSort(hugeArray));
// console.log('Counter: ', counter);
// counter = 0;

// --------------------Graphs---------------------

// ----------Search in wide
// const graph = {};
// graph.a = ['b', 'c'];
// graph.b = ['f'];
// graph.c = ['d', 'e'];
// graph.d = ['f'];
// graph.e = ['f'];
// graph.f = ['g'];

const wideSearch = (graph, start, end) => {
  let queue = [];
  queue.push(start);
  while (queue.length > 0) {
    const current = queue.shift();
    if (!graph[current]) graph[current] = [];
    if (graph[current].includes(end)) return true;
    queue = [...queue, ...graph[current]];
  }
};

// console.log(wideSearch(graph, 'a', 'g'));

// ------------------Trees------------------

const tree = [
  {
    v: 5,
    c: [
      {
        v: 10,
        c: [
          {
            v: 11,
          },
        ],
      },
      {
        v: 7,
        c: [
          {
            v: 5,
            c: [
              {
                v: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    v: 5,
    c: [
      {
        v: 10,
      },
      {
        v: 34,
      },
    ],
  },
];

const recursiveTree = (tree) => {
  let sum = 0;
  tree.forEach((node) => {
    sum += node.v;
    if (!node.c) return node.v;
    sum += recursiveTree(node.c);
  });
  return sum;
};

const iterativeTree = (tree) => {
  if (!tree.length) return 0;
  let sum = 0;
  const stack = [];
  tree.forEach((node) => stack.push(node));
  while (stack.length) {
    const node = stack.pop();
    sum += node.v;
    if (node.c) {
      node.c.forEach((node) => stack.push(node));
    }
  }
  return sum;
};

// console.log(recursiveTree(tree));
// console.log(iterativeTree(tree));

// ---------Cash some data-----------

const cashFunction = (fn) => {
  const cash = {};
  return function (n) {
    if (cash[n]) {
      console.log('Taken from the cash: ', cash[n]);
      return cash[n];
    }
    const result = fn(n);
    console.log('Calculated for the first time: ', result);
    cash[n] = result;
    return result;
  };
};

const factorial = (n) => {
  let result = 1;
  while (n !== 1) {
    result *= n;
    n--;
  }
  return result;
};

const cashFactorial = cashFunction(factorial);

// cashFactorial(5);
// cashFactorial(5);
// cashFactorial(5);
// cashFactorial(5);
// cashFactorial(5);
// cashFactorial(5);

// ---------Simple Linked List realization

class LinkedList {
  constructor() {
    this.size = 0;
    this.root = null;
  }

  add(value) {
    // if we have no node, then the root will be our first node
    if (this.size === 0) {
      this.root = new Node(value);
      this.size += 1;
      return true;
    }
    // take the very first node
    let node = this.root;
    // Iteration while we have nodes in list
    while (node.next) {
      node = node.next;
    }
    // creation of the new node
    const newNode = new Node(value);
    // assign the new node to the end of the list
    node.next = newNode;
    // increment the size of the list
    this.size += 1;
  }

  getSize() {
    return this.size;
  }

  print() {
    const result = [];
    // take the very first node
    let node = this.root;
    // while we have node, push it to resulting array
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    console.log(result);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// const list = new LinkedList();
// list.add(1);
// list.add(2);
// list.add(3);
// list.add(4);
// list.add(5);
// list.add(6);
// list.print();
// console.log(list);

// ---------Simple Binary Tree realization

class BinaryTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (!this.root) {
      this.root = new treeNode(value);
    } else {
      let node = this.root;
      const newNode = new treeNode(value);
      while (node) {
        if (value > node.value) {
          if (!node.right) break;
          node = node.right;
        } else {
          if (!node.left) break;
          node = node.left;
        }
      }
      if (value > node.value) node.right = newNode;
      else node.left = newNode;
    }
  }

  print(root = this.root) {
    if (!root) return true;
    console.log(root.value);
    this.print(root.left);
    this.print(root.right);
  }
}

class treeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// const binaryTree = new BinaryTree();
// binaryTree.add(1);
// binaryTree.add(5);
// binaryTree.add(2);
// binaryTree.add(3);
// binaryTree.add(6);
// binaryTree.add(4);
// binaryTree.print();

// ---------Rewriting part

// Binary search in recursive way

const recursiveBinarySearch = (array, item, start, end) => {
  const middle = Math.floor((start + end) / 2);
  counter += 1;
  if (counter > array.length) return -1;
  if (item === array[middle]) return middle;
  if (item < array[middle]) {
    return recursiveBinarySearch(array, item, start, middle - 1);
  }
  return recursiveBinarySearch(array, item, middle + 1, end);
};

// console.log(
//   recursiveBinarySearch(
//     array.sort((a, b) => a - b),
//     11,
//     0,
//     array.length
//   )
// );
// console.log('Counter: ', counter);
// counter = 0;
