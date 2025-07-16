import { Box, Typography } from "@mui/material";
import type { RootState } from "../../store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import SmallNote from "./SmallNote";


export default function SmallNoteContainer() {

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const notes = useAppSelector((state) => state.notes.notes);
  const favoriteFilterActive = useAppSelector((state) => state.notes.favoriteFilterActive);
  const filteredNotes = notes.filter(note => note.favorite);
  const searchQuery = useAppSelector((state) => state.notes.searchQuery);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={1}
      sx={{
        maxHeight: { sm: 'calc(60vh - 64px)', md: 400, lg: 400 },
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
      {notes.length === 0 || notes.filter(note => !note.favorite).length === 0 && !favoriteFilterActive && <Typography variant="h3" color="textSecondary" align="center" >
        There is no General notes
      </Typography>
      }
      {filteredNotes.length === 0 && favoriteFilterActive && <Typography variant="h3" color="textSecondary" align="center" >
        There is no favorite notes
      </Typography>
      }
      {!favoriteFilterActive && searchQuery.length === 0 &&
        notes.filter(note => !note.favorite).map((note) => (
          <SmallNote key={note.id} note={note} />
        ))}
      {!favoriteFilterActive && searchQuery.length > 0 &&
        notes.filter(note => !note.favorite).filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(note => <SmallNote key={note.id} note={note} />)
      }
      {favoriteFilterActive && searchQuery.length === 0 &&
        filteredNotes.map(note => <SmallNote key={note.id} note={note} />)
      }

      {favoriteFilterActive && searchQuery.length > 0 &&
        filteredNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(note => <SmallNote key={note.id} note={note} />)
      }

    </Box>
  );

}
