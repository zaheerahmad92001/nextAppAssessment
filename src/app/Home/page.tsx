'use client';

import React, { useEffect, useState } from 'react'
import Table from '@/components/table';
// import { List } from '../staticData';
import { List } from '@/staticData';
import { ApolloClient, InMemoryCache, ApolloProvider, gql ,useQuery } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  onError: (error:any) => {
    console.log('Apollo Client error:', error);
  },
});


const columns = [
  { label: "Full Name", accessor: "full_name" },
  { label: "Email", accessor: "email" },
  { label: "Phone", accessor: "phone" },
  { label: "Company Name", accessor: "company_name" },
];

type singleObject ={
  id: string;
    full_name: string;
    email: string;
    phone: string;
    company_name:string;
    [key:string]:string;
}

// GRAPH QL QUERY TO FETCH THE DATA FROM SERVER
const GET_UserInfo = gql`
query {
  userinfo{
      full_name
      email
      company_name
      phone
    }
  }
`

export default function HomePage() {

  const { loading,error, data } = useQuery(GET_UserInfo)
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");


 useEffect(()=>{
 if(!loading){
  let userData = data.userinfo;
  setTableData(userData);
  setTableDataCopy(userData);
 }

 },[loading])

  if(loading){
    return<p>{'....Loading'}</p>
  }
  console.log('error', error)
  console.log('data is', data.userinfo[0].company_name)


  // SEARCH FUNCTION TO SHOW THE SEARCHED DATA
  function search() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      const searchValue = searchInput.value.toLowerCase();
      if (searchValue.length > 0) {
        const filteredData = tableDataCopy.filter((item) => {
          return (
            item.full_name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue) ||
            item.company_name.toLowerCase().includes(searchValue) ||
            String(item.phone).includes(searchValue)
          );
        });
        setTableData(filteredData);
        console.log(filteredData);
      } else {
        setTableData(tableDataCopy);
      }
    }
  }


  // MAKING DECISION TO SORT DATA IN ASSEDNING OR DESCENDING ORDER

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  }

  // SORTING DATA IN ASSENDING OR DESCENDING ORDER
  
  const handleSorting = (sortField:string | number, sortOrder:string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a:singleObject, b:singleObject) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      console.log('sorted', sorted)
      setTableData(sorted);
    }
  };


  
  return (
   
    <div className='mx-20 my-5'>

      <div className='justify-center flex'>
        <input type="text" id="searchInput" onChange={search} placeholder="Search by Name, Email, or Age" />
      </div>
      <Table columns={columns} tableData={tableData} handleSortingChange={handleSortingChange} />
    </div>
  
  )
}
