import { Box, Dialog } from "@mui/material";

type SmallNoteContainerProps = {
  children: React.ReactNode;
};

export default function SmallNoteContainer({ children }: SmallNoteContainerProps) {

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      width="50vw"
      gap={1}
    >
      {children}
    </Box>

  );

}
