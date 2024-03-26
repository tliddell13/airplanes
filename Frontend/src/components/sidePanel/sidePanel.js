// side panel for flight info

import React from "react";
import "./sidePanel.css";

const SidePanel = ({onClose, selectedFlight}) => {
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
                </div>
            </div>
        </div>
    );
};

export default SidePanel;