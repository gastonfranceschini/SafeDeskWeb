import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Administracion from './components/Administracion'
import Reporte from "./components/Reporte";
import Sidebar from './components/Sidebar';
import Reserva from './components/Reserva';
import Diagnostico from './components/Diagnostico';

import './utils/App.css';

class App extends Component {
  render() {
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Reserva" component={Reserva} /> 
          <Route exact path="/Diagnostico" component={Diagnostico} />
          <Route exact path="/Administracion" component={Administracion} /> 
          <Route exact path="/Reporte" component={Reporte} /> 
        </Switch>
      </Router>
    );
  };
}

export default App;
