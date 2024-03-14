// Filename: getData.js

// Function to fetch data from the API
const getData = async () => {
    try {
      const response = await fetch("/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return {
        name: data.Name,
        age: data.Age,
        date: data.Date,
        programming: data.programming,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  
  export default getData;