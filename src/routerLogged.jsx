import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import paths from "./paths";
export default class RouterDom extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={paths.app} />
          <Route component={paths.errorNotFound} />
        </Switch>
      </Router>
    );
  }
}
