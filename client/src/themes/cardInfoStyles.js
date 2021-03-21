import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  marginRight: {
    marginRight: "10px",
  },
  marginLeft: {
    marginLeft: "25px",
  },
  bg: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "3",
  },
  cardContainer: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    width: "45%",
    height: "600px",
    backgroundColor: "white",
    borderRadius: "10px",
    zIndex: "4",
  },
  header: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "90px",
    borderRadius: "10px 10px 0 0",
    borderBottom: "2px solid gainsboro",
    padding: "20px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "300px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  cardStatus: {
    height: "0px",
    width: "40px",
    borderRadius: "8px",
    padding: "4px",
    margin: "0.5rem 0",
    backgroundColor: "red",
  },
  closeCard: {
    fontSize: "24px",
    position: "absolute",
    right: "0",
    top: "0",
    color: "gray",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    width: "100%",
    padding: "0",
    margin: "0",
  },
  cardBody: {
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    maxHeight: "510px",
  },
  left: {
    width: "80%",
  },
  right: {
    width: "20%",
    overflowY: "hidden",
  },
  section: {
    width: "100%",
    padding: "10px 20px 5px 20px",
  },
  dBlock: {
    display: "block",
  },
  dNone: {
    display: "none",
  },
  subHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  field: {
    margin: "5px 5px 0px 25px",
    width: "85%",
  },
  cancel: {
    fontSize: "24px",
  },
  deadline: {
    textDecoration: "underline",
    color: "royalblue",
    cursor: "pointer",
  },
  add: {
    width: "100px",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#F4F6FF",
    color: "gray",
  },
});
