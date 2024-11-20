import axios from "axios";
import { base_url } from "../../utils/base_url";

export const getColors = async() => {
    const response = await axios.get(`${base_url}color/`);
    return response.data;
}

const colorService = {
    getColors,
}

export default colorService;