import React, { Component } from "react";
import { Link } from "react-router-dom";
import template from "../templates";
import { ModalEditUser } from "./users.templates";
import lang from "../lang";
import socket from "../socket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [], usermodal: null };
    this.showUser = this.showUser.bind(this);
    this.hiddeUser = this.hiddeUser.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }
  componentDidMount = () => this.updateChange();
  updateChange = () => socket.on("users", usersList => this.setState({ usersList }));
  showUser = usermodal => this.setState({ usermodal });
  hiddeUser = () => {
    this.updateChange();
    this.setState({ usermodal: null });
  };
  render() {
    const defaultLanguaje = "es";
    const { usersList, usermodal } = this.state;
    if (usersList.length > 0) {
      return (
        <div className="container my-5">
          <div className="d-flex justify-content-center">
            <Link to="/users/add" className="btn btn-primary">
              Nuevo usuario
            </Link>
          </div>
          <ModalEditUser user={this.props.user} update={this.updateChange} data={usermodal} closeModal={this.hiddeUser} />
          {usersList.map((data, key) => usersListBuilder(data, key, this.showUser, this.props.user, defaultLanguaje))}
        </div>
      );
    }
    if (usersList.length === 0) {
      return (
        <template.noActiveUser>
          <div className="d-flex justify-content-center">
            <Link to="/users/add" className="btn btn-primary">
              Nuevo usuario
            </Link>
          </div>
        </template.noActiveUser>
      );
    }
    return <template.spinner />;
  }
}
const usersListBuilder = (user, key, callback, localUser, defaultLanguaje) => {
  user.permissions && user.permissions.sort((a, b) => b.length - a.length);
  user.childrens && user.childrens.sort((a, b) => b.length - a.length);
  const myAccountAreHere = localUser.id === user._id;
  if (myAccountAreHere) {
    return <div key={key} />;
  }

  return (
    <div key={key} className="container shadow-lg p-0 my-3">
      <button onClick={() => callback(user)} className="bg-white btn btn-light p-3 rounded-top col">
        <div className="container row py-3">
          <div className="col">
            <h6>{lang[defaultLanguaje].fieldEmailIndicator}</h6>
            <p>{user.email}</p>
          </div>
          <div className="col">
            <h6>{lang[defaultLanguaje].fieldFullnameIndicator}</h6>
            <p>{user.fullname}</p>
          </div>
          <div className="col">
            <h6>{lang[defaultLanguaje].fieldAccountTypeIndicator}</h6>
            <p>{user.accountType}</p>
          </div>
          <div className="col">
            <h6>{lang[defaultLanguaje].fieldPermissionsIndicator}</h6>
            {user.permissions.map(listPermissions)}
          </div>
          <div>
            <h6>{lang[defaultLanguaje].fieldChildrenCountIndicator}</h6>
            {countListLengthValidation(user.childrens)}
          </div>
          {user.teacherAssignature && item(user.teacherAssignature, "Profesor")}
          {user.teacherTutor && item(user.teacherTutor, "Tutor")}
        </div>
      </button>
      <Link className="shadow-sm rounded-0 row-6 btn btn-outline-primary btn-lg btn-block mt-0" to={"/profile/" + user._id}>
        {lang[defaultLanguaje].buttonViewProfileIndicator}
      </Link>
    </div>
  );
};
const countListLengthValidation = list => {
  const itemsToSlice = list.indexOf("") !== -1 ? list.indexOf("") : list.length;
  return list.slice(0, itemsToSlice).length;
};
const item = (item, itemName) => {
  return (
    <div>
      <h6>{itemName}</h6>
      <p>{item}</p>
    </div>
  );
};
const listPermissions = (permission, key) => {
  return <p key={key}>{permission}</p>;
};
export default App;
