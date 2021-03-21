import React, { useContext, useState } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../contexts/UserContext";
import CreateModal from "./CreateModal";
import UploadImage from "./UploadImage";
//import ProfileCard from "./ProfileCard";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  visualIcon: {
    width: "25px",
    height: "25px",
    marginRight: "1rem",
  },
  profileIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginLeft: "2em",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 10px 1px rgba(128,163,251,0.1)",
    },
  },
  createButton: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    backgroundColor: "#759CFC",
    textTransform: "capitalize",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#759CFC",
    },
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    margin: "1rem auto",
    padding: "0 3rem",
    minWidth: 800,
  },
  fixRightMargin: {
    marginRight: "1rem",
  },
  third: {
    width: "30%",
    maxWidth: "350px",
    minWidth: "250px",
  },
  click: {
    color: "#666",
    "&:hover": {
      color: "#759CFC",
      cursor: "pointer",
    },
  },
  userCard: {
    minWidth: "100px",
    padding: "1rem",
    background: "#ffffff",
    zIndex: "1",
    position: "absolute",
    top: "95px",
    right: "1rem",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.15)",
    textAlign: "right",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function ProfileCard({setShowUpload, setShowUserCard}) {
  const classes = useStyles();
  const { user, setUser, setLoggedIn } = useContext(
    UserContext
  );
  const { email } = user;
  const history = useHistory();

  const handlePackages = () => {
    setShowUserCard(false);
    setLoggedIn(false);
    history.push("/packages");
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
    history.push(`/`);
  };

  const handleProfileImage = () => {
    setShowUpload(true);
    setShowUserCard(false);
  };

  return (
    <Paper className={classes.userCard} onMouseLeave ={() => setShowUserCard(false)}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="body1">{email}</Typography>
          <Typography
            variant="body1"
            className={classes.link}
            onClick={handleProfileImage}
          >
            Change profile image
          </Typography>
          {!user.premium && (
            <Typography
              variant="body1"
              className={classes.link}
              onClick={() => handlePackages()}
            >
              Upgrade
            </Typography>
          )}
          <Typography
            className={classes.link}
            variant="body1"
            onClick={handleLogout}
          >
            Logout
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileCard;
