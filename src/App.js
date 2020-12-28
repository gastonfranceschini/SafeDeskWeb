import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Administracion from './components/Administracion'
import Reporte from "./components/Reporte";
import Reserva from './components/Reserva';
import MisReservas from './components/MisReservas';
import Diagnostico from './components/Diagnostico';
import Perfil from './components/Perfil';
import Contrasena from './components/Contraseña';

import './utils/App.css';

class App extends Component {
  render() {
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Reserva" component={Reserva} /> 
          <Route exact path="/MisReservas" component={MisReservas} /> 
          <Route exact path="/Diagnostico" component={Diagnostico} />
          <Route exact path="/Administracion" component={Administracion} /> 
          <Route exact path="/Reporte" component={Reporte} />
          <Route exact path="/Perfil" component={Perfil} />
          <Route exact path="/Contrasena" component={Contrasena} />
        </Switch>
      </Router>
    );
  };
}

export default App;
