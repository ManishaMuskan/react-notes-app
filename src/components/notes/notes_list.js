import NotePreview from "./note_preview";

const NotesList = ({ notes, activeNote, activateNote, handleDeleteNote }) => {
	if (notes.length) {
		const notesList = notes.map((note) => {
			return (
				<NotePreview
					note={note}
					key={note.id}
					activeNote={activeNote}
					handleDeleteNote={handleDeleteNote}
					activateNote={activateNote}
				/>
			);
		});
		return <div className='notes-list'>{notesList}</div>;
	} else {
		return <span>No notes added, Add new note</span>;
	}
};

export default NotesList;
