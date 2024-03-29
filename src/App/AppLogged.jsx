import React, { Component } from "react";
export default class App extends Component {
  render() {
    const { user } = this.props;
    const gender = "Bienvenido/a";
    const posterWelcome = "/images/undraw_Hello_qnas.svg";
    return (
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col">
            <img className="img-fluid" src={posterWelcome} alt="" />
          </div>
          <div className=" py-5 col-md text-center">
            <h1>{gender +" "+ user.fullname}</h1>
          </div>
        </div>
      </div>
    );
  }
}
