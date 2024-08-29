import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    body: {
      backgroundColor: "#000", // Use 'default' key for background color
    },
    text : {
      color: "#41cf3c", // Use 'primary' key for text color
      fontFamily: "monospace"
    },
  },
});

export default theme;
