const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");
const UploadFiles = require("../../services/UploadFiles");
const uploads = UploadFiles.uploadImage();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/uploadImage",
  uploads.single("image"),
  authController.uploadImage
);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verify-token", authController.verifyToken);
router.post("/reset-password", authController.resetPassword);
// router.post("/login", authController.login);

module.exports = router;
