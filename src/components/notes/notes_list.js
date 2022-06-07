import NotePreview from "./note_preview";
import { useNotesList } from "../../contexts/NotesListContext";

const NotesList = () => {
	const { notes } = useNotesList();
	const notesList = notes.map((note) => {
		return (
			<NotePreview noteTitle={note.title} noteBody={note.body} key={note.id} />
		);
	});
	return <div className='notes-list'>{notesList}</div>;
};

export default NotesList;
