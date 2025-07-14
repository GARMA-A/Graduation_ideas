import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../features/Layout/NavBar";
import { ColorModeProvider } from "../contexts/ThemeContext";
import BottomNavBar from "../features/Layout//BottomNavBar";
import AddNote from "../features/Notes/AddNote";
import AddNotePopUpWindow from "../features/Notes/NotePopUpWindow";
import { useState } from "react";
import SearchBar from "../features/Notes/SearchBar";
import FullNoteView from "../features/Notes/FullNoteView";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';
import SmallNoteContainer from "../features/Notes/SmallNotesContainer";
import SmallNote from "../features/Notes/SmallNote";



export default function HomePage() {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentNote = useAppSelector((state) => state.notes.currentNote)



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
        <AddNotePopUpWindow open={open} setOpen={setOpen} />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="90%"
          sx={{ padding: '16px' }}>

          <SearchBar />
          <Paper sx={{ padding: '32px' }} >
            {/*the full view will add here */}

            {currentNote.showFullView && <FullNoteView />}


            {!currentNote.showFullView && <SmallNoteContainer>

              <SmallNote id="1" title="The first title for the first note in my app"

                description="this is a description for the second title"
                favorite={true}
              />
              <SmallNote id="2" title="the secont title "
                description="this is a description for the second title"
                favorite={false}
              />
              <SmallNote id="3" title="the third title this title will ne used to check the how many words i can put in the title without over lap"
                description="this is a description for the second title"
                favorite={false}
              />

              <SmallNote id="4" title="the third title this title will ne used to check the how many words i can put in the title without over lap"
                description="this is a description for the second title"
                favorite={false}
              />

              <SmallNote id="5" title="the third title this title will ne used to check the how many words i can put in the title without over lap"
                description="this is a description for the second title"
                favorite={false}
              />


            </SmallNoteContainer>}

          </Paper>
        </Stack>
        <AddNote open={open} setOpen={setOpen} />


      </Box>




    </ColorModeProvider >);

}

