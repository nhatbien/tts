const mongoose = require("mongoose");
const Tts = mongoose.model(
  "Tts",
  new mongoose.Schema({
    text: String,
    linkAudio: String,
    userId: String,
  })
);
module.exports = Tts;