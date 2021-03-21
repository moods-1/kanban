require("dotenv").config();

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// GET
router.get("/success", async (req, res, next) => {
  try {
    const id = req.query.id;
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });

    return res.json(session);
  } catch (err) {
    console.error(err);
  }
});

// CREATE checkout session via Stripe
router.post("/checkout", async (req, res, next) => {
  try {
    const data = req.body;
    const session = await stripe.checkout.sessions.create(data);
    return res.json({
      id: session.id,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
