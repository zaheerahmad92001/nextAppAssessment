'use client';
import React from "react";

type tableDataObje ={
    id:string,
    full_name:string,
    email:string,
    phone:string,
    company_name:string,
    [key: string]: string;
}

type tbHeadProps ={
    label:string,
    accessor:string
}


type tableData ={
    tableData:tableDataObje[],
    columns:tbHeadProps[]
}


function TableBody(props:tableData){
    const {tableData , columns} = props;

    return(
        tableData?.length > 0 ?
        <tbody>
        {
            
            tableData.map((data, index) => {
                let bgcolor:string = (index) % 2 == 0 ? 'white' : '#D3D3D3'
                return (
                    <tr key={Math.random().toString()} style={{ backgroundColor: bgcolor }}>
                        {
                            columns.map(({ accessor }) => {
                                const tData = data[accessor] ? data[accessor] : '__';
                                return <td key={accessor}>{tData}</td>
                            })
                        }

                    </tr>
                )
            })
            

        }
    </tbody>
    :
    <div className="flex items-center justify-center my-20">
    <p className="self-center">Record not found</p>
    </div>
    )
}
export default TableBody;