import React, { useEffect, useState } from "react";
import HandlePostApi from "./handleApi/HandlePostApi";
import httpClient from "../helpers/RequestInterceptor";

function Modal(props) {
    function cancelHandler() {
        props.onCancel()
    }
    function confirmHandler() {
        props.onConfirm()

    }

    const [err, setErr] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [checked, setCheckbox] = React.useState(false);

    const [isLoading, setLoading] = useState(false);

    const url = "terminal/assign/single?merchantCode=4B755C15C4B";

    const [inputValues, setInputValue] = useState({
        "terminalId": "",
        "enabled": true,
        "serialNumber": "",
        "firmwareVerion": "",
        "logoUrl": "",
        "physicalAddress": "",
        "postalAddress": "",
        "phone": "",
        "email": "",
        "merchantName": "",
        "merchantId": ""
    });

    const [validation, setValidation] = useState({
        "terminalId": "",
        "enabled": "",
        "serialNumber": "",
        "firmwareVerion": "",
        "logoUrl": "",
        "physicalAddress": "",
        "postalAddress": "",
        "phone": "",
        "email": ""
    });

    //handle submit updates
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }
    const checkValidation = () => {
        let errors = validation;

        //Terminal validation
        if (!inputValues.terminalId.trim()) {
            errors.terminalId = "Terminal Id is required";
        } else {
            errors.terminalId = "";
        }
        //Enabled validation
        if (!checked) {
            errors.enabled = "Status is required";
        } else {
            errors.enabled = "";
        }

        // email validation
        const emailCond =
            "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
        if (!inputValues.email.trim()) {
            errors.email = "Email is required";
        } else if (!inputValues.email.match(emailCond)) {
            errors.email = "Please ingress a valid email address";
        } else {
            errors.email = "";
        }

        //Serial Number validation
        if (!inputValues.serialNumber) {
            errors.serialNumber = "Serial Number is required";
        } else {
            errors.serialNumber = "";
        }

        //firmwareVerion validation
        if (!inputValues.firmwareVerion) {
            errors.firmwareVerion = "Firmware is required";
        } else {
            errors.firmwareVerion = "";
        }

        //Physical Address validation
        if (!inputValues.physicalAddress) {
            errors.physicalAddress = "Physical Address is required";
        } else {
            errors.physicalAddress = "";
        }

        //Phone Number validation
        if (!inputValues.phone) {
            errors.phone = "Phone Number is required";
        } else {
            errors.phone = "";
        }

        setValidation(errors);
    };

    //   useEffect(() => {
    //     checkValidation();
    //   }, []);

    const payload = {
        "terminalId": inputValues.terminalId,
        "walletId": "",
        "enabled": checked,
        "serialNumber": inputValues.serialNumber,
        "firmwareVerion": inputValues.firmwareVerion,
        "organisationName": "Bytes",
        "defaultLogo": true,
        "logoUrl": inputValues.logoUrl,
        "physicalAddress": inputValues.physicalAddress,
        "postalAddress": inputValues.postalAddress,
        "phone": inputValues.phone,
        "email": inputValues.email,
        "applicationVersion": "1.0.1",
        "terminalModel": "Morefun",
        "applicationName": "Bytes",
        "imei": "124dnejh",
        "primaryHost": "POSVAS",
        "downloadStatus": "Priority",
        "canDoAgencyBanking": true,
        "canDoPurchase": true
    }

    const addTerminalSubmit = (e) => {
        e.preventDefault();
        checkValidation()       
        httpClient.post(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            const { error, message } = response;
            if (error) {
                setErr(true);
                setMsg(message[0]);
                return;
            }
            console.log("response", response)
            setMsg("Terminal Created Successfully");
            cancelHandler()
        }).catch(function (error) {
            console.log(error);
        });
    };


    return (
        <div className="modal-new">
            <div>{<div className='row ms-1'>
                <form onSubmit={addTerminalSubmit}>
                    <h6 className="text-center">Create A New Terminal</h6>
                    <hr />
                    {msg && msg}
                    <div className="row mb-1 mt-1">
                        <div className="col">
                            <div className="">
                                <label htmlFor="terminalId" className="form-label">
                                    Terminal Id:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="terminalId"
                                    placeholder="Enter Terminal Id"
                                    name="terminalId"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.terminalId}
                                />
                                {validation.terminalId != null && <p className="text-danger">{validation.terminalId}</p>}
                                {validation.terminalId && console.log(validation)}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col">
                            <div className="">
                                <label htmlFor="serialNumber" className="form-label">
                                    Serial Number:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="serialNumber"
                                    placeholder="Enter Serial Number"
                                    name="serialNumber"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.serialNumber}
                                />
                                {validation.serialNumber && <p className="text-danger">{validation.serialNumber}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="">
                                <label htmlFor="logoUrl" className="form-label">
                                    Logo Url:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="logoUrl"
                                    placeholder="Enter Logo Url"
                                    name="logoUrl"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.logoUrl}
                                />
                                {validation.logoUrl && <p className="text-danger">{validation.logoUrl}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col">
                            <div className="">
                                <label htmlFor="physicalAddress" className="form-label">
                                    PhysicalAddress:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="physicalAddress"
                                    placeholder="Enter physical Address"
                                    name="physicalAddress"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.physicalAddress}
                                />
                                {validation.physicalAddress && <p className="text-danger">{validation.physicalAddress}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="">
                                <label htmlFor="postalAddress" className="form-label">
                                    Postal Address:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="postalAddress"
                                    placeholder="Enter Postal Address"
                                    name="postalAddress"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.postalAddress}
                                />
                                {validation.postalAddress && <p className="text-danger">{validation.postalAddress}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col">
                            <div className="">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.phone}
                                />
                                {validation.phone && <p className="text-danger">{validation.phone}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.email}
                                />
                                {validation.email && <p className="text-danger">{validation.email}</p>}

                            </div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col">
                            <label htmlFor="merchantName" className="form-label">
                                Merchant Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="merchantName"
                                placeholder="Enter Merchant Name"
                                name="merchantName"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.merchantName}
                            />
                            {validation.merchantName && <p className="text-danger">{validation.merchantName}</p>}
                        </div>
                        <div className="col">
                            <div className="form-check form-switch margin-top">
                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{checked ? 'Disable':'Enable'}</label>
                                <input className="form-check-input" type="checkbox" name="enabled" role="switch" id="enabled" onChange={(e) => setCheckbox(!checked)}
                                    value={checked} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col">
                            <label htmlFor="merchantId" className="form-label">
                                merchant Id:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="merchantId"
                                placeholder="Enter merchant Id"
                                name="merchantId"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.merchantId}
                            />
                            {validation.merchantId && <p className="text-danger">{validation.merchantId}</p>}
                        </div>
                        <div className="col">
                            <label htmlFor="firmwareVerion" className="form-label">
                                Firmware Version:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firmwareVerion"
                                placeholder="Enter Firmware Version"
                                name="firmwareVerion"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.firmwareVerion}
                            />
                            {validation.firmwareVerion && <p className="text-danger">{validation.firmwareVerion}</p>}

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Terminal
                    </button>
                </form>
            </div>}</div>
            <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
        </div>
    )
}

export default Modal;