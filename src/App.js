import React, { Component, useEffect, useState } from "react";
import './utils/App.css';
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

export default App;
