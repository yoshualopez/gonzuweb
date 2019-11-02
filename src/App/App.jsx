import React, { Component } from "react";
import PropTypes from "prop-types";
class App extends Component {
  componentDidMount() {
    this.props.route("Home");
  }
  render() {
    return (
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-6 mx-auto col-md-6 order-md-2">
            <img className="img-fluid shadow rounded" src="/gonzu_welcome.png" alt="Welcome" />
          </div>
          <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5">
            <h1 className="mb-3">U.E GONZU</h1>
            <p className="lead">Bienvenidos reciban un cordial saludo de la unidad educativa cardenal Gonzalez Zumarraga</p>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
App.prototypes = {
  route: PropTypes.func.isRequired
};

export default App;
