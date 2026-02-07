import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const buildHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["auth-token"] = token;
  return headers;
};

export const getData = async (url, data = {}, token) => {
  try {
    const res = await axios.get(url, { headers: buildHeaders(token), params: data });
    return res.data;
  } catch (error) {
    toast.error((error && error.response && error.response.data && error.response.data.message) || "Request failed");
    return error.response.data;
  }
};

export const postData = async (url, data = {}, token) => {
  try {
    const res = await axios.post(url, data, { headers: buildHeaders(token) });
    toast.success((res && res.data && res.data.message) || "Request successful");
    return res.data;
  } catch (error) {
    toast.error((error && error.response && error.response.data && error.response.data.message) || "Request failed");
    console.log(error.response.data);
    return error.response.data;
  }
};

export const patchData = async (url, data = {}, token) => {
  try {
    const res = await axios.patch(url, data, { headers: buildHeaders(token) });
    toast.success((res && res.data && res.data.message) || "Request successful");
    return res.data;
  } catch (error) {
    toast.error((error && error.response && error.response.data && error.response.data.message) || "Request failed");
    return error.response.data;
  }
};

export const deleteData = async (url, data = {}, token) => {
  try {
    const res = await axios.delete(url, { headers: buildHeaders(token), data });
    toast.success((res && res.data && res.data.message) || "Request successful");
    return res.data;
  } catch (error) {
    toast.error((error && error.response && error.response.data && error.response.data.message) || "Request failed");
    return error.response.data;
  }
};

export default axios;

