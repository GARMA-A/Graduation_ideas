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
  currentNote: Note;
  menueIsOpen: boolean;
}

const initialState: NoteState = {
  notes: [],
  currentNote: {
    id: '',
    title: '',
    description: '',
    favorite: false,
    showFullView: false,
    showEditView: false,
    showCreateView: false
  },
  menueIsOpen: false,
};


const noteSlice = createSlice({
  name: 'notes',
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
    setCurrentNote: (state, action) => {
      const note = action.payload as Note;
      state.currentNote = note;
    },
    toggleShowFullView(state) {
      state.currentNote.showFullView = !state.currentNote.showFullView;
    },
    toggleFavorite: (state, action) => {
      const id = (action.payload as { id: string }).id;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.favorite = !note.favorite;
      }
    },
    setMenuIsActive: (state, action) => {
      state.menueIsOpen = action.payload as boolean;
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

export default noteSlice;

export const {
  create,
  remove,
  update,
  setCurrentNote,
  toggleFavorite,
  toggleEditView,
  toggleCreateView,
  toggleShowFullView,
  setMenuIsActive
} = noteSlice.actions;


