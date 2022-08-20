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

//Store list items
const listItems = [];

let dragStartIndex;

createList();

//Insert list items into DOM
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

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}

//Swapping items
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].append(itemTwo);
  listItems[toIndex].append(itemOne);
}

//Checck the order of list items
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

check.addEventListener('click', checkOrder);
