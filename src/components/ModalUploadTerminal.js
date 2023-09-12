import React, { useState } from "react";
import httpClient from "../helpers/RequestInterceptor";

function ModalTerminalUpload(props) {
    function cancelHandler() {
        props.onCancel()
    }
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsFilePicked] = useState(false);

    const [err, setErr] = React.useState(false);
    const [msg, setMsg] = React.useState("");

    const url = "terminal/assign/bulk?merchantCode=4B755C15C4B";
    //handle submit updates
    function handleChange(event) {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const addTerminalSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
		formData.append('file', selectedFile);

        httpClient.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            const { error, message } = response;
            if (error) {
                setErr(true);
                setMsg(message[0]);
                return;
            }
            console.log("response", response?.data?.responseMessage);
            const msg = `Terminal Upload | ${response?.data?.data?.successful?.length ? "Successful : 0" + response?.data?.data?.successful?.length: "Successful : 0"}, ${response?.data?.data?.failed?.length ? "Failed : " + response?.data?.data?.failed?.length + ", These Record(s) Already Exist": "Failed : 0"}`;
            setMsg(msg);
            // cancelHandler()
        }).catch(function (error) {
            console.log(error);
        });
    };


    return (
        <div className="modal-new">
            <div>{<div className='row ms-1'>
                <form onSubmit={addTerminalSubmit}>
                    <h6 className="text-center">Upload Bulk Terminal</h6>
                    <hr />
                   {msg !== "" ? <p className="alert alert-info" >{msg}</p>  : <></>} 
                   {/* {err !== "" ? <p className="alert alert-danger" >{err}</p>  : <></>}  */}
                    {isSelected ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Filetype: {selectedFile.type}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                                lastModifiedDate:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <div className="row mb-1 mt-1">
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
                    <hr />
                    <button type="submit" className="btn btn-primary" disabled={!isSelected}>
                        Upload Terminal
                    </button>
                </form>
            </div>}</div>
            <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
        </div>
    )
}

export default ModalTerminalUpload;