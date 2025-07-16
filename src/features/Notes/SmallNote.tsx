import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  ButtonBase,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { setCurrentNote, toggleShowFullView } from './noteSlice';
import type { NoteType } from './NoteType';
import Favorite from './Fovorite';




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

export default function SmallNote({ note }: { note: NoteType }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const dispatch = useDispatch();


  function handleClick() {
    console.log("small note clicked");
    dispatch(setCurrentNote(note));
    dispatch(toggleShowFullView());

  }

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        textAlign: 'left',
        width: '100%',
        borderRadius: 2,
        display: 'block',
      }}
    >
      <Card
        sx={{
          color: 'white',
          flexShrink: 0,
          backgroundColor: theme.palette.mode === 'light' ? grey[800] : grey[900],
        }}
      >
        <CardHeader
          action={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: isSm ? 'start' : 'center',
              }}>
              <Favorite noteID={note.id} favorite={note.favorite} />
            </Box>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ flex: 1, mr: 2 }}>
                {getTruncatedTitle(note.title, isSm, isMd)}
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
        <CardContent>
          <Typography>{note.description}</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
