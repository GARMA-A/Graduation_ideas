import type { AppDispatch } from "../../store";
import { createNoteSuccess, deleteNoteSuccess, fetchNotesFailure, fetchNotesStart, fetchNotesSuccess, toggleFavoriteNoteSuccess, updateNoteSuccess } from "./noteSlice";
import type { NoteType } from "./NoteType";

export function DBreadAllNotes() {

  return async function(dispatch: AppDispatch) {

    const apiURL = import.meta.env.VITE_URL;

    dispatch(fetchNotesStart());
    try {
      const response = await fetch(`${apiURL}/api/notes/getAll`);
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

}

export function DBupdate(note: NoteType) {
  return async function(dispatch: AppDispatch) {

    const apiURL = import.meta.env.VITE_URL;
    dispatch(fetchNotesStart());
    try {
      const response = await fetch(`${apiURL}/api/notes/update/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data: NoteType = await response.json();
      dispatch(updateNoteSuccess(data));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(fetchNotesFailure(message));
    }
  };
}

export function DBdelete(noteID: string) {
  return async function(dispatch: AppDispatch) {
    const apiURL = import.meta.env.VITE_URL;
    dispatch(fetchNotesStart());
    try {
      const response = await fetch(`${apiURL}/api/notes/delete/${noteID}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      dispatch(deleteNoteSuccess(noteID));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(fetchNotesFailure(message));
    }
  };
}

export function DBcreate(note: NoteType) {
  return async function(dispatch: AppDispatch) {
    const apiURL = import.meta.env.VITE_URL;
    dispatch(fetchNotesStart());
    try {
      const response = await fetch(`${apiURL}/api/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: note.title, description: note.description, favorite: note.favorite }),
      });
      if (!response.ok) {
        throw new Error('Failed to create note');
      }
      const data: NoteType = await response.json();
      dispatch(createNoteSuccess({ _id: data._id, title: data.title, description: data.description, favorite: data.favorite }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(fetchNotesFailure(message));
    }
  };
}

export function DBtoggleFavorite(noteID: string) {
  return async function(dispatch: AppDispatch) {
    const apiURL = import.meta.env.VITE_URL;
    dispatch(fetchNotesStart());
    try {
      const response = await fetch(`${apiURL}/api/notes/toggleFavorite/${noteID}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }
      dispatch(toggleFavoriteNoteSuccess(noteID));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(fetchNotesFailure(message));
    }
  };
}


