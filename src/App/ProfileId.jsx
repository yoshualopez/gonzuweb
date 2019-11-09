import React, { Component } from "react";
import component from "../components";
import PropTypes from "prop-types";
import templatesLocal from "./templates";
import templates from "../templates";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, error: null };
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  componentDidMount = () => this.getUserProfile();
  async getUserProfile() {
    const id = this.props.match.params.id;
    const endpoint = "user/" + id + "/GET";
    const header = { "x-access-token": this.props.user.token };
    const body = {};
    const response = await component.net.post(endpoint, body, header);
    if (response.isError) return;
    if (response.data.data.error) {
      return this.setState({
        error: response.data.data.error
      });
    }
    this.setState({ user: response.data.data.response.user });
  }
  render() {
    const id = this.props.match.params.id;
    const { user, error } = this.state;
    const defaultLanguajes = "es";
    let styleProfileImage = {
      width: 200,
      height: 200,
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover"
    };
    if (error) {
      return <templates.currentError error={error} />;
    }
    if (!user) {
      return <templates.spinner />;
    }
    styleProfileImage.backgroundImage = 'url("' + user.photoUrl + '")';
    return (
      <templatesLocal.Profile styleProfileImage={styleProfileImage} id={id} user={user} defaultLanguajes={defaultLanguajes} fieldIndicator={"fieldEmailIndicator"} />
    );
  }
}
Profile.prototypes = {
  user: PropTypes.func.isRequired
};

export default Profile;
