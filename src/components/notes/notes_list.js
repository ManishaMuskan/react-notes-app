import NotePreview from "./note_preview";

const NotesList = ({ notes, activeNoteId, handleDeleteNote }) => {
	if (notes.length) {
		const notesList = notes.map((note) => {
			return (
				<NotePreview
					note={note}
					key={note.id}
					classActive={activeNoteId === note.id ? `active` : ``}
					handleDeleteNote={handleDeleteNote}
				/>
			);
		});
		return <div className='notes-list'>{notesList}</div>;
	} else {
		return <span>No notes added, Add new note</span>;
	}
};

export default NotesList;
