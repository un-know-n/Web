/* eslint-disable import/extensions */
// Module import
import TasksAPI from '../api/TasksAPI.js';
import DropZone from './DropZone.js';
import Item from './Item.js';

/**
 * Stands for every operation with column that can be shown on page
 * (create a new item, render the items)
 *
 * @export
 * @class Column
 */
export default class Column {
  /**
   * Creates an instance of Column.
   * @param {string} id
   * @param {string} title
   * @memberof Column
   */
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();

    this.elements = {};

    // Create a column
    this.elements.root = Column.createRoot();

    // Take the main elements
    this.elements.title = this.elements.root.querySelector(
      '.kanban__column-title',
    );
    this.elements.items = this.elements.root.querySelector(
      '.kanban__column-items',
    );
    this.elements.addItem =
      this.elements.root.querySelector('.kanban__add-item');

    // Set the attributes
    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.items.append(topDropZone);

    this.elements.addItem.addEventListener('click', () => {
      // Add item
      const newItem = TasksAPI.insertItem(id, '');

      // Create item in the column
      this.renderItem(newItem);
    });

    TasksAPI.getItems(id).forEach((item) => {
      // Recreate the items
      this.renderItem(item);
    });
  }

  /**
   * Create the column itself
   *
   * @static
   * @return {range}
   * @memberof Column
   */
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

  /**
   * Create an instance of item and append it into DOM
   *
   * @param {Object} data The item's data
   * @memberof Column
   */
  renderItem(data) {
    // Create the Item instance
    const item = new Item(data.id, data.content);

    // Append the item to the DOM
    this.elements.items.append(item.elements.root);
  }
}
