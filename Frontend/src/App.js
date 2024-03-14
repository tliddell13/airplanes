// Filename: App.js

import React from "react";
import "./App.css";
import Header from './components/header/header';
import Home from "./pages/home/home"; // Importing Home component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/* Render the Home component */}
      <Header />
      <Home />
    </div>
  );
}

export default App;
