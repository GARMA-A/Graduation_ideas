import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { WbSunny, Brightness2 } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { FavoriteOutlined } from '@mui/icons-material';
import { useColorMode } from '../contexts/useColorMode';



export default function NavBar() {
  const { mode, toggleMode } = useColorMode();

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
          >
            <EditNoteIcon />

          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            My Notes
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === 'dark' ? <WbSunny /> : <Brightness2 />}
          </IconButton>
          <Box >
            <IconButton color="inherit"><FavoriteOutlined />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
