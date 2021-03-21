import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  p: {
    margin: "0",
    fontWeight: "bold",
    fontSize: "14px",
  },
  cardCount: {
    display: "inline-block",
    margin: "0px 5px 0px 5px",
    fontSize: "12px",
    color: "lightsteelblue",
  },
  dayNumber: {
    display: "inline-block",
    fontSize: "16px",
  },
  day: {
    display: "flex",
    flexDirection: "column",
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
  cardContainer: {
    flexGrow: "1",
    position: "relative",
    width: "100%",
    minHeight: "60px",
    overflowY: "auto",
    overflowX: "hidden",
  },
});
