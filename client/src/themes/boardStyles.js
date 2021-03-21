import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minWidth: 800,
    },
    title: {
      flexGrow: 1,
    },
    boardName: {
      color: "#FFFFFF",
      fontSize: 26,
    },
    blue: {
      backgroundColor: "#759CFC",
    },
    buttonCreate: {
      color: "#FFF",
      borderColor: "#FFF",
      marginRight: "1rem",
      "&:hover": {
        color: "#FFF",
        borderColor: "#FFF",
      },
    },
    menu: {
      color: "#FFF",
    },
    dropdown: {
      minWidth: "100px",
      padding: "1rem",
      background: "#759CFC",
      zIndex: "1",
      position: "absolute",
      top: "160px",
      right: 0,
      color: "#FFF",
      boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.15)",
      textAlign: "center",
    },
    dropDownLink: {
      textDecoration: "none",
      color: "#FFF",
    },
    dropDownItem: {
      textDecoration: "none",
      color: "#FFF",
      "&:hover": {
        color: "rgba(255,255,255,0.9)",
        transform: "scale(0.98)",
      },
    },
  }));