import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  "@keyframes organizeMove": {
    from: {
      transform: "translate(40px, -17px)",
    },
  },
  main: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    width: "100%",
    height: "auto",
    position: "relative",
    display: "block",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    height: 65,
    top: 0,
    zIndex: 3,
    background: "white",
  },
  logo: {
    marginLeft: 20,
  },
  column: {
    width: 90,
    height: 35,
    zIndex: 0,
    background: "none",
    border: "1px solid #759CFC",
    transform: "translate(-20px, 15px)",
  },
  card: {
    width: 80,
    height: 25,
    zIndex: 2,
    color: "white",
    textAlign: "center",
    background: "#759CFC",
    border: "1px solid #759CFC",
    transform: "translate(-15px, -17px)",
    animation: "$organizeMove 1.5s ease",
  },
  nav: {
    width: 120,
    marginRight: 20,
    display: "flex",
    justifyContent: "space-around",
  },
  navLink: {
    textDecoration: "none",
    fontWeight: 500,
    color: "#759CFC",
    "&:hover": {
      transform: "scale(0.95)",
    },
  },
  packageBody: {
    width: "100%",
    minHeight: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 61,
  },
  head: {
    width: "100%",
    paddingTop: 20,
    textAlign: "center",
    borderBottom: "1px solid #759CFC",
  },
  title: {
    color: "#759CFC",
    fontSize: 40,
    marginBottom: -15,
    animation: "$titleMove 2s ease",
  },
  defaultText: {
    fontSize: 20,
  },
  typeHead: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  typeBox: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "45% 20% 15% 20%",
    width: 340,
    height: 430,
    padding: "20px 10px",
    textAlign: "center",
  },
  typeBoxRight: {
    borderLeft: "1px solid #759CFC",
    background: "rgba(153,204,255,0.1)",
  },
  typeBoxTitle: {
    margin: 0,
    fontSize: 38,
  },
  ctaBtn: {
    width: 200,
    height: 50,
    fontSize: 18,
    margin: "0px auto",
  },
  premBtn: {
    color: "white",
  },
  dollar: {
    fontSize: 28,
    verticalAlign: "super",
  },
  price: {
    fontSize: 50,
  },
  options: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  optionsBox: {
    width: 340,
    height: "auto",
    borderTop: "1px solid #759CFC",
    padding: "20px 10px",
  },
  optionsBoxRight: {
    borderLeft: "1px solid #759CFC",
    background: "rgba(153,204,255,0.1)",
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    height: 30,
    textAlign: "left",
  },
  checkIcon: {
    fontSize: 30,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 5,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderTop: "1px solid #759CFC",
  },
  footerText: {
    marginRight: 50,
  },
  footerIcon: {
    fontSize: 35,
    marginRight: 20,
    "&:hover": {
      cursor: "pointer",
      transform: "scale(0.95)",
    },
  },
});
