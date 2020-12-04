import React, { Component, useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Administracion from './components/Administracion'
import Reporte from "./components/Reporte";
import MisReservas from "./components/MisReservas";


function Home (){
  return(
   <Login />
  );
}

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" exact component={Home}/>
        <Route exact path = "/Administracion" component={Administracion} /> 
        <Route exact path = "/Reporte" component={Reporte} /> 
        <Route exact path = "/MisReservas" component={MisReservas} /> 

      </Switch>
    </Router>
    );
  };
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
