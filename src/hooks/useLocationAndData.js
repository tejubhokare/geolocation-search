import { v4 as uuidv4 } from 'uuid';

const useLocationAndData = () => {
  const searchUrl = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api/search`
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
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
        console.error('Geolocation is not supported by this browser.');
        resolve(null); // Resolve with null if geolocation not supported
      }
    });
  };

  const fetchData = async (searchTerm) => {
    try {
      const location = await getLocation();
      const locationParam = location ? `&${location}` : ''; // Add location param only if available
      const response = await fetch(`${searchUrl}?q=${searchTerm}${locationParam}`);
      const searchData = await response.json();
      return searchData.suggestions.map(item => ({
        id: item.id || uuidv4(),
        ...item
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
      //return []
    }
  };

  return { getLocation, fetchData };
};

export default useLocationAndData;
