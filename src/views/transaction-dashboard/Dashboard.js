import React from "react";
import ProgressBar from "../../components/progressBar/ProgressBar";
import "./Dashboard.css";

const percentage = 66;

export default function Dashboard({ status }) {
  // console.log(status.success_value)
  var abbreviate = require("number-abbreviate");
  return (
    <div className="dashboard pt-5">
      <div className="row">
        <div className="col-4 text-center">
          <p className="summary-heading">Values</p>
          <div className="summary">
            <p className="summary-amount success">
              ₦{status && status?.success_value?.toLocaleString()}
            </p>
            <p className="success-percent">
              <span>{status.success_percent}%</span>
              Successful Transactions
            </p>

            <div className="circle-bar-area">
              <ProgressBar
                size={180}
                value={status.success_percent}
                strokeWidth={45}
                circleOneStroke="#DDDDDD"
                circleTwoStroke="#00865A"
                centerValue={status && abbreviate(status.total_value)}
              />
            </div>
            <p className="summary-amount failed">
              ₦{status && status?.failed_value?.toLocaleString()}
            </p>
            <p className="failed-percent">
              <span>{status.failed_percent}%</span>
              Failed Transactions
            </p>
          </div>
        </div>
        <div className="col-4 text-center">
          <p className="summary-heading">Volumes</p>
          <div className="summary border-start border-end">
            <p className="summary-amount success-count">
              {status && status?.success_count?.toLocaleString()}
            </p>
            <p className="success-percent">
              <span>55%</span>
              Successful Transactions
            </p>
            <div className="circle-bar-area">
              <ProgressBar
                size={180}
                value={percentage}
                strokeWidth={45}
                circleOneStroke="#DDDDDD"
                circleTwoStroke="#021623"
                centerValue={status && abbreviate(status?.total_volume)}
              />
            </div>
            <p className="summary-amount count-failed">
              {status && status?.failed_count?.toLocaleString()}
            </p>
            <p className="failed-percent">
              <span>55%</span>
              Failed Transactions
            </p>
          </div>
        </div>
        <div className="col-4 text-center">
          <p className="summary-heading">Terminals</p>
          <div className="summary">
            <p className="summary-amount terminal-success">
              {status && status?.utilized_terminals?.toLocaleString()}
            </p>
            <p className="success-percent">
              <span>{status?.utilized_terminals_percent}%</span>
              Utilized Terminals
            </p>
            <div className="circle-bar-area">
              <ProgressBar
                size={180}
                value={status.utilized_terminals_percent}
                strokeWidth={45}
                circleOneStroke="#DDDDDD"
                circleTwoStroke="#406A99"
                centerValue={
                  status &&
                  abbreviate(status?.utilized_terminals + status?.non_utilized_terminals)
                }
              />
            </div>
            <p className="summary-amount terminal-failed">
              {status && status?.non_utilized_terminals?.toLocaleString()}
            </p>
            <p className="failed-percent">
              <span>{status?.non_utilized_terminals_percent}%</span>
              Non-Utilized Terminals
            </p>
          </div>
        </div>
      </div>
      <div className="labeled ms-5 mt-4">
        <div>
          <div className="d-flex flex-row">
            <div className="data-label value mt-1 me-2"></div>
            <p>Value</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-row">
            <div className="data-label volume mt-1 me-2"></div>
            <p>Volume</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-row">
            <div className="data-label terminal mt-1 me-2"></div>
            <p>Terminals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
