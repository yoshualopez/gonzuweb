import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import paths from "./pathsLogged";
import pathNoLogged from './paths';
import navs from "./router.assets";

export default class RouterDom extends Component {
  render() {
    const { user } = this.props;
    if (user.accountType === "super_admin") {
      return (
        <Router>
          <paths.header navigatorItems={navs.routesLogged.superAdmin} />
          <Switch>
            <Route exact path="/" render={props => <paths.app user={user} {...props} />} />
            <Route path="/chat" render={props => <paths.chat user={user} {...props} />} />
            <Route path="/users/add" render={props => <paths.superAdmin.newUserForm user={user} {...props} />} />            
            <Route path="/users" render={props => <paths.superAdmin.users user={user} {...props} />} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "teacher") {
      return (
        <Router>
          <paths.header navigatorItems={navs.routesLogged.teacher} />
          <Switch>
            <Route exact path="/" render={props => <paths.app user={user} {...props} />} />
            <Route path="/chat" component={paths.chat} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "administrator") {
      return (
        <Router>
          <paths.header navigatorItems={navs.routesLogged.admin} />
          <Switch>
            <Route exact path="/" component={paths.app} />
            <Route path="/chat" component={paths.chat} />
            <Route component={paths.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    if (user.accountType === "basic") {
      return (
        <Router>
          <paths.header navigatorItems={navs.routesLogged.basic} />
          <Switch>
            <Route exact path="/" component={pathNoLogged.app} />
            <Route path="/chat" component={pathNoLogged.chat} />
            <Route component={pathNoLogged.errorNotFound} />
          </Switch>
        </Router>
      );
    }
    return (
      <Router>
        <paths.header navigatorItems={navs.routesLogged.unxpected} />
        <Switch>
          <Route component={paths.permissionUnxpected} />
        </Switch>
      </Router>
    );
  }
}
