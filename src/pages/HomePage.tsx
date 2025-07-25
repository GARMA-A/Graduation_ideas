import { Box, CircularProgress, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../features/Layout/NavBar";
import { ColorModeProvider } from "../contexts/ThemeContext";
import BottomNavBar from "../features/Layout/BottomNavBar";
import AddNote from "../features/Notes/AddNote";
import { NotePopUpWindow } from "../features/Notes/NotePopUpWindow";
import SearchBar from "../features/Notes/SearchBar";
import FullNoteView from "../features/Notes/FullNoteView";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';
import SmallNoteContainer from "../features/Notes/SmallNotesContainer";
import { useNotes } from "../features/Notes/query_fetch";



export default function HomePage() {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, isError, error } = useNotes();


  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const showFullView = useAppSelector((state) => state.notes.showFullView);
  const isPopupWindowActive = useAppSelector((state) => state.notes.isPopupWindowActive);
  const PopUpWindowOpenFromMenuToEdit = useAppSelector((state) => state.notes.PopUpWindowOpenFromMenuToEdit)


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
              {!isLoading && !isError && showFullView && <FullNoteView />}
              {!isLoading && !isError && !showFullView && <SmallNoteContainer />}
              <Box width="100%" display="flex" justifyContent="center">
                {isError && <Typography color="error">{error instanceof Error ? error.message : 'An error occurred'}</Typography>}
                {!isError && isLoading ? <CircularProgress color="info" /> : null}
              </Box>
            </Paper>
          }

        </Stack>
        <AddNote />

      </Box>
    </ColorModeProvider >);
}

