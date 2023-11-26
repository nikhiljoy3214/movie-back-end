var express = require("express");
var movieController = require("../controllers/movie-controller");

var movieRouter = express.Router();

movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.post("/", movieController.addMovie);

module.exports = movieRouter;
