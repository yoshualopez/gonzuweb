import React, { Component } from "react";
import template from "../templates";
import component from "../components";
import { NoticeItem } from "./templates";
import PropTypes from "prop-types";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], showMoreNewsButton: true };
    this.getNews = this.getNews.bind(this);
    this.moreNews = this.moreNews.bind(this);
  }
  componentDidMount = async () => this.getNews(4);
  getNews = async amount => {
    let uri = "/notices/" + amount;
    this.setState({
      news: []
    });
    const response = await component.net.get({ path: uri });
    if (!response) return;
    this.setState({
      news: response.data.response
    });
  };
  moreNews = async amount => {
    let uri = "/notices/" + amount;
    const response = await component.net.get({ path: uri });
    if (!response) return;
    const continueShow = (this.state.news.length = response.data.response.length);
    return this.setState({
      news: response.data.response,
      showMoreNewsButton: !continueShow
    });
  };
  render() {
    const { news, showMoreNewsButton } = this.state;
    if (news.length <= 0) {
      return (
        <div className="m-5 text-center">
          <template.spinner />
        </div>
      );
    }
    return (
      <div className="my-5 container">
        <div className="w-100 d-flex justify-content-center">
          <button onClick={() => this.getNews(4)} className="btn btn-outline-primary">
            Recargar
          </button>
        </div>
        <ul className="row navbar-nav flex-row justify-content-center">
          {news.map((notice, key) => (
            <NoticeItem notice={notice} key={key} />
          ))}
        </ul>
        {showMoreNewsButton && (
          <div className="w-100 d-flex justify-content-center">
            <button onClick={() => this.moreNews(news.length + 4)} className="btn btn-link">
              MAS
            </button>
          </div>
        )}
      </div>
    );
  }
}

News.prototypes = {
  getNews: PropTypes.func.isRequired
};

export default News;
