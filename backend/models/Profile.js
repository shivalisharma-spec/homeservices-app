const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: String,
  full_name: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model("Profile", profileSchema);