import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  h1: {
    textAlign: "center",
    margin: "20px",
  },
  day: {
    position: "relative",
    boxSizing: "border-box",
    width: "calc(100% / 7)",
    height: "140px",
    padding: "5px",
    margin: "0",
    backgroundColor: "#F4F6FF",
    border: "1px solid gainsboro",
    fontWeight: "bold",
    color: "gray",
  },
  names: {
    textAlign: "center",
    backgroundColor: "white",
    height: "40px",
    border: "none",
  },
});
