import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Button,
  TextField,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSuccess } from "../../API/stripe";
import Logo from "../../assets/logo.png";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "2rem",
    background: "#FFFFFF",
    color: "#759CFC",
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    color: "#FFFFFF",
  },
  container: {
    textAlign: "center",
  },
  welcome: {
    color: "#759CFC",
    fontSize: 36,
    fontWeight: 500,
    margin: "30px 0px 100px",
  },
  form: {
    width: 200,
    margin: "auto",
    marginTop: 30,
  },
  textField: {
    boxShadow: "rgb(184, 213, 241) 2px 2px 5px",
    marginBottom: 8,
  },
  helperText: {
    color: "red",
  },
}));

function Success(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser, setLoggedIn } = useContext(UserContext);
  const [showSignup, setShowSignup] = useState(false);
  const emailVerify = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError.length && !passwordError.length) {
      axios
        .post(`${window.location.origin}/signup/`, {
          email: email,
          password: password,
          premium: true,
        })
        .then((data) => {
          const userData = data.data;
          console.log(userData);
          setUser(userData);
          setLoggedIn(true);
          const boardId = userData.boards[0];
          history.push(`/board/${boardId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email": {
        if (!emailVerify.test(value)) {
          setEmailError("Invalid email address.");
        } else setEmailError("");
        setEmail(value);
        break;
      }
      case "password": {
        if (value.length < 7) {
          setPasswordError("Must be at least 7 characters.");
        } else setPasswordError("");
        setPassword(value);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const id = query.get("id");
    async function getData() {
      const res = await getSuccess({ id });
      setEmail(res.data.customer_details.email);
    }
    getData();
  }, [query]);

  useEffect(() => {
    axios
      .post(`${window.location.origin}/user/premiumAdd`)
      .then((data) => {
        const userData = data.data;
        setUser(userData);
        setLoggedIn(true);
        const boardId = userData.boards[0];
        history.push(`/board/${boardId}`);
      })
      .catch((err) => {
        setShowSignup(true);
        console.log(err);
      });
  }, [history, setLoggedIn, setUser]);

  return (
    <div>
      {showSignup && (
        <>
          <AppBar position="static" className={classes.header}>
            <Grid>
              <img src={Logo} alt="kanban-logo" />
            </Grid>
          </AppBar>
          <Container className={classes.container}>
            <Typography className={classes.welcome}>
              Welcome to Kanban premium!
            </Typography>
            <Typography className="typography" variant="h1">
              Add your account credentials.
            </Typography>
            <form className={classes.form}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Enter email"
                value={email}
                name="email"
                onChange={(e) => handleChange(e)}
                helperText={emailError}
                FormHelperTextProps={{ className: classes.helperText }}
              />
              <TextField
                className={classes.textField}
                type="password"
                variant="outlined"
                label="Password"
                value={password}
                name="password"
                onChange={(e) => handleChange(e)}
                helperText={passwordError}
                FormHelperTextProps={{ className: classes.helperText }}
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </form>
          </Container>
        </>
      )}
    </div>
  );
}

export default Success;
