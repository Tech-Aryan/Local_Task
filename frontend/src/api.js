import axios from 'axios';
const AP_URL = process.env.REACT_APP_API_URL;
const API_URL = `${AP_URL}/api`; // Replace with your actual backend URL

export const signupAdmin = (adminData) => {
  return axios.post(`${API_URL}/admin/signup`, adminData);
};

export const loginAdmin = (adminData) => {
  return axios.post(`${API_URL}/admin/login`, adminData);
};
