// getFlightDes.js
// When a flight is clicked on the map, this function fetches detailed flight information using the ICAO24 identifier.
/**
 * Fetch detailed flight information using ICAO24.
 * @param {string} icao24 - Unique aircraft identifier
 * @returns {Promise<Object>} - Flight data or error
 */
const getFlightDes = async (icao24) => {
  try {
    const response = await fetch("/track_flight/${icao24}");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch flight data');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching flight details:', error.message);
    return { error: error.message };
  }
};

export default getFlightDes;
