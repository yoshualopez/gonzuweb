import App from './App';
import Login from './login';
import Chat from './Chat';
import LoginSelector from './login/login';
import ErrorC from './error';
import Header from './header';

export default {
  app : App.app,
  header : Header,
  chat : Chat.chat,
  errorNotFound : ErrorC.NotFound,
  login : Login,
  loginSelector : LoginSelector
}