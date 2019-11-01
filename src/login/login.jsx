import React, { Component } from "react";
import { Link } from "react-router-dom";
import preset from "../presets";

export default class Login extends Component {
  componentDidMount(){
    this.props.route('login');
  }
  render() {
    return (
      <div>
        <div>
          <Link to="/login/flia">
            <button style={preset.button.buttonPrimary} type="button">
              Parent
            </button>
          </Link>
        </div>
        <div>
          <Link to="/login/teachers">
            <button style={preset.button.buttonPrimary} type="button">
              Teacher
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
