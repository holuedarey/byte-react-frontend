import React from "react";
import "./ReportTransaction.css";
import DatePicker from "react-datepicker";
import Table from "../../../components/Table";
import Data from "../../../data.json";

export default function ReportTransaction({
  settlementTransaction,
  changeStartDate,
  changeEndDate,
  startDate,
  endDate,
}) {
  const data = React.useMemo(() => Data, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Merchant Name",
        accessor: "merchant_name",
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id",
      },
      {
        Header: "Merchant Acct No",
        accessor: "merchant_account_nr",
      },
      {
        Header: "Card Pan",
        accessor: "stan",
      },
      {
        Header: "Rrn",
        accessor: "rrn",
      },
      {
        Header: "Processor",
        accessor: "processor",
      },
      {
        Header: "Amount",
        accessor: "transaction_amount",
      },
      {
        Header: "Charge",
        accessor: "charge",
      },
    ],
    []
  );
  return (
    <div>
      <div className="report-trans">
        <div className="search-params-area">
          <div className="search-params">
            <div>
              <div className="position-relative">
                <i className="fas fa-search"></i>
                <div className="pe-0">
                  <input
                    type="search"
                    id="form1"
                    className="form-control search ps-5"
                    // onKeyDown={HandleKeyDown}
                    placeholder="Hit enter to complete search"
                  />
                </div>
              </div>
            </div>
            <div className="select-search">
              <label>Processor</label>
              <select>
                <option value="All status">All Processor</option>
              </select>
            </div>
            <div className="date-range">
              <div className="d-flex">
                <div className="start me-3">
                  <label>From</label>
                  <i className="fa-solid fa-calendar-days"></i>
                  <DatePicker
                    selected={startDate}
                    onChange={changeStartDate}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="end">
                  <label>To</label>
                  <i className="fa-solid fa-calendar-days"></i>
                  <DatePicker
                    selected={endDate}
                    onChange={changeEndDate}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive table-wrapper">
          <Table columns={columns} data={settlementTransaction} />
        </div>
      </div>
    </div>
  );
}
