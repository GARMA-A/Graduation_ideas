import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddNote() {



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
      <AddIcon />
    </Fab>
  </>);

}
