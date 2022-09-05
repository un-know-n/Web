const array = [1, 4, 5, 3, 2, 6, 9, 7, 8, 10, 11];
let counter = 0;

//--------Linear search

const linearSearch = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    counter += 1;
    if (array[i] === item) return i;
  }
  return null;
};

// console.log(linearSearch(array, 11));
// console.log('Counter: ', counter);
// count = 0;

//-------Binary search(only sorted array!!!)

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
// count = 0;

//-------Selection sort

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j;
        counter += 1;
      }
    }
    let temp = array[i];
    array[i] = array[indexMin];
    array[indexMin] = temp;
  }
  return array;
};

// console.log(selectionSort(array));
// console.log('Counter: ', counter);
// count = 0;

//-------Bubble sort

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j + 1] < array[j]) {
        counter += 1;
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};

// console.log(bubbleSort(array));
// console.log('Counter: ', counter);
// count = 0;

//-------Quick sort(Hoar's sort)

//Recursion template
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
//End of template

const quickSort = (array) => {
  if (array.length <= 1) return array;
  let pivotIndex = Math.floor(array.length / 2);
  let pivot = array[pivotIndex];
  let less = [];
  let greater = [];
  for (let i = 0; i < array.length; i++) {
    counter += 1;
    if (i === pivotIndex) continue;
    if (array[i] < pivot) less.push(array[i]);
    else greater.push(array[i]);
  }
  return [...quickSort(less), pivot, ...quickSort(greater)];
};

// console.log(quickSort(array));
// console.log('Counter: ', counter);
// count = 0;

//Rewriting part
