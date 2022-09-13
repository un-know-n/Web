import TasksAPI from '../api/TasksAPI.js';
import DropZone from './DropZone.js';
import Item from './Item.js';

export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      '.kanban__column-title'
    );
    this.elements.items = this.elements.root.querySelector(
      '.kanban__column-items'
    );
    this.elements.addItem =
      this.elements.root.querySelector('.kanban__add-item');

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.items.append(topDropZone);

    this.elements.addItem.addEventListener('click', () => {
      //Add item
      const newItem = TasksAPI.insertItem(id, '');

      this.renderItem(newItem);
    });

    TasksAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
    <div class="kanban__column">
      <div class="kanban__column-title"></div>
      <div class="kanban__column-items"></div>
      <button class="kanban__add-item" type="button">+ Add</button>
    </div>
    `).children[0];
  }

  renderItem(data) {
    //Create the Item instance
    const item = new Item(data.id, data.content);

    this.elements.items.append(item.elements.root);
  }
}
