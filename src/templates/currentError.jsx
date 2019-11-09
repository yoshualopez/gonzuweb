import React, { Component } from "react";
class currentError extends Component {
  render() {
    return (
      <div className="my-5 container">
        {this.props.children}
        <div className="px-3 text-center">
          <h3>{this.props.error}</h3>
        </div>
      </div>
    );
  }
}
export default currentError;
