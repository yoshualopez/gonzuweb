import React, { Component } from "react";
import { Link } from "react-router-dom";
import lang from "../lang";

class NoticeItem extends Component {
  render() {
    const defaultLanguajes = "es";
    return (
      <li style={{ maxWidth: "max-content" }} className="p-2 col nav-item p-0">
        <div className="card" style={{ width: "18rem" }}>
          <img src={this.props.notice.baseImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.notice.title}</h5>
            <p className="card-text">{shortRedaction(this.props.notice.redacted)}</p>
            <Link className="btn btn-primary" to={"/news/" + this.props.notice._id}>
              {lang[defaultLanguajes].buttonReadIndicator}
            </Link>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between">
            <p>{new Date(this.props.notice.publishDate).toDateString()}</p>
            <p>{new Date(this.props.notice.publishDate).toLocaleTimeString()}</p>
          </div>
        </div>
      </li>
    );
  }
}
const shortRedaction = text => {
  if (!text) {
    return "";
  }
  if (text.length > 90) {
    return text.slice(0, 90) + " . . .";
  }
  return text;
};

export { NoticeItem };
