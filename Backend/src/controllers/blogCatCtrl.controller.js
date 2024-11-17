const Category = require("../models/blogCatModel.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    console.log("Error in createCategory");
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const  {id}  = req.params;
  validateMongoDbID(id);
  console.log(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    console.log("Error in updateCategory");
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbID(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory)
  } catch (error) {
    console.log("Error in deleteCategory");
    throw new Error(error);
  }
})

const getCategory = asyncHandler(async(req, res) => {
  const {id} = req.params;
  try {
    const getacategory = await Category.findById(id);
    res.json(getacategory);
  } catch (error) {
    console.log("Error in getCategory");
    throw new Error(error);
  }
})

const getAllCategory = asyncHandler(async(req, res) => {
  try {
    const getCategories = await Category.find();
    res.json(getCategories);
  } catch (error) {
    console.log("Error in getAllCategory");
    throw new Error(error);
  }
})
module.exports = { createCategory, updateCategory, getAllCategory, deleteCategory, getCategory};
