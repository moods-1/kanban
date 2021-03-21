import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "../themes/loginSignup";
import { Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser, setLoggedIn } = useContext(UserContext);
  const emailVerify = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError.length && !passwordError.length) {
      axios
        .post(`${window.location.origin}/signup/`, {
          email: email,
          password: password,
          premium: false,
        })
        .then((data) => {
          const userData = data.data;
          setUser(userData);
          setLoggedIn(true);
          const boardId = userData.currentBoard;
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

  return (
    <div className={classes.main}>
      <div className={`${classes.contentBox} ${classes.leftContent}`}></div>
      <div className={classes.contentBox}>
        <div className={classes.upperDetails}>
          <form className={classes.form}>
            <Typography className="typography" variant="h1">
              Sign up to Kanban
            </Typography>
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
        </div>
        <div className={classes.lowerDetails}>
          <Typography className="typography" variant="h5">
            Already have an account?
          </Typography>
          <Link to="/login" className={classes.bottomLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
