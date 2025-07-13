import { Box } from "@mui/material";

type SmallNoteContainerProps = {
  children: React.ReactNode;
};

export default function SmallNoteContainer({ children }: SmallNoteContainerProps) {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={1}
      sx={{
        width: { xs: '100%', sm: '100%', md: '80vw', lg: '65vw' },
        maxHeight: '400px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
      }}
    >
      {children}
    </Box >

  );

}
