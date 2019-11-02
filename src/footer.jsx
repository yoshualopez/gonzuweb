import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bd-footer text-muted">
        <div className="container-fluid p-3 p-md-5">
          <div className="d-flex justify-content-between">
            <p>&copy; Gonzu 2019</p>
            <a className="btn btn-outline-dark" href="tel:+22222222">
              22222222
            </a>
          </div>
          <p>Designed by YELL</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
