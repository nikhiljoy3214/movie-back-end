var express = require("express");
var adminController = require("../controllers/admin-controller");

var adminRouter = express.Router();

adminRouter.post("/signup", adminController.addAdmin);
adminRouter.post("/login", adminController.adminLogin);
adminRouter.get("/", adminController.getAdmins);
adminRouter.get("/:id", adminController.getAdminById);

module.exports = adminRouter;
