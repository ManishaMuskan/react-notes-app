const BASE_URL = "http://localhost:4000";

export const GET_ALL_NOTES_URL = `${BASE_URL}/notes`;
export const GET_NOTE_BY_ID_URL = (id) => `${BASE_URL}/notes/${id}`;
export const ADD_NOTE_URL = `${BASE_URL}/notes`;
export const UPDATE_NOTE_BY_ID_URL = (id) => `${BASE_URL}/notes/${id}`;
export const DELETE_NOTE_BY_ID_URL = (id) => `${BASE_URL}/notes/${id}`;
