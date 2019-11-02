import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropType from "prop-types";
import { Provider } from "react-redux";
import React, { Component } from "react";
import paths from "./paths";
import navs from "./router.assets";

class RouterDom extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "" };
  }
  routePath = path => this.setState({ path });
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <paths.header
            renderedTab={this.state.path}
            navigatorItems={navs.routes}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <paths.app route={e => this.routePath(e)} {...props} />
              )}
            />
            <Route
              exact
              path="/news"
              render={props => (
                <paths.news route={e => this.routePath(e)} {...props} />
              )}
            />
            <Route
              exact
              path="/news/:id"
              render={props => (
                <paths.newsId route={e => this.routePath(e)} {...props} />
              )}
            />
            <Route
              exact
              path="/chat"
              render={props => (
                <paths.chat route={e => this.routePath(e)} {...props} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <paths.login route={e => this.routePath(e)} {...props} />
              )}
            />
            <Route component={paths.errorNotFound} />
          </Switch>
          <paths.footer />
        </Router>
      </Provider>
    );
  }
}

RouterDom.propTypes = {
  store: PropType.object.isRequired
};

export default RouterDom;
