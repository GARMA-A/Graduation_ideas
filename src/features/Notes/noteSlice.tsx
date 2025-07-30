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
} = noteSlice.actions;



