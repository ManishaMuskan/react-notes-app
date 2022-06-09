import { createContext, useContext, useState } from "react";

const NotesListContext = createContext();

const useNotesList = () => {
	return useContext(NotesListContext);
};

const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([
		{
			id: "abcd",
			title: "Buy Groceries",
			body: "Milk, Bread, cereals, rice, eggs",
		},
	]);

	return (
		<NotesListContext.Provider value={{ notes, setNotes }}>
			{children}
		</NotesListContext.Provider>
	);
};

export { NotesListContext, useNotesList, NotesProvider };
