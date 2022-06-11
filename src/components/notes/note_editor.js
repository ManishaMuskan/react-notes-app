import AppConstants from "../constants/app_constants";

// getting fn to add note to notesList from parent component as props
const NoteEditor = ({
	handleActiveNoteChange,
	handleAddNote,
	handleUpdateNote,
	activeNote,
}) => {
	const handleNoteChange = (e) => {
		handleActiveNoteChange(e);
	};

	const calculateCharLimit = (noteBody) => {
		return AppConstants.NOTE_BODY_CHARACTER_LIMIT - noteBody.length;
	};

	// passing note from child to parent and adding it using callback fn i.e. coming as prop
	const addOrUpdateNote = () => {
		let noteToBeAdded;
		if (!activeNote.createdDate) {
			noteToBeAdded = { ...activeNote, createdDate: Date.now() };
			handleAddNote(noteToBeAdded);
		} else {
			noteToBeAdded = { ...activeNote, lastModified: Date.now() };
			handleUpdateNote(noteToBeAdded);
		}
	};

	return (
		<div className='note-editor'>
			<div className='note-editor-body'>
				<input
					type='text'
					name='title'
					placeholder='title...'
					onChange={handleNoteChange}
					value={activeNote.title}
				/>
				<textarea
					maxLength={AppConstants.NOTE_BODY_CHARACTER_LIMIT}
					name='body'
					placeholder='add your notes here'
					onChange={handleNoteChange}
					value={activeNote.body}
				/>
				<span className='character-limit'>
					{calculateCharLimit(activeNote.body)} letters remaining
				</span>
			</div>
			<button className='add-note' onClick={addOrUpdateNote}>
				{!activeNote.createdDate ? "Add Note" : "Update Note"}
			</button>
		</div>
	);
};

export default NoteEditor;
