import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "nuka-carousel";
import lang from "../lang";

class NoticeItem extends Component {
  render() {
    const defaultLanguajes = "es";
    return (
      <li style={{ maxWidth: "max-content" }} className="p-2 col nav-item p-0">
        <div className="card" style={{ width: "18rem" }}>
          {this.props.notice.baseImage ? (
            <img src={this.props.notice.baseImage} className="card-img-top" alt="..." />
          ) : (
            <Carousel
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
              dragging={true}
              heightMode="current"
              initialSlideHeight={10}
              speed={200}
            >
              {this.props.notice.imagesNotice.map(imageBuilder)}
            </Carousel>
          )}
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
const imageBuilder = (image, key) => {
  return <img key={key} src={image} className="img-fluid mx-auto" alt="..." />;
};

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
