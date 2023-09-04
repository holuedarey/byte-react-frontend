import React from "react";
import PostData from "../../../components/handleApi/PostData";

const SelectParam = ({ headers, handleOnChange, label }) => {
  return (
    <div className="me-5 mb-4">
      <div>
        <label htmlFor="config" className="form-label">
          {label}
        </label>
      </div>
      <select onChange={handleOnChange}>
        <option className="form-control">Select Header</option>
        {headers &&
          headers.map((header, index) => (
            <option className="form-control" key={index} value={header}>
              {header}
            </option>
          ))}
      </select>
    </div>
  );
};

const SelectParams = ({
  params = {},
  handleOnChange,
  headers,
  setTransactionsAmount,
  headersData,
}) => {
  return (
    <div className="d-flex flex-wrap mt-4">
      {params.map((param, index) => (
        <SelectParam
          key={index}
          label={param.label}
          handleOnChange={param.handleOnChange}
          headers={headers}
        />
      ))}
    </div>
  );
};

export default function CreateSwitch() {
  const [switchName, setSwitchName] = React.useState("");
  const [headers, setHeaders] = React.useState("");
  const [transactionDate, setTransactionDate] = React.useState("");
  const [rrn, setRrn] = React.useState("");
  const [merchantId, setMerchantId] = React.useState("");
  const [terminalId, setTerminalId] = React.useState("");
  const [transactionsAmount, setTransactionsAmount] = React.useState("");
  const [pan, setPan] = React.useState("");
  const [headerRowNumber, setHeaderRowNumber] = React.useState("");
  const [acctNo, setAcctNo] = React.useState("");
  const [charge, setCharge] =React.useState("");
  const [merchantName, setMerchantName] =React.useState("");
  const [settlementAmount, setSettlementAmount] =React.useState("");
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  

  const HandleOnChange = (e, setChangeOption) => {
    e.preventDefault();
    setChangeOption(e.target.value);
  }

  console.log("trans date", merchantId, transactionsAmount, rrn);

  const url = "config/switch/settlement";
  const data = {
    name: switchName,
    headers: headers,
    transaction_date: transactionDate,
    rrn: rrn,
    merchant_id: merchantId,
    terminal_id: terminalId,
    transaction_amount: transactionsAmount,
    pan: pan,
    header_row_number: headerRowNumber,
  };
  const headersData = headers && headers.split(",");

  console.log("header", headers.split(","));

  const createSwitch = (e) => {
    e.preventDefault();
    PostData(url, data).then((result) => {
      console.log("result", result)
      const { error, message } = result;
      if (error) {
        setErr(true);
        setMsg(message[0]);
        return;
      }
    });
    console.log("create switch");
  };

  return (
    <div className="switch-config">
      <div className="mb-6">
        <div className="d-flex justify-content-end fs-6">
          <a href="#">Back</a>
        </div>
        <h3 className="heading">New Settlement Switch Configuration</h3>
        <hr />
        <div>
          <form onSubmit={createSwitch}>
            <div className="row pb-4">
              <div className="col-4">
                <label htmlFor="config" className="form-label">
                  Enter Switch Name
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Switch Name"
                  onChange={(e) => setSwitchName(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label htmlFor="config" className="form-label">
                  Enter Header Row Number
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Header Row Number"
                  onChange={(e) => setHeaderRowNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-8 h-100">
                <label htmlFor="config" className="form-label">
                  Enter Headers
                  <span className="text-danger"> *</span>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Headers Seperated by Commas"
                  onChange={(e) => setHeaders(e.target.value)}
                />
              </div>
            </div>
            <SelectParams
              handleOnChange={(e) => HandleOnChange(e, setMerchantId)}
              headers={headersData}
              params={[
                { label: "Merchant Id", handleOnChange: (e) => HandleOnChange(e, setMerchantId)},
                { label: "Terminal Id",  handleOnChange: (e) => HandleOnChange(e, setTerminalId)},
                { label: "Transaction Date", handleOnChange: (e) => HandleOnChange(e, setTransactionDate)},
                { label: "Rrn", handleOnChange: (e) => HandleOnChange(e, setRrn)},
                { label: "Merchant Name", handleOnChange: (e) => HandleOnChange(e, setMerchantName)},
                { label: "Merchant Account Number", handleOnChange: (e) => HandleOnChange(e, setAcctNo)},
                { label: "Pan", handleOnChange: (e) => HandleOnChange(e, setPan)},
                { label: "Transaction Amount", handleOnChange: (e) => HandleOnChange(e, setTransactionsAmount)},
                { label: "Settlement Amount", handleOnChange: (e) => HandleOnChange(e, setSettlementAmount)},
                { label: "Charge", handleOnChange: (e) => HandleOnChange(e, setCharge)},
              ]}
            />
            <button className="btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
