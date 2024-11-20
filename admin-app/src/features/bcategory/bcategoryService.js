import axios from "axios";
import { base_url } from "../../utils/base_url";

export const getBlogCategories = async() => {
    const response = await axios.get(`${base_url}blogcategory/`);
    console.log("Response from API:", response.data);
    return response.data;
}

const bCategoryService = {
    getBlogCategories,
}

export default bCategoryService;