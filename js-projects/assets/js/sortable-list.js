// Main variables and params
const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const mainArr = [
  'Element1',
  'Element2',
  'Element3',
  'Element4',
  'Element5',
  'Element6',
  'Element7',
  'Element8',
  'Element9',
  'Element10',
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

/**
 * Sort and insert list items into DOM
 *
 */
function createList() {
  [...mainArr]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((element, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${element}</p>
      <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggableList.append(listItem);
    });

  addEventListeners();
}

/**
 * Takes the 'data-index' attribute
 *
 */
function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

/**
 * Prevents default behaviour
 *
 * @param {event} e Current event
 */
function dragOver(e) {
  e.preventDefault();
}

/**
 * Swaps the items and remove the 'over' class
 *
 */
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

/**
 * Add the 'over' class
 *
 */
function dragEnter() {
  this.classList.add('over');
}

/**
 * Remove the 'over' class
 *
 */
function dragLeave() {
  this.classList.remove('over');
}

/**
 * Swap the items when dropped
 *
 * @param {number} fromIndex The place from which you need to take
 * @param {number} toIndex The place to which you need to bring
 */
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].append(itemTwo);
  listItems[toIndex].append(itemOne);
}

/**
 * Check the order of list items, add the class to every item when
 * checked
 *
 */
function checkOrder() {
  listItems.forEach((item, index) => {
    const elementName = item.querySelector('.draggable').innerText.trim();

    if (elementName !== mainArr[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
}

// Event Listeners
check.addEventListener('click', checkOrder);

/**
 * Initializes all the items with event listeners on the page
 *
 */
function addEventListeners() {
  // Take all the elements
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  // Add the function for every block
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  // Attach the function for every event to the items on the page
  draggableListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}
