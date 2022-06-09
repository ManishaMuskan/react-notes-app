import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNotesList } from "../../contexts/NotesListContext";

const NoteEditor = () => {
	const [note, setNote] = useState({
		id: uuid(),
		title: "",
		body: "",
	});

	const updateNote = (e) =>
		setNote({ ...note, [e.target.name]: e.target.value });

	const { notes, setNotes } = useNotesList();

	const addNote = () => {
		if (note.title || note.body) {
			setNotes([...notes, note]);
			setNote({
				id: uuid(),
				title: "",
				body: "",
			});
		}
	};

	return (
		<div className='note-editor'>
			<div className='note-editor-body'>
				<input
					type='text'
					name='title'
					placeholder='title...'
					value={note.title}
					onChange={updateNote}
				/>
				<textarea
					name='body'
					placeholder='add your notes here'
					value={note.body}
					onChange={updateNote}
				/>
				<span className='character-limit'>1000 words remaining</span>
			</div>
			<button className='add-note' onClick={addNote}>
				Add Note
			</button>
		</div>
	);
};

export default NoteEditor;
