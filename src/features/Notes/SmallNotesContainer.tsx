import { Box, Typography } from "@mui/material";
import type { RootState } from "../../store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import SmallNote from "./SmallNote";


export default function SmallNoteContainer() {

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const notes = useAppSelector((state) => state.notes.notes);
  const favoriteFilterActive = useAppSelector((state) => state.notes.favoriteFilterActive);
  const filteredNotes = notes.filter(note => note.favorite);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={1}
      sx={{

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
        There is no notes yet !
      </Typography>
      }
      {filteredNotes.length === 0 && favoriteFilterActive && <Typography variant="h3" color="textSecondary" align="center" >
        There is no favorite notes yet !
      </Typography>
      }
      {!favoriteFilterActive &&
        notes.map((note) => (
          <SmallNote key={note.id} note={note} />
        ))}
      {favoriteFilterActive &&
        filteredNotes.map(note => <SmallNote key={note.id} note={note} />)
      }

    </Box>
  );

}
