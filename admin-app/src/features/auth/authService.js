import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
    Accept: "application/json"
  }
};



const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  // console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const getAllOrders = async() => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  console.log("API Response:", response.data);
  return response.data;
}

const authService = {
  login,
  getAllOrders
};

export default authService;
  