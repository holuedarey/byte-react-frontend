import React from 'react'
import Table from '../../../components/Table';

export default function ReconciliationHistory({data}) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Merchant Name",
        accessor: "merchant_name"
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id"
      },
      {
        Header: "Stan",
        accessor: "stan"
      },
      {
        Header: "Card Pan",
        accessor: "pan"
      },
      {
        Header: "Rrn",
        accessor: "rrn"
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        Header: "Transaction Date",
        accessor: "transaction_date"
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
