import React, { useState } from 'react';
import '../styles/SearchLocation.css';

const SearchLocation = ({ onSearch, onClear }) => {
    // State declaration for search location input
    const [searchLocation, setSearchLocation] = useState('');

    // Event handler for search button click
    const handleSearch = () => {
        onSearch(searchLocation);
    };

    const handleClear = () => {
        setSearchLocation('');
        onClear();
    };

    return (
        <div className="search-container">
            <input
                className='input'
                type="text"
                placeholder="Search by Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button onClick={handleSearch} className="button">
                Search
            </button>
            <button onClick={handleClear} className="button">
                Clear
            </button>
        </div>
    );
};

export default SearchLocation;
