import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/DataTable.css';

// DataTable functional component definition
const DataTable = ({ rows, columns }) => {
    return (
        <div className="datagrid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10} // Initial page size for pagination
                initialState={{// Initial state configuration for the grid
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 15, 20]}
            />
        </div>
    );
};

export default DataTable;
