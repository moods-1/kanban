import React from "react";
import { Link } from "react-router-dom";
import { free, premium } from "../utils/packages";
import { Button, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import logo from "../assets/logo.png";
import { useStyles } from "../themes/packages";

function Packages() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <Link className={classes.logo} to="/">
          <img src={logo} alt="kanban logo" />
        </Link>
        <div>
          <div className={classes.column}></div>
          <div className={classes.card}>Organize</div>
        </div>
        <nav className={classes.nav}>
          <Link className={classes.navLink} to="/login">
            Login
          </Link>
          <Link className={classes.navLink} to="/signup">
            Signup
          </Link>
        </nav>
      </header>
      <div className={classes.packageBody}>
        <div className={classes.head}>
          <Typography className={classes.title} variant="h1">
            Kanban assembled your way.
          </Typography>
          <p className={classes.defaultText}>Explore what fits your needs.</p>
        </div>
        <div>
          <div className={classes.typeHead}>
            <div className={classes.typeBox}>
              <div>
                <p className={classes.typeBoxTitle}>Free</p>
                <p className={classes.defaultText}>
                  For individuals and small teams aiming to better structure
                  their workload.
                </p>
              </div>
              <p>
                <span className={classes.dollar}>$</span>
                <span className={classes.price}>0</span>
              </p>
              <div></div>
              <Link to="/signup" className={classes.navLink}>
                <Button
                  className={classes.ctaBtn}
                  variant="outlined"
                  color="primary"
                >
                  Get started
                </Button>
              </Link>
            </div>
            <div className={`${classes.typeBox} ${classes.typeBoxRight}`}>
              <div>
                <p className={classes.typeBoxTitle}>Premium</p>
                <p className={classes.defaultText}>
                  For large teams that manage multiple projects and require a
                  clear real-time visual representation.
                </p>
              </div>
              <p>
                <span className={classes.dollar}>$</span>
                <span className={classes.price}>10</span>
              </p>
              <p> per user per month billed monthly</p>
              <Link to="/stripe" className={classes.navLink}>
                <Button
                  className={`${classes.ctaBtn} ${classes.premBtn}`}
                  variant="contained"
                  color="primary"
                >
                  Free trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.options}>
          <div className={classes.optionsBox}>
            {free.map((x, index) => (
              <div className={classes.option} key={index}>
                <CheckIcon className={classes.checkIcon} color="primary" />
                <p className={classes.optionText}>{x}</p>
              </div>
            ))}
          </div>
          <div className={`${classes.optionsBox} ${classes.optionsBoxRight}`}>
            {premium.map((x, index) => (
              <div className={classes.option} key={index}>
                <CheckIcon className={classes.checkIcon} color="primary" />
                <p className={classes.optionText}>{x}</p>
              </div>
            ))}
          </div>
        </div>
        <footer className={classes.footer}>
          <div className={classes.footerText}>
            Copyright &#169; 2021 Tectonic Inc{" "}
          </div>
          <div>
            <TwitterIcon className={classes.footerIcon} color="primary" />
            <InstagramIcon className={classes.footerIcon} color="primary" />
            <FacebookIcon className={classes.footerIcon} color="primary" />
            <LinkedInIcon className={classes.footerIcon} color="primary" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Packages;
