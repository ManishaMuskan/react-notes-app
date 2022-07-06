import { useState } from "react";
import Search from "../search/search";
import Classes from "./notes.module.css";
import NotePreview from "./note_preview";

const NotesList = ({
  notes,
  activeNote,
  activateNote,
  handleDeleteNote,
  showAlert,
  previewMode,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const searchNotes = (e) => {
    setSearchText(e.target.value);
    let copyNotes = [...notes];
    const text = e.target.value.toLowerCase();
    let newNotes = copyNotes.filter((n) =>
      // n.title.toLowerCase().indexOf(text) !== -1 ||
      // n.body.toLowerCase().indexOf(text) !== -1

      // get the values from the object item, converting the values into a string using the join(' '), changing that string values into lowercase,checking if this string includes our search input [alternate of above code]
      Object.values(n).join("").toLowerCase().includes(text)
    );
    setFilteredNotes(newNotes);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const notePreview = (note) => {
    return (
      <NotePreview
        note={note}
        key={note.id}
        activeNote={activeNote}
        handleDeleteNote={handleDeleteNote}
        activateNote={activateNote}
        showAlert={showAlert}
        previewMode={previewMode}
      />
    );
  };

  let notesList;
  if (!searchText.length) {
    notesList = notes.map((note) => notePreview(note));
  } else {
    notesList = filteredNotes.map((note) => notePreview(note));
  }

  return (
    <>
      <Search
        searchText={searchText}
        handleSearchOnChange={searchNotes}
        clearSearch={clearSearch}
      />
      <div className={Classes["notes-list"]}>{notesList}</div>
    </>
  );
};

export default NotesList;
