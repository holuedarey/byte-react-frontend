import React from 'react';
import Table from '../../../components/Table';
import Data from '../../../data.json';

export default function MerchantReport() {
  const data = React.useMemo(() => Data, [])
  const columns = React.useMemo(
    () => [
      {
        Header: "Merchant Name",
        accessor: "switch_name"
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id"
      },
      {
        Header: "Merchant Acct No",
        accessor: "terminal_id"
      },
      {
        Header: "Card Pan",
        accessor: "stan"
      },
      {
        Header: "Rrn",
        accessor: ""
      },
      {
        Header: "Settled Value",
        accessor: ""
      },
      {
        Header: "Total Value",
        accessor: ""
      },
      {
        Header: "Total Volume",
        accessor: ""
      },
      {
        Header: "Charge",
        accessor: ""
      }
    ], [])
  return (
    <div>
      <div className='bg-white border p-4 fs-7'>
      <div className="table-responsive table-wrapper">
            <Table columns={columns} data={data} />
          </div>
      </div>
    </div>
  )
}
