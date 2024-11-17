const asyncHanlder = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const userModel = require("../models/user.model");
const User = require("../models/user.model");
const Product = require("../models/productModel.model");
const Cart = require("../models/cartModel.model");
const Coupon = require("../models/couponModel.model");
const Order = require("../models/orderModel.model");
const validateMongoDbID = require("../utils/validateMongoDbID");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl.controller");
const crypto = require("crypto");
const uniqid = require("uniqid");

// Create a User
const createUser = asyncHanlder(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login
const loginUserCtrl = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  // check if  user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    // res.json(findUser);
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      { refreshToken: refreshToken },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credential");
  }
});

// Admin Login
const loginAdmin = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  // check if  user exists or not
  const findAdmin = await User.findOne({ email });

  // Check if the rele is amdin or not
  if (findAdmin.role !== "admin") {
    throw new Error("Not Authorized");
  }

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    // res.json(findUser);
    const refreshToken = await generateRefreshToken(findAdmin?.id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin?._id,
      { refreshToken: refreshToken },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credential");
  }
});

// Handle refresh Token
const handleRefreshToken = asyncHanlder(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error(" No Refresh token present in db or not matched");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    // console.log(decoded)
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });

  res.json(user);
});

const logout = asyncHanlder(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Get All Users
const getAllUsers = asyncHanlder(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    console.log("Error in getAllUsers Controller");
    throw new Error(error);
  }
});

// Get a single User
const getSingleUser = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  // console.log(id) we are getting id
  try {
    const getaUser = await User.findByIdAndDelete(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    console.log("Error in getSingleUser");
    throw new Error(error);
  }
});

// Delete a User
const deleteaUser = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update a user
const updateUser = asyncHanlder(async (req, res) => {
  // console.log(req.user);
  // const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbID(_id);
  // console.log(id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    console.log("Error in updateUser");
    throw new Error(error);
  }
});

// SAVE USER ADDRESS
const saveAddress = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    console.log("Error in saveAddress Controller");
    throw new Error(error);
  }
});

const blockUser = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    console.log("Error in blockUser");
    throw new Error(error);
  }
});
const unblockUser = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      {
        new: true,
      }
    );
    res.json({
      message: "User Un-Blocked",
    });
  } catch (error) {
    console.log("Error in blockUser");
    throw new Error(error);
  }
});

// Update Password
const updatePassword = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbID(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//Generate Forgot Password Token
const forgotPasswordToken = asyncHanlder(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    console.log("Error in forgotPasswordToken");
    throw new Error(error);
  }
});

// Generate reset Password
const resetPassword = asyncHanlder(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  console.log(user); // Log user object for debugging

  if (!user) {
    throw new Error("Token Expired or Invalid, Please try again later");
  }

  user.password = password; // Set the new password
  user.passwordResetToken = undefined; // Clear the reset token
  user.passwordResetExpires = undefined; // Clear the expiration date
  await user.save();

  res.json(user);
});

const getWishlist = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHanlder(async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user;

  validateMongoDbID(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    // check if user has already products in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;
      obj.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      obj.price = getPrice.price;
      products.push(obj);
    }
    // console.log(products);
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const findCart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(findCart);
  } catch (error) {
    console.log("Error in getUserCart controller");
    throw new Error(error);
  }
});

const emptyCart = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    console.log("Error in empytCart controller");
    throw new Error(error);
  }
});

const applyCoupon = asyncHanlder(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbID(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  console.log(validCoupon);

  // check if coupon is not valid
  if (validCoupon == null) {
    throw new Error("Invalid Coupon");
  }

  const user = await User.findOne({ _id });
  let { products, cartTotal } = await Cart.findOne({
    orderby: user._id,
  });
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHanlder(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    // Decrease the amaount of quantity and increase the amount of sold products

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    console.log("Error in createOrder controller");
    throw new Error(error);
  }
});

const getOrders = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const userOrders = await Order.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(userOrders);
  } catch (error) {
    console.log("Error in getOrders controller");
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHanlder(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    console.log("Error in updateOrderStatus controller");
    throw new Error(error);
  }
});

module.exports = {
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
  updateOrderStatus,
};
