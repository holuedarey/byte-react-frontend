import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import LineChart from "../../components/LineChart";
import "./Status.css";
import check from "../../images/shield-check.png";
import xmark from "../../images/shield-xmark.png";

const percentage = 66;

export default function Status({ status, terminals }) {
  // console.log("terminal", terminals);
  return (
    <div className="status">
      <div className="row text-center summary">
        <div className="col-4 pt-5 mb-2 pb-3">
          <p className="summary-total">
            ₦ {status && status.total_value.toLocaleString()}
          </p>
          <div className="row total">
            <div className="col-6 border-end">
              <p className="mb-0">Successful</p>
              <p className="success-value">
                ₦ {status && status.success_value.toLocaleString()}
              </p>
            </div>
            <div className="col-6">
              <p className="mb-0">Failed</p>
              <p className="failed-value">
                ₦ {status && status.failed_value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 total-terminal mb-2 pb-3">
          <h5 className="summary-heading">Total Terminal</h5>
          <p className="summary-total">{terminals && terminals.allTerminals}</p>
          <div className="row">
            <div className="col-6 border-end">
              <p className="mb-0">Active</p>
              <p className="terminal-count">
                {terminals && terminals.activeTerminals}
              </p>
            </div>
            <div className="col-6">
              <p className="mb-0">Inactive</p>
              <p className="terminal-count">
                {terminals && terminals.inactiveTerminals}
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 mb-2 pb-3">
          <h5 className="summary-heading">Online Terminals</h5>
          <p className="summary-total">
            {terminals && terminals.onlineTerminals}
          </p>
          <div className="row">
            <div className="col-6 border-end">
              <p className="mb-0">Successful</p>
              <p className="terminal-count">127,000</p>
            </div>
            <div className="col-6">
              <p className="mb-0">Failed</p>
              <p className="terminal-count">73,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4 m-2">
        <div className="col-8">
          <div className="w-100 pt-5">
            <LineChart />
          </div>
        </div>
        <div className="col-4 terminal-progress-summary">
          <div className="bg-white p-4 shadow">
            <div className="border p-2">
              <div className="row p-2 utilized">
                <h4 className="heading">Utilised Terminal</h4>
                <div className="col-6">
                  <p className="fs-7 mb-1">
                    This week
                    <span>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </p>
                  <p className="total-value">
                    {status && status.utilized_terminals.toLocaleString()}
                  </p>
                  <p>5% Down Today</p>
                </div>
                <div className="col-6 ps-4">
                  <div className="circular-bar">
                    <CircularProgressbarWithChildren
                      value={status &&  status.utilized_terminals_percent}
                      styles={buildStyles({
                        pathColor: "#228835",
                        rotation: 1.0,
                        strokeLinecap: "round",
                        textSize: "12px",
                        pathTransitionDuration: 0.5,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                      })}
                    >
                      <div>
                        <img src={check} alt="success" />
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
              </div>
            </div>
            <div className="border mt-5 p-2">
              <div className="row p-2 unutilized">
                <h4 className="heading">Non-Utilised Terminal</h4>
                <div className="col-6">
                  <p className="fs-7 mb-1">
                    This week
                    <span>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </p>
                  <p className="total-value">
                    {status && status.non_utilized_terminals.toLocaleString()}
                  </p>
                  <p>5% Down Today</p>
                </div>
                <div className="col-6 ps-4">
                  <div className="circular-bar">
                    <CircularProgressbarWithChildren
                      value={status && status.non_utilized_terminals_percent}
                      styles={buildStyles({
                        pathColor: "#FF0000",
                        rotation: 1.0,
                        strokeLinecap: "round",
                        textSize: "12px",
                        pathTransitionDuration: 0.5,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                      })}
                    >
                      <div>
                        <img src={xmark} alt="failed" />
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
