import React, { Component } from "react";
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
    return (
      <div className="my-5 container">
        <div className="jumbotron">
          <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/ic_launcher.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/ic_launcher.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/ic_launcher.png" className="d-block w-100" alt="..." />
                </div>
              </div>
              <a className="carousel-control-prev" href="#a" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#a" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
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

export default News;
