import React from 'react';
import { createBrowserHistory } from 'history'

import { Router, Route } from "react-router";

import MainView from 'components/MainView';
import DetailView from 'components/DetailView';

export const history = createBrowserHistory()

export default function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={MainView} />
        <Route exact path="/detail/:id" component={DetailView} />
      </Router>
    </div>
  );
}
