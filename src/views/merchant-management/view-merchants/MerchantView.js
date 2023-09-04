import React from 'react';
import './MerchantView.css';
import Table from '../../../components/Table';

export default function MerchantView({merchants}) {
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "",
      },
      {
        Header: "Merchant Name",
        accessor: "merchant_name",
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id",
      },
      {
        Header: "Merchant Account no",
        accessor: "merchant_account_nr",
      },
      {
        Header: "No of terminal",
        accessor: "terminals_count",
      },
      {
        Header: "Phone Numbers",
        accessor: "merchant_phone",
      },
      {
        Header: "Emails",
        accessor: "merchant_email",
      },
      {
        Header: "Date Created",
        accessor: "created_at",
      },
    ],
    []
  );
  return (
    <div className='merchant-view'>
      <div className='row'>
        <div className='merchant-count'>
          <h3 className='heading'>Current Merchant</h3>
          <p className='count'>{merchants?.length}</p>
        </div>
      </div>
      <div className="mt-1">
        <div className="table-responsive table-wrapper">
          <Table columns={columns} data={merchants} />
        </div>
      </div>
    </div>
  )
}
