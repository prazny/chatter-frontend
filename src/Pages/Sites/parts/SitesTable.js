import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useDeleteSiteMutation, useGetSitesQuery} from "../../../services/sites";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";




export default function DataTable() {
    const {data, errors, isLoading} = useGetSitesQuery();
    const [deleteSite ] = useDeleteSiteMutation();

    const doDeleteSite = (id) => {
        deleteSite(id)
            .then((payload) => {
                toast.success("Deleted");
            })
            .catch((e) => {
                toast.error("Errors occured");
            });
    };


    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name'},
        {field: 'uri', headerName: 'Uri'},
        {
            field: 'action',
            headerName: "Actions",
            sortable: false,
            renderCell: (params) => {
                return <Button variant="outlined" onClick={() => deleteSite(params.row.id)} color="error" size="small">
                    Delete
                </Button>
            }
        }
    ];

    return (
        <div style={{width: '100%'}}>
            {!isLoading &&
                <DataGrid
                    rows={data}
                    columns={columns}
                    loading={isLoading}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 25},
                        },
                    }}
                    pageSizeOptions={[25, 50]}
                />}
        </div>
    );
}
