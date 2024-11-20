import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productRedcuer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryRedcuer from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryRedcuer from "../features/bcategory/bcategorySlice";
import coloraReducer from "../features/color/colorSlice"
import enquiryReducer from "../features/enquiry/enquirySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productRedcuer,
    brand: brandReducer,
    pCategory: pCategoryRedcuer,
    bCategory: bCategoryRedcuer,
    blog: blogReducer,
    color: coloraReducer,
    enquiry: enquiryReducer
  },
});
