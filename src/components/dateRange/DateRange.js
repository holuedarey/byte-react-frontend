import React from "react";
import "./DateRange.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRange({startDate, endDate, handleStartDate, handleEndDate}) {
  // const [startDate, setStartDate] = React.useState(new Date());
  // const [endDate, setEndDate] = React.useState(new Date());

  // const changeStartDate = (date) => {
  //   setStartDate(date);
  // };

  // const changeEndDate = (date) => {
  //   setEndDate(date);
  // };

  return (
    <div className="date-range">
      <div className="date starts">
        <div className="d-flex">
          <i className="fa-solid fa-calendar-days"></i>
          <DatePicker
            selected={startDate}
            onChange={handleStartDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="date ends">
        <div className="d-flex">
          <i className="fa-solid fa-calendar-days"></i>
          <DatePicker
            selected={endDate}
            onChange={handleEndDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  );
}
