const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    used: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const itemData = require("../ItemsList");

const Menu = mongoose.model("menu", itemSchema);

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    list: { type: Object, ref: "menu" },
  },
  { timestamps: true }
);

const userItems = mongoose.model("user", userSchema);
module.exports = { userItems, Menu };
