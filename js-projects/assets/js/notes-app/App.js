/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
// Module import
import NotesView from './NotesView.js';
import NotesAPI from './NotesAPI.js';

/**
 * Stands for configuring the main parts of the app
 *
 * @export
 * @class App
 */
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  /**
   * See renewed notes
   *
   * @memberof App
   */
  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  /**
   * Show the notes to the screen
   *
   * @param {*} notes
   * @memberof App
   */
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  /**
   * Set the active note, which will be shown as the first one
   *
   * @param {*} note
   * @memberof App
   */
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  /**
   * Custom functions to operate the notes
   *
   * @return {Object} Object with all custom functions to manage
   * the notes
   * @memberof App
   */
  _handlers() {
    return {
      onNoteSelect: (noteId) => {
        // Select the note by id
        const selectedNote = this.notes.find((note) => note.id == noteId);

        // Make this note active
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        // Delete current note
        NotesAPI.deleteNote(noteId);

        // Refresh the notes
        this._refreshNotes();
      },
      onNoteAdd: () => {
        // Create a new note with default text
        const newNote = {
          title: 'New Note',
          body: 'Take note...',
        };

        // Save the notes and refresh them
        NotesAPI.saveNotes(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        // Save current note
        NotesAPI.saveNotes({
          id: this.activeNote.id,
          title: title,
          body: body,
        });

        // Refresh the notes
        this._refreshNotes();
      },
    };
  }
}
