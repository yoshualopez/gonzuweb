import App from './App';
import Login from './login';
import Chat from './Chat';
import News from './News';
import ErrorView from './error';
import Header from './header';
import Footer from './footer';

export default {
  app : App.app,
  footer : Footer,
  news : News.news,
  newsId : News.newsId,
  header : Header,
  chat : Chat.chat,
  errorNotFound : ErrorView.NotFound,
  login : Login,
}