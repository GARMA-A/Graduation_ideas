import { Box, Button, Dialog, DialogContent, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

type AddNotePopUpWindowProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};



export default function AddNotePopUpWindow({ open, setOpen }: AddNotePopUpWindowProps) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"


      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            height: '100%',
            width: '100%',
            padding: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <TextField
            placeholder="Enter the title"
            fullWidth
            variant="outlined"
            sx={{
              width: { xs: '90%', sm: '500px' },
              backgroundColor: theme.palette.background.default,
            }}
          />

          <TextField
            placeholder="Enter the description"
            fullWidth
            multiline
            minRows={8}
            variant="outlined"
            sx={{
              width: { xs: '90%', sm: '500px' },

              backgroundColor: theme.palette.background.default,
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                width: { xs: '90%', sm: 'auto' },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
            >
              Create
            </Button>

            <Button
              variant="outlined"
              size="large"
              endIcon={<CancelIcon />}
              sx={{
                textTransform: 'none',
                width: { xs: '90%', sm: 'auto' },
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
