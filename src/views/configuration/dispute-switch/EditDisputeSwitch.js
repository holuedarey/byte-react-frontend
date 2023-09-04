import React from 'react';
import Table from '../../../components/Table';
import Data from '../../../data.json';


export default function EditDisputeSwitch() {
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
    <div className='switch-config'>
      <div className='mb-6'>
        <div className='d-flex justify-content-end fs-6'><a href='#'>Back</a></div>
          <h3 className='heading'>Edit Dispute Switch Configuration</h3>
          <hr />
          <div className="table-responsive table-wrapper">
            <Table columns={columns} data={data} />
          </div>
      </div>
    </div>
  )
}
