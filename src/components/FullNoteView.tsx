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

interface FullViewNoteProps {
  title: string;
  description: string;
}

function getFirst5Words(text: string) {
  return text.split(/\s+/).slice(0, 5).join(' ') + '...';
}

function getFirst15Words(text: string) {
  return text.split(/\s+/).slice(0, 15).join(' ') + '...';
}

function getFirst25Words(text: string) {
  return text.split(/\s+/).slice(0, 25).join(' ') + '...';
}

function getTruncatedTitle(title: string, isSm: boolean, isMd: boolean) {
  if (isSm) {
    return title.length > 5 ? getFirst5Words(title) : title;
  }
  if (isMd) {
    return title.length > 15 ? getFirst15Words(title) : title;
  }
  return title.length > 25 ? getFirst25Words(title) : title;
}

export default function FullNoteView({ title, description }: FullViewNoteProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for note:', title);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for note:', title);
    handleMenuClose();
  };

  const handleAddToFavorite = () => {
    console.log('Add to Favorite clicked for note:', title);
    handleMenuClose();
  };

  const handleClose = () => {
    console.log('Close clicked');
    // Implement close functionality if needed
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
                backgroundColor: theme.palette.mode === 'light' ? grey[800] : grey[800],
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              {getTruncatedTitle(title, isSm, isMd)}
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
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{description}</Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'relative',
            bottom: 2,
            left: 'calc(100% - 48px)',
            color: 'white',
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
