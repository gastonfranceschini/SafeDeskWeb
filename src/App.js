import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Administracion from './components/Administracion'
import Reporte from "./components/Reporte";
import MisReservas from "./components/MisReservas";
import Sidebar from './components/Sidebar';



import './utils/App.css';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  render() {
    return ( 
      <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Sidebar" component={Sidebar} />
        <Route exact path="/Home" exact component={Home}/>
        <Route exact path = "/Administracion" component={Administracion} /> 
        <Route exact path = "/Reporte" component={Reporte} /> 
        <Route exact path = "/MisReservas" component={MisReservas} /> 

      </Switch>
    </Router>

    );
  };
}

export default App;
