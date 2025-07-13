import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../features/Layout/NavBar";
import { ColorModeProvider } from "../contexts/ThemeContext";
import BottomNavBar from "../features/Layout//BottomNavBar";
import AddNote from "../features/Notes/AddNote";
import AddNotePopUpWindow from "../features/Notes/NotePopUpWindow";
import { useState } from "react";
import SearchBar from "../features/Notes/SearchBar";
import FullNoteView from "../features/Notes/FullNoteView";
// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import type { RootState, AppDispatch } from '../store';



export default function HomePage() {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  // const useAppDispatch = () => useDispatch<AppDispatch>();
  // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  // const dispatch = useAppDispatch();
  // const notes = useAppSelector((state) => state.notes.notes);


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

            <FullNoteView title="this the the full title " description="dsadsdsjdhskjdhskjhdkjshdkshkdjshkdhskdhskahdksjhdkjshdkjshkdskjdhskjdhksjhdksjhdjkshakdjhskjdhskjdhkshdksjhdkjshdksjdhkjshdkjshdjksahkjdhsajkdhsajkhdskhkdjshjkdbskbdshbdhbsahcbksbcbscm,bs,adb,snodioweuwhibsfiusfbhdsfbkdjbfdjbfsiofbsjbfdskfbsaiobsakjasbfkjsbfksabfsajkbfjsabk" />

            {/* <SmallNoteContainer> */}
            {/**/}
            {/*   <SmallNote title="The first title for the first note in my app" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/*   <SmallNote title="the secont title " */}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/*   <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap" */}
            {/**/}
            {/*     description="this is a description for the second title" */}
            {/*   /> */}
            {/**/}
            {/* </SmallNoteContainer> */}
            {/**/}
          </Paper>
        </Stack>
        <AddNote open={open} setOpen={setOpen} />


      </Box>




    </ColorModeProvider >);

}

