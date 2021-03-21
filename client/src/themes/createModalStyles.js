import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "2",
    background: "rgba(0,0,0,0.6)",
  },
  modal: {
    display: "flex",
    background: "#ffffff",
    padding: "1rem",
    width: "400px",
    height: "320px",
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
  createButton: {
    padding: "1rem 3rem",
    borderRadius: "8px",
    background: "#759CFC",
    textTransform: "capitalize",
    "&:hover": {
      background: "#759CFC",
    },
  },
  input: {
    width: "300px",
  },
  tagMain:{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    fontWeight: 600,
  },
  tagsBox:{
    display: "flex",
    alignItems: "baseline",
    padding: 0,
  },
  tag:{
    width: 18,
    height: 18,
    marginLeft: 5,
    borderRadius: "50%",
    "&:hover":{
      cursor: "pointer",
    },
  },
  close: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#ccc",
  },
  warning: {
    color: "red",
    width: "100%",
    height: 200,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  red: {
    backgroundColor: "red",
  },
  green: {
    backgroundColor: "green",
  },
  blue: {
    backgroundColor: "blue",
  },
  orange: {
    backgroundColor: "orange",
  },
  purple: {
    backgroundColor: "purple",
  },
  noColor: {
    backgroundColor: "transparent",
  },
}));