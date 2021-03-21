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
      const { boardId, title } = data;
      const newColumn = await Column.createNewColumn(title);
      const foundBoard = await Board.findBoard(boardId);

      foundBoard.columns = [...foundBoard.columns, newColumn._id];
      foundBoard.save();
      res.status(201).json({ data: newColumn });
    }
  } catch (err) {
    console.error(err);
  }
});

// DELETE COLUMN
router.delete("/delete", async (req, res) => {
  try {
    const foundBoard = await Board.findBoard(req.body.boardId);
    await foundBoard.removeColumn(req.body.columnId);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ msg: "An error occured, could not delete column." });
    console.error(err);
  }
});

// UPDATE COLUMN NAME
router.put("/update-name", async (req, res) => {
  try {
    await Column.updateName(req.body.columnId, req.body.columnName);
    res.sendStatus(200);
  } catch (err) {
    res
      .status(400)
      .send({ msg: "An error occured, could not update the column name" });
  }
});

module.exports = router;
