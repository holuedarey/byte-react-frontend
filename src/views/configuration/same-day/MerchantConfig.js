import React from "react";
import HandlePostApi from "../../../components/handleApi/HandlePostApi";
import Table from "../../../components/Table";

export default function MerchantConfig({ configSettlements }) {
  const [acctNo, setAcctNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const url = "config/sd-advice-email";
  const data = {
    email: email,
  };

  const Url = "config/settlement-bank-account";
  const Data = {
    account_no: acctNo,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HandlePostApi(url, data).then((result) => {
      const { error, message } = result;
      console.log("result", result, message);
      if (error) {
        setErr(true);
        setMsg(message);
        return;
      }
    });
  };

  const handleAddAcct = (e) => {
    e.preventDefault();
    HandlePostApi(Url, Data).then((result) => {
      const { error, message } = result;
      console.log("result", result, message);
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
        Header: "Merchant Id",
        accessor: "merchant_id",
      },
      {
        Header: "Account Number",
        accessor: "account_no",
      },
      {
        Header: "Time/Frequency",
        accessor: "settlement_count",
      },
    ],
    []
  );
  return (
    <div className="merchant-config">
      <div className="d-flex justify-content-end fs-6">
        <a href="#">Back</a>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-5">
          <div className="col">
            <div className="row">
              <label htmlFor="config" className="form-label">
                Enter Account Number
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Account Number"
                  onChange={(e) => setAcctNo(e.target.value)}
                />
              </div>
              <div className="col-4">
                <button
                  className="btn"
                  type="button"
                  onClick={handleAddAcct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <label htmlFor="config" className="form-label">
                Enter Email Addresses
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
                <button
                  className="btn"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <Table columns={columns} data={configSettlements} />
      </div>
    </div>
  );
}
