import React, {useEffect, useState} from "react";
import {Card, Table} from "@mui/material";
import {Pagination} from "@tanstack/react-table";
import {usePagination, useTable} from 'react-table';

function GenericTable({
                                 columns,
                                 useData,
                                 defaultPageSize
                             })  {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [controlledPageCount, setPageCount] = useState(0)
    const [recordsPerPage, setRecordsPerPage] = useState(defaultPageSize)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: {
            pageIndex,
            pageSize,
        },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: recordsPerPage
            },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    )

    const {
        data: result,
        isFetching,
        isLoading
    } = useData({page: pageIndex + 1, size: pageSize})

    useEffect(() => {
        setLoading(isLoading || isFetching)
        setData(!(isLoading || isFetching) ? result?.items : [])
        setTotal(!(isLoading || isFetching) && result?.total)
        setPageCount(!(isLoading || isFetching) &&
        result?.total ? Math.floor(result.total / pageSize) : 0)
    }, [result, pageIndex, pageSize, isLoading, isFetching])

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card className="pt-0">
                {loading ? (
                    "Loading..."
                ) : (
                    <table
                        className="user-table align-items-center"
                        {...getTableProps()}
                    >
                        <thead>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <th
                                                className="border-bottom"
                                                {...column.getHeaderProps()}
                                            >
                                                {
                                                    column.render('Header')}
                                            </th>
                                        ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {
                            page.map((row, i) => {
                                prepareRow(row)

                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {
                                                            cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
                <Card
                    className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    {/*<Pagination className="mb-2 mb-lg-0">*/}
                    {/*    <Pagination*/}
                    {/*        disabled={pageIndex === 0}*/}
                    {/*        onClick={() => gotoPage(0)}*/}
                    {/*    />*/}
                    {/*    <Pagination*/}
                    {/*        disabled={!canPreviousPage}*/}
                    {/*        onClick={() => previousPage()}*/}
                    {/*    />*/}
                    {/*    <Pagination*/}
                    {/*        disabled={!canNextPage}*/}
                    {/*        onClick={() => nextPage()}*/}
                    {/*    />*/}
                    {/*    <Pagination*/}
                    {/*        disabled={pageIndex === pageCount}*/}
                    {/*        onClick={() => gotoPage(pageCount - 1)}*/}
                    {/*    />*/}
                    {/*</Pagination>*/}
                    <small className="fw-bold">
                        {total} records / page{" "}
                        <strong>{pageIndex + 1}</strong> of {pageOptions.length}
                    </small>
                </Card>
            </Card>
        </Card>
    )
}

export default GenericTable;