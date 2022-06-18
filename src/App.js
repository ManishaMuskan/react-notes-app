import { v4 as uuid } from "uuid";
import { useState } from "react";

import "./App.css";
import NOTES from "./seeds/notes";
import NoteEditor from "./components/notes/note_editor";
import NotesList from "./components/notes/notes_list";
import Alert from "./components/common_utils/alert/alert";
import AppConstants from "./constants/app_constants";

function App() {
	// Note CRUD
	const blankNote = {
		id: uuid(),
		title: "",
		body: "",
		createdDate: "",
		lastModified: "",
	};
	const [notes, setNotes] = useState(NOTES);
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
	};

	const addNote = (note) => {
		// the spread operator to create copy and unshift to insert an item in the beginning
		let newNotes = [...notes];
		newNotes.unshift(note);
		setNotes(newNotes);

		// Set the newly created note as active note
		setActiveNote(note);
	};

	const deleteNote = (noteId) => {
		if (noteId) {
			let newNotes = notes.filter((note) => noteId !== note.id);
			setNotes(newNotes);

			// todo: Look at how to do change state of activeNote with notes array, setState is asynchronous operation and setting notes[0] before setting the state of notes array
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

	// Alert
	const [alert, setAlert] = useState(null);

	const showAlert = (alertObject) => {
		const defaultProps = {
			alertType: "primary",
			classes: "",
			style: null,
			floatingTime: AppConstants.ALERT_FLOATING_TIME,
			position: "top right",
			message: "",
		};

		setAlert({ ...defaultProps, ...alertObject });
		setTimeout(
			() => {
				dismissAlert();
			},
			alertObject.floatingTime
				? alertObject.floatingTime
				: AppConstants.ALERT_FLOATING_TIME
		);
	};

	const dismissAlert = () => {
		setAlert(null);
	};

	return (
		<div className='App'>
			{/* <p>Space for alert, need to be in fixed position</p> */}
			<Alert alert={alert} dismissAlert={dismissAlert}></Alert>

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
						showAlert={showAlert}
					/>
				</div>
				<div className='notes-main'>
					<NoteEditor
						handleActiveNoteChange={handleActiveNoteChange}
						handleAddNote={addNote}
						handleUpdateNote={updateNote}
						activeNote={activeNote}
						showAlert={showAlert}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
