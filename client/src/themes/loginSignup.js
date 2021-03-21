import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  main: {
    width: "100%",
    height: "100vh",
    display: "flex",
    boxSizing: "border-box",
  },
  contentBox: {
    width: "50%",
    height: "100%",
    textAlign: "center",
  },
  leftContent: {
    background: "url(/images/sign-up.png) no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  form: {
    width: 200,
    margin: "auto",
  },
  textField: {
    boxShadow: "rgb(184, 213, 241) 2px 2px 5px",
    marginBottom: 8,
  },
  helperText: {
    color: "red",
  },
  button: {
    marginTop: 25,
    background: "rgb(41, 140, 238)",
    color: "#FFFFFF",
  },
  upperDetails: {
    height: "85%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  lowerDetails: {
    height: "15%",
    width: "100%",
    borderTop: "1px rgb(184, 213, 241) solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomLink: {
    border: "none",
    width: "100px",
    cursor: "pointer",
    outlineStyle: "none",
    textDecoration: "none",
    fontSize: 12,
    color: "rgb(41, 140, 238)",
    background: "none",
    fontWeight: 600,
  },
});
