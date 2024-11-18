import axios from "axios"
import { base_url } from "../../utils/base_url"

const productService = async () => {
    const response = await axios.get(`${base_url}`)
}