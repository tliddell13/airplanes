// Filename: Header.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({setSelectedFlight, flightData, setSidePanelOpen}) => {

  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    // Simulate search results based on flightData or any other data source
    const filteredResults = flightData.filter((flight) =>
      flight.callsign.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleDropdownSelect = (flight) => {
    setSelectedFlight(flight);
    setSidePanelOpen(true);
    setSearchInput(flight.callsign); // Update search input with selected flight name
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <nav className="header">
      <ul className='content'>
        <li className="header-item"><Link className="title" to=" ">Flight Tracker</Link></li>
        <div className="searchContainer">
          <li className="header-item"><input
            type="text"
            placeholder="Find flight..."
            onChange={handleSearch}
            value={searchInput}
            className="searchInput"
            onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {showDropdown && (
              <ul className="dropdown">
                {searchResults.map((flight) => (
                  <li key={flight.callsign} onClick={() => handleDropdownSelect(flight)}>
                    {flight.callsign}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </div>
        <li className="header-item"><Link className="about" to=" ">about</Link></li>
      </ul>
    </nav>
  );
};

export default Header;