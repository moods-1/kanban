import React, { useContext, useState } from "react";
import {
  Toolbar,
  Typography,
  Grid,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import { UserContext } from "../contexts/UserContext";
import UploadImage from "./UploadImage";
import ProfileCard from "./ProfileCard";
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

function Navbar(props) {
  const classes = useStyles();
  const { loggedIn, user, currBoardId } = useContext(UserContext);
  const [showUserCard, setShowUserCard] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const history = useHistory();

  const UserCard = () => (
    <ProfileCard
      setShowUpload={setShowUpload}
      setShowUserCard={setShowUserCard}
    />
  );

  return (
    loggedIn && (
      <>
        <Toolbar className={`${classes.flex} ${classes.bar}`}>
          <img src={logo} alt="kanban logo" />
          <Grid
            className={`${classes.third}`}
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Grid
                className={`${classes.click}`}
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                onClick={() => history.push(`/board/${currBoardId}`)}
              >
                <Grid item>
                  <DashboardIcon className={classes.visualIcon} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">Dashboard</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                className={`${classes.click}`}
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                onClick={() => history.push("/calendar")}
              >
                <Grid item>
                  <CalendarTodayIcon className={classes.visualIcon} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">Calendar</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.flex}>
            <Avatar
              src={user.image}
              className={classes.profileIcon}
              alt="profile-icon"
              onClick={() => setShowUserCard(!showUserCard)}
            />
          </Grid>
        </Toolbar>
        {showUserCard && <UserCard />}
        {showUpload && <UploadImage setShowUpload={setShowUpload} />}
      </>
    )
  );
}

export default Navbar;
