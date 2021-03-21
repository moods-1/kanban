import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  p: {
    margin: "0",
    fontWeight: "bold",
    fontSize: "14px",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    listStyle: "none",
    margin: "5px 0px 5px 0px",
    padding: "5px 10px 5px 10px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.4)",
    width: "100%",
    minHeight: "40px",
    boxSizing: "border-box",
    "&:hover": {
      border: "2px solid #80A3FB",
    },
    "&:active": {
      boxShadow: "0px 0px 10px 1px rgba(128,163,251,0.8)",
    },
  },
  cardStatus: {
    height: 10,
    width: 30,
    borderRadius: "8px",
    padding: "3px",
    margin: "0",
  },
  red: {
    backgroundColor: "#FF5D48",
  },
  green: {
    backgroundColor: "#5ACD76",
  },
  blue: {
    backgroundColor: "#59B0FF",
  },
  yellow: {
    backgroundColor: "#EDAB1D",
  },
  purple: {
    backgroundColor: "#D460F7",
  },
  noColor: {
    backgroundColor: "transparent",
  },
});
