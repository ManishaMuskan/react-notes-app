import axios from "axios";
import {
  CREATE_NOTE_URL,
  DELETE_NOTE_BY_ID_URL,
  GET_ALL_NOTES_URL,
  UPDATE_NOTE_BY_ID_URL,
} from "../constants/apis_endpoint";

export const GetAllNotes = async () => {
  try {
    const response = await axios.get(GET_ALL_NOTES_URL);
    return response.data.notes;
  } catch (error) {
    return [];
  }
};

export const CreateNote = async (note) => {
  try {
    const response = await axios.post(CREATE_NOTE_URL, note);
    return response.data.note;
  } catch (error) {
    return error;
  }
};

export const UpdateNote = async (note) => {
  try {
    const response = await axios.put(UPDATE_NOTE_BY_ID_URL(note.id), note);
    return response.data.note;
  } catch (error) {
    return error;
  }
};

export const DeleteNote = async (id) => {
  try {
    const response = await axios.delete(DELETE_NOTE_BY_ID_URL(id));
    return response.data.message;
  } catch (error) {
    return error;
  }
};
