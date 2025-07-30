import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { WbSunny, Brightness2, Logout } from '@mui/icons-material';
import { useColorMode } from '../../contexts/useColorMode';
import { useMediaQuery, useTheme } from '@mui/material';
import Favorite from '../Notes/Fovorite';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch } from '../../store';
import { emptySearchQuery, setFavoriteFilterActive } from '../Notes/noteSlice';
import type { RootState } from '../../store';
import { useLogout } from '../Login/query-login';
import ConfirmDialog from './ConfirmDialog';
import { useState } from 'react';



export default function NavBar() {
  const { mode, toggleMode } = useColorMode();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const favoriteFilterActive = useAppSelector((state) => state.notes.favoriteFilterActive)

  const [dialogIsOpen, setDialogIsOpen] = useState(false);



  const { mutate: logoutMut } = useLogout();

  function handleFavoriteClick() {
    if (favoriteFilterActive) {
      dispatch(setFavoriteFilterActive(false));
    } else {
      dispatch(setFavoriteFilterActive(true));
    }
    dispatch(emptySearchQuery());
  }



  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            ria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setDialogIsOpen(true)}
          >
            <Logout />

          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            My Notes
          </Typography>
          <ConfirmDialog open={dialogIsOpen} onConfirm={logoutMut} onClose={() => setDialogIsOpen(false)} />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === 'dark' ? <WbSunny /> : <Brightness2 />}
          </IconButton>
          <IconButton onClick={handleFavoriteClick}>
            {!isSm && <Favorite purpose='filter' favorite={favoriteFilterActive} />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
