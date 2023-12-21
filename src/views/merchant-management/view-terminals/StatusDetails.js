import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import ModalTerminalUpload from "../../../components/ModalUploadTerminal";
import Modal from "../../../components/modal/Modal";
import TerminalForm from "./TerminalForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TerminalEditForm from "./TerminalEditForm";
import httpClient from "../../../helpers/RequestInterceptor";
import HandleGetApi from "../../../components/handleApi/HandleGetApi";
import CustomSelect from "../../../components/customSelect/CustomSelect";
import GroupedInput from "../../../components/groupedInput/GroupedInput";
import DateRange from "../../../components/dateRange/DateRange";
import FormatDate from "../../../helpers/FormatDate";
import Pagination from "../../../components/Pagination";

export default function StatusDetails() {
  const [msg, setMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [terminals, setTerminal] = useState([]);
  const data = terminals?.terminalDetails ?? [];
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchParm, setSearchParam] = useState("");
  const totalVol = terminals?.terminalDetails?.length;
  const lastPageNum = Math.ceil(totalVol / limit);
  const pageStart = (pageNumber - 1) * limit + 1;

  const handleInputChange = (newValue) => {
    setSearchParam(newValue);
  };

  const formattedStartDate = FormatDate(startDate);
  const formattedEndDate = FormatDate(endDate);

  // console.log("terminals", terminals?.terminalDetails?.length);

  const message = "";

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsBulkModalOpen(false);
  };

  const addTerminalHandler = () => {
    setIsModalOpen(true);
  };

  const uploadTerminalHandler = () => {
    setIsBulkModalOpen(true);
  };

  const handleEditData = (row) => {
    setSelectedRowData(row);
    setIsEditModalOpen(true);
  };

  const fetchData = () => {
    HandleGetApi(
      `terminal/getTerminals?limit=${limit}&page=${pageNumber}&startdate=${formattedStartDate}&enddate=${formattedEndDate}&search=${searchParm}`,
      setTerminal
    );
  };

  const toggleStatus = (rowData) => {
    const updatedRowData = { ...rowData, enabled: !rowData.enabled };
    // console.log("updated Row", updatedRowData);
    const url = `terminal/updateTerminal/${rowData.serialNumber}`;

    httpClient
      .put(url, updatedRowData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error toggling status:", error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        Cell: (row) => {
          return <div>{row.row.index + pageStart}</div>;
        },
      },
      {
        Header: "Merchant Id",
        accessor: "merchantCode",
      },
      {
        Header: "Terminal Id",
        accessor: "terminalId",
      },
      {
        Header: "Serial Number",
        accessor: "serialNumber",
      },

      {
        Header: "Physical Address",
        accessor: "physicalAddress",
      },
      {
        Header: "Status",
        Cell: (row) => {
          const rowData = data[row.row.index];
          const statusCheck = rowData?.enabled;

          const handleStatusToggle = () => {
            toggleStatus(rowData);
          };

          return (
            <>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor={`enabled-${row.row.index}`}
                >
                  {statusCheck ? "Enabled" : "Disabled"}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="enabled"
                  id={`enabled-${row.row.index}`}
                  checked={statusCheck}
                  onChange={handleStatusToggle}
                />
              </div>
            </>
          );
        },
      },

      {
        Header: "",
        accessor: "Action",
        Cell: ({ row }) => (
          <div onClick={() => handleEditData(row.original)}>
            <i className="fas fa-edit"></i>
          </div>
        ),
      },
    ],
    [data]
  );

  const handleFilterList = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (msg?.trim().length > 0) {
      toast(msg);
      setMsg(""); // Clear the message after displaying the toast
    }
  }, [msg]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="status-details bg-white p-4 border-top-0">
      {/* <div>{summary}</div> */}
      {message !== "" ? <p className="alert alert-info">{message}</p> : <></>}
      <div>
        <div className="table-responsive table-wrapper">
          <div>
            <div className="actions mb-3">
              <button className="btn" onClick={addTerminalHandler}>
                Add Terminal
              </button>
              <button className="btn" onClick={uploadTerminalHandler}>
                Upload Terminal
              </button>
            </div>
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={
                  <TerminalForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                    fetchData={fetchData}
                  />
                }
              />
            )}

            {isEditModalOpen && (
              <Modal
                isOpen={isEditModalOpen}
                onClose={closeModal}
                content={
                  <TerminalEditForm
                    isOpen={isEditModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                    selectedRowData={selectedRowData}
                    fetchData={fetchData}
                  />
                }
              />
            )}
            {isBulkModalOpen && (
              <Modal
                isOpen={isBulkModalOpen}
                onClose={closeModal}
                content={
                  <ModalTerminalUpload
                    isOpen={isBulkModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                    fetchData={fetchData}
                  />
                }
              />
            )}
          </div>
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
          {data.length > 0 ? (
            <Table columns={columns} data={data} />
          ) : (
            <p className="no-record">No record found</p>
          )}
          {lastPageNum > 1 && (
            <Pagination
              prevPage={pageNumber - 1}
              nextPage={pageNumber + 1}
              totalPages={lastPageNum}
              hasNextPage={pageNumber < lastPageNum}
              hasPrevPage={pageNumber > 1}
              setPageNum={setPageNumber}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
