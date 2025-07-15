import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { preparDeletePopUpWindow, prepareEditPopUpWindow, remove, setMenuIsActive } from './noteSlice';
import type { AppDispatch } from '../../store';
import type { NoteType } from './NoteType';



export default function ThreeDots({ propNote }: { propNote: NoteType }) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const open = Boolean(anchorEl);


  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(setMenuIsActive(true));
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setMenuIsActive(false));
    setAnchorEl(null);
  };
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose(event);
    dispatch(prepareEditPopUpWindow(propNote));
    console.log("edit the note done")
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose(event);
    dispatch(preparDeletePopUpWindow(propNote));
    dispatch(remove(propNote));
  };


  return (<>
    <IconButton
      onClick={handleMenuClick}
      onMouseDown={(e) => e.stopPropagation()}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isSm ? 'start' : 'center',
      }}
      aria-label="settings"
      aria-controls={open ? 'settings-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="settings-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 1000 }}
    >
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  </>
  );
}



