import axios from "axios";

const get = async (path, params, headers) => {
  try {
    const response = { isError: false, data: "" };
    const res = await axios.get(path, { headers, timeout: 10000 });
    response.isError = false;
    response.data = res;
    return response;
  } catch (error) {
    const response = { isError: false, data: "" };
    response.isError = true;
    response.data = error.message;
    return response;
  }
};
const post = async (path, body, headers) => {
  try {
    const response = { isError: false, data: "" };
    const res = await axios.post(path, body, { headers: headers });

    response.isError = false;
    response.data = res;
    return response;
  } catch (error) {
    const response = { isError: false, data: "" };
    response.isError = true;
    response.data = error.message;
    return response;
  }
};
export default {
  get,
  post
};
