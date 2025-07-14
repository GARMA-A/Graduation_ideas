import { Fab, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import type { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { openPopUpWindow } from "./noteSlice";


export default function AddNote() {

  const dispatch = useDispatch<AppDispatch>();
  function handleClick() {
    dispatch(openPopUpWindow());
  }

  return (<>

    <Fab
      color="secondary"
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
