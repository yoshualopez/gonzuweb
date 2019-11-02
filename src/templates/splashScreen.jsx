import React, { Component } from "react";

export default class SplashScreen extends Component {
  render = () => (
    <div className="w-100 h-100 align-items-center d-flex position-fixed justify-content-center">
      <div className="text-center col container">
        {this.props.children}
        <h4 className="text-primary pt-3">U.E CARDENAL GONZALEZ ZUMARRAGA</h4>
      </div>
    </div>
  );
}
