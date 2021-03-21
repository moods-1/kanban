import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing.jsx";
import Board from "./pages/Board";
import Navbar from "./pages/Navbar";
import Calendar from "./pages/Calendar";
import Packages from "./pages/Packages";
import StripeMain from "./pages/Stripe/StripeMain";
import Success from "./pages/Stripe/Success";
import Cancel from "./pages/Stripe/Cancel";
import { UserContextProvider } from "./contexts/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/packages" component={Packages} />
            <Route path="/stripe/" exact component={StripeMain} />
            <Route path="/stripe/success" exact component={Success} />
            <Route path="/stripe/cancel" exact component={Cancel} />
            <ProtectedRoute path="/board/:id" component={Board} />
            <Route path="*" component={() => "404 Not Found"} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContextProvider>
  );
}
export default App;
