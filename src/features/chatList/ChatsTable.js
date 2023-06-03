import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {useAssignChatMutation, useGetChatsQuery} from "../../services/chats";
import {useEffect} from "react";
import {redirect} from "react-router-dom";
import {useDeleteSiteMutation} from "../../services/sites";


export default function ChatsTable() {
    let {data, errors, isLoading, refetch} = useGetChatsQuery();
    const [assignChat] = useAssignChatMutation();

    //const {data, errors, isLoading} = {data: [], errors: null, isLoading: false}
    let ref = 0;

    const doAssignChat = (id) => {
        assignChat(id)
            .then((payload) => {
                toast.success("Assigned");
            })
            .catch((e) => {
                toast.error("Errors occured");
            });
    };


    useEffect(() => {
        const interval = setInterval(() => refetch(), 10000);
        return () => clearInterval(interval);
    }, [])

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'status', headerName: 'status'},
        {field: 'customerName', headerName: 'Customer'},
        {field: 'user.firstName', headerName: 'Assigned'},
        {
            field: 'action',
            headerName: "Actions",
            sortable: false,
            renderCell: (params) => {
                if (params.row.status == "NEW") {
                    return <div>
                        <Button variant="contained" onClick={() => doAssignChat(params.row.id)} size="small">Assign
                            me</Button>
                    </div>
                }

            }
        }
    ];

    const onRowClick = (params) => {
        redirect("/chat/" + params.id)
    }

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
                    onRowClick={onRowClick}
                    pageSizeOptions={[25]}
                />}
        </div>
    );
}
