import { FavoriteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useToggleFavorite } from "./query_fetch";



export default function Favorite({ noteID, purpose = 'note', favorite }: { noteID?: string, purpose?: 'filter' | 'note', favorite?: boolean }) {


  const toggle = useToggleFavorite();

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (purpose === 'note' && noteID) {
      toggle.mutate(noteID);
      event.stopPropagation();
      event.preventDefault();
      console.log(`Toggling favorite for note with ID: ${noteID}`);
      console.log(favorite)
    } else if (purpose === 'note' && !noteID) {
      console.warn("there is no NoteID and the favorite component is used as toggle favorite");
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
      sx={{ padding: 0 }}
      color={favorite ? 'error' : 'inherit'}><FavoriteOutlined />
    </IconButton>

  </>

}
