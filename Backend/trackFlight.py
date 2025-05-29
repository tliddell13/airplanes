from flask import Flask, jsonify, request
import pandas as pd
import opensky_api
import time

app = Flask(__name__)

@app.route('/track_flight/<icao24>', methods=['GET'])

def track_flight():
    icao24 = request.args.get('icao24')
    if not icao24:
        return jsonify({"error": "ICAO24 code is required"}), 400
    api = opensky_api.OpenSkyApi(username=None, password=None)

    now = int(time.time())
    six_hours_ago = now - 6 * 3600  # 6 hours in seconds
    flights = api.get_flights_by_aircraft(icao24=icao24, begin=six_hours_ago, end=now)
    if not flights:
        return jsonify({"error": "No flight data found for the given ICAO24 code"}), 404
    
    # Use the most recent flight data
    flight = flights[-1]

    return jsonify({
        'icao24': flight.icao24,
        'estDepartureAirport': flight.estDepartureAirport,
        'estArrivalAirport': flight.estArrivalAirport,
        'firstSeen': flight.firstSeen,
        'lastSeen': flight.lastSeen
    })


