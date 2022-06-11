import { v4 as uuid } from "uuid";
import { useState } from "react";

import "./App.css";
import NoteEditor from "./components/notes/note_editor";
import NotesList from "./components/notes/notes_list";

function App() {
  const blankNote = {
		id: uuid(),
		title: "",
		body: "",
		createdDate: "",
		lastModified: "",
	};
	const n = [
		{
			id: uuid(),
			title: "Buy Groceries",
			body: "Milk, Bread, Apple, Olive oil, Fish, Yogurt",
			createdDate: 1654901504510,
			lastModified: 1654901504510,
		},
		{
			id: uuid(),
			title: "Clean Home",
			body: "Monday - Fridge, Tuesday - Basins/Sinks, Wednesday - Bedsheets",
			createdDate: 1654901528228,
			lastModified: 1654901528228,
		},
		{
			id: uuid(),
			title: "Read books",
			body: "1. You matter, 2. Rich Dad and Poor Dad",
			createdDate: 1654901551005,
			lastModified: 1654901551005,
		},
	];
	const [notes, setNotes] = useState(n);
	const [activeNote, setActiveNote] = useState(
		!notes.length ? blankNote : notes[0]
	);

	const handleActiveNoteChange = (e) => {
		setActiveNote((prevNote) => {
			return { ...prevNote, [e.target.name]: e.target.value };
		});
	};

	const activateNote = (note) => {
		setActiveNote(note);
		setTimeout(() => {
			console.log(activeNote);
		}, 1000);
	};

	const addNote = (note) => {
		if (note.title.trim() || note.body.trim()) {
			// the spread operator to create copy and unshift to insert an item in the beginning
			let newNotes = [...notes];
			newNotes.unshift(note);
			setNotes(newNotes);

			// Set the newly created note as active note
			setActiveNote(note);
		} else {
			console.log("Blank note cannot be added!!");
		}
	};

	const deleteNote = (noteId) => {
		if (noteId) {
			let newNotes = notes.filter((note) => noteId !== note.id);
			setNotes(newNotes);

			// todo: Look at how to do change state of activeNote with notes array
			if (!newNotes.length) {
				setActiveNote(blankNote);
			} else {
				setActiveNote(newNotes[0]);
			}
		}
	};

	const updateNote = (note) => {
		if (note) {
			let newNotes = notes.map((n) => {
				if (n.id === note.id) {
					return { ...n, ...note };
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
					{notes.length ? (
						<>
							<button
								className='add-note'
								onClick={() => {
									setActiveNote(blankNote);
								}}
							>
								New Note
							</button>
							<br />
							<br />
						</>
					) : null}
					<NotesList
						notes={notes}
						activateNote={activateNote}
						activeNote={activeNote}
						handleDeleteNote={deleteNote}
						handleUpdatenote={updateNote}
					/>
				</div>
				<div className='notes-main'>
					<NoteEditor
						handleActiveNoteChange={handleActiveNoteChange}
						handleAddNote={addNote}
						handleUpdateNote={updateNote}
						activeNote={activeNote}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
