import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  backdrop: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "grid",
    placeItems: "center",
    top: "0",
    left: "0",
    zIndex: "2",
    background: "rgba(0,0,0,0.6)",
  },
  modal: {
    display: "flex",
    background: "#fff",
    padding: "1rem",
    margin: "0 30px 20px 0",
    width: 300,
    minHeight: 400,
    maxHeight: 700,
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
  },
  modalMain: {
    height: "80%",
  },
  title: {
    fontWeight: "800",
    marginTop: "0.5rem",
  },
  container: {
    padding: 0,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberProfiles: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    padding: 5,
    height: "auto",
  },
  addBtn: {
    margin: "10px 0px",
    justifyContent: "left",
    boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.1)",
    color: "white",
  },
  close: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#ccc",
  },
  hr: {
    width: "100%",
    border: "none",
    boxShadow: "0px 0px 1px 0.3px rgba(0,0,255,0.2)",
  },
  textField: {
    margin: "10px 0px",
    padding: 0,
    height: 30,
  },
  memberList: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    textTransform: "lowercase",
    letterSpacing: 1,
  },
  scrollContainer: {
    maxHeight: 280,
    overflowY: "scroll",
  },
  select: {
    margin: "10px 0",
  },
  checked: {
    display: "block",
    color: "green",
  },
  warning: {
    color: "red",
    width: "100%",
    height: 200,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
});
