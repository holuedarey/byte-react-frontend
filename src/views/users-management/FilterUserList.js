import React from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import GroupedInput from "../../components/groupedInput/GroupedInput";
import DateRange from "../../components/dateRange/DateRange";

export default function FilterUserList({
  limit,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setLimit,
  searchParm,
  setSearchParam,
  fetchData,
}) {
  const handleFilterList = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleInputChange = (newValue) => {
    // console.log("newValue", newValue);
    setSearchParam(newValue);
  };

  return (
    <form className="row mb-3">
      <div className="col-2">
        <CustomSelect
          heading="Limit"
          selectedVal={limit ? limit : "Select Limit"}
          setSelectedValue={setLimit}
          items={[
            { name: "50" },
            { name: "100" },
            { name: "200" },
            { name: "300" },
            { name: "400" },
            { name: "500" },
          ]}
        />
      </div>
      <div className="col-2">
        <GroupedInput
          label="Search By"
          placeholder=""
          value={searchParm}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-3">
        <div className="date-filter">
          <p>Filter by Date: </p>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            handleStartDate={(date) => setStartDate(date)}
            handleEndDate={(date) => setEndDate(date)}
          />
        </div>
      </div>
      <div className="col-2">
        <button className="btn" onClick={handleFilterList}>
          Filter
        </button>
      </div>
    </form>
  );
}
