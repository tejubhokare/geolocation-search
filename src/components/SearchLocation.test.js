import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchLocation from './SearchLocation';

describe('SearchLocation component', () => {
  it('calls onSearch with input value when Search button is clicked', () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();

    render(<SearchLocation onSearch={onSearchMock} onClear={onClearMock} />);

    const input = screen.getByPlaceholderText('Search by Location');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Test Location' } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('Test Location');
  });

  it('calls onClear and clears input value when Clear button is clicked', () => {
    const onSearchMock = jest.fn();
    const onClearMock = jest.fn();
  
    render(<SearchLocation onSearch={onSearchMock} onClear={onClearMock} />);
  
    const input = screen.getByPlaceholderText('Search by Location');
    const clearButton = screen.getByText('Clear');
  
    fireEvent.change(input, { target: { value: 'Test Location' } });
    fireEvent.click(clearButton);
  
    expect(onClearMock).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('');
  });
});