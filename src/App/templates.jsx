import React from "react";
import lang from "../lang";
class Profile extends React.Component {
  render() {
    const { styleProfileImage, user, defaultLanguajes, fieldIndicator } = this.props;
    user.permissions && user.permissions.sort((a, b) => b.length - a.length);
    user.childrens && user.childrens.sort((a, b) => b.length - a.length);
    return (
      <div className="container my-5">
        <div className="row align-items-center">
          <div style={{ maxWidth: "100%" }} className="d-flex justify-content-center col-6 mx-auto col-md-6 text-center order-md-2">
            <div style={styleProfileImage} className="shadow rounded-circle" />
          </div>
          <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5">
            <h4 className="my-5">{user.fullname}</h4>
            <div className="row">
              <div className="col">
                <h5>{lang[defaultLanguajes][fieldIndicator]}</h5>
              </div>
              <div className="col">
                <p className="lead">{user.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5>{lang[defaultLanguajes].fieldAccountTypeIndicator}</h5>
              </div>
              <div className="col">
                <p className="lead">{user.accountType}</p>
              </div>
            </div>
            {user.teacherAssignature && (
              <div className="row">
                <div className="col">
                  <h5>{lang[defaultLanguajes].fieldteacherAssignatureIndicator}</h5>
                </div>
                <div className="col">
                  <p className="lead">{user.teacherAssignature || "No"}</p>
                </div>
              </div>
            )}
            {user.teacherTutor && (
              <div className="row">
                <div className="col">
                  <h5>{lang[defaultLanguajes].fieldteacherTutorIndicator}</h5>
                </div>
                <div className="col">
                  <p className="lead">{user.teacherTutor || "No"}</p>
                </div>
              </div>
            )}
            {user.childrens && (
              <div className="row">
                <div className="col">
                  <h5>{lang[defaultLanguajes].fieldChildrenCountIndicator}</h5>
                </div>
                <div className="col">
                  <p className="lead">{countListLengthValidation(user.childrens)}</p>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col">
                <h5>{lang[defaultLanguajes].fieldPermissionsIndicator}</h5>
              </div>
              <div className="col">
                <p className="lead">{countListLengthValidation(user.permissions)}</p>
              </div>
            </div>
            <footer className="blockquote-footer">
              <small className="text-muted">{user.id || this.props.id}</small>
            </footer>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
const countListLengthValidation = list => {
  const itemsToSlice = list.indexOf("") !== -1 ? list.indexOf("") : list.length;
  return list.slice(0, itemsToSlice).length;
};
class App extends React.Component {
  render() {
    return;
  }
}

export default { Profile, App };
