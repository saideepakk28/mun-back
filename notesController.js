const db = require("./firebaseAdmin");

// Add a new note (Create)
const addNote = async (noteText) => {
  const notesRef = db.ref("notes");
  const newNoteRef = notesRef.push();  // Generate unique ID
  await newNoteRef.set({
    text: noteText,
    createdAt: Date.now(),
  });
  return newNoteRef.key;  // Return the new note ID
};

// Get all notes (Read)
const getNotes = async () => {
  const notesRef = db.ref("notes");
  const snapshot = await notesRef.once("value");
  const data = snapshot.val();

  // Format the data as an array
  const notesArray = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
  return notesArray;
};

// Update a note (Update)
const updateNote = async (noteId, newText) => {
  const noteRef = db.ref(`notes/${noteId}`);
  await noteRef.update({ text: newText });
};

// Delete a note (Delete)
const deleteNote = async (noteId) => {
  const noteRef = db.ref(`notes/${noteId}`);
  await noteRef.remove();
};

module.exports = { addNote, getNotes, updateNote, deleteNote };
