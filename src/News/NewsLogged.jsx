import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import template from '../templates';
import PropTypes from 'prop-types';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [] };
  }
  componentDidMount() {
    this.props.getNews(news => this.setState({ news: news.message }));
  }
  render() {
    if(!this.state.news || this.state.news === []){
      return <div className="mt-5 text-center">
        {template.spinner}
      </div>;
    }
    return (
      <div className="my-5 container">
        <ul className="row navbar-nav flex-row justify-content-center">
          {this.state.news.map(listNotices)}
        </ul>
      </div>
    );
  }
}
const shortRedaction = (text) => {
  if(!text){
    return ""
  }
  return text.slice(0,90);
}
const listNotices = (notice, key) => {
  return <li style={{maxWidth : "max-content"}} className="p-2 col nav-item p-0" key={key}>
    <div className="card" style={{width : "18rem"}}>
      <img src="/ic_launcher.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{notice.title}</h5>
        <p className="card-text">{shortRedaction(notice.redacted)}</p>
        <Link className="btn btn-primary" to={"/news/"+notice._id}>Leer</Link>
      </div>
      <div className="card-footer text-muted">{new Date(notice.publishDate).toDateString()}</div>
    </div>
  </li>;
};

News.prototypes = {
  getNews: PropTypes.func.isRequired
};

export default News;
