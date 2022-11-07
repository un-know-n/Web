/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
// Module import
import TasksAPI from '../api/TasksAPI.js';
import DropZone from './DropZone.js';

/**
 * Stands for all operations with items manipulations on the page
 *
 * @export
 * @class Item
 */
export default class Item {
  /**
   * Creates an instance of Item.
   * @param {*} id Id of the item
   * @param {string} content Content of the item
   * @memberof Item
   */
  constructor(id, content) {
    // Create an item's dropzone
    const bottomDropZone = DropZone.createDropZone();
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      '.kanban__item-input',
    );

    // Attach an id to the item
    this.elements.root.dataset.id = id;

    // Change the input
    this.elements.input.textContent = content;

    // Add dropzone to every item
    this.elements.root.append(bottomDropZone);
    this.content = content;

    /**
     * Update item if the blur event happened
     *
     * @return {*}
     */
    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();

      if (newContent == this.content) return;
      this.content = newContent;
      TasksAPI.updateItem(id, {
        content: this.content,
      });

      // console.log(this.content);
      // console.log(newContent);
    };

    this.elements.input.addEventListener('blur', onBlur);

    // Delete the item if dblclick event happened
    this.elements.root.addEventListener('dblclick', () => {
      const check = confirm('Are you sure you want to delete this item?');
      if (!check) return;
      TasksAPI.deleteItem(id);
      this.elements.input.removeEventListener('blur', onBlur);
      this.elements.root.parentElement.removeChild(this.elements.root);
    });

    // Take the id from the item when started dragging
    this.elements.root.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', id);
    });

    // Prevent the default actions when dropping
    this.elements.input.addEventListener('drop', (event) => {
      event.preventDefault();
    });
  }

  /**
   * Generate a DOM structure for the item
   *
   * @static
   * @return {element}
   * @memberof Item
   */
  static createRoot() {
    // Create document fragment
    const range = document.createRange();

    // Select the body node
    range.selectNode(document.body);

    // Ready DOM structure for the item
    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
      <div class="kanban__item-input" contenteditable></div>
      </div>
    `).children[0];
  }
}
