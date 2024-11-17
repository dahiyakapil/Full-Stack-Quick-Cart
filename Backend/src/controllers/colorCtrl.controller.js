const Color = require("../models/colorModel.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    console.log("Error in createColor");
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  console.log(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    console.log("Error in updateColor");
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (error) {
    console.log("Error in deleteColor");
    throw new Error(error);
  }
});

const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    console.log("Error in getColor");
    throw new Error(error);
  }
});

const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Color.find();
    res.json(getCategories);
  } catch (error) {
    console.log("Error in getAllColor");
    throw new Error(error);
  }
});
module.exports = {
  createColor,
  updateColor,
  getAllColor,
  deleteColor,
  getColor,
};
