require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json()); //parses incoming requests

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use all the routes
app.use("/api/workouts", workoutRoutes);

// connect to db -- async
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
