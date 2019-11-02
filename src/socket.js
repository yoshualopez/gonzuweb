import conf from "./Config";
import io from "socket.io-client";
//PENDING HEADERS
// const getHeaders = async () => {
//   const token = await window.localStorage.getItem("token");
//   /**
//    * if (!token || !token.length) {
//       return null;
//   * }
//    */

//   return {
//     "x-access-token": token
//   };
// };

export default {
  on: (eventName, callback) => {
    const socket = io(conf.endpoint.local, {
      reconnection: true,
      //secure: true,
    });
    socket.on(eventName, callback);
  },
  emit: (eventName, data) => {
    const socket = io(conf.endpoint.local, {
      reconnection: true
      //secure: true
    });
    socket.emit(eventName, data);
  }
};
