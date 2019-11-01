import axios from "axios";

const get = async ({ path, params, headers }) => {
  try {
    const response = await axios.get(path, { headers, timeout: 10000 });
    const status = response.status;
    if (status >= 404 || status) {
      return "";
    }
    return response;
  } catch (error) {
    return error.toString();
  }
};
const post = async ({ path, body, headers }) => {
  console.log(headers,path);
  const response = await axios.post(path, body, {headers : headers});
  console.log(response);
  const status = response.status;
  if (status >= 404 || status) {
    return "";
  }
  return response;
};
const postwithToken = async ({ path, body, headers }) => {
  try {
    const response = await axios.post(
      path,
      { body },
      { headers, timeout: 10000 }
    );
    const status = response.status;
    if (status >= 404 || status) return response;
  } catch (error) {
    return error.toString();
  }
};
export default {
  get,
  post,
  postwithToken
};
