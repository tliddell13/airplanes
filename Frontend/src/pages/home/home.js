// Filename: Info.js

import React, { useRef, useState, useEffect } from "react";
import SidePanel from "../../components/sidePanel/sidePanel";
import "./home.css";
import Header from "../../components/header/header";
import Map from "../../components/map/map";
import 'mapbox-gl/dist/mapbox-gl.css';
import mock_flight_data from "../../data/mockFlightData";
import getFlights from "../../api/getFlights";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoidGxpZGRlbGwxMyIsImEiOiJjbHR0NnU0eDYwemJxMml1bGtsdGZmNHRmIn0.fuqf_2g9TYt89yWwuP56Sw'

const Home = () => {
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [flightData, setFlightData] = useState([]);
    
    
    // Uncomment the following code to fetch live flight data from the API
    useEffect(() => {
        const fetchFlights = () => {
            getFlights().then((data) => {
                setFlightData(data);
            });
        };
        fetchFlights();
        // Update flights every 10 seconds
        const intervalId = setInterval(fetchFlights, 10000);
        return () => clearInterval(intervalId);
    }, []);
    

    // Uncomment the following code to use mock flight data instead of fetching from the API
    /*
    // Set the flight data to the mock data
    useEffect(() => {
        setFlightData(mock_flight_data);
    }, []);
*/
    //Set the data on an interval
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);
    return (
        <div className="page">
          <Header setSelectedFlight={setSelectedFlight} flightData={flightData} setSidePanelOpen={setSidePanelOpen}/>
          <div className="main">
              {sidePanelOpen && <SidePanel selectedFlight={selectedFlight} onClose={() => setSidePanelOpen(false)} />}
            <div>
              <Map selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} flightData={flightData} setSidePanelOpen={setSidePanelOpen}/>
            </div>
          </div>
        </div>
    );
}

export default Home;