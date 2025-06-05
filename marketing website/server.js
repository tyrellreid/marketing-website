require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Submission = require("./models/Submission");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Connection Error:", err));

// Contact Form Route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const newSubmission = new Submission({ name, email, message });
    await newSubmission.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Save Error:", err);
    res.status(500).json({ error: "Database save failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
