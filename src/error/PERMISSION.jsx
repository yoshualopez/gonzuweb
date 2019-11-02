import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class E404 extends Component {
  render() {
    return <div className="container text-center py-5">
      <p>Error permission unxpected!.</p>
        <div className="py-3 d-flex alig-items-center justify-content-center">
          <Link to="/">
            <button className="btn btn-link" type="button">Return to home</button>
          </Link>
        </div>
    </div>;
  }
}
