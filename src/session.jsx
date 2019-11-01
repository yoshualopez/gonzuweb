import React, { Component } from "react";
import Router from "./router";
import RouterLogged from "./routerLogged";
import component from "./components";

const isLogged = component.auth.isLogged();
class AppValidation extends Component {
  render() {
    const toRender = isLogged ? <RouterLogged /> : <Router />;
    return toRender;
  }
}

export default AppValidation;
