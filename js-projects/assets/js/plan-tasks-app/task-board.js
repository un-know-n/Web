/* eslint-disable import/extensions */
/* eslint-disable no-new */
// Module import
// import TasksAPI from './api/TasksAPI.js';
// import { generateId } from './api/TasksAPI.js';
import TasksView from './view/TasksView.js';

// generateId();
// module.generateId();
// console.log(generateId());

// console.log(TasksAPI.getItems());
// console.log(TasksAPI.insertItem(1, 'Something'));

// TasksAPI.updateItem(0, {
//   columnId: 2,
//   position: 0,
// });

// Create a new taskboard
new TasksView(document.querySelector('.kanban'));