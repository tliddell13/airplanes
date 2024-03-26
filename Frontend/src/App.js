// Filename: App.js

import React from "react";
import Header from './components/header/header';
import Main from './pages/info/main';
import Home from './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
     <div className="App">
       <Home />
      </div>
    </Router>
  );
}

export default App;
