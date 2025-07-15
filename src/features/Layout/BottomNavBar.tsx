import { BottomNavigationAction } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from '@mui/icons-material/Home';
import Favorite from "../Notes/Fovorite";
import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { emptySearchQuery, setFavoriteFilterActive } from "../Notes/noteSlice";
import { useSelector } from "react-redux";

export default function BottomNavBar() {

  const dispatch = useDispatch<AppDispatch>();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const favoriteFilterActive = useAppSelector((state) => state.notes.favoriteFilterActive);

  function handleHomeIconClick() {
    dispatch(setFavoriteFilterActive(false));
    dispatch(emptySearchQuery());
  }

  function handleFavoriteIconClick() {
    dispatch(setFavoriteFilterActive(true));
    dispatch(emptySearchQuery());
  }


  return (<>
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000, padding: 0 }}
      showLabels>
      <BottomNavigationAction onClick={handleHomeIconClick} label='Home' icon={<HomeIcon color={!favoriteFilterActive ? "info" : "inherit"} />} />
      <BottomNavigationAction onClick={handleFavoriteIconClick} label='Favorites' icon={<Favorite purpose="filter" favorite={favoriteFilterActive} />} />
    </BottomNavigation >


  </>);


}
