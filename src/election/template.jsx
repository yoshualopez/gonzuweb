import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Alert, Row, Col, Card } from "react-bootstrap";
import components from "../components";
import lang from "../lang";
class CreateCampaignButton extends Component {
  render() {
    const { endpoint } = this.props;
    return (
      <Link className="btn btn-outline-primary" to={endpoint}>
        {lang["es"].buttonCreateCampaignIndicator}
      </Link>
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
const modalCandidate = (data, modalShow, closeModal, save, modalError) => {
  const defaultLanguaje = "es";
  data.integrants = data.integrants ? data.integrants : [{ position: "president" }, { position: "vpresident" }, { position: "secretary" }, { position: "treasurer" }];
  return (
    <Modal show={modalShow} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Candidato {lang[defaultLanguaje].fieldAbreviationSchoolName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="py-3">
          <Col>Candidato</Col>
          <Col>
            <select defaultValue={data.coverName} onChange={e => (data.coverName = e.target.value)} className="custom-select">
              <option value={""}></option>
              {candidates.map((item, key) => {
                return (
                  <option key={key} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            {/* <input className="form-control" onChange={e => (data.coverName = e.target.value)} defaultValue={data.coverName} type="text" /> */}
          </Col>
        </Row>
        <Row className="py-3">
          <Col>{lang[defaultLanguaje].tolltipInitialsCampaign}</Col>
          <Col>
            <input className="form-control" onChange={e => (data.nickNameList = e.target.value)} defaultValue={data.nickNameList} type="text" />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>Significado iniciales</Col>
          <Col>
            <input className="form-control" onChange={e => (data.nickNameListMeaning = e.target.value)} defaultValue={data.nickNameListMeaning} type="text" />
          </Col>
        </Row>
        {data.integrants.map((item, key) => {
          return (
            <Card key={key}>
              <Card.Header>
                <h4>{chargeFilter(item.position)}</h4>
              </Card.Header>
              <Card.Body>
                <Row className="py-2">
                  <Col>Nombre</Col>
                  <Col>
                    <input className="form-control" onChange={e => (item.fullname = e.target.value)} defaultValue={item.fullname} type="text" />
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col>Edad</Col>
                  <Col>
                    <select defaultValue={item.age} onChange={e => (item.age = e.target.value)} className="custom-select">
                      <option value=""></option>
                      {ageIntegrants.map((item, key) => {
                        return (
                          <option key={key} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col>Curso</Col>
                  <Col>
                    <select defaultValue={item.course} onChange={e => (item.course = e.target.value)} className="custom-select">
                      <option value=""></option>
                      {coursesList.map((item, key) => {
                        return (
                          <option key={key} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
        {modalError && <Alert variant="warning">{modalError}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {lang[defaultLanguaje].buttonCloseIndicator}
        </Button>
        <Button variant="primary" onClick={() => save(data)}>
          {lang[defaultLanguaje].buttonConfirmIndicator}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const campaign = {
  get: async (token = "") => {
    try {
      const endpoint = "/campaign";
      const headers = { "x-access-token": token };
      const response = { isError: false, response: {} };
      const connectionsState = await components.net.get(endpoint, {}, headers);
      if (connectionsState.isError) {
        response.isError = connectionsState.isError;
        response.response = connectionsState.data;
        return response;
      }
      response.isError = false;
      response.response = connectionsState.data.data.response;
      return response;
    } catch (error) {
      const defaultLanguaje = "es";
      const response = { isError: false, response: {} };
      response.isError = true;
      response.response = lang[defaultLanguaje].unxpectedError;
      return response;
    }
  },
  post: async (token, body) => {
    try {
      const endpoint = "/createcampaign";
      const headers = { "x-access-token": token };
      const response = { isError: false, response: {} };
      const connectionsState = await components.net.post(endpoint, body, headers);
      if (connectionsState.isError) {
        response.isError = connectionsState.isError;
        response.response = connectionsState.data;
        return response;
      }
      response.isError = false;
      response.response = connectionsState.data.data.response;
      return response;
    } catch (error) {
      const defaultLanguaje = "es";
      const response = { isError: false, response: {} };
      response.isError = true;
      response.response = lang[defaultLanguaje].unxpectedError;
      return response;
    }
  }
};
const ageIntegrants = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const candidates = ["Lista A", "Lista B", "Lista C", "Lista D", "Lista E", "Lista F"];
const coursesList = ["1ro EBG", "2do EBG", "3ro EBG", "4to EGB", "5to EGB", "6to EGB", "7mo EGB", "8vo EGB", "9no EGB", "10mo EGB", "1ro BGU", "2do BGU", "3ro BGU"];
export default {
  CreateCampaignButton,
  coursesList,
  candidates,
  modalCandidate,
  ageIntegrants,
  campaign,
  chargeFilter
};
