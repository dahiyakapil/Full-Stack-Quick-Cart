require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const authRouter = require("./routes/authRoute.route");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute.route");
const categoryRouter = require("./routes/prodcategoryRoute.route");
const blogCategoryRouter = require("./routes/blogCatRoute.route");
const brandRouter = require("./routes/brandRoute.route");
const colorRouter = require("./routes/colorRoute.route");
const couponRouter = require("./routes/couponRoute.route");
const enquiryRouter = require("./routes/enquiryRoute.route");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { notFound, 
  errorHandler } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
      });
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });

  app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/enquiry", enquiryRouter);

// middlwares
app.use(notFound);
app.use(errorHandler);
