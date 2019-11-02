import React, { Component } from "react";
import Router from "./router";
import { createStore } from "redux";
import reducers from "./reducers";
import RouterLogged from "./routerLogged";
import component from "./components";
import template from "./templates";

const store = createStore(reducers);

class AppValidation extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, connectionState: "connecting" };
  }
  async componentDidMount() {
    const result = await component.auth.isLogged();
    this.setState({
      user: result,
      connectionState: "done"
    });
  }
  render() {
    const { user, connectionState } = this.state;
    console.log(connectionState);
    if (connectionState === "done") {
      if (user === null) {
        return <Router store={store} />;
      }
      if (user) {
        return <RouterLogged user={user} />;
      }
    }
    return (
      <template.splashScreen>
        <template.spinner />
      </template.splashScreen>
    );
  }
}

export default AppValidation;
