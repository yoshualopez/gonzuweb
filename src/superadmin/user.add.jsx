import React, { Component } from "react";
import templates from "../templates";
// const email = req.body.email || "";
// const password = req.body.password || "";
// const fullname = req.body.fullname || "";
// const accountType = req.body.accountType || "basic";
// const gender = req.body.gender || "";
class NewUserForm extends Component {
  render() {
    const permissionToCreateUser = false;
    if (!permissionToCreateUser) {
      return <templates.NoPermissionProvide />;
    }
    return <div className="py-5 container"></div>;
  }
}

export default NewUserForm;
