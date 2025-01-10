// Required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", require("./routes/github_user.routes"));

// Connect to MongoDB
require("./db/db.config");

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
