const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(console.log);

/* ================= USER ================= */
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

/* ================= SIMPLE SIGNUP ================= */
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

/* ================= SIMPLE LOGIN ================= */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

/* ================= SERVICES ================= */
const Service = mongoose.model("Service", {
  name: String,
  description: String,
  category: String,
  price: Number,
});

app.get("/api/services", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const data = await Service.find(filter);
  res.json(data);
});

app.get("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= BOOKINGS ================= */
const Booking = mongoose.model("Booking", {
  userId: String,
  service: String,
  name: String,
  phone: String,
  address: String,
  date: String,
  time: String,
  description: String,
  status: { type: String, default: "pending" },
});

app.post("/api/bookings", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
});

app.get("/api/bookings/:userId", async (req, res) => {
  const data = await Booking.find({ userId: req.params.userId }).sort({ _id: -1 });
  res.json(data);
});

/* ================= SEED ================= */
mongoose.connection.once("open", async () => {
  if (await Service.countDocuments() > 0) return;

  await Service.insertMany([
    { name: "Tap Repair", category: "plumbing", description: "Fix taps", price: 300 },
    { name: "Switch Fix", category: "electrical", description: "Fix switches", price: 200 },
    { name: "Cleaning", category: "cleaning", description: "Home cleaning", price: 800 },
  ]);

  console.log("Seed Done 🚀");
});

app.listen(4000, () => console.log("Server running 🚀"));