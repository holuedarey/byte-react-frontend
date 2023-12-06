import React from "react";
import "./TransactionDashboard.css";
import Navbar from "../../components/navbar/Navbar";
import TabView from "../../components/TabView";
import Analysis from "./Analysis";
import Dashboard from "./Dashboard";
import History from "./History";
import Status from "./Status";
import HandleGetApi from "../../components/handleApi/HandleGetApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TransactionDashboard() {
  // const [loadingData, setLoadingData] = React.useState(true);
  const [clickIndex, setClickIndex] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [performance, setPerformance] = React.useState({});
  const [history, setHistory] = React.useState([]);
  const [failedReason, setFailedReason] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [valText, setValText] = React.useState("");
  const [searchParm, setSearchParam] = React.useState("");
  const [terminals, setTerminals] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [directionValue, setDirectionValue] = React.useState("desc");

  const tabs = ["Today", "Yesterday", "Present Week"];
  const postPerPage = 50;
  const totalVol = status.total_volume;
  const lastPageNum = Math.ceil(totalVol / postPerPage);
  const pageStart = (pageNumber - 1) * postPerPage + 1;

  // console.log("failed reasons", failedReason)

  const formattedDate =
    date.getFullYear() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getDate();
  const formattedStartDate =
    startDate.getFullYear() +
    "-" +
    parseInt(startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();
  const formattedEndDate =
    endDate.getFullYear() +
    "-" +
    parseInt(endDate.getMonth() + 1) +
    "-" +
    endDate.getDate();

  // console.log("formatted date", formattedStartDate)

  const HandleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchParam(valText);
    }
  };

  const handleChange = (e) => {
    setValText(e.target.value);
  };

  const handleDateFunc = (index) => {
    if (index === 0) {
      setStartDate(new Date());
      setEndDate(new Date());
    } else if (index === 1) {
      let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
      setStartDate(yesterday);
      setEndDate(yesterday);
    } else {
      let day = date.getDay();
      let diff = date.getDate() - day + (day === 0 ? -6 : 1);
      let firstDate = new Date(date.setDate(diff));
      setStartDate(firstDate);
      setEndDate(new Date());
    }
    setClickIndex(index);
  };

  const nextPage = (event) => {
    event.preventDefault();
    setPageNumber((prevPage) => prevPage + 1);
  };

  // console.log("fff", pageNumber, lastPageNum, pageNumber <= lastPageNum);

  const prevPage = (event) => {
    event.preventDefault();
    setPageNumber((prevPage) => prevPage - 1);
    // console.log("llll");
  };

  const resetParams = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setSearchParam("");
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    setDirectionValue(e.target.value);
  };

  const dashboardParam = (
    <div className="dashboard-param">
      <ul className="nav nav-pills">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === clickIndex ? "nav-link active" : "nav-link"}
            onClick={() => handleDateFunc(index)}
          >
            <button className="border-end">{tab}</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const statusParam = (
    <div className="status-param">
      <div>
        <select className="scroll">
          <option value="All banks">All Banks</option>
        </select>
      </div>
      <div className="date-range">
        <div className="start">
          <label>From</label>
          <i className="fa-solid fa-calendar-days"></i>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className="end">
          <label>To</label>
          <i className="fa-solid fa-calendar-days"></i>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  );

  const historyParam = (
    <div className="history-param">
      <div>
        <div className="position-relative">
          <i className="fas fa-search"></i>
          <div className="col pe-0">
            <input
              type="search"
              value={valText}
              onChange={handleChange}
              id="form1"
              className="form-control search-input ps-5"
              onKeyDown={HandleKeyDown}
              placeholder="Hit enter to complete search"
            />
          </div>
        </div>
      </div>
      <div className="select-search">
        <label>Status</label>
        <select>
          <option value="All status">All Status</option>
        </select>
      </div>
      <div className="select-search">
        <label>Banks</label>
        <select>
          <option value="All banks">All Banks</option>
        </select>
      </div>
      <div className="date-range">
        <div className="d-flex">
          <div className="start me-3">
            <label>From</label>
            <i className="fa-solid fa-calendar-days"></i>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="end">
            <label>To</label>
            <i className="fa-solid fa-calendar-days"></i>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const AnalysisParam = (
    <div className="history-param">
      <div className="select-search">
        <label>Sort By</label>
        <select>
          <option value="All status">Value</option>
        </select>
      </div>
      <div className="select-search">
        <label>Order</label>
        <select value={directionValue} onChange={handleSelectChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="date-range">
        <div className="d-flex">
          <div className="start me-3">
            <label>From</label>
            <i className="fa-solid fa-calendar-days"></i>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="end">
            <label>To</label>
            <i className="fa-solid fa-calendar-days"></i>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
    </div>
  );

  React.useEffect(() => {
    HandleGetApi(
      `transactions/stats?date=${formattedDate}&startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
      setStatus
    );
    HandleGetApi(
      `transactions/performance-records?startdate=${formattedStartDate}&enddate=${formattedEndDate}&dir=${directionValue}`,
      setPerformance
    );
    HandleGetApi(
      `transactions/history?limit=${postPerPage}&page=${pageNumber}&startdate=${formattedStartDate}&enddate=${formattedEndDate}$search=${searchParm}`,
      setHistory
    );
    HandleGetApi(
      'transactions/failure-reasons',
      setFailedReason
    );
    // console.log(
    //   `transactions/history?limit=${postPerPage}&page=${pageNumber}&startdate=${formattedStartDate}&enddate=${formattedEndDate}$search=${searchParm}`
    // );
    // HandleGetApi("terminals/stats", setTerminals);
  }, [
    formattedStartDate,
    formattedEndDate,
    pageNumber,
    searchParm,
    directionValue,
  ]);

  const OverviewDashboard = <Dashboard status={status} />;
  const TransactionStatus = <Status status={status} terminals={terminals} />;
  const TransactionHistory = (
    <History
      history={history?.transactions}
      reasons={failedReason}
      status={status}
      postPerPage={postPerPage}
      pageNumber={pageNumber}
      nextPage={nextPage}
      prevPage={prevPage}
      totalVol={totalVol}
      lastPageNum={lastPageNum}
      pageStart={pageStart}
    />
  );
  const TransactionAnalysis = (
    <Analysis
      performance={performance}
      postPerPage={postPerPage}
      pageNumber={pageNumber}
      nextPage={nextPage}
      prevPage={prevPage}
      totalVol={totalVol}
      lastPageNum={lastPageNum}
      pageStart={pageStart}
    />
  );

  return (
    <div>
      <Navbar />
      <div className="container-fluid trans-dashboard">
        <TabView
          resetParams={resetParams}
          tabs={[
            {
              name: "Overview Dashboard",
              content: OverviewDashboard,
              param: dashboardParam,
            },
            {
              name: "Transaction Status",
              content: TransactionStatus,
              param: statusParam,
            },
            {
              name: "Transaction History",
              content: TransactionHistory,
              param: historyParam,
            },
            {
              name: "Transaction Analysis",
              content: TransactionAnalysis,
              param: AnalysisParam,
            },
          ]}
        />
      </div>
    </div>
  );
}
