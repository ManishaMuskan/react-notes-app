import { v4 as uuid } from "uuid";
import { useState } from "react";

import "./App.css";
import NoteEditor from "./components/notes/note_editor";
import NotesList from "./components/notes/notes_list";

function App() {
	const [notes, setNotes] = useState([
		{
			id: uuid(),
			title: "Buy Groceries",
			body: "Milk, Bread, Apple, Olive oil, Fish, Yogurt",
			createdDate: "1654786692399",
			lastModified: "1654786692499",
		},
		{
			id: uuid(),
			title: "Clean Home",
			body: "Monday - Fridge, Tuesday - Basins/Sinks, Wednesday - Bedsheets",
			createdDate: "1654786692390",
			lastModified: "1654786692699",
		},
		{
			id: uuid(),
			title: "Read books",
			body: "1. You matter, 2. Rich Dad and Poor Dad",
			createdDate: "1654786692367",
			lastModified: "1654786692599",
		},
	]);
	const [activeNoteId, setActiveNoteId] = useState(null);

	const addNote = (note) => {
		if (note.title || note.body) {
			// the spread operator to create copy and unshift to insert an item in the beginning
			let newNotes = [...notes];
			newNotes.unshift(note);
			setNotes(newNotes);

			// Set the newly created note as active note
			setActiveNoteId(note.id);
		} else {
			console.log("Blank note cannot be added!!");
		}
	};

	const deleteNote = (noteId) => {
		if (noteId) {
			let newNotes = [...notes].filter((note) => noteId !== note.id);
			setNotes(newNotes);
		}
	};

	const updateNote = (note) => {
		if (note) {
			let newNotes = notes.map((n) => {
				if (note.id === n.id) {
					return { ...n, note };
				}
				return n;
			});

			setNotes(newNotes);
		}
	};

	return (
		<div className='App'>
			{/* <p>Space for alert, need to be in fixed position</p> */}
			<div className='notes-container'>
				<div className='notes-sidebar'>
					{/* <NotesMenu /> */}
					<NotesList
						notes={notes}
						activeNoteId={activeNoteId}
						handleDeleteNote={deleteNote}
						handleUpdatenote={updateNote}
					/>
				</div>
				<div className='notes-main'>
					<NoteEditor handleAddNote={addNote} activeNoteId={activeNoteId} />
				</div>
			</div>
		</div>
	);
}

export default App;
