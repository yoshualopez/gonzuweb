import React, { Component } from "react";
import PropTypes from "prop-types";
import templates from "./templates";

class Profile extends Component {
  render() {
    const defaultLanguajes = "es";
    let styleProfileImage = {
      width: 200,
      height: 200,
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover"
    };
    const { user } = this.props;
    styleProfileImage.backgroundImage = 'url("' + user.photoUrl + '")';
    return <templates.Profile styleProfileImage={styleProfileImage} user={user} defaultLanguajes={defaultLanguajes} fieldIndicator={"fieldEmailIndicator"} />;
  }
}
Profile.prototypes = {
  user: PropTypes.func.isRequired
};

export default Profile;
