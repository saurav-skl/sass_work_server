const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
});

const listSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  used: { type: Number, default: 0 },
  User: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = model("User", UserSchema);
const List = model("Product", listSchema);
module.exports = { User, List };
