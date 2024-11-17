const Coupon = require("../models/couponModel.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    console.log("Error in createCoupon");
    throw new Error(error);
  }
});
const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    console.log("Error in createCoupon");
    throw new Error(error);
  }
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupon);
  } catch (error) {
    console.log("Error in updateCoupon");
    throw new Error(error);
  }
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deletedCoupon);
  } catch (error) {
    console.log("Error in deleteCoupon");
    throw new Error(error);
  }
});

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };
