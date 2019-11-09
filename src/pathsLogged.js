import App from "./App";
import ErrorC from "./error";
import Chat from "./Chat";
import Header from "./header";
import elections from "./election";
import superAdmin from "./superadmin";

export default {
  app: App.appLogged,
  elections: elections.Setup,
  electionsWatch: elections.Watch,
  electionsVote: elections.Vote,
  header: Header,
  superAdmin,
  chat: Chat.chatLogged,
  errorNotFound: ErrorC.NotFoundLogged,
  profile: App.profile,
  profileId: App.profileId
};
