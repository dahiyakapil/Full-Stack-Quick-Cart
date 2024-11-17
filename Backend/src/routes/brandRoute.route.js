const express = require("express");
const { createBrand, updateBrand, getAllBrand, deleteBrand, getBrand } = require("../controllers/brandCtrl.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware, isAdmin, createBrand)
router.put("/:id",authMiddleware, isAdmin, updateBrand)
router.delete("/:id",authMiddleware, isAdmin, deleteBrand)

router.get("/",authMiddleware, isAdmin, getAllBrand)
router.get("/:id",getBrand)


module.exports = router;