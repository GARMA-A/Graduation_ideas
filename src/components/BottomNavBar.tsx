import { BottomNavigationAction } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BottomNavBar() {



  return (<>
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000 }}
      showLabels
    >
      <BottomNavigationAction label='Home' icon={<HomeIcon />} />
      <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
    </BottomNavigation >


  </>);


}
