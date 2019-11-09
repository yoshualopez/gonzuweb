import React, { Component } from "react";
import PropTypes from "prop-types";
import components from "./components";
import style from "./styles";
import { Link } from "react-router-dom";

class Header extends Component {
  logout = () => components.auth.unsubscribe();
  render() {
    const { navigatorItems, user } = this.props;
    return (
      <div className="">
        <div style={appBar} className="d-flex py-1 container-fluid align-items-center justify-content-between">
          <img className="img-fluid" src="/ic_launcher.png" width={46} height={46} alt="Gonzu Corazon" />
          <p className="mb-0 text-center" style={{ color: style.colors.white, fontSize: style.fontSize.subTitle }}>
            U.E Cardenal Gonzalez Zumarraga
          </p>
          {user ? (
            <button onClick={this.logout.bind(this)} className="btn btn-outline-danger">
              Salir
            </button>
          ) : (
            <Link className="btn btn-outline-light" to={"/pastoral"}>
              Pastoral
            </Link>
          )}
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <div className="shadow-sm rounded-bottom d-flex align-items-center" style={appBar}>
            <ul className="m-0 row navbar-nav bd-navbar-nav flex-row">{navigatorItems.map(buildNavigationRows)}</ul>
          </div>
        </div>
      </div>
    );
  }
}
function buildNavigationRows(item, key) {
  return (
    <li key={key} className="col nav-item">
      <Link className="nav-link link-gonzu-p" to={item.path}>
        {item.pathName}
      </Link>
    </li>
  );
}

const appBar = {
  background: style.background.Primary
};

Header.prototypes = {
  navigatorItems: PropTypes.array.isRequired
};
export default Header;
