import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoticeItem extends Component {
  render = () => (
    <li style={{ maxWidth: "max-content" }} className="p-2 col nav-item p-0">
      <div className="card" style={{ width: "18rem" }}>
        <img src="/ic_launcher.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.notice.title}</h5>
          <p className="card-text">{shortRedaction(this.props.notice.redacted)}</p>
          <Link className="btn btn-primary" to={"/news/" + this.props.notice._id}>
            Leer
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
