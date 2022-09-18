/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
/**
 * Stands for all operations to manipulate the tasks
 *
 * @export
 * @class TasksAPI
 */
export default class TasksAPI {
  /**
   * Take all items from specific column
   *
   * @static
   * @param {number} columnId Id of the column from where you
   * want to take items
   * @return {Array} Array of the column items
   * @memberof TasksAPI
   */
  static getItems(columnId) {
    const column = read().find((column) => column.id == columnId);
    if (!column) {
      return [];
    }
    return column.items;
  }

  /**
   * Insert item into column with its content
   *
   * @static
   * @param {number} columnId Id of the column to which you want to
   * insert the item
   * @param {string} content The content of the item
   * @return {Object} The inserted item
   * @memberof TasksAPI
   */
  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    const item = {
      id: generateId(),
      content: content,
    };

    if (!column) throw new Error('Column doesnt exist');
    column.items.push(item);
    save(data);
    return item;
  }

  /**
   * Update the existing item in the column
   *
   * @static
   * @param {number} itemId Id of the item that needs to be updated
   * @param {Object} newProps The info about the item
   * @memberof TasksAPI
   */
  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId);
        if (item) return [item, column];
      }
    })();

    if (!item) throw new Error('Item not found');

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    // Update column and position

    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find(
        (column) => column.id == newProps.columnId,
      );

      // console.log(targetColumn);
      if (!targetColumn) throw new Error('Target column is not found!');

      // Delete the item from it's current column
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // Move item into it's new column and position
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }

  /**
   * Delete the item by it's id
   *
   * @static
   * @param {number} itemId Id of the item that needs to be deleted
   * @memberof TasksAPI
   */
  static deleteItem(itemId) {
    const data = read();
    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);
      if (item) column.items.splice(column.items.indexOf(item), 1);
    }
    save(data);
  }
}

/**
 * Take the columns and their items from localStorage or create them
 *
 * @return {Array} Array of the objects, each object is a column
 */
function read() {
  const json = localStorage.getItem('kanban-data');
  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }

  return JSON.parse(json);
}

/**
 * Save all the data about columns to the localStorage
 *
 * @param {Array} newData Array with columns and items
 */
function save(newData) {
  localStorage.setItem('kanban-data', JSON.stringify(newData));
}

/**
 * Take the id of every item in the column
 *
 * @return {Array} Array of the id's of every item
 */
function takeIds() {
  const array = read()
    .map((item) => {
      const currItem = item.items;
      const currId = currItem.map((current) => current.id);
      return currId;
    })
    .flat(Infinity);
  return array;
}

/**
 * Generate the pseudo-random id for the item
 *
 * @export
 * @return {number} The id
 */
export function generateId() {
  const idArray = [...takeIds()];
  console.log(idArray);
  const randomId = Math.floor(Math.random() * 100000);
  const overlap = idArray.find((item) => item == randomId);
  return overlap ? generateId() : randomId;
}
