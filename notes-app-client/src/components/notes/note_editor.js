import { useRef, useState } from "react";
import AppConstants from "../../constants/app_constants";
import TagNotes from "../tag_notes/tag_notes";
import Classes from "./notes.module.css";

// getting fn to add note to notesList from parent component as props
const NoteEditor = ({
	activateNote,
	handleAddNote,
	handleUpdateNote,
	activeNote,
	focusTagInput,
	setFocusOnTagInput,
	removeFocusFromTagInput,
}) => {
	const childTagInputRef = useRef(null);

	const [, setTags] = useState(); // To update the state so that the component can be rendered when activeNote.tags array changed.

	const handleNoteChange = (e) => {
		let newNote = { ...activeNote, [e.target.name]: e.target.value };
		activateNote(newNote);
		addOrUpdateNote(newNote);
		//optimizedAddOrUpdateNote(newNote);
	};

	const calculateCharLimit = (noteBody) => {
		const charLength = AppConstants.NOTE_BODY_CHARACTER_LIMIT - noteBody.length;
		return charLength > 0 ? charLength : 0;
	};

	const addTag = (tag) => {
		let cloneTags = [...activeNote.tags];
		cloneTags.push(tag);
		activeNote.tags = [...cloneTags];
		setTags(cloneTags);
		addOrUpdateNote(activeNote);
		//optimizedAddOrUpdateNote(activeNote);
	};

	const removeTag = (index) => {
		let cloneTags = [...activeNote.tags];
		cloneTags.splice(index, 1);
		activeNote.tags = [...cloneTags];
		setTags(cloneTags);
		addOrUpdateNote(activeNote);
		//optimizedAddOrUpdateNote(activeNote);
		if (!cloneTags.length) {
			childTagInputRef.current && childTagInputRef.current.focus();
		}
	};

	const addOrUpdateNote = (note) => {
		if (!note.createdDate) {
			if (note.title.trim() || note.body.trim()) {
				handleAddNote(note);
			}
		} else {
			handleUpdateNote(note);
		}
	};

//	const optimizedAddOrUpdateNote = useCallback(debounce(addOrUpdateNote), []);

	return (
		<div className={Classes["note-editor"]}>
			<div className={Classes["note-editor-body"]}>
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
					value={activeNote.body.slice(
						0,
						AppConstants.NOTE_BODY_CHARACTER_LIMIT
					)}
				/>
				<span className={Classes["character-limit"]}>
					{calculateCharLimit(activeNote.body)} letters remaining
				</span>
			</div>
			<TagNotes
				tagsList={activeNote.tags}
				addTag={addTag}
				removeTag={removeTag}
				childTagInputRef={childTagInputRef}
				focusTagInput={focusTagInput}
				setFocusOnTagInput={setFocusOnTagInput}
				removeFocusFromTagInput={removeFocusFromTagInput}
			/>
		</div>
	);
};

export default NoteEditor;
