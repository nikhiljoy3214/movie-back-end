var express = require("express");
var userController = require("../controllers/user-controller");

var userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/signup", userController.singup);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.post("/login", userController.login);
userRouter.get("/bookings/:id", userController.getBookingsOfUser);

module.exports = userRouter;
