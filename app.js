// create a express app
const express = require("express");
const app = express();
// const port = 3000;

// define port
const port = process.env.PORT || 3000;

// create mongoose atlas connection
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const db = process.env.MONGODB_URL;

mongoose
  .connect(db, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// set up the body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set ejs as view engine
app.set("view engine", "ejs");

// set up the static directory
app.use(express.static("public"));

// create schema to store name of the user and the love message
const loveSchema = new mongoose.Schema({
  name: String,
  message: String,
});

// create a model
const Love = mongoose.model("Love", loveSchema);

// create a get route
app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("home");
});

// create a post route
// app.js

// Your existing code...

// create a post route
app.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newLove = new Love({
      name,
      message: "",
    });
    await newLove.save();
  } catch (err) {
    console.error("Error saving name to database", err);
    res.status(500).send("Error saving name to database");
  }
});

// create a post route to handle love response
app.post("/love-response", async (req, res) => {
  try {
    const { name, response } = req.body;
    let message = "";
    if (response === "yes") {
      message = "Person like you 100%";
    } else {
      message = "Person may or may not like you";
    }
    const newLoveResponse = new Love({
      name,
      message,
    });
    await newLoveResponse.save();
    res.send("Message saved successfully");
  } catch (err) {
    console.error("Error saving message to database", err);
    res.status(500).send("Error saving message to database");
  }
});

// post route noMessage
app.post("/no-message", async (req, res) => {
  try {
    const { name, response } = req.body;
    let message = "";
    if (response === "no") {
      message = "Person may or may not like you";
    }
    await Love.findOneAndUpdate({ name }, { $set: { message } }, { new: true });
    res.send("Message updated successfully");
  } catch (err) {
    console.error("Error updating message in database", err);
    res.status(500).send("Error updating message in database");
  }
});

// Your existing code...

// create a get route
// app.get("/love", (req, res) => {
//   res.render("love");
// });

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
