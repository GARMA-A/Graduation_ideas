import { Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Paper

      sx={{
        marginTop: '8px',
        marginBottom: '8px',
      }}
    >
      <TextField
        placeholder="SEARCH for a note"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}

      />
    </Paper>
  );

}
