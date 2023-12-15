import React from "react";
import "./GroupedInput.css";

export default function GroupedInput({
  label,
  placeholder,
  type,
  value,
  onChange,
}) {
  const handleInputChange = (event) => {
    // Retrieve the new value from the input field
    const newValue = event.target.value;

    // Call the onChange function passed through props, if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="grouped-input">
      <label>{label}</label>
      <input
        type={type ? type : "text"}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
