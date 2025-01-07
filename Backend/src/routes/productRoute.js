const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  // uploadImages,
  // deleteImages,
} = require("../controllers/productCtrl.controller");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const { uploadPhoto, productImageResize } = require("../middleware/uploadImg");

router.post("/", authMiddleware, isAdmin, createProduct); // only admin can create Product

// UPLOAD IMAGE
// router.put(
//   "/upload/",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImageResize,
//   uploadImages
// ); // Uplaod Image VIA CLOUDINARY

// DELETE IMAGE
// router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updateProduct); // only admin can update Product
router.delete("/:id", authMiddleware, isAdmin, deleteProduct); // only admin can delete Product



module.exports = router;

