const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/", (req, res, next) => {
  const { email, password, premium } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    const user = await User.createUser(email, hash, premium);
    const token = jwt.sign(
      { userId: user._id },
      process.env.COOKIE_SECRET_KEY || "ShH_SeCrEt_StUfF",
      { expiresIn: "24h" }
    );
    user
      .save()
      .then(() =>
        res
          .status(200)
          .cookie("user", { token: token }, { httpOnly: true })
          .send(user)
      )
      .catch((err) => res.status(401).json({ msg: err }));
  });
});
module.exports = router;
