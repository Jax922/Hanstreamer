import DataGrid from 'react-data-grid';

function DataTable({columns, rows, ...props}) {

    return (
        <DataGrid
            columns={columns}
            rows={rows}
        />
    )
}

  
export default DataTable;