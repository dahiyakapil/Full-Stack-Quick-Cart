const Brand = require("../models/brandModel.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    console.log("Error in createBrand");
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  console.log(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    console.log("Error in updateBrand");
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    console.log("Error in deleteBrand");
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    console.log("Error in getBrand");
    throw new Error(error);
  }
});

const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Brand.find();
    res.json(getCategories);
  } catch (error) {
    console.log("Error in getAllBrand");
    throw new Error(error);
  }
});
module.exports = {
  createBrand,
  updateBrand,
  getAllBrand,
  deleteBrand,
  getBrand,
};
