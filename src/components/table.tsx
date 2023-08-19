'user client'
import React from "react"
import TableBody from "./tableBody";
import TableHead from "./tableHead";

type tableDataObje = {
    id: string,
    full_name: string,
    email: string,
    phone: string,
    company_name:string,
    [key: string]: string;
}

type tbHeadProps = {
    label: string,
    accessor: string
}

type tableProps = {
    tableData: tableDataObje[],
    columns: tbHeadProps[],
    handleSortingChange: (accessor:string) => void;
}


function Table(props: tableProps) {
    
    const { columns, tableData, handleSortingChange } = props;
    return (
        <div className='flex flex-col mt-10'>
            <table>
                <TableHead columns={columns} onClick={handleSortingChange} />
                <TableBody columns={columns} tableData={tableData}/>
            </table>
        </div>
    )
}
export default Table;