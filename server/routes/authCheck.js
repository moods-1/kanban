const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const User = require("../models/User");

router.get("/", auth, async (userId,req, res, next) => {
    try {
        const user = await User.findUser(userId)
        res.status(201).send(user)   
    } catch (error) {
        res.status(401).send(error)
    }   
})
module.exports = router;
