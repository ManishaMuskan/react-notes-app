import "./App.css";

import NoteEditor from "./components/notes/note_editor";
import NotesList from "./components/notes/notes_list";
import { NotesProvider } from "./contexts/NotesListContext";

function App() {
	return (
		<div className='App'>
			{/* <p>Space for alert, need to be in fixed position</p> */}
			<div className='notes-container'>
				<NotesProvider>
					<div className='notes-sidebar'>
						{/* <NotesMenu /> */}
						<NotesList />
					</div>
					<div className='notes-main'>
						<NoteEditor />
					</div>
				</NotesProvider>
			</div>
		</div>
	);
}

export default App;
