import App from './App';
import ErrorC from './error';
import Chat from './Chat';
import Header from './header';
import superAdmin from './superadmin';

export default {
  app : App.appLogged,
  header : Header,
  superAdmin,
  chat : Chat.chatLogged,
  errorNotFound : ErrorC.NotFoundLogged,
  permissionUnxpected : ErrorC.Permission
}