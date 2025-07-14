import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setMenuIsActive, toggleShowFullView } from '../Notes/noteSlice';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../../store';


export default function FullNoteView() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentNote = useAppSelector((state) => state.notes.currentNote);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    dispatch(setMenuIsActive(true));
  };

  const handleMenuClose = () => {
    dispatch(setMenuIsActive(false));
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for note:', currentNote.title);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for note:', currentNote.title);
    handleMenuClose();
  };

  const handleAddToFavorite = () => {
    console.log('Add to Favorite clicked for note:', currentNote.title);
    handleMenuClose();
  };

  const handleClose = () => {
    dispatch(toggleShowFullView());
  };

  return (
    <Card
      sx={{
        color: 'white',
        flexShrink: 0,
        backgroundColor: theme.palette.mode === 'light' ? grey[800] : grey[900],
      }}
    >
      <CardHeader
        action={
          <>
            <IconButton
              onClick={handleMenuClick}
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
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography
              sx={{
                flex: 1,
                mr: 2,
                fontWeight: 'bold',
                backgroundColor: theme.palette.mode === 'light' ? grey[900] : grey[800],
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              {currentNote.title || 'Untitled Note'}

            </Typography>
          </Box>
        }
        sx={{
          '.MuiCardHeader-content': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isSm ? 'start' : 'center',
          },
        }}
      />
      <CardContent
        sx={{
          py: 2,
          '&:last-child': { pb: 2 },
          whiteSpace: 'pre-wrap',
          maxWidth: '600px',
          wordBreak: 'break-word',
        }}
      >
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{currentNote.description}</Typography>
      </CardContent>

      <IconButton
        onClick={handleClose}
        sx={{
          position: 'relative',
          bottom: 6,
          left: 'calc(100% - 48px)',
          color: 'white',
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
}
