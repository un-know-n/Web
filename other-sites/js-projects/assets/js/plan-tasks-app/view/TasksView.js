import Column from './Column.js';

export default class TasksView {
  constructor(root) {
    this.root = root;
    TasksView.columns().forEach((column) => {
      //Create an instance of Column class
      const columnView = new Column(column.id, column.title);
      this.root.append(columnView.elements.root);
    });
  }

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
