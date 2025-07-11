import { TextField } from "@mui/material";

export default function SearchBar() {
  return (<TextField
    placeholder="SEARCH for a note"
    variant="outlined"
    sx={{
      border: '2px solid white',
      marginTop: '8px',
      marginBottom: '8px',
      width: {
        xs: '90%',
        md: '50vw',
      },
    }}
    slotProps={{
      input: {
        endAdornment: <span style={{ color: 'white' }}>🔍</span>,
      },
    }}
  />
  );

}
