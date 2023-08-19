'use client';
import React from 'react';
import { FcAlphabeticalSortingAz } from "react-icons/fc";


type tbHeadProps = {
    label: string,
    accessor: string
}
type Props = {
    columns: tbHeadProps[],
    onClick: (accessor: string) => void,
}

function TableHead(props: Props) {
    const { columns, onClick } = props;

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor }) => {
                    return (
                        <th key={accessor} onClick={() => onClick(accessor)}>
                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FcAlphabeticalSortingAz />
                                {label}
                            </p>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}
export default TableHead;