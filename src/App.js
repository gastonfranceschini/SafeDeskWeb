import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './utils/App.css';

import Login from './components/Login';
import Home from './components/Home';
import Diagnostico from './components/Diagnostico';
import MisReservas from "./components/MisReservas";
import Reporte from "./components/Reporte";
import Administracion from './components/Administracion';

class App extends Component {
  render() {
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Diagnostico" component={Diagnostico} />
          <Route exact path="/Administracion" component={Administracion} /> 
          <Route exact path="/Reporte" component={Reporte} /> 
          <Route exact path="/MisReservas" component={MisReservas} /> 
        </Switch>
      </Router>
    );
  };
}

export default App;
