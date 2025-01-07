const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadCtrl.controller");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
// const {
//   uploadPhoto,
//   productImgResize,
// } = require('../middleware/uploadImg');

const {
  uploadPhoto,
  productImageResize
} = require("../middleware/uploadImg");

const router = express.Router();

// router.post('/',authMiddleware,isAdmin,uploadPhoto.array('images', 10),productImgResize,uploadImages);

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;



