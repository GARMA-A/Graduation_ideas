import { BottomNavigationAction } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from '@mui/icons-material/Home';
import Favorite from "../Notes/Fovorite";
import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { setFavoriteFilterActive } from "../Notes/noteSlice";
import { useSelector } from "react-redux";

export default function BottomNavBar() {

  const dispatch = useDispatch<AppDispatch>();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const favoriteFilterActive = useAppSelector((state) => state.notes.favoriteFilterActive);


  return (<>
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000, padding: 0 }}
      showLabels>
      <BottomNavigationAction onClick={() => dispatch(setFavoriteFilterActive(false))} label='Home' icon={<HomeIcon color={!favoriteFilterActive ? "info" : "inherit"} />} />
      <BottomNavigationAction onClick={() => dispatch(setFavoriteFilterActive(true))} label='Favorites' icon={<Favorite purpose="filter" favorite={favoriteFilterActive} />} />
    </BottomNavigation >


  </>);


}
