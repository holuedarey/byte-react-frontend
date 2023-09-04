import React from "react";
import HandlePostApi from "../../../components/handleApi/HandlePostApi";

export default function CreateConfig() {
  const [inputLists, setInputLists] = React.useState([
    { merchant_id: "", settlement_count: "", account: "" }
  ]);
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const url = "config/settlements";
  const data = {data: inputLists};

  // console.log("data", data);

  const HandleSamedayConfig = (e) => {
    e.preventDefault();
    HandlePostApi(url, data).then((result) => {
      const { error, message } = result;
      // console.log("result", result, message);
      if (error) {
        setErr(true);
        setMsg(message);
        return;
      }
    });
  };

  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...inputLists];
    list[index][name] = value;
    setInputLists(list)
  }

  const handleAddConfig = () => {
    setInputLists([...inputLists, { merchant_id: "", settlement_count: "", account: "" }])
  };

  const handleDeleteConfig = (index) => {
    const list = [...inputLists];
    list.splice(index, 1);
    setInputLists(list)
  };

  return (
    <div className="create-config">
      <div className="mb-6">
        <div className="d-flex justify-content-end fs-6">
          <a href="#">Back</a>
        </div>
        <h3 className="heading">New Merchant Same-Day Configuration</h3>
        <hr />
        <form className="mb-5 mt-3" onSubmit={HandleSamedayConfig}>
          {inputLists.map((singleList, index) => (
            <div className="form-inputs mb-3" key={index}>
              {inputLists.length > 1 && (
                <div className="delete-row">
                  <button className="btn" onClick={() => handleDeleteConfig(index)}>x</button>
                </div>
              )}
              <div>
                <label htmlFor="config" className="form-label">
                  Enter Merchant Id
                </label>
                <input
                  type="text"
                  name="merchant_id"
                  className="form-control"
                  placeholder="Enter Merchant Id"
                  value={singleList.merchant_id}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor="config" className="form-label">
                  Enter Account Number(Optional)
                </label>
                <input
                  type="text"
                  name="account"
                  className="form-control"
                  placeholder="Enter Account Number"
                  value={singleList.account}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor="config" className="form-label">
                  Set Frequency
                </label>
                <input
                  type="text"
                  name="settlement_count"
                  className="form-control"
                  placeholder="How Many Times In A 24 Hour Period?"
                  value={singleList.settlement_count}
                  onChange={(e) => handleInputChange(e,index)}
                />
              </div>
            </div>
          ))}
          <div className="mb-5">
           { inputLists.length < 4 && (
           <div>
            <button className="add-config-btn" type="button" onClick={handleAddConfig}>
              <span>+ </span>Add Another Configuration
            </button>
            </div>
            )}
            <button
              className="btn w-25"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
