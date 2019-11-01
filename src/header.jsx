import React, { Component } from "react";
import PropTypes from "prop-types";
import component from './components'
import preset from './presets';
import style from './styles';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div style={appBar} className="d-flex py-1 container-fluid align-items-center justify-content-between">
          <img src="/ic_launcher.png" width={36} height={36}/>
          <p className="mb-0" style={{color : style.colors.white,fontSize : style.fontSize.subTitle}}>Cardenal Gonzalez Zumarraga</p>
          <a className="btn btn-outline-light" href="/pastoral">Pastoral</a>
          <button className="mx-2 btn btn-light shadow" onClick={() => component.preference.setDarkMode(true)} type="button">DarkMode</button>
        </div>
        <div className="d-flex container align-items-center justify-content-center">
          <div style={appBar}>

          </div>
        </div>
      </div>
    );
  }
}
// {this.props.navigatorItems.map((item, key) => build(item, key))}
function build(item, key) {
  return (
    <Link key={key} to={item.path}>
      <button className="btn-gonzu-p">{item.name}</button>
    </Link>
  );
}

const appBar = {
  background : style.background.Primary
}


Header.prototypes = {
  navigatorItems: PropTypes.array.isRequired
};
