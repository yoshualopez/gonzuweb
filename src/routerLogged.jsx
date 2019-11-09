import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import paths from "./pathsLogged";
import pathNoLogged from "./paths";
import navs from "./router.assets";

export default class RouterDom extends Component {
  render() {
    const { user } = this.props;
    if (user.accountType === "super_admin") {
      return (
        <Router>
          <paths.header user={user} navigatorItems={navs.routesLogged.superAdmin} />
          <Switch>
            <Route exact path="/" render={props => <paths.app user={user} {...props} />} />
            <Route exact path="/chat" render={props => <paths.chat user={user} {...props} />} />
            <Route exact path="/elections" render={props => <paths.elections user={user} {...props} />} />
            <Route exact path="/elections/vote" render={props => <paths.electionsVote user={user} {...props} />} />
            <Route exact path="/elections/counter" render={props => <paths.electionsWatch user={user} {...props} />} />
            <Route exact path="/profile" render={props => <paths.profile user={user} {...props} />} />
            <Route exact path="/profile/:id" render={props => <paths.profileId user={user} {...props} />} />
            <Route exact path="/users" render={props => <paths.superAdmin.users user={user} {...props} />} />
            <Route exact path="/users/add" render={props => <paths.superAdmin.newUserForm user={user} {...props} />} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "teacher") {
      return (
        <Router>
          <paths.header user={user} navigatorItems={navs.routesLogged[user.accountType]} />
          <Switch>
            <Route exact path="/" render={props => <paths.app user={user} {...props} />} />
            <Route exact path="/chat" component={paths.chat} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "administrator") {
      return (
        <Router>
          <paths.header user={user} navigatorItems={navs.routesLogged.admin} />
          <Switch>
            <Route exact path="/" component={paths.app} />
            <Route exact path="/chat" component={paths.chat} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "basic") {
      return (
        <Router>
          <paths.header user={user} navigatorItems={navs.routesLogged[user.accountType]} />
          <Switch>
            <Route exact path="/" component={pathNoLogged.app} />
            <Route exact path="/chat" component={pathNoLogged.chat} />
            <Route component={pathNoLogged.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "parent") {
      return (
        <Router>
          <paths.header user={user} navigatorItems={navs.routesLogged[user.accountType]} />
          <Switch>
            <Route exact path="/" component={pathNoLogged.app} />
            <Route exact path="/profile" render={props => <paths.profile user={user} {...props} />} />
            <Route exact path="/profile/:id" render={props => <paths.profileId user={user} {...props} />} />
            <Route exact path="/news" component={pathNoLogged.news} />
            <Route exact path="/news/:id" component={pathNoLogged.newsId} />
            <Route exact path="/chat" component={paths.chat} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    //NEW ISSUE, RESOLVE WHAT SCREEN SHOW IN THE
    //CASE IF ANITHING ACCOUNT TYPE IS ASSIGNED
    return (
      <Router>
        <paths.header user={user} navigatorItems={navs.routesLogged.unxpected} />
        <Switch>
          <Route component={paths.errorNotFound} />
        </Switch>
      </Router>
    );
  }
}
