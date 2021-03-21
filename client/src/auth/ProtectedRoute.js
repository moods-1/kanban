import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    if (loggedIn) setAuthCheck(true);
    else {
      axios
        .get(`${window.location.origin}/api/authCheck/`)
        .then((data) => {
          setUser(data.data);
          setLoggedIn(true);
          setAuthCheck(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          setAuthCheck(true);
          console.log(err);
        });
    }
  }, [loggedIn, setUser, setLoggedIn]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authCheck) {
          return loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
