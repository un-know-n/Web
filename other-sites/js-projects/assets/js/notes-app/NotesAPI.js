export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNotes(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((note) => note.id == noteToSave.id);

    //Edit existing note
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      //Insert new note
      const index = notes.length - 1;
      noteToSave.id = notes[0] ? index + 1 : 0;
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem('notesapp-notes', JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);
    localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
  }
}
