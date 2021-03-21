import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  AppBar,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createCheckout } from "../../API/stripe";
import Logo from "../../assets/logo.png";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "1rem",
    background: "white",
  },
  container: {
    display: "grid",
    placeItems: "center",
    width: "90%",
    height: "90vh",
    textAlign: "center",
  },
  card: {
    padding: "2rem",
    margin: "2rem",
    width: 450,
    borderTop: "1.5px lightgray solid",
  },
  title: {
    color: "#759CFC",
    margin: 0,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dollar: {
    fontSize: 28,
    verticalAlign: "super",
  },
  price: {
    fontSize: 50,
  },
  button: {
    margin: "1rem 0",
    padding: "1rem",
    width: "50%",
    color: "#FFFFFF",
    fontSize: "1rem",
  },
  inputGrid: {
    margin: "20px auto 0px",
    fontSize: 30,
  },
  input: {
    marginBottom: "1.5rem",
  },
}));

function StripeMain(props) {
  const classes = useStyles();
  async function handleCheckout(mode) {
    const URL = `${window.location.origin}/stripe`;
    const dummyData = {
      success_url: `${URL}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL}/cancel`,
      mode: mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1IR3dzGWNZMUdr0ukK6lIfgI",
          quantity: 1,
        },
      ],
    };
    const res = await createCheckout(dummyData);
    const data = res.data;
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div>
      <AppBar position="static" className={classes.header}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              <img src={Logo} alt="kanban-logo" /> Premium Subscriptions
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
          spacing={4}
        >
          <Grid item>
            <Paper className={classes.card}>
              <Grid container item direction="column">
                <Grid item>
                  <InputLabel>
                    <Typography variant="h4" className={classes.title}>
                      Confirmation
                    </Typography>
                    <h4>
                      * The first month is free and your card will be charged
                      monthly after that.
                    </h4>
                  </InputLabel>
                </Grid>
                <Grid item className={classes.inputGrid}>
                  <Typography>
                    <span className={classes.dollar}>$</span>
                    <span className={classes.price}>10</span>
                    <span>/month</span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => handleCheckout("subscription")}
                  >
                    Checkout
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default StripeMain;
