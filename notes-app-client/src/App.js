import { useEffect, useState } from "react";
import "./App.css";
import Accordion from "./components/common_utils/accordion/accordion";
import Alert from "./components/common_utils/alert/alert";
import Classes from "./components/notes/notes.module.css";
import NotesList from "./components/notes/notes_list";
import NotesMenu from "./components/notes/notes_menu";
import NoteEditor from "./components/notes/note_editor";
import AppConstants from "./constants/app_constants";
import { CreateNote, DeleteNote, GetAllNotes, UpdateNote } from "./services/notes.service";

function App() {
  // Note CRUD
  const blankNote = {
    title: "",
    body: "",
    tags: [],
    trashed: false
  };
  const [notes, setNotes] = useState([]);
  const [thrashedNotes, setThrashedNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(
    !notes.length ? blankNote : notes[0]
  );

  const [alert, setAlert] = useState(null);

  const [focusTagInput, setFocusTagInput] = useState(false);
  const [previewMode, setPreviewMode] = useState(
    AppConstants.NOTE_PREVIEW_MODE_GRID
  );

  // Note menu option
  const [sortingOptions, setSortingOptions] = useState([
    {
      text: "Note title",
      key: "title",
      sortingOrder: AppConstants.NOTE_SORTING_ORDER_ASC,
    },
    {
      text: "Note content",
      key: "body",
      sortingOrder: AppConstants.NOTE_SORTING_ORDER_ASC,
    },
    {
      text: "Date Added",
      key: "createdDate",
      sortingOrder: AppConstants.NOTE_SORTING_ORDER_ASC,
    },
    {
      text: "Date Modified",
      key: "lastModified",
      sortingOrder: AppConstants.NOTE_SORTING_ORDER_ASC,
    },
  ]);

  const setNotePreviewMode = (mode) => {
    setPreviewMode(mode);
  };

  const sortNotes = (sortingOption, sortingOrder) => {
    let cloneNotes = [...notes];
    cloneNotes.sort(function (a, b) {
      let x, y;
      if (typeof a[sortingOption] === "string") {
        x = a[sortingOption].toLowerCase();
        y = b[sortingOption].toLowerCase();
      } else {
        x = a[sortingOption];
        y = b[sortingOption];
      }
      if (sortingOrder === AppConstants.NOTE_SORTING_ORDER_ASC) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x < y ? 1 : x > y ? -1 : 0;
      }
    });

    // Toggle the order for the selected option and set 'asc' sorting order for all other options
    let newsortingOptions = sortingOptions.map((opt) => {
      if (opt.key === sortingOption) {
        return {
          ...opt,
          sortingOrder:
            opt.sortingOrder === AppConstants.NOTE_SORTING_ORDER_ASC
              ? AppConstants.NOTE_SORTING_ORDER_DSC
              : AppConstants.NOTE_SORTING_ORDER_ASC,
        };
      } else {
        return {
          ...opt,
          sortingOrder: AppConstants.NOTE_SORTING_ORDER_ASC,
        };
      }
    });
    setSortingOptions([...newsortingOptions]);
    setNotes([...cloneNotes]);
  };

  // Note Preview and Editing
  const activateNote = (note) => {
    setActiveNote(note);
    removeFocusFromTagInput();
  };

  const removeFocusFromTagInput = () => {
    setFocusTagInput(false);
  };

  const setFocusOnTagInput = () => {
    setFocusTagInput(true);
  };

  const addNote = async (note) => {
    const newNote = await CreateNote(note);
    // the spread operator to create copy and unshift to insert an item in the beginning
    console.log(notes);
    let newNotes = [...notes];
    newNotes.unshift(newNote);
    setNotes(newNotes);

    // Set the newly created note as active note
    setActiveNote(newNote);
  };

  const deleteNote = async (noteId) => {
    const ifNoteDeleted = await DeleteNote(noteId);
    if (ifNoteDeleted) {
      let newNotes = notes.filter((note) => {
        if (noteId === note.id) {
          thrashedNotes.push(note);
          return false;
        } else {
          return true;
        }
      });
      setNotes(newNotes);
      setThrashedNotes([...thrashedNotes]);

      // todo: Look at how to do change state of activeNote with notes array, setState is asynchronous operation and setting notes[0] before setting the state of notes array
      if (!newNotes.length) {
        setActiveNote(blankNote);
      } else {
        setActiveNote(newNotes[0]);
      }
    }
  };

  const updateNote = async (note) => {
    const updatedNote = await UpdateNote(note);
    if (updatedNote) {
      let newNotes = notes.map((n) => {
        if (n.id === updatedNote.id) {
          return { ...n, ...updatedNote };
        }
        return n;
      });

      setNotes(newNotes);
    }
  };

  // Alert
  const showAlert = (alertObject) => {
    const defaultProps = {
      alertType: "primary",
      classes: "",
      style: null,
      floatingTime: AppConstants.ALERT_FLOATING_TIME,
      position: "top right",
      message: "",
    };

    setAlert({ ...defaultProps, ...alertObject });
    setTimeout(
      () => {
        dismissAlert();
      },
      alertObject.floatingTime
        ? alertObject.floatingTime
        : AppConstants.ALERT_FLOATING_TIME
    );
  };
  
  const dismissAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    async function fetchNotes() {
      const notes = await GetAllNotes();
      
      setNotes(notes);
    }
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <Alert alert={alert} dismissAlert={dismissAlert}></Alert>

      <div className="notes-container">
        <div className="notes-sidebar">
          <button
            className={Classes["new-note"]}
            onClick={() => {
              setActiveNote(blankNote);
            }}
          >
            New Note
          </button>
          <Accordion
            data={[
              {
                title: "Notes",
                body: notes.length ? (
                  <>
                    <NotesMenu
                      previewMode={previewMode}
                      setNotePreviewMode={setNotePreviewMode}
                      sortingOptions={sortingOptions}
                      sortNotes={sortNotes}
                    />
                    <NotesList
                      notes={notes}
                      activateNote={activateNote}
                      activeNote={activeNote}
                      handleDeleteNote={deleteNote}
                      handleUpdatenote={updateNote}
                      showAlert={showAlert}
                      previewMode={previewMode}
                    />
                  </>
                ) : (
                  <span className={Classes["no-notes-message"]}>
                    No notes added, Add new note
                  </span>
                ),
              },
              {
                title: "Trashed Notes",
                body: thrashedNotes.length ? (
                  thrashedNotes.map((tn, i) => (
                    <div className={Classes["notes-list-preview"]} key={i}>
                      <p className={Classes["notes-content"]}>{tn.title}</p>
                    </div>
                  ))
                ) : (
                  <span className={Classes["no-notes-message"]}>
                    Empty trash
                  </span>
                ),
              },
            ]}
          ></Accordion>
        </div>
        <div className="notes-main">
          <NoteEditor
            activateNote={activateNote}
            handleAddNote={addNote}
            handleUpdateNote={updateNote}
            activeNote={activeNote}
            showAlert={showAlert}
            focusTagInput={focusTagInput}
            setFocusOnTagInput={setFocusOnTagInput}
            removeFocusFromTagInput={removeFocusFromTagInput}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
