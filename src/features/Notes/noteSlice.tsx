import { createSlice } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  showFullView: boolean;
  showEditView: boolean;
  showCreateView: boolean;
}

interface NoteState {
  notes: Array<Note>;
}

const initialState: NoteState = {
  notes: [],
};


export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    create: (state, action) => {
      state.notes.push(action.payload as Note);
    },
    remove: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== (action.payload as { id: string }).id);
    },
    update: (state, action) => {
      const updatedNote = action.payload as Note;
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    },
    toggleFavorite: (state, action) => {
      const id = (action.payload as { id: string }).id;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.favorite = !note.favorite;
      }
    },
    toggleFullView: (state, action) => {
      const id = (action.payload as { id: string }).id;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.showFullView = !note.showFullView;
      }
    },
    toggleEditView: (state, action) => {
      const id = (action.payload as { id: string }).id;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.showEditView = !note.showEditView;
      }
    },
    toggleCreateView: (state, action) => {
      const id = (action.payload as { id: string }).id;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.showCreateView = !note.showCreateView;
      }
    },
  },

})





