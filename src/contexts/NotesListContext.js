import { createContext, useContext, useState } from "react";

const NotesListContext = createContext();

const notesList = [
	{
		id: "abcd",
		title: "Buy Groceries",
		body: "Milk, Bread, cereals, rice, eggs",
	},
];

const useNotesList = () => {
	const [notes, setNotes] = useContext(NotesListContext);
	const notesContextChange = (notes) => {
		setNotes(notes);
	};
	return { notes, notesContextChange };
};

const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState(notesList);
	return (
		<NotesListContext.Provider value={[notes, setNotes]}>
			{children}
		</NotesListContext.Provider>
	);
};

export { NotesListContext, useNotesList, NotesProvider };
