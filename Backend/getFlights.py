from flask import Flask, jsonify
import pandas as pd
import opensky_api

app = Flask(__name__)
OPENSKY_USERNAME = "tliddell13-api-client"
OPENSKY_PASSWORD = "cWbDrvfeSlpQBZzNuWMU1HasXHyUm57R"
@app.route('/flights', methods=['GET'])
def get_flights():
    api = opensky_api.OpenSkyApi(username=None, password=None)
    activeFlights = api.get_states()
    activeFlights_dict = [flight.__dict__ for flight in activeFlights.states]
    df = pd.DataFrame(activeFlights_dict)
    # Get rid of NaN values
    df = df.fillna('N/A')
    # Filter out flights with invalid longitude or latitude
    df = df[df['longitude'].apply(lambda x: isinstance(x, (int, float)))]
    df = df[df['latitude'].apply(lambda x: isinstance(x, (int, float)))]

    df = df.head(10)

    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)


