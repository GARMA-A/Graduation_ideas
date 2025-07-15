import { FavoriteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { toggleFavorite } from "./noteSlice";



export default function Favorite({ noteID, purpose = 'note', favorite }: { noteID?: string, purpose?: 'filter' | 'note', favorite?: boolean }) {

  const dispatch = useDispatch<AppDispatch>();

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (purpose === 'note' && noteID) {
      dispatch(toggleFavorite(noteID));
      event.stopPropagation();
      event.preventDefault();
      console.log(`Toggling favorite for note with ID: ${noteID}`);
    } else if (purpose === 'note' && !noteID) {
      console.log("there is no NoteID and the favorite component is used as toggle favorite");
    }
  }
  function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    if (purpose === 'note') {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  return <>
    <IconButton
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      color={favorite ? 'error' : 'inherit'}><FavoriteOutlined />
    </IconButton>

  </>

}
