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
  isLoading: boolean;
  error: null | string;
}
const initialState: NoteState = {
  notes: [],
  currentNote: {
    _id: '',
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
  isLoading: false,
  error: null,
};


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
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
      state.showFullView = false;
      state.PopUpWindowOpenFromMenuToEdit = false;
      state.isPopupWindowActive = false;
    },
    toggleShowFullView(state) {
      state.showFullView = !state.showFullView;
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
    // fetchNotesStart: (state) => {
    //   state.isLoading = true;
    // },
    // fetchNotesSuccess: (state, action) => {
    //   state.notes = action.payload as Array<NoteType>;
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // updateNoteSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   const updatedNote = action.payload as NoteType;
    //   state.notes = state.notes.map(note =>
    //     note._id === updatedNote._id ? { ...updatedNote } : note
    //   );
    //
    //   if (state.currentNote._id === updatedNote._id) {
    //     state.currentNote = { ...updatedNote };
    //   }
    // },
    // deleteNoteSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   const deletedNoteId = action.payload as string;
    //   state.notes = state.notes.filter(note => note._id !== deletedNoteId);
    //   if (state.currentNote._id === deletedNoteId) {
    //     state.currentNote = {
    //       _id: '',
    //       title: '',
    //       description: '',
    //       favorite: false,
    //     };
    //   }
    //   state.showFullView = false;
    // },
    // createNoteSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.notes.push(action.payload as { _id: string, title: string, description: string, favorite: boolean });
    // },
    // toggleFavoriteNoteSuccess: (state, action) => {
    //   const id = (action.payload as string);
    //   const note = state.notes.find(note => note._id === id);
    //   if (note) {
    //     note.favorite = !note.favorite;
    //   }
    // },
    // fetchNotesFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload as string;
    // },
  },

})

export default noteSlice;

export const {
  setCurrentNote,
  toggleEditView,
  toggleCreateView,
  toggleShowFullView,
  setMenuIsActive,
  openPopUpWindow,
  closePopUpWindow,
  openPopUpWindowAsEdit,
  closePopUpWindowAsEdit,
  prepareEditPopUpWindow,
  preparDeletePopUpWindow,
  closeDeletePopUpWindow,
  setFavoriteFilterActive,
  setSearchQuery,
  emptySearchQuery,
  // fetchNotesStart,
  // fetchNotesFailure,
  // fetchNotesSuccess,
  // updateNoteSuccess,
  // deleteNoteSuccess,
  // createNoteSuccess,
  // toggleFavoriteNoteSuccess
} = noteSlice.actions;



