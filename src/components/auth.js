import net from "./network";
const user = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user : null;
};
const isLogged = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return null;
  const endpoint = "validate";
  const headers = { "x-access-token": user.token };
  const resultrender = await net.post(endpoint, user, headers);
  if (resultrender.isError) return null;
  const response = resultrender.data.data.response;
  user.token = response.token ? response.token : user.token;
  user.fullname = response.fullname ? response.fullname : user.fullname;
  user.teacherAssignature = response.teacherAssignature ? response.teacherAssignature : user.teacherAssignature;
  user.teacherTutor = response.teacherTutor ? response.teacherTutor : user.teacherTutor;
  user.gender = response.gender ? response.gender : user.gender;
  user.childrens = response.childrens ? response.childrens : user.childrens;
  user.photoUrl = response.photoUrl ? response.photoUrl : "/gonzu.jpg";
  user.accountType = response.accountType ? response.accountType : user.accountType;
  user.email = response.email ? response.email : user.email;
  user.id = response.id ? response.id : user.id;
  user.permissions = response.permissions ? response.permissions : user.permissions;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};
const subscribe = ({ user }) => {
  localStorage.setItem("user", JSON.stringify(user));
  return window.location.assign("/");
};
const unsubscribe = () => {
  localStorage.removeItem("user");
  return window.location.assign("/");
};
export default {
  isLogged,
  user,
  subscribe,
  unsubscribe
};
