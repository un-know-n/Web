/* eslint-disable import/extensions */
// Module import
import Column from './Column.js';

/**
 * Stands for all operations with displaying tasks to their columns
 *
 * @export
 * @class TasksView
 */
export default class TasksView {
  /**
   * Creates an instance of TasksView.
   * @param {element} root
   * @memberof TasksView
   */
  constructor(root) {
    this.root = root;
    TasksView.columns().forEach((column) => {
      // Create an instance of Column class
      const columnView = new Column(column.id, column.title);

      // Append the column elements to the DOM
      this.root.append(columnView.elements.root);
    });
  }

  /**
   * Create an array of objects with columns and their title
   *
   * @static
   * @return {Array} Array of objects
   * @memberof TasksView
   */
  static columns() {
    return [
      {
        id: 1,
        title: 'Not Started',
      },
      {
        id: 2,
        title: 'In Progress',
      },
      {
        id: 3,
        title: 'Done',
      },
    ];
  }
}
