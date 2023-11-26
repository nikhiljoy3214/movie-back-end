var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var userRouter = require("./routes/user-routes");
var adminRouter = require("./routes/admin-routes");
var movieRouter = require("./routes/movie-routes");
var bookingsRouter = require("./routes/booking-routes");
var cors = require("cors");
dotenv.config();
var app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
  .connect(
    "mongodb+srv://nikhiljoy16:" +
      process.env.MONGODB_PASSWORD +
      "@cluster0.yjddqk0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(function () {
    app.listen(5000, function () {
      console.log("Connected To Database And Server is running");
    });
  })
  .catch(function (e) {
    console.log(e);
  });
