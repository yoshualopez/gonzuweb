import axios from "axios";

const get = async ({ path, params, headers }) => {
  try {
    const response = await axios.get(path, { headers, timeout: 10000 });
    const status = response.status;
    if (status >= 400) {
      return "";
    }
    return response;
  } catch (error) {
    return "";
  }
};
const post = async (path, body, headers) => {
  const response = await axios.post(path, body, { headers: headers });
  const status = response.status;
  if (status >= 400) {
    return "";
  }
  return response;
};
const postwithToken = async (path, body, headers) => {
  try {
    const response = await axios.post(path, { body }, { headers});
    const status = response.status;
    if (status >= 400) {
      return "";
    }
    return response;
  } catch (error) {
    return error.toString();
  }
};
export default {
  get,
  post,
  postwithToken
};
