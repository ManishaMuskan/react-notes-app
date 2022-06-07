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
		},
		{
			id: uuid(),
			title: "Clean Home",
			body: "Monday - Fridge, Tuesday - Basins/Sinks, Wednesday - Bedsheets",
		},
		{
			id: uuid(),
			title: "Read books",
			body: "1. You matter, 2. Rich Dad and Poor Dad",
		},
	]);

	const addNote = (note) => {
		if (note) {
			// the spread operator to create copy and append an item
			setNotes([...notes, note]);
		}
	};

	return (
		<div className='App'>
			{/* <p>Space for alert, need to be in fixed position</p> */}
			<div className='notes-container'>
				<div className='notes-sidebar'>
					{/* <NotesMenu /> */}
					<NotesList notes={notes} />
				</div>
				<div className='notes-main'>
					<NoteEditor handleAddNote={addNote} />
				</div>
			</div>
		</div>
	);
}

export default App;
