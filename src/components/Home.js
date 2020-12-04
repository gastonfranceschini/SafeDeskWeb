import React from 'react';
import Sidebar from './Sidebar';
import '../utils/App.css';
import Header from '../shared/Header'


const Home = (props) => {
  return ( 
    <div className="App">
      <Header />
      <Sidebar />
    </div>
  );
}

 
export default Home;