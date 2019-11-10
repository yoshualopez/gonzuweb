import React, { Component } from "react";
import { Link } from "react-router-dom";
import lang from "../lang";

export default class E404 extends Component {
  render() {
    const defaultLanguajes = "es";
    const posterNotFound = "/images/undraw_Taken_if77.svg";
    return (
      <div className="container text-center py-5">
        <div className="row align-items-center">
          <div className="col">
            <img className="img-fluid" src={posterNotFound} alt="" />
          </div>
          <div className="col">
            <h3>{lang[defaultLanguajes].errorNotFound}</h3>
          </div>
        </div>
        <div className="py-3 d-flex alig-items-center justify-content-center">
          <button className="btn btn-link" onClick={this.props.history.goBack} type="button">
            {lang[defaultLanguajes].returnBackButton}
          </button>
          <Link to="/">
            <button className="btn btn-link" type="button">
              {lang[defaultLanguajes].returnHomeButton}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
