import React, { Component } from "react";
import { Link } from "react-router-dom";
import template from "../templates";
import { ModalEditUser } from "./users.templates";
import socket from "../socket";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { listUsers: [], user: null };
    this.showUser = this.showUser.bind(this);
    this.hiddeUser = this.hiddeUser.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }
  componentDidMount = () => this.updateChange();
  updateChange = () => socket.on("users", listUsers => this.setState({ listUsers }));
  showUser = user => this.setState({ user });
  hiddeUser = () => this.setState({ user: null });
  render() {
    const { listUsers, user } = this.state;
    if (listUsers.length > 0) {
      return (
        <div className="container my-5">
          <div className="d-flex justify-content-center">
            <Link to="/users/add" className="btn btn-primary">
              Nuevo usuario
            </Link>
          </div>
          <ModalEditUser user={this.props.user} update={this.updateChange} data={user} closeModal={this.hiddeUser} />
          <div className="col">{listUsers.map((data, key) => listUser(data, key, this.showUser))}</div>
        </div>
      );
    }
    if (listUsers.length === 0) {
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
const listUser = (user, key, callback) => {
  return (
    <button key={key} onClick={() => callback(user)} className="btn btn-light container p-3 my-3 bg-white rounded my-3 row">
      <div className="container row">
        <div className="col">
          <h6>EMAIL</h6>
          <p>{user.email}</p>
        </div>
        <div className="col">
          <h6>Nombre Completo</h6>
          <p>{user.fullname}</p>
        </div>
        <div className="col">
          <h6>Tipo de cuenta</h6>
          <p>{user.accountType}</p>
        </div>
        <div className="col">
          <h6>Permisos</h6>
          {user.permissions.map(listPermissions)}
        </div>
        <div>
          <h6>Representados</h6>
          {user.childrens.length}
        </div>
        {user.teacherAssignature && item(user.teacherAssignature, "Profesor")}
        {user.teacherTutor && item(user.teacherTutor, "Tutor")}
      </div>
    </button>
  );
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
