import { Box, Typography } from "@mui/material";
import type { RootState } from "../../store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import SmallNote from "./SmallNote";


export default function SmallNoteContainer() {

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { notes } = useAppSelector((state) => state.notes);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={1}
      sx={{
        width: { xs: '90vw', sm: '80vw', md: '70vw', lg: '65vw' },
        maxHeight: '400px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
      }}
    >
      {notes.length === 0 && <Typography variant="h3" color="textSecondary" align="center" >
        There is no notes yet!
      </Typography>
      }
      {notes.map((note) => (
        <SmallNote key={note.id} noteId={note.id} />
      ))}

    </Box>
  );

}
