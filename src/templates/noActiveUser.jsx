import React, { Component } from "react";
class ActiveUser extends Component {
  render() {
    return (
      <div className="container my-5">
        <h4 className="text-center">No tienes usuarios activos</h4>
        {this.props.children}
      </div>
    );
  }
}

export default ActiveUser;
