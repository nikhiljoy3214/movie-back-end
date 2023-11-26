var Admin = require("../models/Admin");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.addAdmin = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  var existingAdmin;
  try {
    existingAdmin = Admin.findOne({ email: email });
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  var admin;
  var hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email: email, password: hashedPassword });
    admin = admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ admin: admin });
};

exports.adminLogin = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  var existingAdmin;
  try {
    existingAdmin = Admin.findOne({ email: email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  var isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  var token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: "Authentication Complete", token: token, id: existingAdmin._id });
};

exports.getAdmins = function(req, res, next) {
  var admins;
  try {
    admins = Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins: admins });
};

exports.getAdminById = function(req, res, next) {
  var id = req.params.id;

  var admin;
  try {
    admin = Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin: admin });
};
