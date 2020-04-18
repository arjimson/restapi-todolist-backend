const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Import Routes
const postsRoute = require("./routes/todos");
app.use("/todos", postsRoute);

// Connect to DB
const PORT = process.env.port || 5000;
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
