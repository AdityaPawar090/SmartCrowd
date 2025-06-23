const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/smartcrowd", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  crowdCount: Number,
});

const Event = mongoose.model("Event", eventSchema);

// Routes
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/events", async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).send("Event Created");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
