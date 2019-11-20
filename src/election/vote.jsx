import React, { Component } from "react";
import TabsElection from "./tabs";
import components from "../components";
import templates from "../templates";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tabs: null,
      campaign: {},
      personalData: null
    };
    this.voteAction = this.voteAction.bind(this);
  }
  componentDidMount() {
    const { user } = this.props;
    const { index } = this.state;
    const tabs = [
      <TabsElection.TabSelectCampaign
        user={user}
        next={(personalData, campaign) =>
          this.setState({ personalData, campaign, index: this.state.index + 1 })
        }
      />,
      <TabsElection.TabPersonalData
        user={user}
        campaign={() => this.state.campaign}
        personalData={() => this.state.personalData}
        next={personalData =>
          this.setState({ personalData, index: this.state.index + 1 })
        }
      />,
      <TabsElection.TabVote
        user={user}
        campaign={() => this.state.campaign}
        next={(personalData, campaign) =>
          this.setState({ personalData, campaign, index: this.state.index + 1 })
        }
        personalData={() => this.state.personalData}
        back={personalData =>
          this.setState({
            personalData,
            index: this.state.index ? this.state.index - 1 : 1 - 1
          })
        }
      />,
      <TabsElection.TabConfirmVote
        confirm={this.voteAction}
        personalData={() => this.state.personalData}
        back={() =>
          this.setState({
            index: this.state.index ? this.state.index - 1 : 1 - 1
          })
        }
      />
    ];
    this.setState({ tabs });
  }
  voteAction = async (data, buttonIsLoadding) => {
    buttonIsLoadding(true);
    const body = {
      user: data,
      campaign: this.state.campaign,
      listSelect: data.listSelect
    };
    const headers = { "x-access-token": this.props.user.token };
    const response = await components.net.post("/defray", body, headers);
    if (response.isError) {
      return buttonIsLoadding(false);
    }
    return this.setState({
      index: 0
    });
  };
  render() {
    const { index, tabs } = this.state;
    if (!tabs) {
      return (
        <div className="d-flex justify-content-center my-3 container">
          <templates.spinner />;
        </div>
      );
    }
    return <div className="my-5 container">{tabs[index]}</div>;
  }
}
export default Vote;
