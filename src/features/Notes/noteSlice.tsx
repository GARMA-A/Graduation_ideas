import { createSlice } from "@reduxjs/toolkit";
import type { NoteType } from "./NoteType";


interface NoteState {
  notes: Array<NoteType>;
  currentNote: NoteType;
  menuIsOpen: boolean;
  isPopupWindowActive: boolean;
  PopUpWindowOpenFromMenuToEdit: boolean;
  disapleTextFields: boolean;
  favoriteFilterActive: boolean;
  searchQuery: string;
  showFullView: boolean;
  showEditView: boolean;
  showCreateView: boolean;
}
const initialState: NoteState = {
  notes: [],
  currentNote: {
    id: '',
    title: '',
    description: '',
    favorite: false,
  },
  menuIsOpen: false,
  isPopupWindowActive: false,
  PopUpWindowOpenFromMenuToEdit: false,
  disapleTextFields: false,
  favoriteFilterActive: false,
  searchQuery: '',
  showFullView: false,
  showEditView: false,
  showCreateView: false,
};


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    readAllNotes: (state, action) => {
      const notes = action.payload as Array<NoteType>;
      state.notes = notes;
    },
    create: (state, action) => {
      const newNote = action.payload as NoteType;
      state.notes = [...state.notes, newNote];
    },
    remove: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== (action.payload as { id: string }).id);
    },
    update: (state, action) => {
      const updatedNote = action.payload as NoteType;
      state.notes = state.notes.map(note =>
        note.id === updatedNote.id ? { ...updatedNote } : note
      );

      if (state.currentNote.id === updatedNote.id) {
        state.currentNote = { ...updatedNote };
      }
    },
    setCurrentNote: (state, action) => {
      const note = action.payload as NoteType;
      state.currentNote = note;
    },
    prepareEditPopUpWindow: (state, action) => {
      const note = action.payload as NoteType;
      state.currentNote = note;
      state.PopUpWindowOpenFromMenuToEdit = true;
      state.isPopupWindowActive = true;
      state.disapleTextFields = false;

    },
    preparDeletePopUpWindow: (state, action) => {
      const note = action.payload as NoteType;
      state.currentNote = note;
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = true;
      state.disapleTextFields = true;
    },
    closeDeletePopUpWindow: (state) => {
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = false;
      state.disapleTextFields = false;
      state.showFullView = false;
    },
    closePopUpWindow(state) {
      state.isPopupWindowActive = false;
      state.disapleTextFields = false;
    },
    openPopUpWindow(state) {
      state.isPopupWindowActive = true;
      state.disapleTextFields = false;
    },
    setSearchQuery: (state, action) => {
      const query = action.payload as string;
      state.searchQuery = query;
    },
    emptySearchQuery: (state) => {
      state.searchQuery = '';
    },
    openPopUpWindowAsEdit(state) {
      state.PopUpWindowOpenFromMenuToEdit = true;
      state.isPopupWindowActive = true;
      state.disapleTextFields = false;

    },
    closePopUpWindowAsEdit(state) {
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = false;
    },
    toggleShowFullView(state) {
      state.showFullView = !state.showFullView;
    },
    toggleFavorite: (state, action) => {
      const id = (action.payload as string);
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.favorite = !note.favorite;
      }
    },
    setFavoriteFilterActive: (state, action) => {
      state.favoriteFilterActive = action.payload as boolean;
    },
    setMenuIsActive: (state, action) => {
      state.menuIsOpen = action.payload as boolean;
    },
    toggleEditView: (state) => {
      state.showEditView = !state.showEditView;

    },
    toggleCreateView: (state) => {
      state.showCreateView = !state.showCreateView;
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
  closeDeletePopUpWindow,
  setFavoriteFilterActive,
  setSearchQuery,
  emptySearchQuery
} = noteSlice.actions;


