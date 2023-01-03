import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#134611",
    },
    secondary: {
      main: "#FFFF",
    },
    background: {
      main: "#134611",
    },
  },
  typography: {
    fontFamily: "PoppinsRegular",
  },
});

responsiveFontSizes(theme);
export default theme;
