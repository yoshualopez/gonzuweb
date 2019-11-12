import App from "./App";
import ErrorC from "./error";
import Chat from "./Chat";
import Header from "./header";
import elections from "./election";
import superAdmin from "./superadmin";

export default {
  app: App.appLogged,
  elections: elections.Setup,
  campaign : elections.Campaign.Campaign,
  campaignEdit : elections.EditCampaign,
  campaignCreate : elections.Campaign.CreateCampaign,
  electionsWatch: elections.Watch,
  electionsVote: elections.Vote,
  header: Header,
  superAdmin,
  chat: Chat.chat,
  errorNotFound: ErrorC.NotFound,
  profile: App.profile,
  profileId: App.profileId
};
