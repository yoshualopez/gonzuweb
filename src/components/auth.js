const user = () => {
  const User = window.localStorage.getItem("gonzuUser");
  return JSON.parse(User);
};
const isLogged = () => {
  const result = window.localStorage.getItem("gonzuUser");
  const resultParse = JSON.parse(result);
  if (!resultParse) {
    return false;
  }
  return true;
};
const subscribe = ({user}) => {
  const setItem = window.localStorage.setItem('gonzuUser',user);
  if(!setItem){
    return false;
  }
  return true;
}
const addToken = (token) => {
  return window.localStorage.setItem("token",token);
}
export default {
  isLogged,
  user,
  subscribe,
  addToken
};
