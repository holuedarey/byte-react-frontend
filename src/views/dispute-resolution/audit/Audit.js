import React from 'react';
import Data from '../../../data.json';
import Table from '../../../components/Table';


const AuditSummary = ({heading, count, borderClass}) => {
  return (
    <div className='col-3'>
      <div className={borderClass}>
        <h5 className='fs-7'>{heading}</h5>
        <p className='fs-4 text-dark'>{count}</p>
      </div>
    </div>
  )
}

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
    <div className='p-4 fs-7'>
      <h1 className='fs-4 mt-5'>Compared Report</h1>
      <div className='row mt-5'>
        <AuditSummary 
           heading= "Total Number of Compared Disputes"
           count="5,000"
           borderClass="border border-2 border-success rounded-2 p-3"
        />
        <AuditSummary 
           heading= "Total Number of Compared Settlement"
           count="10,000"
           borderClass="border border-2 border-warning rounded-2 p-3"
        />
        <AuditSummary 
           heading= "Total Number of Resolved Disputes"
           count="3,000"
           borderClass="border border-2 border-danger rounded-2 p-3"
        />
      </div>
      <div className="table-responsive table-wrapper mt-5">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}
