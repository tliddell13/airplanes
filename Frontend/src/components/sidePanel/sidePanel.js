// side panel for flight info

import React, {useEffect, useState} from "react";
import "./sidePanel.css";
import getFlightDes from "../../api/getFlightDes";

const SidePanel = ({onClose, selectedFlight}) => {

    const [flightDetails, setFlightDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedFlight && selectedFlight.icao24) {
            setLoading(true);
            getFlightDes(selectedFlight.icao24).then((data) => {
              setFlightDetails(data);
              setLoading(false);
            });
          }
        }, [selectedFlight]);
    
    return (
        <div className="side-panel">
            <div className="side-panel-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div>
                    <h3>Flight: {selectedFlight.callsign}</h3>
                    <p>Altitude: {selectedFlight.baro_altitude} ft</p>
                    <p>Speed: {selectedFlight.velocity} knots</p>
                    <p>Vertical Speed: {selectedFlight.vertical_rate} ft/min</p>
                    <p>True Track: {selectedFlight.true_track}°</p>
                    <p>Latitude: {selectedFlight.latitude}</p>
                    <p>Longitude: {selectedFlight.longitude}</p>
                    {flightDetails && !flightDetails.error && (
                        <>
                            <hr />
                            <p><strong>Estimated Departure:</strong> {flightDetails.estDepartureAirport || "Unknown"}</p>
                            <p><strong>Estimated Arrival:</strong> {flightDetails.estArrivalAirport || "Unknown"}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidePanel;