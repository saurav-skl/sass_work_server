const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    used: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Items = mongoose.model("Item", itemSchema);
module.exports = Items;
