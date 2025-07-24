import { Box, Button, Dialog, DialogContent, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { closeDeletePopUpWindow, closePopUpWindow, closePopUpWindowAsEdit } from "./noteSlice";
import { EditOutlined, RemoveCircle } from "@mui/icons-material";
import { DBcreate, DBdelete, DBupdate } from "./noteThunks";
import { useForm } from "react-hook-form";
import type { NoteType } from "./NoteType";





export function NotePopUpWindow({ openForEdit }: { openForEdit: boolean }) {


  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const isPopupWindowActive = useAppSelector((state) => state.notes.isPopupWindowActive);
  const disapleTextFields = useAppSelector((state) => state.notes.disapleTextFields);
  const { register, handleSubmit, formState: { errors } } = useForm<NoteType>({
    defaultValues: {
      _id: openForEdit || disapleTextFields ? currentNote._id : "",
      title: openForEdit || disapleTextFields ? currentNote.title : "",
      description: openForEdit || disapleTextFields ? currentNote.description : "",
      favorite: openForEdit || disapleTextFields ? currentNote.favorite : false,
    }
  });
  const isMessageBig = (input: string) =>
    input.length < 200 || "Message is very Big";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  function handleSubmitNote(data: NoteType) {
    if (openForEdit) {
      dispatch(DBupdate(data));
    } else if (disapleTextFields) {
      dispatch(DBdelete(currentNote._id));
      dispatch(closeDeletePopUpWindow());
    } else {
      if (data.title.trim() === "" || data.description.trim() === "") {
        alert("Title or description cannot be empty");
        return;
      }
      data.favorite = false;
      dispatch(DBcreate(data))
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
        component="form"
        onSubmit={handleSubmit(handleSubmitNote)}
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
            variant="outlined"
            error={errors.title ? !errors.title : false}
            sx={{
              width: { xs: '90%', sm: '500px' },
              '& .MuiFormHelperText-root': {
                backgroundColor: 'transparent',
                marginLeft: 0,
                paddingLeft: 0,
                color: 'red',
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.default,
              }

            }}
            disabled={disapleTextFields ? true : false}
            helperText={errors.title?.message ? errors.title?.message : ""}
            slotProps={{
              formHelperText: {
                sx: {
                  fontSize: '1rem',
                  color: 'error.main',
                  fontWeight: 500,
                }
              }
            }}
            {...register("title", {
              required: "title is Required",
              validate: {
                NoBigMsg: isMessageBig,
              },
            })}
          />

          <TextField
            placeholder="Enter the description"
            multiline
            minRows={8}
            error={errors.description ? !errors.description : false}
            variant="outlined"
            disabled={disapleTextFields ? true : false}
            sx={{
              width: { xs: '90%', sm: '500px' },
              '& .MuiFormHelperText-root': {
                backgroundColor: 'transparent',
                marginLeft: 0,
                paddingLeft: 0,
                color: 'red',
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.default,
              }
            }}
            helperText={errors.description?.message ? errors.description?.message : ""}
            slotProps={{
              formHelperText: {
                sx: {
                  fontSize: '1rem',
                  color: 'error.main',
                  fontWeight: 500,
                }
              }
            }}
            {...register("description")}
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
              endIcon={disapleTextFields ? <RemoveCircle /> : openForEdit ? <EditOutlined /> : <AddIcon />}
              sx={{
                textTransform: 'none',
                width: { xs: '90%', sm: 'auto' },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              type="submit"
            >
              {openForEdit && "Confirm"}
              {!openForEdit && !disapleTextFields && "Create"}
              {disapleTextFields && "Delete"}
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
      </Dialog >
    </>
  );
}
