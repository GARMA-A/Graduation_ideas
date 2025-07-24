import { Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { setSearchQuery } from "./noteSlice";
import { useEffect, useState } from "react";

export default function SearchBar() {

  const dispatch = useDispatch<AppDispatch>();
  const [internalQuery, setInternalQuery] = useState("");


  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(internalQuery));
    }, 300);
    return () => { clearTimeout(handler); }
  }, [dispatch, internalQuery]);

  return (
    <Paper
      sx={{
        marginTop: '8px',
        marginBottom: '8px',
      }}
    >
      <TextField
        placeholder="search for a note"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
        value={internalQuery}
        onChange={(e) => setInternalQuery(e.target.value)}
        sx={{ borderRadius: 3 }}
      />
    </Paper>
  );
}

