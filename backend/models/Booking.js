const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  service: String,
  date: String,
  time: String,
  address: String,
  status: { type: String, default: "pending" },
  total_price: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);