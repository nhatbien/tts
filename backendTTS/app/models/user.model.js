const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    keyzl: String,
    email: String,
  })
);
module.exports = User;