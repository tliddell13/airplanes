// Filename: Info.js

import React, { useRef, useState, useEffect } from "react";
import SidePanel from "../../components/sidePanel/sidePanel";
import "./home.css";
import Header from "../../components/header/header";
import Map from "../../components/map/map";
import 'mapbox-gl/dist/mapbox-gl.css';
import getFlights from "../../api/getFlights";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoidGxpZGRlbGwxMyIsImEiOiJjbHR0NnU0eDYwemJxMml1bGtsdGZmNHRmIn0.fuqf_2g9TYt89yWwuP56Sw'

const Home = () => {
    const mock_flight_data = [
            {
              "baro_altitude": 10000,
              "callsign": "UAL123",
              "category": "A0",
              "geo_altitude": 10200,
              "icao24": "a9c8e1",
              "last_contact": 1679574000,
              "latitude": 37.6189,
              "longitude": -122.3748,
              "on_ground": "False",
              "origin_country": "United States",
              "position_source": 0,
              "sensors": [4, 5, 6, 7, 8],
              "spi": "True",
              "squawk": "1234",
              "time_position": 1679574000,
              "true_track": 270,
              "velocity": 250,
              "vertical_rate": 0
            },
            {
              "baro_altitude": 5000,
              "callsign": "AAL456",
              "category": "A3",
              "geo_altitude": 5100,
              "icao24": "a9c8e2",
              "last_contact": 1679574600,
              "latitude": 40.6398,
              "longitude": -73.7789,
              "on_ground": "False",
              "origin_country": "United States",
              "position_source": 0,
              "sensors": [4, 5, 6, 7],
              "spi": "False",
              "squawk": "5678",
              "time_position": 1679574600,
              "true_track": 90,
              "velocity": 300,
              "vertical_rate": 500
            },
            {
              "baro_altitude": 8000,
              "callsign": "BAW123",
              "category": "A1",
              "geo_altitude": 8100,
              "icao24": "a9c8e3",
              "last_contact": 1679575200,
              "latitude": 51.4775,
              "longitude": -0.4614,
              "on_ground": "False",
              "origin_country": "United Kingdom",
              "position_source": 0,
              "sensors": [4, 5, 6, 7, 8, 9],
              "spi": "False",
              "squawk": "7890",
              "time_position": 1679575200,
              "true_track": 180,
              "velocity": 400,
              "vertical_rate": -200
            },
            {
              "baro_altitude": 12000,
              "callsign": "DAL789",
              "category": "A0",
              "geo_altitude": 12200,
              "icao24": "a9c8e4",
              "last_contact": 1679575800,
              "latitude": 33.9425,
              "longitude": -118.4081,
              "on_ground": "False",
              "origin_country": "United States",
              "position_source": 0,
              "sensors": [4, 5, 6, 7, 8],
              "spi": "True",
              "squawk": "2468",
              "time_position": 1679575800,
              "true_track": 300,
              "velocity": 280,
              "vertical_rate": 100
            },
            {
              "baro_altitude": 6000,
              "callsign": "SWA456",
              "category": "A2",
              "geo_altitude": 6100,
              "icao24": "a9c8e5",
              "last_contact": 1679576400,
              "latitude": 39.8584,
              "longitude": -104.6670,
              "on_ground": "False",
              "origin_country": "United States",
              "position_source": 0,
              "sensors": [4, 5, 6, 7, 8],
              "spi": "False",
              "squawk": "1357",
              "time_position": 1679576400,
              "true_track": 120,
              "velocity": 320,
              "vertical_rate": -300
            },
            {
              "baro_altitude": 9500,
              "callsign": "JBU789",
              "category": "A0",
              "geo_altitude": 9700,
              "icao24": "a9c8e6",
              "last_contact": 1679577000,
              "latitude": 40.6413,
              "longitude": -73.7781,
              "on_ground": "False",
                "origin_country": "United States",
                "position_source": 0,
                "sensors": [4, 5, 6, 7],
                "spi": "False",
                "squawk": "2468",
                "time_position": 1679577000,
                "true_track": 120,
                "velocity": 350,
                "vertical_rate": 200
              },
              {
                "baro_altitude": 11000,
                "callsign": "SWR456",
                "category": "A1",
                "geo_altitude": 11200,
                "icao24": "a9c8e7",
                "last_contact": 1679577600,
                "latitude": 47.4502,
                "longitude": 8.5628,
                "on_ground": "False",
                "origin_country": "Switzerland",
                "position_source": 0,
                "sensors": [4, 5, 6, 7, 8],
                "spi": "False",
                "squawk": "1357",
                "time_position": 1679577600,
                "true_track": 270,
                "velocity": 380,
                "vertical_rate": 100
              },
              {
                "baro_altitude": 7200,
                "callsign": "ACA123",
                "category": "A2",
                "geo_altitude": 7400,
                "icao24": "a9c8e8",
                "last_contact": 1679578200,
                "latitude": 43.6767,
                "longitude": -79.6306,
                "on_ground": "False",
                "origin_country": "Canada",
                "position_source": 0,
                "sensors": [4, 5, 6, 7, 8],
                "spi": "False",
                "squawk": "5678",
                "time_position": 1679578200,
                "true_track": 45,
                "velocity": 300,
                "vertical_rate": -150
              },
              {
                "baro_altitude": 8500,
                "callsign": "UAL456",
                "category": "A0",
                "geo_altitude": 8700,
                "icao24": "a9c8e9",
                "last_contact": 1679578800,
                "latitude": 33.9425,
                "longitude": -118.4081,
                "on_ground": "False",
                "origin_country": "United States",
                "position_source": 0,
                "sensors": [4, 5, 6, 7],
                "spi": "True",
                "squawk": "7890",
                "time_position": 1679578800,
                "true_track": 180,
                "velocity": 320,
                "vertical_rate": -300
              },
              {
                "baro_altitude": 9300,
                "callsign": "ANA789",
                "category": "A1",
                "geo_altitude": 9500,
                "icao24": "a9c8f0",
                "last_contact": 1679579400,
                "latitude": 35.6895,
                "longitude": 139.6917,
                "on_ground": "False",
                "origin_country": "Japan",
                "position_source": 0,
                "sensors": [4, 5, 6, 7],
                "spi": "False",
                "squawk": "1111",
                "time_position": 1679579400,
                "true_track": 210,
                "velocity": 340,
                "vertical_rate": 0
              }
          
    ];
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [flightData, setFlightData] = useState([mock_flight_data[0], mock_flight_data[1]]);

    
    
    useEffect(() => {
        const fetchFlights = () => {
            getFlights().then((data) => {
                setFlightData(data);
            });
        };
        fetchFlights();
        // Update flights every 6 seconds
        const intervalId = setInterval(fetchFlights, 6000);
        return () => clearInterval(intervalId);
    }, []);

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