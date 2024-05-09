import { v4 as uuidv4 } from 'uuid'; // Importing UUID v4 generator

// Custom hook for fetching location and data
const useLocationAndData = () => {
  // Constructing search URL using environment variables
  const searchUrl = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api/search`

  // Function to get current location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {// Check if geolocation is supported
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationStr = `latitude=${latitude}&longitude=${longitude}`;
            resolve(locationStr);
          },
          (error) => {
            // Handle permission denied or error cases
            console.error('Error getting location:', error.message);
            resolve(null); // Resolve with null if permission denied or error
          }
        );
      } else {
        resolve(null); // Resolve with null if geolocation not supported
      }
    });
  };

  // Function to fetch data based on search term
  const fetchData = async (searchTerm) => {
    try {
      const location = await getLocation();
      const locationParam = location ? `&${location}` : ''; // Add location param only if available
      const response = await fetch(`${searchUrl}?q=${searchTerm}${locationParam}`);
      const searchData = await response.json();

      // Map fetched suggestions and generate unique IDs using UUID v4
      return searchData.suggestions.map(item => ({
        id: item.id || uuidv4(),// Generate UUID if ID not available
        ...item
      }));
    } catch (error) {
      console.error('Error fetching data:', error);// Log error if fetching data fails
      throw error;
      //return []
    }
  };

  return { getLocation, fetchData };
};

export default useLocationAndData;
