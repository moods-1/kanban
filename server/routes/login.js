const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: user._id },
          process.env.COOKIE_SECRET_KEY || "ShH_SeCrEt_StUfF",
          { expiresIn: "24h" }
        );
        res
          .status(201)
          .cookie("user", { token: token }, { httpOnly: true })
          .send(user);
      } else res.status(401).send({ msg: "Check your credentials!" });
    });
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = router;
