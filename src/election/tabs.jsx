import React, { Component } from "react";
import lang from "../lang";
import { Card } from "react-bootstrap";
import components from "../components";
import templates from "../templates";
import localTemplates from "./template";

class TabPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "ci",
      students: []
    };
  }
  selectStudent = student => {
    this.props.next(student);
  };
  search = async e => {
    const body = {
      data: e.target.value
    };
    const headers = { "x-access-token": this.props.user.token };
    if (this.state.filter === "ci") {
      const response = await components.net.post("/student/ci", body, headers);
      if (response.isError) {
      }
      if (response.data.data.auth) {
        return this.setState({
          filter: this.state.filter,
          students: response.data.data.response
        });
      }
      return;
    }
    if (this.state.filter === "enrollment") {
      const response = await components.net.post(
        "/student/enrollment",
        body,
        headers
      );
      if (response.isError) {
      }
      return this.setState({
        filter: this.state.filter,
        students: response.data.data.response
      });
    }
  };
  render() {
    const defaultLanguaje = "es";
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col text-center">
            <h3>{lang[defaultLanguaje].fieldElections} Gonzu 2019 - 2020</h3>
            <img className="img-fluid" src="/gonzu.jpg" alt="" />
          </div>
          <div className="col">
            <div>
              <h4>Ingreso de usuario votante</h4>
            </div>
            <div className="d-flex justify-content-between">
              <select
                defaultValue={this.state.filter}
                onChange={e => this.setState({ filter: e.target.value })}
                className="custom-select"
              >
                <option value="ci">C&eacute;dula</option>
                <option value="enrollment">Numero matr&iacute;cula</option>
              </select>
              <input
                onChange={this.search}
                type="text"
                className="form-control"
                placeholder=""
              />
            </div>
            {this.state.students &&
              this.state.students.map((student, key) => {
                return (
                  <Card
                    key={key}
                    onClick={() => this.selectStudent(student)}
                    className="card"
                  >
                    <Card.Body>
                      <p>
                        <strong>Estudiante: </strong>
                        {student.firstname} {student.secondname}{" "}
                        {student.firstlastname} {student.secondlastname}
                      </p>
                      <p>
                        <strong>C&eacute;dula: </strong> {student.identicard}
                      </p>
                      <p>
                        <strong>N&uacute;mero matricula: </strong>{" "}
                        {student.enrollmentcode}
                      </p>
                    </Card.Body>
                    <Card.Footer className="bg-primary text-white text-right">
                      {lang[defaultLanguaje].buttonNextIndicator}
                    </Card.Footer>
                  </Card>
                );
              })}
          </div>
        </div>
        {/* <div className=" mt-5 d-flex justify-content-center">
          <button className="btn btn-outline-primary" onClick={this.nextTab}>
            {lang[defaultLanguaje].buttonNextIndicator}
          </button>
        </div> */}
      </div>
    );
  }
}

class TabVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSelected: null,
      lists: [],
      campaign: {}
    };

    this.vote = this.vote.bind(this);
    this.cardSelect = this.cardSelect.bind(this);
  }
  componentDidMount = () => this.getList();
  getList = async () => {
    const response = await localTemplates.campaign.get(this.props.user.token);
    if (response.isError) {
      return console.log(response.response);
    }
    return this.setState({
      lists: response.response[0].lists.reverse(),
      campaign: response.response[0]
    });
  };
  cardSelect = card => this.setState({ cardSelected: card });
  vote = () => {
    if (this.state.cardSelected === null) return;
    const userCover = this.props.personalData();
    userCover.listSelect = this.state.lists[this.state.cardSelected];
    this.props.next(userCover, this.state.campaign);
  };
  render() {
    const { personalData } = this.props;
    const defaultLanguaje = "es";
    const areDontListSelected = this.state.cardSelected === null;
    const data = personalData();
    if (!data) {
      return (
        <div className="d-flex justify-content-center my-3 container">
          <templates.spinner />;
        </div>
      );
    }
    return (
      <div style={{ marginTop: "-30px" }} className="text-center">
        <h3>Seleccionar una lista</h3>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary"
            onClick={() => this.props.back(data)}
          >
            {lang[defaultLanguaje].buttonBackIndicator}
          </button>
          {areDontListSelected ? (
            <button className="btn btn-outline-success" onClick={null}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          ) : (
            <button className="btn btn-success" onClick={this.vote}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          )}
        </div>
        <div className="card-group row">
          {this.state.lists.map((lista, key) => {
            const cardActive =
              this.state.cardSelected === key ? "selected" : "";
            const className = "selectable " + cardActive;
            if (lista.type === "nulo") {
              return (
                <div key={key} className="col-lg-12">
                  <div
                    style={{ border: "none" }}
                    onClick={() => this.cardSelect(key)}
                    className="card"
                  >
                    <div className={className}>
                      <div className="content">
                        <div className="row">
                          <div className="col">
                            <h1 className="title">{lista.coverName}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="check">
                        <span className="checkmark">
                          <ion-icon name="checkmark"></ion-icon>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={key} className="col-lg-6">
                <div
                  style={{ border: "none" }}
                  onClick={() => this.cardSelect(key)}
                  className="card"
                >
                  <div className={className}>
                    <div className="content">
                      <div className="row">
                        <div className="col">
                          <h1 className="title">{lista.coverName}</h1>
                          <h4 className="title">{lista.nickNameList}</h4>
                        </div>
                        <div className="col">
                          <img
                            className="img-fluid "
                            src={lista.nickLogoUrl}
                            alt="Welcome"
                          />
                        </div>
                      </div>
                      <div className="col py-3">
                        <img
                          className="img-fluid "
                          src={lista.imageGroupUrl}
                          alt="Welcome"
                        />
                        <h3 className="title">{lista.nickNameListMeaning}</h3>
                      </div>
                      <div className="col px-0 pt-3">
                        {lista.integrants.map((integrant, key) => {
                          return (
                            <div
                              key={key}
                              className="d-flex align-items-center justify-content-between"
                            >
                              <h5 className="description">
                                {integrant.fullname}
                              </h5>
                              <span className="badge badge-primary">
                                {chargeFilter(integrant.position)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="check">
                      <span className="checkmark">
                        <ion-icon name="checkmark"></ion-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary"
            onClick={() => this.props.back(data)}
          >
            {lang[defaultLanguaje].buttonBackIndicator}
          </button>
          {areDontListSelected ? (
            <button className="btn btn-outline-success" onClick={null}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          ) : (
            <button className="btn btn-success" onClick={this.vote}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          )}
        </div> */}
      </div>
    );
  }
}
const chargeFilter = charge => {
  charge = charge ? charge.toLowerCase() : "unxpected";
  switch (charge) {
    case "president":
      return "Presidente/a";
    case "vpresident":
      return "Vicepresidente/a";
    case "treasurer":
      return "Tesorero/a";
    case "secretary":
      return "Secretario/a";
    default:
      return "Unxpected";
  }
};
class TabConfirmVote extends Component {
  state = { loading: false };
  render() {
    const { personalData } = this.props;
    const data = personalData();
    const defaultLanguaje = "es";
    console.log("DATA => ", data);
    return (
      <div className="text-center">
        <div className="container mb-3">
          <div className="row my-3">
            <div className="col">
              <h4>{lang[defaultLanguaje].fieldFullnameIndicator}</h4>
            </div>
            <div className="col">
              <p>{data ? data.identicard : ""}</p>
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h4>C&eacute;dula</h4>
            </div>
            <div className="col">
              <p>
                {data
                  ? data.firstname +
                    " " +
                    data.secondname +
                    " " +
                    data.firstlastname +
                    " " +
                    data.secondlastname
                  : ""}
              </p>
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h4>N&uacute;mero de matricula</h4>
            </div>
            <div className="col">
              <p>{data ? data.enrollmentcode : ""}</p>
            </div>
          </div>
          <div className="my-3 d-flex justify-content-center">
            {data && (
              <h3 className="text-white p-3 bg-success rounded shadow">
                {data.listSelect.coverName}
              </h3>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            onClick={this.state.loading ? null : this.props.back}
            className="btn btn-outline-primary"
          >
            {lang[defaultLanguaje].buttonBackIndicator}
          </button>
          {this.state.loading ? (
            <button className="btn btn-success" onClick={null}>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={
                data
                  ? () =>
                      this.props.confirm(data, loading =>
                        this.setState({ loading })
                      )
                  : null
              }
            >
              {lang[defaultLanguaje].buttonConfirmIndicator}
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default {
  TabPersonalData,
  TabVote,
  TabConfirmVote
};
