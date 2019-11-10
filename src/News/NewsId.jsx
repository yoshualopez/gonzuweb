import React, { Component } from "react";
import Carousel from "nuka-carousel";
import component from "../components";
import template from "../templates";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [] };
  }
  async componentDidMount() {
    const uri = "/notice/" + this.props.match.params.id;
    const response = await component.net.get(uri);
    if (!response) return;
    this.setState({
      news: response.data.data.response
    });
  }
  render() {
    if (!this.state.news || this.state.news.length === 0) {
      return (
        <div className="mt-5 text-center">
          <template.spinner />
        </div>
      );
    }
    console.log(this.state.news);
    return (
      <div className="my-5 container">
        <div className="jumbotron">
          <div className="container">
            <Carousel
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
              // withoutControls={true}
              dragging={true}
              heightMode="current"
              initialSlideHeight={10}
              speed={200}
            >
              {this.state.news.imagesNotice.map(imageBuilder)}
            </Carousel>
          </div>
          <h1 className="display-4">{this.state.news.title}</h1>
          <p className="lead">{this.state.news.redacted}</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              {this.state.news.autor} <cite title={new Date(this.state.news.publishDate).toDateString()}>un {new Date(this.state.news.publishDate).toDateString()}</cite>
            </small>
          </footer>
        </div>
        <ul className="row navbar-nav flex-row justify-content-center"></ul>
      </div>
    );
  }
}
const imageBuilder = (image, key) => {
  return <img key={key} src={image} className="img-fluid mx-auto" alt="..." />;
};

export default News;
