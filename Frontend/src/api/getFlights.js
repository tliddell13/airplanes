// Filename: getData.js

// Function to fetch data from the API
const getFlights = async () => {
    try {
      const response = await fetch("/flights");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const flightData = await response.json();
      return flightData;
      /*
      return {
        baro_altitude: flightData.baro_altitude,
        callsign: flightData.callsign,
        category: flightData.category,
        geo_altitude: flightData.geo_altitude,
        icao24: flightData.icao24,
        last_contact: flightData.last_contact,
        latitude: flightData.latitude,
        longitude: flightData.longitude,
        on_ground: flightData.on_ground,
        origin_country: flightData.origin_country,
        position_source: flightData.position_source,
        sensors: flightData.sensors,
        spi: flightData.spi,
        squawk: flightData.squawk,
        time_position: flightData.time_position,
        true_track: flightData.true_track,
        velocity: flightData.velocity,
        vertical_rate: flightData.vertical_rate
      };
      */
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  
  export default getFlights;