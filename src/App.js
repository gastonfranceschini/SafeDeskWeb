import React, { Component, useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';

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
        <Route path="/" exact component={Home}>
          <Home />
        </Route>
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
