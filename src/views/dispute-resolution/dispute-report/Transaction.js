import React from 'react';
import Data from '../../../data.json';
import success from '../../../images/success.png';
import failed from '../../../images/failed.png';
import pending from '../../../images/pending.png';
import money from '../../../images/money.png';
import Table from '../../../components/Table';

const TransactionSummary = ({heading, amount, count, borderClass, icon}) => {

  if(heading === "Total Transaction") {
    borderClass = "border border-secondary rounded-2 p-3"
    icon = money
  }else if(heading === "Pending Transaction"){
    borderClass = "border border-warning rounded-2 p-3"
    icon = pending
  }else if(heading === "Successful Transaction"){
    borderClass = "border border-primary rounded-2 p-3"
    icon = success
  }else {
    borderClass = "border border-danger rounded-2 p-3"
    icon = failed
  }

  return (
    <div className='col'>
      <div className={borderClass}>
        <div className='d-flex justify-content-end'>
          <img src={icon} alt='icon'/>
        </div>
        <div className='text-center'>
          <h3 className='fs-7'>{heading}</h3>
          <p className='text-dark fw-bold fs-6'>{amount}</p>
          <h4 className='fs-7'>Transaction Count</h4>
          <p className='text-primary'>{count}</p>
        </div>
      </div>
    </div>
  )
}

export default function Transaction() {
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
      <div className='d-flex justify-content-end'>
        <div className='d-flex'>
          <p>Current Transaction Users</p>
          <p className='ms-3'>566,090</p>
        </div>
      </div>
      <div className='row'>
        <TransactionSummary 
          heading = "Total Transaction"
          amount = "₦999,999,9999.80"
          count = "23,444"
        />
        <TransactionSummary 
          heading = "Pending Transaction"
          amount = "₦100,000,000.80"
          count = "23,444"
        />
        <TransactionSummary 
          heading = "Successful Transaction"
          amount = "₦412,344,798.09"
          count = "23,444"
        />
        <TransactionSummary 
          heading = "Failed Transaction"
          amount = "₦999,999,9999.80"
          count = "23,444"
        />
      </div>
      <div className='mt-5'>
        <form>
          <div className='row'>
            <div className='col-6'>
              <div className='row'>
                <div className='col-1'>
                  <div className='col-1'>
                    <select>
                      <option>All Channels</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='mt-3'>
        <div className="table-responsive table-wrapper">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}
