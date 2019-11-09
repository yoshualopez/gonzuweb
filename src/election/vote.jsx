import React, { Component } from "react";
import TabsElection from "./tabs";
import templates from "../templates";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tabs: null,
      personalData: null
    };
    this.voteAction = this.voteAction.bind(this);
  }
  componentDidMount() {
    const tabs = [
      <TabsElection.TabPersonalData personalData={() => this.state.personalData} next={personalData => this.setState({ personalData, index: this.state.index + 1 })} />,
      <TabsElection.TabVote
        next={personalData => this.setState({ personalData, index: this.state.index + 1 })}
        personalData={() => this.state.personalData}
        back={personalData => this.setState({ personalData, index: this.state.index ? this.state.index - 1 : 1 - 1 })}
      />,
      <TabsElection.TabConfirmVote
        confirm={this.voteAction}
        personalData={() => this.state.personalData}
        back={() => this.setState({ index: this.state.index ? this.state.index - 1 : 1 - 1 })}
      />
    ];
    this.setState({ tabs });
  }
  voteAction = (data, callback) => {
    console.log(data);
    callback(true);
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
