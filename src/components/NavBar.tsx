import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import EditNoteIcon from '@mui/icons-material/EditNote';
import { FavoriteOutlined } from '@mui/icons-material';



export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black', color: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
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
          <Box >
            <IconButton color="inherit"><FavoriteOutlined />
            </IconButton>


          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
