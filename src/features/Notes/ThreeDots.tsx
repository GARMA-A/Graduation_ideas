import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { openPopUpWindowAsEdit, remove, setMenuIsActive } from './noteSlice';
import type { AppDispatch } from '../../store';

export default function ThreeDots({ id }: { id: string }) {

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
  const handleMenuClose = () => {
    dispatch(setMenuIsActive(false));
    setAnchorEl(null);
  };
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    dispatch(openPopUpWindowAsEdit());
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    dispatch(remove(id));
  };

  const handleAddToFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Add to Favorite clicked for note:');
    handleMenuClose();
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
      <MenuItem onClick={handleAddToFavorite}>Add to Favorite</MenuItem>
    </Menu>
  </>
  );
}



