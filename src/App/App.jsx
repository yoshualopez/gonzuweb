import React, { Component } from "react";
import lang from "../lang";

class App extends Component {
  render() {
    const defaultLanguaje = "es";
    return (
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="my-3 col-6 mx-auto text-center col-md-6 order-md-2">
            <img className="img-fluid shadow p-3" src="/gonzu.jpg" alt="Welcome" />
          </div>
          <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5">
            <h1 className="mb-3">{lang[defaultLanguaje].fieldFullNameSchoolLegal}</h1>
            <p className="lead">{lang[defaultLanguaje].fieldWelcomeHere + " " + lang[defaultLanguaje].fieldFullNameSchoolLegal}, en donde van a recibir información referente  a nuestra institución</p>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
