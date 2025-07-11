import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

type SmallNoteProps = {
  title: string;
  description: string;
};



function getFirst5Words(text: string) {
  return text.split(/\s+/).slice(0, 5).join(' ') + "...";
}
function getFirst10words(text: string) {
  return text.split(/\s+/).slice(0, 10).join(' ') + "...";
}
function getFirst15words(text: string) {
  return text.split(/\s+/).slice(0, 15).join(' ') + "...";
}

export default function SmallNote({ title, description }: SmallNoteProps) {



  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  return <>
    <Accordion sx={{ color: 'white' }} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '.MuiAccordionSummary-content': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ flex: 1, mr: 2 }}>
            {isSm && title.length > 5 ? getFirst5Words(title) : title}
            {isMd && title.length > 10 ? getFirst10words(title) : title}
            {isLg && title.length > 15 ? getFirst15words(title) : title}
          </Typography>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            onFocus={(e) => e.stopPropagation()}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </AccordionSummary>


      <AccordionDetails>
        <Typography>
          {description}
        </Typography>

      </AccordionDetails>
    </Accordion>

  </>

}
