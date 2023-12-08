import React from "react";
import './Dashboard.css'
import HandlePostApi from "../../../components/handleApi/HandlePostApi";

export default function Dashboard() {
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [days, setDays] = React.useState(0);
  const  totalTimeInSec = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + (seconds * 1) ;

  // console.log("dddd", hours, days, minutes, seconds)

  const url = "config/online-terminal-time";
  const data = { online_seconds: totalTimeInSec };

  const activeUrl = "config/active-terminal-time";
  const activeData = { active_seconds: totalTimeInSec };

  const configOnlineTerm = (e) => {
    e.preventDefault();
    HandlePostApi(url, data).then((result) => {
        const { error, message } = result;
        // console.log("result", result, message)
        if (error) {
          setErr(true);
          setMsg(message);
          return;
        }
      });
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
  };

  const configActiveTerm = (e) => {
    e.preventDefault();
    // console.log("dddd", hours)
    HandlePostApi(activeUrl, activeData).then((result) => {
        const { error, message } = result;
        // console.log("result", message)
        if (message) {
          setErr(true);
          setMsg(message.message);
          return;
        }
      });
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
  };
  return (
    <div>
      <div className="config-dashboard">
        <div className="row m-5">
          <div className="col ms-5">
            <div>
              <h2 className="heading">Online Terminal Configuration</h2>
              <div className="card">
                <form onSubmit={configOnlineTerm}>
                  <div className="mb-3 row">
                    <label htmlFor="hour" className="col-sm-3 col-form-label">
                      Hours
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => setHours(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="minute" className="col-sm-3 col-form-label">
                      Minutes
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="30"
                        onChange={(e) => setMinutes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5 row">
                    <label
                      htmlFor="seconds"
                      className="col-sm-3 col-form-label"
                    >
                      Seconds
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => setSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="submit-btn mt-5">
                    <button
                      className="btn w-75 ms-3 mt-5"
                      type="submit"
                    >
                      Apply and Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col ms-5">
            <div>
              <h2 className="heading">Active Terminal Configuration</h2>
              <div className="card">
                <form onSubmit={configActiveTerm}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="hour"
                      className="col-3 col-form-label"
                    >
                      Hours
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => setHours(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="minutes"
                      className="col-3 col-form-label"
                    >
                      Minutes
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => setMinutes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="second"
                      className="col-3 col-form-label"
                    >
                      Seconds
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="30"
                        onChange={(e) => setSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="day"
                      className="col-3 col-form-label"
                    >
                      Days
                    </label>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="submit-btn">
                    <button className="btn bg-blue text-white w-75 ms-3 mt-4" type="submit">
                      Apply and Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
