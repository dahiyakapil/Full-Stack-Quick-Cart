const Product = require("../models/productModel.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/user.model");
const validateMongoDbID = require("../utils/validateMongoDbID");

const fs = require("fs");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

// const createProduct = asyncHandler(async (req, res) => {
//   try {
//     if (req.body.title) {
//       req.body.slug = slugify(req.body.title); // slugify helps in trim space
//     }
//     const newProduct = await Product.create(req.body);
//     res.json(newProduct);
//   } catch (error) {
//     console.log("Error in createProduct");
//     throw new Error(error);
//   }
// });

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);

  } catch (error) {
    throw new Error(error);
  }
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    console.log("Error in getProduct");
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  // console.log(req.query);
  try {
    // filtering
    const queryObj = { ...req.query };
    const exculdeFields = ["page", "sort", "limit", "fields"];
    exculdeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj, req.query); // modiefied, original query

    // Pirce greater than functionality
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fileds
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v"); // This is mongoose internal operation, we don't have to show this to user, so we have to delete this
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit; // (2-1) * 3 = 1 * 3 = 3
    query = query.skip(skip).limit(limit);
    // console.log(query);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This Page does not exists");
      }
    }
    console.log(page, limit, skip);

    const product = await query;

    const allProducts = await Product.where("category").equals(
      req.query.category
    ); // modified query
    // res.json(allProducts);
    res.json(product);
  } catch (error) {
    console.log("Error in getAllProducts");
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    console.log("Error in updateProduct");
    throw new Error(error);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    console.log("Error in deleteProduct");
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user; // get the id from the login user, authMiddleware
  const { productId } = req.body; // get the product id from req.body
  try {
    const user = await User.findById(_id); // get the login user id

    // check if the product is already added in wishlist or not
    const alreadyAddedInWishlist = user.wishlist.find(
      (id) => id.toString() === productId
    );

    if (alreadyAddedInWishlist) {
      let user = await User.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: productId } },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: productId } },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    console.log("Error in addToIwshlist");
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  // to create this functionality we need three things
  /*
    1. Logged In User
    2. stars(i.e how many stars user want to give the rating and productID)
    3. We need Product from the productID
  */

  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  console.log(_id);
  console.log(star);
  console.log(productId);

  try {
    const product = await Product.findById(productId);

    let alreadyRatedProduct = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRatedProduct) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRatedProduct },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      // res.json(updateRating);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(productId, {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedby: _id,
          },
        },
      });
      // res.json(rateProduct);
    }

    const getAllRatings = await Product.findById(productId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, current) => prev + current, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    const finalProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    console.log("Error in rating");
    throw new Error(error);
  }
});

// sepearte api for uploading images ----> uploadCtrl new controller
// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.files);
//     const uploader = (path) => cloudinaryUploadImg(path, "images")
//     const urls = []; // create a blank array
//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     // AS WE NEED ONLY URLS
//     const images = urls.map((file) => {
//       return file;
//     });
//     res.json(images);
//   } catch (error) {
//     console.log("Error in uploadImages Controller");
//     throw new Error(error);
//   }
// });

// sepearte api for uploading images ----> uploadCtrl new controller
// const deleteImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleted = cloudinaryDeleteImg(id, "images");
//     res.json({message: "Image Deleted successfully"})
//   } catch (error) {
//     console.log("Error in deleteImages Controller");
//     throw new Error(error);
//   }
// });

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  // uploadImages,
  // deleteImages,
};
