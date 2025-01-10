const mongoose = require("mongoose");
require("dotenv").config();

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: String,
  location: String,
  blog: String,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  friends: [String],
  is_deleted: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;