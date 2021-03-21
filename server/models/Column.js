const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("./Card");

const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { collection: "Column" }
);

// gets a Column by _id
ColumnSchema.statics.findColumn = async function (columnId) {
  const foundColumn = await Column.findById(columnId);
  return foundColumn;
};

// creates a new instance of the Column model and returns the saved instance
ColumnSchema.statics.createNewColumn = async function (name) {
  const column = new this({ name });
  await column.save();
  return column;
};

// deletes a Column in the db by its _id
ColumnSchema.statics.deleteColumn = async function (columnId) {
  await this.deleteOne({ _id: mongoose.Types.ObjectId(columnId) });
};

// updates a single Column's name
ColumnSchema.statics.updateName = async function (columnId, newName) {
  await this.updateOne(
    { _id: mongoose.Types.ObjectId(columnId) },
    { name: newName }
  );
};

// adds a Card model into the Column's cards array
ColumnSchema.methods.addCard = async function (cardId) {
  this.cards.push(cardId);
  await this.save();
};

// removes a Card model by _id from the Column's cards array
ColumnSchema.methods.removeCard = async function (cardId) {
  this.cards.pull({ _id: mongoose.Types.ObjectId(cardId) });
  await Promise.all([this.save(), Card.deleteCard(cardId)]);
};

// moves card same column
ColumnSchema.methods.moveCard = async function (
  cardId,
  sourceIdx,
  destinationIdx
) {
  this.cards.splice(sourceIdx, 1);
  this.cards.splice(destinationIdx, 0, cardId);
  await this.save();
};

// moves card in
ColumnSchema.methods.moveCardIn = async function (cardId, destinationIdx) {
  this.cards.splice(destinationIdx, 0, cardId);
  await this.save();
};

// moves card out
ColumnSchema.methods.moveCardOut = async function (sourceIdx) {
  this.cards.splice(sourceIdx, 1);
  await this.save();
};
const Column = mongoose.model("Column", ColumnSchema);
module.exports = Column;
