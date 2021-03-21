import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
    h1: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 25,
    },
    h5: {
      fontSize: 12,
      fontWeight: 600,
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
    },
  },
  palette: {
    primary: { main: "#759CFC" },
  },
  button:{
    color: "#FFF",
  }
});
