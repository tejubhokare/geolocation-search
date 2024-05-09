import React, { useState } from 'react';
import SearchLocation from './SearchLocation';
import DataTable from './DataTable';
import useLocationAndData from '../hooks/useLocationAndData';
import '../styles/View.css';

const View = () => {
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchData } = useLocationAndData();

    const handleSearch = async (searchLocation) => {
        try {
            setLoading(true);
            const data = await fetchData(searchLocation);
            setLocation(data);
        } catch (error) {
            setLocation([]);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setLocation([]);
    };

    const columns = [
        { field: 'street', headerName: 'Street', width: 160 },
        { field: 'city', headerName: 'City', width: 125 },
        { field: 'zip_code', headerName: 'Zip Code', width: 110 },
        { field: 'county', headerName: 'County', width: 135 },
        { field: 'country', headerName: 'Country' },
        { field: 'score', headerName: 'Score', width: 80 },
        { field: 'latitude', headerName: 'Latitude' },
        { field: 'longitude', headerName: 'Longitude' },
        { field: 'time_zone', headerName: 'Time Zone', width: 150 },
    ].map(column => ({
        ...column,
        headerClassName: 'custom-header'
    }));

    return (
        <div className="container">
            <SearchLocation onSearch={handleSearch} onClear={handleClear} />
            {!loading && <DataTable rows={location} columns={columns} />}
        </div>
    );
};

export default View;
