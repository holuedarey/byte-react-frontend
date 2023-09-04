import React from 'react';
import Table from '../../../components/Table';
import Data from '../../../data.json';

export default function Audit() {
  const data = React.useMemo(() => Data, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "Switch Name",
        accessor: "switch_name"
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id"
      },
      {
        Header: "Terminal Id",
        accessor: "terminal_id"
      },
      {
        Header: "Stan",
        accessor: "stan"
      },
      {
        Header: "Action",
        accessor: ""
      }
    ], [])
  return (
    <div className='bg-white border p-4 fs-7'>
      <div className='border'>
        <Table columns={columns} data={data}/>
      </div>
    </div>
  )
}
