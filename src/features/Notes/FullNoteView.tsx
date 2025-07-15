import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { toggleShowFullView } from '../Notes/noteSlice';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../../store';
import ThreeDots from './ThreeDots';


export default function FullNoteView() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentNote = useAppSelector((state) => state.notes.currentNote);

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
            <ThreeDots propNote={currentNote} />
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
