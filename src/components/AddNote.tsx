import { Fab, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type AddNoteProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};


export default function AddNote({ open, setOpen }: AddNoteProps) {

  function handleClick() {
    setOpen(!open);
  }


  return (<>

    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: { xs: 64, sm: 16 },
        right: 16,
      }}
    >
      <IconButton onClick={handleClick} color="inherit" aria-label="add note">
        <AddIcon />
      </IconButton>
    </Fab>
  </>);

}
