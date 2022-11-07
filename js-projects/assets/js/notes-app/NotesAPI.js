/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/**
 * Stands for all operations with notes(reading, writing, deleting)
 *
 * @export
 * @class NotesAPI
 */
export default class NotesAPI {
  /**
   * Take all notes from localStorage and sort them by date
   *
   * @static
   * @return {Array} Array of sorted notes
   * @memberof NotesAPI
   */
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  /**
   * Save/edit the transfered note
   *
   * @static
   * @param {Object} noteToSave Note that need to be saved
   * @memberof NotesAPI
   */
  static saveNotes(noteToSave) {
    // Take all the notes
    const notes = NotesAPI.getAllNotes();

    // See if we already have that note
    const existing = notes.find((note) => note.id == noteToSave.id);

    // If we have, then edit existing note
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      // If not, then insert new note
      const index = notes.length - 1;
      noteToSave.id = notes[0] ? index + 1 : 0;
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    // Renew the array in localStorage
    localStorage.setItem('notesapp-notes', JSON.stringify(notes));
  }

  /**
   * Delete the note by id and renew localStorage
   *
   * @static
   * @param {*} id
   * @memberof NotesAPI
   */
  static deleteNote(id) {
    // Take all notes
    const notes = NotesAPI.getAllNotes();

    // Filter all the notes and take every without ours
    const newNotes = notes.filter((note) => note.id != id);

    // Renew the array in localStorage
    localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
  }
}
