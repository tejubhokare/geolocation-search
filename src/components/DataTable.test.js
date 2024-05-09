import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

const data = [
  {
    id: 1,
    street: '1275 Stroman Turnpike',
    city: 'New Ansley',
    zip_code: '75645',
    county: 'Worcestershire',
    country: 'Gabon',
    latitude: '-15.739',
    longitude: '-21.276',
    time_zone: 'Africa/Cairo'
  },
  {
    id: 2,
    street: '685 Quitzon Green',
    city: 'West Brendonville',
    zip_code: '78855-2795',
    county: 'Isle of Wight',
    country: 'Cyprus',
    latitude: '-64.756',
    longitude: '53.22',
    time_zone: 'Africa/Cairo'
  }
];

const columns = [
  { field: 'street', headerName: 'Street' },
  { field: 'city', headerName: 'City' },
  { field: 'zip_code', headerName: 'Zip Code' },
  { field: 'county', headerName: 'County' },
  { field: 'country', headerName: 'Country' },
  { field: 'latitude', headerName: 'Latitude' },
  { field: 'longitude', headerName: 'Longitude' },
  { field: 'time_zone', headerName: 'Time Zone' }
];

describe('DataTable component', () => {
  it('renders correctly', () => {
    render(<DataTable rows={data} columns={columns} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<DataTable rows={data} columns={columns} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(data.length + 1); // +1 for the header row
  });

  it('renders correct column headers', () => {
    render(<DataTable rows={data} columns={columns} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers.length).toBe(columns.length);
    columns.forEach((column, index) => {
      expect(headers[index].textContent).toBe(column.headerName);
    });
  });
});