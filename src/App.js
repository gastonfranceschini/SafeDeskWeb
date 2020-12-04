import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './utils/App.css';
import Home from './components/Home';
import Login from './components/Login';
import Reserva from './components/Reserva';

class App extends Component {
  render() {
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/reserva" component={Reserva} />
        </Switch>
      </Router>
    );
  };
}

export default App;
