import React, { Component } from "react";
class Construction extends Component {
  render() {
    const posterConstruction = "/images/construction.svg";
    return (
      <div className="container my-5">
        <div className="row align-items-center text-center">
          <div className="col">
            <img className="img-fluid" src={posterConstruction} alt="" />
          </div>
          <div className="col-md">
            <h1>En construcci&oacute;n</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Construction;
