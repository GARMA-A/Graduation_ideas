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
  isPopupWindowActive: boolean;
  PopUpWindowOpenFromMenuToEdit: boolean;
  disapleTextFields: boolean;
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
    showCreateView: false,
  },
  menueIsOpen: false,
  isPopupWindowActive: false,
  PopUpWindowOpenFromMenuToEdit: false,
  disapleTextFields: false
};


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    readAllNotes: (state, action) => {
      const notes = action.payload as Array<Note>;
      state.notes = notes;
    },
    create: (state, action) => {
      const newNote = action.payload as Note;
      state.notes = [...state.notes, newNote];
    },
    remove: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== (action.payload as { id: string }).id);
    },
    update: (state, action) => {
      const updatedNote = action.payload as Note;
      state.notes = state.notes.map(note =>
        note.id === updatedNote.id ? { ...updatedNote } : note
      );

      if (state.currentNote.id === updatedNote.id) {
        state.currentNote = { ...updatedNote };
      }
    },
    setCurrentNote: (state, action) => {
      const note = action.payload as Note;
      state.currentNote = note;
    },
    prepareEditPopUpWindow: (state, action) => {
      const note = action.payload as Note;
      state.currentNote = note;
      state.PopUpWindowOpenFromMenuToEdit = true;
      state.isPopupWindowActive = true;

    },
    preparDeletePopUpWindow: (state, action) => {
      const note = action.payload as Note;
      state.currentNote = note;
      state.PopUpWindowOpenFromMenuToEdit = true;
      state.isPopupWindowActive = true;
      state.disapleTextFields = true;
    },
    closeDeletePopUpWindow: (state) => {
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = false;
      state.disapleTextFields = false;
    },
    closePopUpWindow(state) {
      state.isPopupWindowActive = false;
    },
    openPopUpWindow(state) {
      state.isPopupWindowActive = true;
    },
    openPopUpWindowAsEdit(state) {
      state.PopUpWindowOpenFromMenuToEdit = true;
      state.isPopupWindowActive = true;

    },
    closePopUpWindowAsEdit(state) {
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = false;
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
  setMenuIsActive,
  openPopUpWindow,
  closePopUpWindow,
  openPopUpWindowAsEdit,
  closePopUpWindowAsEdit,
  prepareEditPopUpWindow,
  readAllNotes,
  preparDeletePopUpWindow,
  closeDeletePopUpWindow
} = noteSlice.actions;


