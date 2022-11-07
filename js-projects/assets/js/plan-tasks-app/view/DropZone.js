/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
// Module import
import TasksAPI from '../api/TasksAPI.js';

/**
 * Stands for all operations to manipulate the dropzone on the page
 *
 * @export
 * @class DropZone
 */
export default class DropZone {
  /**
   * Create and set the dropzone listeners
   *
   * @static
   * @return {element}
   * @memberof DropZone
   */
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
      <div class="kanban__dropzone"></div>
    `).children[0];

    // Adding active class to dropzone when over
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('kanban__dropzone--active');
    });

    // Remove active class when over
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('kanban__dropzone--active');
    });

    // Translate item when dropped
    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('kanban__dropzone--active');

      // Take all params
      const columnElement = dropZone.closest('.kanban__column');
      const columnId = Number(columnElement.dataset.id);
      const dropZonesInColumn = Array.from(
        columnElement.querySelectorAll('.kanban__dropzone'),
      );

      const droppedIndex = dropZonesInColumn.indexOf(dropZone);
      const itemId = Number(event.dataTransfer.getData('text/plain'));
      const droppedItemElement = document.querySelector(
        `[data-id="${itemId}"]`,
      );
      const insertAfter = dropZone.parentElement.classList.contains(
        'kanban__item',
      )
        ? dropZone.parentElement
        : dropZone;

      // If dropping to the same place, then return
      if (droppedItemElement.contains(dropZone)) return;

      // Insert current item after the element
      insertAfter.after(droppedItemElement);

      // Update the item in current column
      TasksAPI.updateItem(itemId, {
        columnId: columnId,
        position: droppedIndex,
      });

      // console.log(droppedItemElement);
      // console.log(columnElement, columnId);
    });

    return dropZone;
  }
}
