const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("./Board");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: false,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/images/default-profile.jpg",
    },
    joinDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    currentBoard: {
      type: String,
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "User" }
);

// Remove a user
UserSchema.statics.deleteUser = function (id) {
  return this.deleteOne({ _id: id });
};

// Find a user by id
UserSchema.statics.findUser = function (id) {
  return this.findById(id);
};

// Find a user by email
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// Find users using an array
UserSchema.statics.findByIdArray = function (ids) {
  return this.find({ _id: { $in: ids } }, { email: 1, image: 1 });
};

// Find users with partial email
UserSchema.statics.filterByEmail = function (email) {
  return this.find({ email: { $regex: `${email}` } }, { email: 1, image: 1 });
};

// Add a profile image
UserSchema.statics.addImage = function (id, image) {
  return this.updateOne(
    { _id: id },
    {
      $set: { image: image },
    }
  );
};

// Delete a created board
UserSchema.statics.deleteBoard = function (userId, boardId) {
  this.updateOne(
    { _id: userId },
    {
      $pull: { boards: boardId },
    }
  ).exec();
};

// Creates a user
UserSchema.statics.createUser = async function (email, hash, premium) {
  let premMember;
  premMember = premium ? true : false;
  const newUser = new User({
    email: email,
    password: hash,
    premium: premMember,
  });

  const newBoard = await Board.createNewBoard("untitled", newUser._id);
  newBoard.save();
  newUser.boards = [newBoard._id];
  newUser.currentBoard = newBoard._id;
  return newUser;
};

// Add premium
UserSchema.statics.addPremium = function (id) {
  return this.updateOne(
    { _id: id },
    {
      $set: { premium: true },
    }
  );
};

// Set current board
UserSchema.statics.setCurrBoard = function (id, board) {
  return this.updateOne(
    { _id: id },
    {
      $set: { currentBoard: board },
    }
  );
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
