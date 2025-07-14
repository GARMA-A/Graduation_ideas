import { configureStore } from '@reduxjs/toolkit';

import noteSlice from './features/Notes/noteSlice';




const store = configureStore({
  reducer: {
    notes: noteSlice.reducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
