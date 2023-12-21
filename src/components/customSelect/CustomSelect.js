import React, { useState, useRef } from "react";
import "./CustomSelect.css";

export default function CustomSelect({
  className,
  heading,
  selectedVal,
  setSelectedValue,
  items = [],
  defaultOption,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setShowDropdown(false);
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="custom-select" onClick={handleDropdown} ref={dropdownRef}>
      <div className="dropdown">
        <div>
          <h1>{heading}</h1>
          {selectedVal}
        </div>
        <div className="dropdown-icon">
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <ul
        className={showDropdown ? "dropdown-menu-list show" : "dropdown-menu-list"}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {defaultOption && (
          <li
            className="dropdown-item"
            onClick={() => handleSelect(defaultOption.value)}
          >
            {defaultOption.label}
          </li>
        )}
        {items.map((item, index) => (
          <li
            className="dropdown-item"
            key={index}
            onClick={() => handleSelect(item.name ? item.name : item)}
          >
            {item.name ? item.name : item}
          </li>
        ))}
      </ul>
    </div>
  );
}
