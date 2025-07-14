import type { RootState, AppDispatch } from "../../store"


const create = (state: RootState, action) => {
  state.notes.push(action.payload as Note);
}
remove: (state, action) => {
  state.notes = state.notes.filter(note => note.id !== (action.payload as { id: string }).id);
}

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
    closePopUpWindow(state) {
  state.isPopupWindowActive = false;
},
openPopUpWindow(state) {
  state.isPopupWindowActive = true;
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
