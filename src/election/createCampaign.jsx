import React, { Component } from "react";
import localTemplate from "./template";
import {
  Button,
  Container,
  Alert,
  Row,
  Col,
  Card,
  Badge
} from "react-bootstrap";
import lang from "../lang";

class CreateCampaign extends Component {
  state = {
    modalshow: false,
    cardSelected: null,
    addListShow: false,
    errorSaveAndAdd: false,
    cardSelectPosition: null,
    saveButtonState: false,
    modalSelectType: false,
    statusCreateCampaign: "creating",
    status: {
      creating: "creating",
      done: "done",
      error: "error"
    },
    modalError: "",
    lists: []
  };
  saveCampaign = async () => {
    const defaultLanguaje = "es";
    const { token } = this.props.user;
    this.setState({
      saveButtonState: true
    });
    if (!this.state.lists || this.state.lists.length <= 1) {
      return this.setState({
        saveButtonState: false,
        errorSaveAndAdd: lang[defaultLanguaje].alertEmptyCandidats
      });
    }
    const body = {
      electionYear: Date.now(),
      lists: this.state.lists,
      status: "open",
      votes: []
    };
    const response = await localTemplate.campaign.post(token, body);
    if (response.isError) {
      return this.setState({
        saveButtonState: false,
        errorSaveAndAdd: response.response
      });
    }
    return this.props.history.goBack();
  };
  updateCandidate = data => {
    
    this.setState((state) =>{

    state.lists[state.cardSelectPosition] = data;
      return {lists : state.lists,cardSelected: false};
      // state : this.state,
      // lists: this.state.lists,
      // cardSelected: false
    });
  };
  openAddCandidate = () =>
    this.setState({ addListShow: true, cardSelected: {}, modalError: false });
  openModalSelectType = () => this.setState({ modalSelectType: true });
  saveAddCandidate = data => {
    console.log(data);
    const defaultLanguaje = "es";
    if (!data.coverName || !data.nickNameList || !data.nickNameListMeaning) {
      return this.setState({
        cardSelected: data,
        modalError: lang[defaultLanguaje].alertCompleteAllFields
      });
    }
    // data.nickLogoUrl = "/IFUG2.jpg";
    for (let car in data.integrants) {
      if (
        !data.integrants[car].fullname ||
        !data.integrants[car].course ||
        !data.integrants[car].age
      ) {
        return this.setState({
          cardSelected: data,
          modalError: lang[defaultLanguaje].alertCompleteAllFields
        });
      }
    }
    this.setState({
      lists: [...this.state.lists, data],
      addListShow: false,
      cardSelected: {},
      modalError: false
    });
  };
  selectType = type => {
    if (type === "addListShow") {
      return this.setState({
        modalSelectType: false,
        cardSelected: {},
        [type]: true
      });
    }
    const nulo = {
      coverName: "Nulo",
      type: "nulo"
    };
    return this.setState({
      lists: [...this.state.lists, nulo],
      modalSelectType: false
    });
  };
  closeModal = type =>
    this.setState({ [type]: false, cardSelected: {}, modalError: false });
  openModal = (data, position) =>
    this.setState({
      modalshow: true,
      cardSelectPosition: position,
      cardSelected: data,
      modalError: false
    });
  render() {
    const defaultLanguaje = "es";
    const {
      cardSelected,
      errorSaveAndAdd,
      modalSelectType,
      modalError,
      lists,
      modalshow,
      addListShow
    } = this.state;

    const campaignYear = new Date(Date.now()).getFullYear();
    return (
      <Container className="py-5">
        <h4 className="text-center">
          {lang[defaultLanguaje].fieldElections + " "}
          {campaignYear} - {campaignYear + 1}
        </h4>
        <Row className="my-3 align-items-center">
          {lists.map((item, key) => cardBuilder(item, key, this.openModal))}
          <Col>
            <Button onClick={this.openModalSelectType}>
              + {lang[defaultLanguaje].buttonAddCandidateIndicator}
            </Button>
          </Col>
        </Row>
        {errorSaveAndAdd && <Alert variant="warning">{errorSaveAndAdd}</Alert>}
        <div className="d-flex justify-content-between">
          <Button
            onClick={this.props.history.goBack}
            variant="primary"
            type="button"
          >
            {lang[defaultLanguaje].buttonBackIndicator}
          </Button>
          <Button
            onClick={this.state.saveButtonState ? null : this.saveCampaign}
            variant="success"
            type="button"
          >
            {lang[defaultLanguaje].buttonSaveIndicator}
          </Button>
        </div>
        {modalSelectType &&
          localTemplate.modalSelectType(
            {},
            modalSelectType,
            () => this.closeModal("modalSelectType"),
            this.selectType
          )}
        {addListShow &&
          localTemplate.modalCandidate(
            cardSelected,
            addListShow,
            this.closeModal,
            this.saveAddCandidate,
            modalError,
            "addListShow"
          )}
        {cardSelected &&
          localTemplate.modalCandidate(
            cardSelected,
            modalshow,
            this.closeModal,
            this.updateCandidate,
            modalError,
            "modalshow"
          )}
      </Container>
    );
  }
}

const cardBuilder = (value, key, callback) => {
  const areNulo = value.type === "nulo";
  return (
    <Col key={key} className="col-sm">
      <Card onClick={areNulo ? null : () => callback(value, key)} bg="dark">
        <Card.Header className="text-white d-flex justify-content-between align-items-center">
          {value.coverName}{" "}
          <Badge className="badge-primary">{value.nickNameList}</Badge>
        </Card.Header>
        <Card.Body className="text-white">
          {value.nickNameListMeaning}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CreateCampaign;
