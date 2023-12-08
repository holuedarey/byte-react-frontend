import React from "react";
import Table from "../../components/Table";
import "./History.css";
import { CSVLink } from "react-csv";
import { format } from "date-fns";

export default function History({
  totalVol,
  lastPageNum,
  pageStart,
  history,
  reasons,
  status,
  postPerPage,
  pageNumber,
  nextPage,
  prevPage,
}) {
  var abbreviate = require("number-abbreviate");
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        Cell: (row) => {
          return <div>{row.row.index + pageStart}</div>;
        },
      },
      {
        Header: "Merchant Name",
        accessor: (name) => (
          <div className="merchant-name">{name.merchant_name}</div>
        ),
      },
      {
        Header: "Terminal Id",
        accessor: "merchant_id",
      },
      {
        Header: "RRN",
        accessor: "rrn",
      },
      {
        Header: "CARD PAN",
        accessor: "pan",
      },
      {
        Header: "BANK CARD",
        accessor: "",
      },
      {
        Header: "CARD SCHEME",
        accessor: "",
      },
      {
        Header: "Amount",
        accessor: (amount) => <div> {amount.amount.toLocaleString()}</div>,
      },
      {
        Header: "Stan",
        accessor: "stan",
      },
      {
        Header: "STATUS",
        accessor: (response) => (
          <div
            className={
              response?.response_msg === "Approved"
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }
          >
            {response?.response_msg}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: (date) => {
          let dDate = date.transaction_date;
          const formatDate = new Date(dDate);
          return <div> {formatDate.toLocaleString()}</div>;
        },
      },
    ],
    [pageNumber]
  );
  return (
    <div className="history">
      <div className="paging">
        <div className="paging-content">
          <p>No of records</p>
          <div className="d-flex">
            <div className="current-page">{history.length}</div>
            <div className="page-scroll">
              <button
                className="page-btn"
                onClick={prevPage}
                disabled={pageNumber === 1}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              {pageNumber} of {pageStart} - {totalVol}
              <button
                className="page-btn"
                onClick={nextPage}
                disabled={pageNumber >= lastPageNum}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="export">
              <CSVLink
                data={history}
                filename="History"
                className="export-btn btn"
              >
                Export Data
              </CSVLink>
            </div>
          </div>
        </div>
      </div>

      <div className="row pb-4 mb-5">
        {reasons.length > 0 &&
          reasons.map((reason, index) => (
            <div className="col" key={index}>
              <div className="border rounded-3 text-center p-3">
                <div className="rounded-circle border summary-icon mb-2">
                  <i className="fas fa-university mt-2"></i>
                </div>
                <p className="fs-7 mb-1">{reason.message}</p>
                <p className="fs-4 fw-bold text-dark">{reason.count}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="history-table table-responsive">
          <Table columns={columns} data={history} />
        </div>
      </div>
    </div>
  );
}
