const Enquiry = require("../models/enquiryModel.model");
const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    console.log("Error in createEnquiry");
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  console.log(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    console.log("Error in updateEnquiry");
    throw new Error(error);
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbID(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    console.log("Error in deleteEnquiry");
    throw new Error(error);
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    console.log("Error in getEnquiry");
    throw new Error(error);
  }
});

const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Enquiry.find();
    res.json(getCategories);
  } catch (error) {
    console.log("Error in getAllEnquiry");
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  getAllEnquiry,
  deleteEnquiry,
  getEnquiry,
};
