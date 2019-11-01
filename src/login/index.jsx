import React, { Component } from "react";
import emailValidator from "validator/lib/isEmail";
import lengthValidator from "validator/lib/isLength";
import component from "../components";
import style from "./presets";
import preset from "../presets";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: "",
      errorMessage: "",
      formEmail: null,
      formPassword : null
    };
    this.email = React.createRef();
    this.password = React.createRef();
    this.formSubmit = this.formSubmit.bind(this);
    this.validatorEmail = this.validatorEmail.bind(this);
    this.validatorPassword = this.validatorPassword.bind(this);
  }
  formSubmit = async e => {
    e.preventDefault();
    this.validatorEmail();
    this.validatorPassword();
    console.log(this.state.formPassword,this.state.formEmail)
    if (!this.state.formEmail || !this.state.formPassword) {
      return this.setState({
        errorMessage: "Complete all fields empty."
      });
    }
    const pathendpoint = this.state.site;
    const body = {
      email: this.email.value,
      password: "uno"
    };
    const headers = {
      "UserAgent": "GonzuWeb",
      "Access-Control-Allow-Origin": "*"
    };
    if (pathendpoint.indexOf("flia") !== -1) {
      const endpoint = "loggin/flia";
      const result = await component.net.post({
        path: endpoint,
        body,
        headers
      });
      console.log(result);
    }
    if (pathendpoint.indexOf("teachers") !== -1) {
      const endpoint = "loggin/teachers";
      const result = await component.net.post({
        path: endpoint,
        body,
        headers
      });
      console.log(result);
    }
    const endpoint = "loggin";
      const result = await component.net.post({
        path: endpoint,
        body,
        headers
      });
      console.log(result);
    return;
  };
  componentDidMount() {
    const path = this.props.match.path.replace("/login/", "");
    this.props.route(path);
    return this.setState({
      site: path
    });
  }
  validatorEmail = () => {
    const email = this.email.value;
    const isEmail = emailValidator(email);
    if (isEmail) {
      return this.setState({
        formEmail: true
      });
    }
    return this.setState({
      formEmail: false
    });
  };
  validatorPassword = () => {
    const password = this.password.value;
    const isCorrect = lengthValidator(password,{ min : 5 });
    if(isCorrect){
      return this.setState({
        formPassword : true,
      });
    }
    return this.setState({
      formPassword : false,
    });
  }
  render() {
    let emailStatus;
    let passwordStatus;
    let userTypeWelcome;
    if (this.state.formEmail === null || this.state.formEmail) {
      emailStatus = style.input;
    }
    if(this.state.formPassword === null || this.state.formPassword){
      passwordStatus = style.input
    }
    if(this.state.formPassword === false){
      passwordStatus = style.inputWrong
    }
    if (this.state.formEmail === false) {
      emailStatus = style.inputWrong;
    }
    if (this.state.site === "flia") {
      userTypeWelcome = "Parents";
    }
    if (this.state.site === "teachers") {
      userTypeWelcome = "Teachers";
    }
    return (
      <div>
        <form spellCheck="false" onSubmit={this.formSubmit}>
          <h1 style={style.title}>Login {userTypeWelcome}</h1>
          <p style={style.fields}>Email</p>
          <input
            onBlur={this.validatorEmail}
            onPaste={this.validatorEmail}
            onChange={this.state.formEmail === false ? this.validatorEmail : null}
            style={emailStatus}
            ref={e => (this.email = e)}
            type="email"
            placeholder="email"
          />
          <p style={style.fields}>Password</p>
          <input
            onBlur={this.validatorPassword}
            onPaste={this.validatorPassword}
            onChange={this.validatorPassword}
            style={passwordStatus}
            ref={e => (this.password = e)}
            type="password"
            placeholder="password"
          />
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <button style={preset.button.buttonPrimary} type="submit">
            Next
          </button>
        </form>
      </div>
    );
  }
}
