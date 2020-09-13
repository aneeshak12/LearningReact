import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import SinglePage from "./components/SinglePage/SinglePage"
export default class RouterFile extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/watch" component={SinglePage} />
        </Switch>
      </Router>
    );
  }
}