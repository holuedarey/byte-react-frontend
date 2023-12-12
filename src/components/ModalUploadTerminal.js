import React, { useState } from "react";
import httpClient from "../helpers/RequestInterceptor";

export default function ModalTerminalUpload({
  isOpen,
  onClose,
  message,
  setMessage,
  fetchData,
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsFilePicked] = useState(false);

  const [err, setErr] = React.useState(false);
  //   const [msg, setMsg] = React.useState("");

  const url = "terminal/assign/bulk?merchantCode=4B755C15C4B";
  //handle submit updates
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  //   const cancelHandler = () => {
  //     onCancel();
  //   };

  const addTerminalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    httpClient
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const { error, data } = response?.data || {};

        if (error) {
          setErr(true);
          setMessage(data?.message || "Error uploading terminals.");
          return;
        }

        const successCount = data?.successful?.length || 0;
        const failedCount = data?.failed?.length || 0;

        const uploadMessage = `Terminal Upload | Successful: ${successCount}, Failed: ${failedCount}`;

        setMessage(uploadMessage);
        onClose();
        fetchData();
      })
      .catch((error) => {
        console.error("Error uploading terminals:", error);
        setMessage(error?.response?.data?.responseMessage);
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    <form className="upload-form" onSubmit={addTerminalSubmit}>
      <h6 className="text-center">Upload Bulk Terminal</h6>
      {/* <hr />
      {message !== "" ? <p className="alert alert-info">{message}</p> : <></>} */}
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div className="row mb-3 mt-1">
        <div className="col">
          <div className="">
            <label htmlFor="terminalId" className="form-label">
              Select File:
            </label>
            <input
              type="file"
              className="form-control"
              id="file"
              name="file"
              onChange={(e) => handleChange(e)}
            />
            {/* {validation.terminalId != null && <p className="text-danger">{validation.terminalId}</p>}
                                {validation.terminalId && console.log(validation)} */}
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isSelected}
        >
          Upload Terminal
        </button>
        <button className="btn btn--alt" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
