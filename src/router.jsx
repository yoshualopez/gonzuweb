import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropType from "prop-types";
import { Provider } from "react-redux";
import React, { Component } from "react";
import paths from "./paths";
import navs from "./router.assets";

class RouterDom extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <paths.header navigatorItems={navs.routes} />
          <Switch>
            <Route exact path="/" render={props => <paths.app {...props} />} />
            <Route exact path="/news" render={props => <paths.news {...props} />} />
            <Route exact path="/news/:id" render={props => <paths.newsId {...props} />} />
            <Route exact path="/chat" render={props => <paths.chat {...props} />} />
            <Route exact path="/login" render={props => <paths.login {...props} />} />
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
