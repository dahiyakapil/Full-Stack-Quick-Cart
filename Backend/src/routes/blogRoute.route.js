const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
} = require("../controllers/blogCtrl.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { uploadImages } = require("../controllers/blogCtrl.controller");
const { blogImageResize, uploadPhoto } = require("../middleware/uploadImg");
const router = express.Router();

router.put("/likes", authMiddleware, liketheBlog);
router.put("/dislikes", authMiddleware, disliketheBlog);
router.post("/", authMiddleware, isAdmin, createBlog);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImageResize,
  uploadImages
); // Uplaod Image VIA CLOUDINARY



router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
