import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "2rem",
  },
  container: {
    margin: "4rem auto",
    width: "90%",
  },
}));

function Cancel(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.header}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography variant="h1">Cancelled</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h4">Transaction was not completed.</Typography>
          </Grid>
          <Grid item>
            <Link to={`/stripe`}>
              <Typography variant="subtitle1">
                Return to products here
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default Cancel;
