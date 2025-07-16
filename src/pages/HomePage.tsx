import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../features/Layout/NavBar";
import { ColorModeProvider } from "../contexts/ThemeContext";
import BottomNavBar from "../features/Layout/BottomNavBar";
import AddNote from "../features/Notes/AddNote";
import { NotePopUpWindow } from "../features/Notes/NotePopUpWindow";
import SearchBar from "../features/Notes/SearchBar";
import FullNoteView from "../features/Notes/FullNoteView";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import SmallNoteContainer from "../features/Notes/SmallNotesContainer";
import { useEffect } from "react";
import { DBreadAllNotes } from "../features/Notes/noteThunks";



export default function HomePage() {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const showFullView = useAppSelector((state) => state.notes.showFullView);
  const isPopupWindowActive = useAppSelector((state) => state.notes.isPopupWindowActive);
  const isLoading = useAppSelector(state => state.notes.isLoading);
  const error = useAppSelector(state => state.notes.error);
  const PopUpWindowOpenFromMenuToEdit = useAppSelector((state) => state.notes.PopUpWindowOpenFromMenuToEdit)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(DBreadAllNotes());
  }, [dispatch]);



  return (
    <ColorModeProvider>
      <NavBar />
      {isSm && <BottomNavBar />}
      <Box
        component="main"
        display="flex"
        justifyContent="center"
        width="100%"
        gap={1}
        overflow="hidden"
      >
        {isPopupWindowActive && < NotePopUpWindow openForEdit={PopUpWindowOpenFromMenuToEdit} />}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="90%"
          sx={{ padding: '16px' }}>

          <SearchBar />
          {!isPopupWindowActive && !PopUpWindowOpenFromMenuToEdit &&
            <Paper sx={{
              padding: '32px',
              width: { xs: '100vw', sm: '80vw', md: '70vw', lg: '65vw' },
            }}
            >
              {showFullView && <FullNoteView />}
              {!showFullView && <SmallNoteContainer />}
              <Box width="100%" display="flex" justifyContent="center">
                {error ? error : ""}
                {!error && isLoading ? "loading" : ""}
              </Box>
            </Paper>
          }

        </Stack>
        <AddNote />

      </Box>
    </ColorModeProvider >);
}

