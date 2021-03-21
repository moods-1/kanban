const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/", auth, (req, res, next) => {
    res.send({msg: "Authenticated!"})
})
module.exports = router;
