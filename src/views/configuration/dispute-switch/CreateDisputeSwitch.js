import React from "react";
import PostData from "../../../components/handleApi/PostData";

const SelectParam = ({ header, handleOnChange, label }) => {
  return (
    <div className="me-5 mb-4">
      <div>
        <label htmlFor="config" className="form-label">
          {label}
        </label>
      </div>
      <select onChange={handleOnChange}>
        <option className="form-control">Select Header</option>
        {header &&
          header.map((header, index) => (
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

export default function CreateDisputeSwitch() {
  const [switchName, setSwitchName] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [headerRow, setHeaderRow] = React.useState("");
  const [transactionDate, setTransactionDate] = React.useState("");
  const [rrn, setRrn] = React.useState("");
  const [merchantId, setMerchantId] = React.useState("");
  const [terminalId, setTerminalId] = React.useState("");
  const [transactionsAmount, setTransactionsAmount] = React.useState("");
  const [pan, setPan] = React.useState("");
  const [stan, setStan] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const url = "config/switch/dispute";
  const data = {
    name: switchName,
    headers: header,
    transaction_date: transactionDate,
    rrn: rrn,
    merchant_id: merchantId,
    terminal_id: terminalId,
    transaction_amount: transactionsAmount,
    pan: pan,
    stan: stan,
    header_row_number: headerRow,
  };
  const headerData = header && header.split(",");

  const HandleOnChange = (e, setChangeOption) => {
    e.preventDefault();
    setChangeOption(e.target.value);
  };

  const createDisputeSwitch = (e) => {
    e.preventDefault();
    PostData(url, data).then((result) => {
      console.log("result", result);
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
    <div>
      <div className="switch-config">
        <div className="mb-6">
          <div className="d-flex justify-content-end fs-6">
            <a href="#">Back</a>
          </div>
          <h3 className="heading">
            New Dispute Switch Configuration
          </h3>
          <hr />
          <div>
            <form onSubmit={createDisputeSwitch}>
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
                    onChange={(e) => setHeaderRow(e.target.value)}
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
                    onChange={(e) => setHeader(e.target.value)}
                  />
                </div>
              </div>
              <SelectParams
                handleOnChange={(e) => HandleOnChange(e, setMerchantId)}
                header={headerData}
                params={[
                  {
                    label: "Merchant Id",
                    handleOnChange: (e) => HandleOnChange(e, setMerchantId),
                  },
                  {
                    label: "Terminal Id",
                    handleOnChange: (e) => HandleOnChange(e, setTerminalId),
                  },
                  {
                    label: "Transaction Date",
                    handleOnChange: (e) =>
                      HandleOnChange(e, setTransactionDate),
                  },
                  {
                    label: "Rrn",
                    handleOnChange: (e) => HandleOnChange(e, setRrn),
                  },
                  {
                    label: "Stan",
                    handleOnChange: (e) => HandleOnChange(e, setStan),
                  },
                  {
                    label: "Pan",
                    handleOnChange: (e) => HandleOnChange(e, setPan),
                  },
                  {
                    label: "Transaction Amount",
                    handleOnChange: (e) =>
                      HandleOnChange(e, setTransactionsAmount),
                  },
                ]}
              />
              <button className="btn" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
