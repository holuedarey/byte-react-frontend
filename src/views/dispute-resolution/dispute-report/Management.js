import React from 'react';
import Data from '../../../data.json';
import success from '../../../images/success.png';
import failed from '../../../images/failed.png';
import pending from '../../../images/pending.png';
import Table from '../../../components/Table';


const ManagementSummary = ({heading, count, borderClass, icon}) => {

  if(heading === "Approved") {
    borderClass = "border border-success rounded-2 p-3"
    icon = success
  }else if(heading === "Pending"){
    borderClass = "border border-warning rounded-2 p-3"
    icon = pending
  }else {
    borderClass = "border border-danger rounded-2 p-3"
    icon = failed
  }

  return (
    <div className='col-3'>
      <div className={borderClass}>
        <div className='d-flex justify-content-end'>
          <img src={icon} alt='icon'/>
        </div>
        <h5 className='fs-7 text-uppercase'>{heading}</h5>
        <p className='fs-4 text-dark'>{count}</p>
      </div>
    </div>
  )
}

export default function Management() {
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
      <h1 className='fs-4 mt-5'>Dispute Management</h1>
      <div className='row mt-4'>
        <ManagementSummary 
          heading = "Approved"
          count = "23,000"
        />
        <ManagementSummary 
          heading = "Pending"
          count = "10,000"
        />
        <ManagementSummary 
          heading = "Declined"
          count = "13,000"
        />
      </div>
      <div className="table-responsive table-wrapper mt-5">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}
