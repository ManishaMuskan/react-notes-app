import { useState } from "react";
import { v4 as uuid } from "uuid";

// getting fn to add note to notesList from parent component as props
const NoteEditor = ({ handleAddNote }) => {
	const blankNote = {
		id: uuid(),
		title: "",
		body: "",
		createdDate: "",
		lastModified: "",
	};
	const [note, setNote] = useState(blankNote);

	const handleNoteChange = (e) => {
		setNote((prevNote) => {
			return { ...prevNote, [e.target.name]: e.target.value };
		});
	};

	// passing note from child to parent and adding it using callback fn i.e. coming as prop
	const addNote = () => {
		handleAddNote(note);
		setNote(blankNote);
	};

	return (
		<div className='note-editor'>
			<div className='note-editor-body'>
				<input
					type='text'
					name='title'
					placeholder='title...'
					onChange={handleNoteChange}
					value={note.title}
				/>
				<textarea
					name='body'
					placeholder='add your notes here'
					onChange={handleNoteChange}
					value={note.body}
				/>
				<span className='character-limit'>1000 words remaining</span>
			</div>
			<button className='add-note' onClick={addNote}>
				Add Note
			</button>
		</div>
	);
};;

export default NoteEditor;
