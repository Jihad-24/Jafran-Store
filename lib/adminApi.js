import axios from "axios";

const API = "http://localhost:5001";

// USERS
export const getUsers = async (email) => {
  const res = await axios.get(`${API}/allusers?email=${email}`);
  return res.data;
};

// ORDERS
export const getOrders = async (email) => {
  const res = await axios.get(`${API}/orders?email=${email}`);
  return res.data.data;
};

// BANNERS
export const getBanners = async (email) => {
  const res = await axios.get(`${API}/banners?email=${email}`);
  return res.data;
};