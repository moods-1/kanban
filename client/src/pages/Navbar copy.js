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

function Navbar(props) {
  const classes = useStyles();
  const { loggedIn, user, currBoardId, setUser, setLoggedIn } = useContext(
    UserContext
  );
  const { email } = user;
  const [showUserCard, setShowUserCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const history = useHistory();

  const handleCreate = async () => {
    let boardCount = 0;
    let premium = false;
    const id = user._id;
    await axios
      .get(`${window.location.origin}/user/${id}`)
      .then((data) => {
        boardCount = data.data.boards.length;
        premium = data.data.premium;
      })
      .catch((err) => console.log(err));
    setLimitError(boardCount < 10 || premium ? false : true);
    setShowModal(true);
  };

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

  const UserCard = () => {
    return (
      <Paper className={classes.userCard}>
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
  };

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
            <Button
              className={classes.createButton}
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleCreate()}
            >
              <AddIcon className={classes.fixRightMargin} />
              <Typography variant="body1" className={classes.fixRightMargin}>
                Create board
              </Typography>
            </Button>
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
        {showModal && (
          <CreateModal
            setShowModal={setShowModal}
            limitError={limitError}
            type="board"
          />
        )}
      </>
    )
  );
}

export default Navbar;
