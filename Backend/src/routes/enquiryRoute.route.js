const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  getAllEnquiry,
  deleteEnquiry,
  getEnquiry,
} = require("../controllers/enquiryCtrl.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

router.get("/", getAllEnquiry);
router.get("/:id", getEnquiry);

module.exports = router;
