import React, { Component } from "react";
import lang from "../lang";
class NoPermissionProvide extends Component {
  render() {
    const defaultLanguajes = "es";
    return (
      <div className="my-5 container">
        {this.props.children}
        <div className="px-3 text-center">
          <h3>{lang[defaultLanguajes].permissionsNotProvide}</h3>
        </div>
      </div>
    );
  }
}
export default NoPermissionProvide;
