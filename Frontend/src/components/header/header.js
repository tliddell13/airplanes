// Filename: Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand */}
        <p className="navbar-brand" to="/">Flight Tracker</p>
        
        {/* Search form */}
        <form className="d-flex mx-auto">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        
        {/* Info button */}
        <p className="btn btn-outline-light" to="/"><i className="bi bi-info-circle"></i></p>
      </div>
    </nav>
  );
};

export default Header;