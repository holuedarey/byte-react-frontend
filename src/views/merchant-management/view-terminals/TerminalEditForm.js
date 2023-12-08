import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import httpClient from "../../../helpers/RequestInterceptor";

export default function TerminalEditForm({
  isOpen,
  onClose,
  message,
  setMessage,
  selectedRowData,
}) {
  const [enabled, setEnabled] = React.useState(false);

  const schema = yup.object().shape({
    terminalId: yup.string().required("Terminal Id is required"),
    enabled: yup.boolean().required("Status is required").default(enabled),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    serialNumber: yup.string().required("Serial Number is required"),
    firmwareVersion: yup.string().required("Firmware Version is required"),
    physicalAddress: yup.string().required("Physical Address is required"),
    postalAddress: yup.string().required("Postal Address is required"),
    phone: yup.string().required("Phone Number is required"),
    // logoUrl: yup.string().required("LogoUrl is required"),
    // merchantName: yup.string().required("Merchant Name is required"),
    // merchantId: yup.string().required("Merchant Id is required"),
    // walletId: yup.string().required("Wallet Id is required").default(""),
    defaultLogo: yup
      .boolean()
      .oneOf([true], "defaultLogo is required")
      .default(true),
    applicationVersion: yup
      .string()
      .required("Merchant Id is required")
      .default("1.0.1"),
    terminalModel: yup
      .string()
      .required("Terminal Model is required")
      .default("Morefun"),
    applicationName: yup
      .string()
      .required("Application Name is required")
      .default("Bytes"),
    imei: yup.string().required("Imel is required").default("124dnejh"),
    primaryHost: yup
      .string()
      .required("Primary Host is required")
      .default("POSVAS"),
    downloadStatus: yup
      .string()
      .required("Primary Host is required")
      .default("Priority"),
    canDoAgencyBanking: yup
      .boolean()
      .oneOf([true], "canDoAgencyBanking is required")
      .default(true),
    canDoPurchase: yup
      .boolean()
      .oneOf([true], "canDoPurchase is required")
      .default(true),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Include the setValue function from react-hook-form
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    // Set default values from selectedRowData after form initialization
    if (selectedRowData) {
      Object.keys(selectedRowData).forEach((key) => {
        setValue(key, selectedRowData[key]);
      });
      setEnabled(selectedRowData.enabled); // Set enabled state from selectedRowData
    }
  }, [selectedRowData, setValue]);

  const toggleEnabled = () => {
    setEnabled(!enabled);
  };

  const onSubmit = (payload) => {
    const terminalID = selectedRowData.terminalId;
    // console.log(terminalID, payload);
    const url = `terminal/updateTerminal/${terminalID}`;

    httpClient
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        setMessage("Terminal Updated Successfully");
        onClose();
      })
      .catch(function (error) {
        console.log("Error processing request", error);
        setMessage(error?.response?.data?.responseMessage);
        onClose();
      });
  };

  if (!isOpen || !selectedRowData) return null; // Ensure there's selectedRowData before rendering

  return (
    <form className="terminal-form" onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-center">Edit Terminal</h6>
      <hr />
      <div className="row">
        {/* Email */}
        <div className="col-12 mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            {...register("email", { defaultValue: selectedRowData.email })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Terminal Id */}
        <div className="col-6 mb-3">
          <label htmlFor="terminalId" className="form-label">
            Terminal Id:
          </label>
          <input
            type="text"
            className={`form-control ${errors.terminalId ? "is-invalid" : ""}`}
            id="terminalId"
            {...register("terminalId", {
              defaultValue: selectedRowData.terminalId,
            })}
          />
          {errors.terminalId && (
            <div className="invalid-feedback">{errors.terminalId.message}</div>
          )}
        </div>

        {/* Serial Number */}
        <div className="col-6 mb-3">
          <label htmlFor="serialNumber" className="form-label">
            Serial Number:
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.serialNumber ? "is-invalid" : ""
            }`}
            id="serialNumber"
            {...register("serialNumber", {
              defaultValue: selectedRowData.serialNumber,
            })}
          />
          {errors.serialNumber && (
            <div className="invalid-feedback">
              {errors.serialNumber.message}
            </div>
          )}
        </div>

        {/* Firmware Version */}
        <div className="col-6 mb-3">
          <label htmlFor="firmwareVersion" className="form-label">
            Firmware Version:
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.firmwareVersion ? "is-invalid" : ""
            }`}
            defaultValue={selectedRowData.firmwareVerion}
            id="firmwareVersion"
            {...register("firmwareVersion")}
          />
          {errors.firmwareVersion && (
            <div className="invalid-feedback">
              {errors.firmwareVersion.message}
            </div>
          )}
        </div>

        {/* Physical Address */}
        <div className="col-6 mb-3">
          <label htmlFor="physicalAddress" className="form-label">
            Physical Address:
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.physicalAddress ? "is-invalid" : ""
            }`}
            id="physicalAddress"
            {...register("physicalAddress", {
              defaultValue: selectedRowData.physicalAddress,
            })}
          />
          {errors.physicalAddress && (
            <div className="invalid-feedback">
              {errors.physicalAddress.message}
            </div>
          )}
        </div>

        {/* Postal Address */}
        <div className="col-5 mb-3">
          <label htmlFor="postalAddress" className="form-label">
            Postal Address:
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.postalAddress ? "is-invalid" : ""
            }`}
            id="postalAddress"
            {...register("postalAddress", {
              defaultValue: selectedRowData.postalAddress,
            })}
          />
          {errors.postalAddress && (
            <div className="invalid-feedback">
              {errors.postalAddress.message}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="col-5 mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            {...register("phone", { defaultValue: selectedRowData.phone })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        {/* Enabled */}
        <div className="col-2 mb-3 form-check form-switch">
          <label className="form-check-label form-label" htmlFor="enabled">
            {errors.enabled ? (
              <div className="invalid-feedback">{errors.enabled.message}</div>
            ) : enabled ? (
              "Enabled"
            ) : (
              "Disabled"
            )}
          </label>
          <input
            className={`form-check-input ${errors.enabled ? "is-invalid" : ""}`}
            type="checkbox"
            id="enabled"
            checked={enabled} // Set the checked value based on the 'enabled' state
            onChange={toggleEnabled} // Toggle the 'enabled' state on change
          />
        </div>

        {/* Logo Number */}
        <div className="col-4 mb-3">
          <label htmlFor="logoUrl" className="form-label">
            Logo Number:
          </label>
          <input type="text" className="form-control" id="logoUrl" />
        </div>

        {/* Merchant Name */}
        <div className="col-4 mb-3">
          <label htmlFor="merchantName" className="form-label">
            Merchant Name:
          </label>
          <input type="text" className="form-control" id="merchantName" />
        </div>

        {/* Merchant Id */}
        <div className="col-4 mb-3">
          <label htmlFor="merchantId" className="form-label">
            Merchant ID:
          </label>
          <input type="text" className="form-control" id="merchantId" />
        </div>
      </div>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        Edit Terminal
      </button>

      {/* Cancel button */}
      <button type="button" className="btn btn--alt" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
