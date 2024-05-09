import { renderHook, act } from '@testing-library/react'; 
import useLocationAndData from './useLocationAndData';

// Mock Geolocation API
global.navigator.geolocation = {
  getCurrentPosition: jest.fn()
};

// Mock fetch (adjust this if your API behavior is different)
global.fetch = jest.fn(); 

describe('useLocationAndData', () => {
  beforeEach(() => {
    // Clear mocks before each test
    navigator.geolocation.getCurrentPosition.mockClear(); 
    fetch.mockClear();
  });

  test('getLocation resolves with location string when geolocation is supported', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };

    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useLocationAndData()); 

   await act( async () => {
        const locationStr = await result.current.getLocation(); 
        
        // Assert the expected location string
        expect(locationStr).toBe('latitude=40.7128&longitude=-74.006'); 
   });
  });

  test('getLocation resolves with null when geolocation is not supported', async () => {
    navigator.geolocation = null;

    const { result } = renderHook(() => useLocationAndData());

    await act( async () => {
        const location = await result.current.getLocation();
        expect(location).toBeNull();
    });
  });

}); 
