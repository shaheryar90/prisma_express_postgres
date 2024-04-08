const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");
const UploadFiles = require("../../services/UploadFiles");
const auth = require("../../middlewares/auth");

router.get("/getUsers", auth, userController.getUsers);

// router.post("/login", authController.login);

module.exports = router;
