const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");

// CREATE
router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body;
      const { columnId, title, tagColor } = data;
      const newCard = await Card.createNewCard(title, tagColor);
      const foundColumn = await Column.findColumn(columnId);

      foundColumn.cards = [...foundColumn.cards, newCard._id];
      foundColumn.save();
      res.status(201).json({ data: newCard });
    }
  } catch (err) {
    console.error(err);
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body) {
      const card = await Card.updateCard(
        req.params.id,
        req.body.property,
        req.body.newData
      );
      res.status(200).send(card);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: "Update Unsuccessful." });
  }
});

module.exports = router;
