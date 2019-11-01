import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import paths from "./paths";

export default class RouterDom extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "" };
  }
  routePath(path) {
    this.setState({ path });
  }
  render() {
    const naviItems = [{
      path : '/',
      name : 'Home'
    },{
      path : '/login',
      name : 'Login'
    }];
    return (
      <Router>
        <paths.header renderedTab={this.state.path} navigatorItems={naviItems}/>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <paths.app route={e => this.routePath(e)} {...props} />
            )}
          />
          <Route
            exact
            path="/chat"
            render={props => (
              <paths.chat route={e => this.routePath(e)} {...props} />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <paths.login route={e => this.routePath(e)} {...props} />
            )}
          />
          <Route component={paths.errorNotFound} />
        </Switch>
      </Router>
    );
  }
}
