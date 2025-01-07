// const {
//   cloudinaryUploadImg,
//   cloudinaryDeleteImg,
// } = require("../utils/cloudinary");
// const fs = require("fs");
// const asyncHandler = require("express-async-handler");

// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.body); // Log body data
//     console.log(req.files); // Log files data
  
//     const uploader = (path) => cloudinaryUploadImg(path, "images");
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

// const deleteImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleted = cloudinaryDeleteImg(id, "images");
//     res.json({ message: "Image Deleted successfully" });
//   } catch (error) {
//     console.log("Error in deleteImages Controller");
//     throw new Error(error);
//   }
// });





// module.exports = { uploadImages, deleteImages };



const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." }); // Handle no files
    }

    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      try { // Try catch for each individual file to prevent crashing if one file fails
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);

        // Option 1: Remove deletion if not needed
        // fs.unlinkSync(path); // Remove this line if you don't need local files

        // Option 2: Asynchronous deletion with error handling (more robust)
        fs.promises.unlink(path)
          .catch(err => {
            console.error(`Error deleting file ${path}:`, err);
            // Log the error but don't stop the process
          });
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({ message: "One or more image uploads failed.", partialSuccess: true, uploadedUrls: urls }); // Send error response if cloudinary upload fails.
      }
    }

    const images = urls.map((file) => file);
    res.json(images);
  } catch (error) {
    console.error("Error in uploadImages Controller:", error);
    res.status(500).json({ message: "Image upload process failed." });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id, "images"); // Await the deletion
    if (deleted.result === 'not found'){
      return res.status(404).json({message: 'Image not found'})
    }
    res.json({ message: "Image Deleted successfully" });
  } catch (error) {
    console.error("Error in deleteImages Controller:", error);
    res.status(500).json({message: 'Error deleting image'});
  }
});

module.exports = { uploadImages, deleteImages };