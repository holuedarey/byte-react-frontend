import React from "react";
import "./Report.css";
import TabView from "../../../components/TabView";
import MerchantReport from "./MerchantReport";
import ReportTransaction from "./ReportTransaction";
import TerminalReport from "./TerminalReport";

export default function Report({
  settlementTransaction,
  changeStartDate,
  changeEndDate,
  startDate,
  endDate,
}) {
  const transaction = (
    <ReportTransaction
      settlementTransaction={settlementTransaction}
      changeStartDate={changeStartDate}
      changeEndDate={changeEndDate}
      startDate={startDate}
      endDate={endDate}
    />
  );
  const terminal = <TerminalReport />;
  const merchant = <MerchantReport />;
  return (
    <div className="settlement-report">
      <div className="params">
        <div className="search-params">
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
        <div className="pagination">
        <div className="paging-content">
          <p>No of records</p>
          <div className="d-flex">
            <div className="current-page">10</div>
            <div className="page-scroll">
              <button className="page-btn">
                <i className="fa-solid fa-angle-left"></i>
              </button>
              10 of 10 - 100
              <button className="page-btn">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="export">
              {/* <CSVLink
                data={history}
                filename="History"
                className="export-btn btn"
              >
                Export Data
              </CSVLink> */}
            </div>
          </div>
        </div>
      </div>
      </div>
      <TabView
        tabs={[
          { name: "Settlement Transaction", content: transaction },
          { name: "Terminal Report", content: terminal },
          { name: "Merchant Report", content: merchant },
        ]}
      />
    </div>
  );
}
