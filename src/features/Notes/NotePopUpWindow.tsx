import { Box, Button, Dialog, DialogContent, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { closePopUpWindow, closePopUpWindowAsEdit, create, update } from "./noteSlice";


type noteType = {
  id: string,
  title: string,
  description: string,
  favorite: boolean
}



export function NotePopUpWindow({ openForEdit = false }: { openForEdit?: boolean }) {


  const dispatch = useDispatch<AppDispatch>();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { currentNote, isPopupWindowActive } = useAppSelector((state) => state.notes);

  const [note, setNote] = useState<noteType>({
    id: "",
    title: openForEdit ? currentNote.title : "",
    description: openForEdit ? currentNote.description : "",
    favorite: false
  });


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  function handleSubmitNote() {
    if (note.title.trim() === "" || note.description.trim() === "") {
      alert("Title or description cannot be empty");
      return;
    }
    if (openForEdit) {
      dispatch(update(note));
    } else {
      note.id = note.title
      note.favorite = false;
      dispatch(create(note))
    }

    console.log("Submitting note:", note);
  }

  function handleClose() {
    if (openForEdit) {
      dispatch(closePopUpWindowAsEdit());
    } else {
      dispatch(closePopUpWindow());
    }
  }

  return (
    <>
      <Dialog
        open={isPopupWindowActive}
        onClose={handleClose}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            height: '100%',
            width: '100%',
            padding: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <TextField
            placeholder="Enter the title"
            fullWidth
            variant="outlined"
            sx={{
              width: { xs: '90%', sm: '500px' },
              backgroundColor: theme.palette.background.default,
            }}
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />

          <TextField
            placeholder="Enter the description"
            fullWidth
            multiline
            minRows={8}
            variant="outlined"
            sx={{
              width: { xs: '90%', sm: '500px' },

              backgroundColor: theme.palette.background.default,
            }}

            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />


          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                width: { xs: '90%', sm: 'auto' },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              onClick={handleSubmitNote}
            >
              Create
            </Button>

            <Button
              variant="outlined"
              size="large"
              endIcon={<CancelIcon />}
              sx={{
                textTransform: 'none',
                width: { xs: '90%', sm: 'auto' },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
