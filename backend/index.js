// Required modules
const express = require("express");
require("dotenv").config();

// Initialize app
const app = express();
app.use(express.json());

// Routes
app.use("/users", require("./routes/github_user.routes"));

// Connect to MongoDB
require("./db/db.config");

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
