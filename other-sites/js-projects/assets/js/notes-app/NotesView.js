/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/**
 * Stand for all operations to show the notes on the page
 *
 * @export
 * @class NotesView
 */
export default class NotesView {
  /**
   * Create an instance of NotesView.
   * @param {Element} root The element on the page
   * @param {Object} object Object with custom functions to manipulate
   * the notes
   * @memberof NotesView
   */
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {},
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;
    this.onNoteEdit = onNoteEdit;
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add" type="button">Add Note</button>
        <div class="notes__list"></div>
      </div>
      <div class="notes__preview">
        <input
          class="notes__title"
          type="text"
          placeholder="New note..."
        />
        <textarea class="notes__body">Take note...</textarea>
      </div>
    `;

    // Take the main elements on the preview block
    const btnAddNote = this.root.querySelector('.notes__add');
    const inpTitle = this.root.querySelector('.notes__title');
    const inpBody = this.root.querySelector('.notes__body');

    btnAddNote.addEventListener('click', () => {
      this.onNoteAdd();
    });

    // Create a listener to update the title and body everytime, when user leaves the note
    [inpTitle, inpBody].forEach((item) => {
      item.addEventListener('blur', () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    // Hide the note preview by default
    this.updateNotePreviewVisibility(false);
  }

  /**
   * Generate the note DOM structure in sidebar section
   *
   * @param {string} id Id of the note
   * @param {string} title Title of the note
   * @param {string} body Content of the note
   * @param {Date} updated Last updated time of the note
   * @return {string} The DOM carcas of the element
   * @memberof NotesView
   */
  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notes__list-item" data-note-id="${id}">
        <div class="notes__small-title">${title}</div>
        <div class="notes__small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? '...' : ''}
        </div>
        <div class="notes__small-updated">
        ${updated.toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        })}
        </div>
      </div>
    `;
  }

  /**
   * Update the note list in the sidebar section and set event
   * listeners for each of them
   *
   * @param {*} notes
   * @memberof NotesView
   */
  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector('.notes__list');

    // Empty list
    notesListContainer.innerHTML = '';

    // Create the DOM element for every note
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated),
      );
      notesListContainer.insertAdjacentHTML('beforeend', html);
    }

    // Add select/delete events for each list item
    notesListContainer
      .querySelectorAll('.notes__list-item')
      .forEach((listItem) => {
        // To select the note
        listItem.addEventListener('click', () => {
          this.onNoteSelect(listItem.dataset.noteId);
        });

        // To delete the note
        listItem.addEventListener('dblclick', () => {
          const doDelete = confirm(
            'Are you sure you want to delete this note?',
          );
          if (doDelete) {
            this.onNoteDelete(listItem.dataset.noteId);
          }
        });
      });
  }

  /**
   * Set new active note
   *
   * @param {Object} note Note that need to be set as active one
   * @memberof NotesView
   */
  updateActiveNote(note) {
    this.root.querySelector('.notes__title').value = note.title;
    this.root.querySelector('.notes__body').value = note.body;
    this.root.querySelectorAll('.notes__list-item').forEach((listItem) => {
      listItem.classList.remove('notes__list-item--selected');
    });
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add('notes__list-item--selected');
  }

  /**
   * Show the note in the preview section, depending on visible
   * parameter
   *
   * @param {boolean} visible To toggle the preview of the note
   * @memberof NotesView
   */
  updateNotePreviewVisibility(visible) {
    this.root.querySelector('.notes__preview').style.visibility = visible
      ? 'visible'
      : 'hidden';
  }
}
