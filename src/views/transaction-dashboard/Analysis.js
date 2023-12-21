import React from "react";
import Table from "../../components/Table";
import { CSVLink } from "react-csv";
import "./Analysis.css";

export default function Analysis({ performance, nextPage, prevPage }) {
  // console.log(performance);
  const columns = React.useMemo(
    () => [
      {
        Header: "Merchant Name",
        accessor: (name) => (
          <div className="text-primary">{name.merchant_name}</div>
        ),
      },
      {
        Header: "Merchant Id",
        accessor: "merchant_id",
      },
      {
        Header: "Value(₦)",
        accessor: "trans_value",
      },
      {
        Header: "Value Change(₦)",
        accessor: (valueChange) => (
          <div
            className={
              valueChange.value_change < 0 ? "text-danger" : "text-success"
            }
          >
            {valueChange.value_change}
          </div>
        ),
      },
      {
        Header: "Volume",
        accessor: "trans_volume",
      },
      {
        Header: "Volume Change",
        accessor: (volume) => (
          <div
            className={
              volume.volume_change < 0 ? "text-danger" : "text-success"
            }
          >
            {volume.volume_change}
          </div>
        ),
      },
      {
        Header: "Active Terminal",
        accessor: "active_terminals",
      },
      {
        Header: "Inactive Terminal",
        accessor: "inactive_terminals",
      },
    ],
    []
  );
  return (
    <div className="analysis">
      <div className="paging">
        <div className="paging-content">
          <p>No of records</p>
          <div className="d-flex">
            <div className="current-page">10</div>
            <div className="page-scroll">
              <button className="page-btn" onClick={prevPage}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
              10 of 10-1500
              <button className="page-btn" onClick={nextPage}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="export">
              <CSVLink
                data={performance}
                filename="History"
                className="export-btn btn"
              >
                Export Data
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4">
        <div className="table-responsive table-wrapper">
          {performance.length > 0 ? (
            <Table columns={columns} data={performance} />
          ) : (
            <p className="no-record">No record found</p>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
