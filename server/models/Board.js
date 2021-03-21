const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Column = require("./Column");
const Card = require("./Card");

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    members: [],
  },
  { collection: "Board" }
);

// creates a new instance of the Board model and returns the saved instance
BoardSchema.statics.createNewBoard = async function (name, userId) {
  const inProgressCol = new Column({
    name: "In Progress",
  });

  const completedCol = new Column({
    name: "Completed",
  });

  const board = new this({
    name,
    columns: [inProgressCol._id, completedCol._id],
    creator: userId,
    members: [userId],
  });

  await Promise.all([inProgressCol.save(), completedCol.save(), board.save()]);
  return board;
};

// deletes a Board in the db by its _id
BoardSchema.statics.deleteBoard = function (boardId) {
  this.deleteOne({ _id: mongoose.Types.ObjectId(boardId) }).exec();
};

// gets a Board by _id
BoardSchema.statics.findBoard = async function (boardId) {
  const foundBoard = await this.findById(boardId).populate({
    path: "columns",
    model: "Column",
    populate: {
      path: "cards",
      model: "Card",
    },
  });

  return foundBoard;
};

// adds a Column model into the Board's columns array
BoardSchema.methods.addNewColumn = async function (columnName) {
  const newColumn = await Column.createNewColumn(columnName);
  this.columns.push(newColumn._id);
  await this.save();
};

// removes a Column model by _id from the Board's columns array
BoardSchema.methods.removeColumn = async function (columnId) {
  this.columns.pull({ _id: mongoose.Types.ObjectId(columnId) });
  await Promise.all([this.save(), Column.deleteColumn(columnId)]);
};

// creates a new Card and adds it to specific Column by its _id
BoardSchema.methods.addNewCardToColumn = async function (cardName, columnId) {
  const newCard = await Card.createNewCard(cardName);
  const column = await Column.findOne({
    _id: mongoose.Types.ObjectId(columnId),
  });
  await column.addCard(newCard._id);
};

// moves specific card from an existing column to another existing column
BoardSchema.methods.moveCard = async function (data) {
  const {
    cardId,
    fromColumnId,
    toColumnId,
    sourceIdx,
    destinationIdx,
    movement,
  } = data;

  const foundFromColumn = await Column.findById(fromColumnId);
  const foundToColumn = await Column.findById(toColumnId);
  if (movement === "same") {
    foundFromColumn.moveCard(cardId, sourceIdx, destinationIdx);
  } else {
    foundFromColumn.moveCardOut(sourceIdx);
    foundToColumn.moveCardIn(cardId, destinationIdx);
  }
};

// moves column in same board
BoardSchema.methods.moveColumn = async function (data) {
  const { columnId, sourceIdx, destinationIdx } = data;
  this.columns.splice(sourceIdx, 1);
  this.columns.splice(destinationIdx, 0, columnId);
  await this.save();
};

// removes specific card from existing column
BoardSchema.methods.removeCard = async function (cardId) {
  const column = await Column.findOne({
    "cards._id": mongoose.Types.ObjectId(cardId),
  });
  await column.removeCard(cardId);
};

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
