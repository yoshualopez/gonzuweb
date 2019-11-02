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
      formPassword: null
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
    if (!this.state.formEmail || !this.state.formPassword) {
      return this.setState({
        errorMessage: "Completa todos los campos vacios."
      });
    }
    const body = {
      email: this.email.value,
      password: this.password.value
    };
    const headers = { UserAgent: "GonzuWeb"};
    const endpoint = "loggin";
    const response = await component.net.post(endpoint,body,headers);
    console.log(response);
    if(response.data.error.toString().length > 0){
      return this.setState({
        errorMessage: response.data.error
      });
    }
    return this.setState({
      errorMessage: ""
    });
  };
  validatorEmail = () => {
    const email = this.email.value;
    const isEmail = emailValidator(email);
    if (!isEmail) {
      return this.setState({
        formEmail: false
      });
    }
    return this.setState({
      formEmail: true
    });
  };
  validatorPassword = () => {
    const password = this.password.value;
    const isCorrect = lengthValidator(password, { min: 5 });
    if (!isCorrect) {
      return this.setState({
        formPassword: false
      });
    }
    return this.setState({
      formPassword: true
    });
  };
  render() {
    let emailStatus;
    let passwordStatus;
    if (this.state.formEmail === null || this.state.formEmail) {
      emailStatus = style.input;
    }
    if (this.state.formPassword === null || this.state.formPassword) {
      passwordStatus = style.input;
    }
    if (this.state.formPassword === false) {
      passwordStatus = style.inputWrong;
    }
    if (this.state.formEmail === false) {
      emailStatus = style.inputWrong;
    }
    return (
      <div className="my-5 container d-flex justify-content-center">
        <form className="text-center" spellCheck="false" onSubmit={this.formSubmit}>
          <h1>Ingresar</h1>
          <p className="pt-3">Correo</p>
          <input
            onBlur={this.validatorEmail}
            onPaste={this.validatorEmail}
            onChange={
              this.state.formEmail === false ? this.validatorEmail : null
            }
            style={emailStatus}
            ref={e => (this.email = e)}
            type="email"
            placeholder="loren@ipsum.com"
          />
          <p className="pt-3">Contrase&ntilde;a</p>
          <input
            onBlur={this.validatorPassword}
            onPaste={this.validatorPassword}
            onChange={this.validatorPassword}
            style={passwordStatus}
            ref={e => (this.password = e)}
            type="password"
            placeholder="example**"
          />

          {this.state.errorMessage && 
          <div className="mt-3 alert alert-warning">
            <p className="mb-0">{this.state.errorMessage}</p>
          </div>
          }
          <div className="text-center py-3">
            <button className="btn" style={preset.button.buttonPrimary} type="submit">
              Siguiente
            </button>
          </div>
        </form>
      </div>
    );
  }
}
