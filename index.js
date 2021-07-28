require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3300;
const cors = require("cors");
const mongoose = require("mongoose");
const Items = require("./models/items");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbURL = process.env.MONGO_CONNECTION_URL;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connections = mongoose.connection;
connections
  .once("open", () => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Connections Failed");
  });

app.get("/add-items", (req, res) => {
  const items = new Items({
    name: "Button3",
    used: 1,
    id: "dsf",
  });
  items
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong." });
    });
});

app.get("/all-items", (req, res) => {
  Items.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong." });
    });
});

app.put("/single-item/:id", async (req, res) => {
  const _id = req.params.id;

  if (!_id) return res.status(404).send();
  try {
    const Prod = await Items.findOne({ id: _id });
    Prod.used++;
    Prod.save();
    res.send(Prod);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  var timestamp = new Date().toLocaleString();
  console.log(timestamp);
});
