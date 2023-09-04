import React from 'react';
import Table from '../../../components/Table';
import Data from '../../../data.json';


export default function AllHistory({ fileUploadHistory }) {
  const data = React.useMemo(() => Data, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "File Name",
        accessor: "filename"
      },
      {
        Header: "Uploaded Count",
        accessor: "count"
      },
      {
        Header: "Unique Count",
        accessor: ""
      },
      {
        Header: "Duplicate Count",
        accessor: ""
      },
      {
        Header: "Processor",
        accessor: "processor"
      },
      {
        Header: "Created At",
        accessor: "createdAt"
      },
      {
        Header: "Updated At",
        accessor: "updatedAt"
      }
    ], [])
  return (
    <div>
      <div className='bg-white border p-4 fs-7'>
      <div className="table-responsive table-wrapper">
            <Table columns={columns} data={fileUploadHistory} />
          </div>
      </div>
    </div>
  )
}
