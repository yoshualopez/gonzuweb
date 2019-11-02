import net from './network';
const user = () => {
  const User = window.localStorage.getItem("gonzuUser");
  return JSON.parse(User);
};

// NEW ISSUE!!!! ==== RESOLVE HOW TO SAVE SESSION DATA WITH REDUX

const isLogged =  async () => {
  //const result = window.localStorage.getItem("gonzuUser");
  // const resultParse = JSON.parse(result);
  const resultParse = {
    id: "5db5c922988d5f2434065fde",
    fullname: "Yoshua ",
    email: "usuario1529yoshua@gmail.com",
    permissions: [],
    accountType: "super_admin",
    gender: "M",
    teacherAssignature: "",
    teacherTutor: "",
    childrens: [
      "5dbc5013de95222ac833dc66",
      "5dbc5013de95222ac833dc67",
      "5dbc5013de95222ac833dc68"
    ],
    hasError: false,
    message: "",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjVjOTIyOTg4ZDVmMjQzNDA2NWZkZSIsImlhdCI6MTU3MjY3NjI5OSwiZXhwIjoxNTcyNzYyNjk5fQ._73VJyoh0L11H9IyHt1mvFTDTZbpd1dDp90ht00X9K4"
  };
  if (!resultParse) {
    return null;
  }
  const endpoint = "validate";
  const headers = {"x-access-token" : resultParse.token};
  const resultrender = await net.post(endpoint,resultParse,headers);
  const response = resultrender.data.response;
  resultParse.token = response.token;
  resultParse.accountType = response.accountType;
  resultParse.email = response.email;
  resultParse.id = response.id;
  resultParse.permissions = response.permissions;
  
  return null;
};
const subscribe = ({ user }) => {
  const setItem = window.localStorage.setItem("gonzuUser", user);
  if (!setItem) {
    return false;
  }
  return true;
};
const addToken = token => {
  return window.localStorage.setItem("token", token);
};
export default {
  isLogged,
  user,
  subscribe,
  addToken
};
