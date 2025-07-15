import { Box, Button, Dialog, DialogContent, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import type { NoteType } from '../Notes/NoteType';
import { closeDeletePopUpWindow, closePopUpWindow, closePopUpWindowAsEdit, create, update } from "./noteSlice";





export function NotePopUpWindow({ openForEdit }: { openForEdit: boolean }) {


  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const isPopupWindowActive = useAppSelector((state) => state.notes.isPopupWindowActive);
  const disapleTextFields = useAppSelector((state) => state.notes.disapleTextFields);


  const [note, setNote] = useState<NoteType>({
    id: openForEdit ? currentNote.id : "",
    title: openForEdit ? currentNote.title : "",
    description: openForEdit ? currentNote.description : "",
    favorite: openForEdit ? currentNote.favorite : false,
  });

  // useEffect(() => {
  //   if (openForEdit && currentNote) {
  //     setNote({
  //       id: currentNote.id,
  //       title: currentNote.title,
  //       description: currentNote.description,
  //       favorite: currentNote.favorite,
  //     });
  //   }
  // }, [openForEdit, currentNote]);


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
      note.id = Date.now().toString();
      note.favorite = false;
      dispatch(create(note))
    }
    handleClose();
  }

  function handleClose() {
    if (openForEdit) {
      dispatch(closePopUpWindowAsEdit());
    } else if (disapleTextFields) {
      dispatch(closeDeletePopUpWindow());
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
        maxWidth="md"
        sx={{
          '& .MuiDialog-container': {
            alignItems: isMobile ? 'stretch' : 'flex-start',
            paddingTop: isMobile ? 0 : '10%',
          }
        }}
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
            disabled={disapleTextFields ? true : false}
          />

          <TextField
            placeholder="Enter the description"
            fullWidth
            multiline
            minRows={8}
            variant="outlined"
            disabled={disapleTextFields ? true : false}
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
              {openForEdit && "Confirm"}
              {!openForEdit && !disapleTextFields && "Create"}
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
