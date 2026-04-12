const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  duration_minutes: Number,
});

module.exports = mongoose.model("Service", serviceSchema);