import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {useGetChatsQuery} from "../../services/chats";
import {useEffect} from "react";


export default function ChatsTable() {
    let {data, errors, isLoading, refetch} = useGetChatsQuery("NEW");
    //const {data, errors, isLoading} = {data: [], errors: null, isLoading: false}
    let ref = 0;



    useEffect(() => {
        const interval = setInterval(() => refetch(), 2000);
        return () => clearInterval(interval);
    }, [])

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'status', headerName: 'status'},
        {field: 'customerName', headerName: 'Customer'},

        {
            field: 'action',
            headerName: "Actions",
            sortable: false,
            renderCell: (params) => {
                return <div></div>
            }
        }
    ];

    return (
        <div style={{width: '100%'}}>
            {!isLoading &&
                <DataGrid
                    rows={data}
                    disableRowSelectionOnClick
                    columns={columns}
                    loading={isLoading}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 25},
                        },
                    }}
                    pageSizeOptions={[25]}
                />}
        </div>
    );
}
