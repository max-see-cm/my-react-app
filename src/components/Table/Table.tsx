import { useMemo } from "react";
import { Column, useTable } from "react-table";

type Cols = {
    date: string,
    type: string,
    amount: string,
    status: string,
    action: string,
}

function Table() {

    const data = useMemo((): Cols[] => [
        {
            date: "12/12/2021",
            type: "Parking",
            amount: "50",
            status: "Approved",
            action: "aa"
        },
    ], [])

    const columns: Column<Cols>[] = useMemo(() => [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Type",
            accessor: "type"
        },
        {
            Header: "Amount(MYR)",
            accessor: "amount"
        },
        {
            Header: "Status",
            accessor: "status"
        },
        {
            Header: "Action",
            accessor: "action"
        }
    ], [])

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>

                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))
                }

            </thead>
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )

}

export default Table;


