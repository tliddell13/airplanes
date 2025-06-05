# Plan to organize my flask project differently, but for now everything is in one file.
from flask import Flask, jsonify, request
import pandas as pd
import opensky_api
import time

app = Flask(__name__)

# Credentials (recommend storing in environment variables instead)
OPENSKY_USERNAME = "tliddell13-api-client"
OPENSKY_PASSWORD = "cWbDrvfeSlpQBZzNuWMU1HasXHyUm57R"

@app.route('/track_flight/<icao24>', methods=['GET'])
def track_flight(icao24):
    if not icao24:
        return jsonify({"error": "ICAO24 code is required"}), 400

    api = opensky_api.OpenSkyApi(username=OPENSKY_USERNAME, password=OPENSKY_PASSWORD)
    now = int(time.time())
    six_hours_ago = now - 6 * 3600
    # change ICA024 to lower case to match OpenSky API requirements
    icao24 = icao24.lower()
    flights = api.get_flights_by_aircraft(icao24, six_hours_ago, now)

    if not flights:
        return jsonify({"error": "No flight data found for the given ICAO24 code"}), 404

    flight = flights[-1]  # Most recent flight

    return jsonify({
        'icao24': flight.icao24,
        'estDepartureAirport': flight.estDepartureAirport,
        'estArrivalAirport': flight.estArrivalAirport,
        'firstSeen': flight.firstSeen,
        'lastSeen': flight.lastSeen
    })

@app.route('/flights', methods=['GET'])
def get_flights():
    api = opensky_api.OpenSkyApi(username=None, password=None)
    activeFlights = api.get_states()
    
    if not activeFlights or not activeFlights.states:
        return jsonify([])

    activeFlights_dict = [flight.__dict__ for flight in activeFlights.states]
    df = pd.DataFrame(activeFlights_dict)
    df = df.fillna('N/A')
    df = df[df['longitude'].apply(lambda x: isinstance(x, (int, float)))]
    df = df[df['latitude'].apply(lambda x: isinstance(x, (int, float)))]
    df = df.head(15)

    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
