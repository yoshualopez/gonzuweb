import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import templates from "../templates";
import localTemplate from "./template";
import lang from "../lang";
import CreateCampaign from "./createCampaign";

class Campaign extends Component {
  state = {
    connectionState: "loading",
    data: {},
    error: "",
    connection: { done: "done", fail: "fail", loading: "loading" }
  };
  async componentDidMount() {
    const { connection } = this.state;
    const dataCampaign = await localTemplate.campaign.get(
      this.props.user.token
    );
    if (dataCampaign.isError) {
      return this.setState({
        connectionState: connection.fail,
        error: dataCampaign.response
      });
    }
    return this.setState({
      connectionState: connection.done,
      data: dataCampaign.response
    });
  }
  render() {
    const { connectionState, connection, data, error } = this.state;
    if (connectionState === connection.fail) {
      return (
        <div className="container text-center my-5">
          <h3>Error: {error.toString()}</h3>
        </div>
      );
    }
    if (connectionState === connection.done) {
      return (
        <div className="container text-center my-5">
          <localTemplate.CreateCampaignButton endpoint="/elections/campaigncreate" />
          <div className="row justify-content-center align-items-center">
            {data.map(campaignMapper)}
          </div>
        </div>
      );
    }
    return (
      <div className="container text-center my-5">
        <templates.spinner />
      </div>
    );
  }
}
const campaignMapper = (data, key) => {
  return (
    <Link key={key} className="text-decoration-none" to={"/elections/campaign/" + data._id}>
      <Card bg="success">
        <Card.Title className="text-white p-3">
          Elecciones {new Date(data.electionYear).getFullYear()} -{" "}
          {new Date(data.electionYear).getFullYear() + 1}
        </Card.Title>
        {/* <Card.Subtitle>Subtitle</Card.Subtitle> */}
        <Card.Body className="text-white">
          <p>{data.lists.length} listas concursantes</p>
          {statusFilter(data.status)}
        </Card.Body>
        <Card.Footer className="text-white">
          <h5>{data.votes.length} votos totales</h5>
        </Card.Footer>
      </Card>
    </Link>
  );
};
const statusFilter = (status = "") => {
  switch (status) {
    case "open":
      return <p className="bg-primary rounded py-2">Abierto</p>;
    case "listen":
      return <p className="bg-secondary rounded py-2">En votacion</p>;
    case "closed":
      return <p className="bg-danger rounded py-2">Cerrado</p>;
    default:
      return (
        <p className="bg-warning rounded py-2">{lang.es.unxpectedError}</p>
      );
  }
};

export default {
  CreateCampaign,
  Campaign
};
