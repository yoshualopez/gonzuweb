import React, { Component } from "react";
import PropTypes from "prop-types";
import template from "../templates";
import component from "../components";
import { NoticeItem } from "./templates";
import lang from "../lang";
const utilNetworkGet = async amount => await component.net.get("/notices/" + amount);
class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], showMoreNewsButton: true };
    this.getNews = this.getNews.bind(this);
    this.moreNews = this.moreNews.bind(this);
  }
  componentDidMount = async () => this.getNews(4);
  getNews = async amount => {
    this.setState({ news: [] });
    const response = await utilNetworkGet(amount);
    if (response.isError) return;
    this.setState({
      news: response.data.data.response,
      showMoreNewsButton: true
    });
  };

  moreNews = async amount => {
    const response = await utilNetworkGet(amount);
    if (response.isError) return;
    const continueShow = this.state.news.length === response.data.data.response.length;
    return this.setState({
      news: response.data.data.response,
      showMoreNewsButton: !continueShow
    });
  };
  render() {
    const defaultLanguajes = "es";
    const { news, showMoreNewsButton } = this.state;
    if (news.length === 0 || !news) {
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
            {lang[defaultLanguajes].buttonReloadPageIndicator}
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
              {lang[defaultLanguajes].buttonLoadMoreIndicator}
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
