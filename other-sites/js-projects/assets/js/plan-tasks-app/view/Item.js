import TasksAPI from '../api/TasksAPI.js';
import DropZone from './DropZone.js';

export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone();
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      '.kanban__item-input'
    );

    this.elements.root.dataset.id = id;

    //Change the input
    this.elements.input.textContent = content;

    //Add dropzone to every item
    this.elements.root.append(bottomDropZone);
    this.content = content;

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
    this.elements.root.addEventListener('dblclick', () => {
      const check = confirm('Are you sure you want to delete this item?');
      if (!check) return;
      TasksAPI.deleteItem(id);
      this.elements.input.removeEventListener('blur', onBlur);
      this.elements.root.parentElement.removeChild(this.elements.root);
    });
    this.elements.root.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', id);
    });
    this.elements.input.addEventListener('drop', (event) => {
      event.preventDefault();
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
      <div class="kanban__item-input" contenteditable></div>
      </div>
    `).children[0];
  }
}
