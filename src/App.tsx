// import NavBar from "./components/NavBar"
import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "./components/NavBar";
// import SearchBar from "./components/SearchBar";
// import SmallNote from "./components/SmallNote";
// import SmallNoteContainer from "./components/SmallNotesContainer";
import { ColorModeProvider } from "./contexts/ThemeContext";
import BottomNavBar from "./components/BottomNavBar";
import AddNote from "./components/AddNote";
import AddNotePopUpWindow from "./components/AddNotePopUpWindow";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SmallNoteContainer from "./components/SmallNotesContainer";
import SmallNote from "./components/SmallNote";



function App() {


  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);



  return (<ColorModeProvider>
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
          <SmallNoteContainer>
            <SmallNote title="The first title for the first note in my app"
              description="This is a description for the first note. It should be short and concise."
            />
            <SmallNote title="the secont title "
              description="This is a description for the second note. It should be short and concise."
            />
            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

            <SmallNote title="the third title this title will ne used to check the how many words i can put in the title without over lap"
              description="This is a description for the third note. It should be short and concise."
            />

          </SmallNoteContainer>

        </Paper>
      </Stack>
      <AddNote open={open} setOpen={setOpen} />


    </Box>




  </ColorModeProvider >);

}

export default App
