const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getSingleUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
} = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", createUser);
router.put("/password", authMiddleware, updatePassword);
router.post('/forgot-password-token', forgotPasswordToken); 
router.put('/reset-password/:token', resetPassword);
router.post("/admin-login", loginAdmin) 
router.get("/wishlist", authMiddleware, getWishlist)
router.put("/save-address", authMiddleware, saveAddress);

// Cart Routes
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart)

//Coupons
router.post("/cart/apply-coupon", authMiddleware, applyCoupon);

router.post("/cart/cash-order", authMiddleware, createOrder)
router.get("/get-orders", authMiddleware, getOrders);

router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus)



router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", logout);

router.get("/:id", authMiddleware, isAdmin, getSingleUser);

router.delete("/:id", deleteaUser);
router.put("/update-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
