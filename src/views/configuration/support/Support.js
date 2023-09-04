import React from "react";
import HandlePostApi from "../../../components/handleApi/HandlePostApi";
import Table from "../../../components/Table";
import "./Support.css";

export default function Support() {
  const [email, setEmail] = React.useState("");
  const [tabelData, setTableData] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const url = "config/sd-advice-email";
  const data = { email: email };

  console.log("result", tabelData);

  const createAdviceEmail = (e) => {
    e.preventDefault();
    HandlePostApi(url, data).then((result) => {
      const { error, message } = result;
      console.log("result", result.data);
      setTableData(result.data);
      if (error) {
        setErr(true);
        setMsg(message);
        return;
      }
    });
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        Cell: (row) => {
          return <div>{row.row.index}</div>;
        },
      },
      {
        Header: "Email Address",
        accessor: "sd_advice_emails",
      },
    ], []);
  return (
    <div className="support-config">
      <div className="d-flex justify-content-end fs-6">
        <a href="#">Back</a>
      </div>
      <div className="row">
        <div className="col">
          <div>
            <h2 className="heading">Pos Support Email Configuration</h2>
            <form onSubmit={createAdviceEmail}>
              <div className="row">
                <label htmlFor="config" className="form-label">
                  <span>+ </span>
                  Add New Email Addresses
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Multiple Emails Seperated By Commas"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <button className="btn" type="submit">
                    Add Email(s)
                  </button>
                </div>
              </div>
            </form>
            <div>
        <div className="table-responsive">
          {/* {tabelData && <Table columns={columns} data={tabelData} />} */}
        </div>
      </div>
          </div>
        </div>
        <div className="auto-support col border-start">
          <div className="ms-5">
            <h2 className="heading">Auto Pos Support Configuration</h2>
            <form className="mt-3">
              <div className="row mb-3">
                <div className="col-3">
                  <label>Faulty Printer</label>
                </div>
                <div className="col-3">
                  <select className="w-75">
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label>Last Seen</label>
                </div>
                <div className="col-3">
                  <select className="w-75">
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label>No of Days</label>
                </div>
                <div className="col-3">
                  <select className="w-75">
                    <option>30</option>
                    <option>Off</option>
                  </select>
                </div>
              </div>
              <div className="w-100 mt-5">
                <button className="btn">
                  Apply And Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
