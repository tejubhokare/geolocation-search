import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/DataTable.css';

const DataTable = ({ rows, columns }) => {
    return (
        <div className="datagrid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 15, 20]}
            />
        </div>
    );
};

export default DataTable;
