import type { AppDispatch } from "../../store";
import { fetchNotesFailure, fetchNotesStart, fetchNotesSuccess } from "./noteSlice";
import type { NoteType } from "./NoteType";

export const fetchAllNotes = () => async (dispatch: AppDispatch) => {

  dispatch(fetchNotesStart());
  try {
    const response = await fetch('https://your-backend.com/api/notes');
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    const data: NoteType[] = await response.json();
    dispatch(fetchNotesSuccess(data));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    dispatch(fetchNotesFailure(message));
  }
};
