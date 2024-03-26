// Filename: Info.js

import React, { useRef, useState, useEffect } from "react";
import SidePanel from "../../components/sidePanel/sidePanel";
import "./main.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import getFlights from "../../api/getFlights";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoidGxpZGRlbGwxMyIsImEiOiJjbHR0NnU0eDYwemJxMml1bGtsdGZmNHRmIn0.fuqf_2g9TYt89yWwuP56Sw'

const Main = () => {
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
        }
    ];
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(3);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [flightData, setFlightData] = useState([mock_flight_data[0], mock_flight_data[1], mock_flight_data[2]]);
    const [markers, setMarkers] = useState([]);

    
    /*
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
*/
    //Set the data on an interval
    
    useEffect(() => {
        console.log("I'm hereeeee");
        if (!map.current) { 
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
            });
        }
        // Remove old markers
        markers.forEach(marker => marker.remove());

        // Create new markers
        const newMarkers = flightData.map(flight => {
            console.log('Adding marker:');
            var el = document.createElement('div');
            el.className = 'marker';
            const marker = new mapboxgl.Marker(el)
            .setLngLat([flight.longitude, flight.latitude])
            .setRotation(flight.true_track)
            .addTo(map.current);

            // Add a listener to the plane for side panel
            el.addEventListener('click', () => {
                setSelectedFlight(flight);
                setSidePanelOpen(true);
            });

            return marker;

        });
        // Add the side panel
        map.current.addControl(new mapboxgl.NavigationControl());

        // Save new markers
        setMarkers(newMarkers);
    }, [flightData]);
    
    return (
        <div className="main">
            {sidePanelOpen && <SidePanel flight={selectedFlight} onClose={() => setSidePanelOpen(false)} />}
          <div>
            <div ref={mapContainer} className="map-container" />
          </div>
        </div>
    );
}

export default Main;


