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
import { readAllNotes } from "../features/Notes/noteSlice";
import { useEffect } from "react";

type Notes = {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
}

const NotesArrayForTesting: Notes[] = [
  { id: '1', title: 'Note 1', description: 'This is the first note', favorite: false },
  { id: '2', title: 'Note 2', description: 'This is the second note', favorite: true },
  { id: '3', title: 'Note 3', description: 'This is the third note', favorite: false },
  { id: '4', title: 'Note 4', description: 'This is the fourth note', favorite: true },
  { id: '5', title: 'Note 5', description: 'This is the fifth note', favorite: false },
  { id: '6', title: 'Note 6', description: 'This is the sixth note', favorite: true },
  { id: '7', title: 'Note 7', description: 'This is the seventh note', favorite: false },
  { id: '8', title: 'Note 8', description: 'This is the eighth note', favorite: true },
  { id: '9', title: 'Note 9', description: 'This is the ninth note', favorite: false },
  { id: '10', title: 'Note 10', description: 'This is the tenth note', favorite: true },
];



export default function HomePage() {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const showFullView = useAppSelector((state) => state.notes.showFullView);
  const isPopupWindowActive = useAppSelector((state) => state.notes.isPopupWindowActive);
  const PopUpWindowOpenFromMenuToEdit = useAppSelector((state) => state.notes.PopUpWindowOpenFromMenuToEdit)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(readAllNotes(NotesArrayForTesting));
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
            </Paper>
          }

        </Stack>
        <AddNote />

      </Box>
    </ColorModeProvider >);
}

